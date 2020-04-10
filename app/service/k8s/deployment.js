const Service = require('egg').Service;
const basicDeployment = require('./basicDeployment.json');

class K8sDeploymentService extends Service {
  static combineDeploymentConfig(deploymentInfo) {
    return Object.assign({}, basicDeployment, deploymentInfo)
  }
  constructor(ctx) {
    super(ctx);
    this.k8s = this.app.k8s;
  }
  // deployment列表
  async index(namespace) {
    let res = {}
    try {
      res = await this.k8s.apis.extensions.v1beta1.namespaces(namespace).deployments.get();
    } catch (e) {
      res = e
    }
    return res
  }
  // 查询deployment
  async show(namespace, deployment) {
    let res = {}
    try {
      res = await this.k8s.apis.extensions.v1beta1.namespaces(namespace).deployments(deployment).get();
    } catch (e) {
      res = e
    }
    return res
  }
  // 新建deployment
  async create(deploymentInfo) {
    const namespace = deploymentInfo.namespace || 'default';
    let res = {}
    const deployment = K8sDeploymentService.combineDeploymentConfig(deploymentInfo);
    try {
      res = await this.k8s.apis.extensions.v1beta1.namespaces(namespace).deployments.post({
        body: deployment
      });
    } catch (e) {
      res = e
    }
    return res
  }
  // 删除deployment
  async destroy(namespace, deployment) {
    let res = {}
    try {
      res = await this.k8s.apis.extensions.v1beta1.namespaces(namespace).deployments(deployment).delete();
    } catch (e) {
      res = e
    }
    return res
  }
  /*
  滚动升级, 例如：
    patchData = {
      spec: {
          template: {
            spec: {
              containers: [{
                name: 'nginx',
                image: 'nginx:1.9.1'
              }]
            }
          }
        }
      }
    }
  */
  async update(deployment, namespace, req) {
    let res = {}
    try {
      res = await this.k8s.apis.apps.v1beta1.namespaces(namespace).deployments(deployment).patch({
        body: req
      });
    } catch (e) {
      res = e
    }
    return res
  }
  // 监听deployment更新过程
  async watchUpdate(deployment, req) {
    let res = {};
    try {
      const namespace = req.namespace || 'default';
      const updateImage = await this.update(deployment, namespace, req);
      if (updateImage.statusCode === 200) {
        res = await this.watchLoop(namespace, deployment);
        if (res.status === 200) {
          res.statusCode = res.status;
          return res;
        }
      } else {
        return {
          statusCode: updateImage.statusCode,
          message: '更新失败'
        }
      }
    } catch (e) {
      res = e
    }
    return res;
  }
  // 轮询deloyment状态，直到完成 更新/回滚
  async watchLoop(namespace, deployment) {
    return new Promise(resolve => {
      setTimeout(async () => {
        const { data } = await this.watch(namespace, deployment);
        if (data.replicas && data.replicas === data.updatedReplicas) {
          resolve({
            status: 200,
            replicas: data.replicas,
            updatedReplicas: data.updatedReplicas
          })
        } else {
          resolve(await this.watchLoop(namespace, deployment));
        }
      }, 3000)
    })
  }
  // 查看deployment状态
  async watch(namespace, deployment) {
    let res = {};
    try {
      const info = await this.k8s.apis.apps.v1beta1.namespaces(namespace).deployments(deployment).status.get();
      res = {
        data: info.body.status,
        statusCode: info.statusCode
      }
    } catch (e) {
      res = e;
    }
    return res;
  }
  // 回滚
  async rollback(namespace, deployment) {
    let res = {}
    try {
      res = await this.k8s.apis.apps.v1beta1.namespaces(namespace).deployments(deployment).rollback.post({
        body: {
          kind: 'DeploymentRollback',
          apiVersion: 'apps/v1beta1',
          name: deployment
        }
      })
    } catch (e) {
      res = e;
    }
    return res;
  }
  // 水平伸缩
  async scale(namespace, deployment, size) {
    let res = {}
    try {
      res = await this.k8s.apis.apps.v1beta1.namespaces(namespace).deployments(deployment).scale.patch({
        body: {
          spec: {
            replicas: size
          }
        }
      })
    } catch (e) {
      res = e;
    }
    return res;
  }
}

module.exports = K8sDeploymentService;