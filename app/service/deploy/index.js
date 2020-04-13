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
      console.log(e)
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
}


module.exports = DeploySerivce;