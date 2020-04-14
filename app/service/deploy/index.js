const { Service } = require('egg');


class DeploySerivce extends Service {
  async show(job, view = 'all') {
    let res = {};
    let lastBuild = null
    let devDeployment = null
    let prodDeployment = null
    const { ctx } = this;
    try {
      // 获取上次成功构建的相关信息
      const lastSuccessfulBuild = await ctx.service.jenkins.build.lastSuccessfulBuild({
        view, job
      });
      if (Array.isArray(lastSuccessfulBuild.actions)) {
        lastBuild = {
          name: job,
          imageTag: lastSuccessfulBuild.actions.filter(action => action._class === 'hudson.plugins.git.util.BuildData')[0].buildsByBranchName['refs/remotes/origin/master'].revision['SHA1'],
          time: new Date(lastSuccessfulBuild.timestamp)
        }
      }
      // 获取与此任务相关联的deployment
      const rows = await ctx.app.mysql.select('job_deployment', {
        where: { job }
      })
      if (rows) {
        let { dev_deployment, prod_deployment } = rows[0];
        try {
          // 获取测试/开发环境的deployment
          let deploymentInfo = await ctx.service.k8s.deployment.show('default', dev_deployment);
          // 获取生产环境的deployment
          devDeployment = {
            name: deploymentInfo.body.metadata.name,
            imageTag: deploymentInfo.body.spec.template.spec.containers[0].image.split(':')[1] || 'latest',
            replicas: deploymentInfo.body.spec.replicas,
            time: deploymentInfo.body.metadata.creationTimestamp
          }
          deploymentInfo = await ctx.service.k8s.deployment.show('default', prod_deployment);
          prodDeployment = {
            name: deploymentInfo.body.metadata.name,
            imageTag: deploymentInfo.body.spec.template.spec.containers[0].image.split(':')[1] || 'latest',
            replicas: deploymentInfo.body.spec.replicas,
            time: deploymentInfo.body.metadata.creationTimestamp
          }
          res.status = 200;
        } catch (e) {
          throw e;
        }
      }
    } catch (e) {
      res = e;
    }

    if (lastBuild) {
      res.lastBuild = lastBuild;
    }
    if (devDeployment) {
      res.devDeployment = devDeployment;
    }
    if (prodDeployment) {
      res.prodDeployment = prodDeployment;
    }
    return res;
  }
  async status(id) {
    let res = {};
    const { app } = this;
    try {
      const rows = await app.mysql.select('deploy', {
        where: {
          id
        }
      });
      if (rows) {
        res = rows[0];
        res.currentStatus = res.status;
      }
      res.status = 200;
    } catch (e) {
      res = e;
      res.status = 500;
    }
    return res;
  }
  async updateBuildStatus(id) {
    let res = {}
    const { ctx, app } = this;
    // 获取Build详情
    let info = await this.status(id);
    const { job_name, build_id } = info;
    if (job_name && build_id) {
      let newStatus = null
      try {
        const buildInfo = await ctx.service.jenkins.build.getInfo({
          view: 'all',
          job: job_name,
          id: build_id
        });
        // 第一次获知构建完成，更新状态
        if (buildInfo.status === 200) {
          if ((!buildInfo.building) && info.currentStatus === 'build') {
            if (buildInfo.result === 'SUCCESS') {
              // 构建成功，进入下一阶段：pre-dev
              newStatus = {
                status: 'pre-dev',
                finished: false
              }
            } else {
              // 构建失败，进入下一阶段：终止
              newStatus = {
                finished: true
              }
            }
          }
          try {
            let log = null;
            const logRes = await ctx.service.jenkins.build.log({
              view: 'all',
              job: job_name,
              id: build_id
            });
            if (logRes.status === 200) {
              log = logRes.body;
            }
            if (newStatus) {
              try {
                await app.mysql.update('deploy', {
                  id,
                  log,
                  ...newStatus
                });
              } catch (e) {
                throw e;
              }
            } else {
              try {
                await app.mysql.update('deploy', {
                  id,
                  log
                });
              } catch (e) {
                throw e;
              }
            }
            res = {
              status: 200
            };
          } catch (e) {
            throw e;
          }
        }
        try {
          res = await this.status(id);
        } catch (e) {
          throw e;
        }
      } catch (e) {
        res = e;
        res.status = 500;
      }
    }
    return res;
  }
  async updateDeployStatus(id, env = 'dev') {
    let res = {}
    const { app } = this;
    // 获取Build详情
    try {
      const info = await this.status(id);
      let nextStatus = null;
      let updateRes = await this.updateDeployment(info.job_name, info.build_id, 'all', env);
      if (updateRes.status === 200) {
        if (env === 'dev') {
          nextStatus = {
            status: 'pre-prod',
            finished: false
          }
        } else if (env === 'prod') {
          nextStatus = {
            status: 'success',
            finished: true
          }
        }
        if (nextStatus) {
          await app.mysql.update('deploy', {
            id,
            ...nextStatus
          })
        }
        res = await this.status(id);
      }
    } catch (e) {
      res = e;
    }
    return res;
  }
  async updateDeployment(job, buildId, view, env) {
    let res = {};
    const { ctx, app } = this;
    try {
      let buildInfo = await ctx.service.jenkins.build.getInfo({
        view,
        job,
        id: buildId
      });
      let rows = await app.mysql.select('job_deployment', {
        where: {
          job
        }
      });
      if (rows) {
        const data = rows[0];
        let deploymentName = data[`${env}_deployment`];
        let deploymentInfo = await ctx.service.k8s.deployment.show('default', deploymentName);
        let currentImage = deploymentInfo.body.spec.template.spec.containers[0].image;
        let imageName = currentImage.split(':')[0];
        let lastBuildImageTag = buildInfo.actions.filter(action => action._class === 'hudson.plugins.git.util.BuildData')[0].buildsByBranchName['refs/remotes/origin/master'].revision['SHA1'];
        // 更新镜像
        res = await ctx.service.k8s.deployment.update(deploymentName, 'default', {
          spec: {
            template: {
              spec: {
                containers: [{
                  ...deploymentInfo.body.spec.template.spec.containers[0],
                  image: imageName + ':' + lastBuildImageTag
                }]
              }
            }
          }
        });
        res.status = 200;
      } else {
        res.status = 404;
      }
    } catch (e) {
      res = e;
    }
    return res;
  }
}

module.exports = DeploySerivce;