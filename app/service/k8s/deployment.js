const Service = require('egg').Service;
const basicDeployment = require('./basicDeployment.json');

class K8sDeploymentService extends Service {
  constructor(ctx) {
    super(ctx);
    this.k8s = this.app.k8s;
  }
  // deployment列表
  async index(namespace) {
    let res = {}
    try {
      let data = await this.k8s.apis.extensions.v1beta1.namespaces(namespace).deployments.get();
      res.data = data.body
      res.code = 1;
    } catch(e) {
      res = {
        code: 0,
        message: e
      }
    }
    return res
  }
  // 查询deployment
  async show(namespace, deployment) {
    let res = {}
    try {
      let data = await this.k8s.apis.extensions.v1beta1.namespaces(namespace).deployments(deployment).get();
      res = data.body;
      res.code = 1;
    } catch(e) {
      res = {
        code: 0,
        message: e
      }
    }
    return res
  }
  // 新建deployment
  async create(namespace, deploymentInfo) {
    let res = {}
    const deployment = K8sDeploymentService.combineDeploymentConfig(deploymentInfo);
    try {
      let data = await this.k8s.apis.extensions.v1beta1.namespaces(namespace).deployments.post({
        body: deployment
      });
      res = data.body;
      res.code = 1;
    } catch(e) {
      res = {
        code: 0,
        message: e
      }
    }
    return res
  }
  // 删除deployment
  async delete(namespace, deployment) {
    let res = {}
    try {
      let data = await this.k8s.apis.extensions.v1beta1.namespaces(namespace).deployments(deployment).delete();
      res = data.body;
      res.code = 1;
    } catch(e) {
      res = {
        code: 0,
        message: e
      }
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
  async patch(namespace, deployment, patchData) {
    let res = {}
    try {
      let updateImage = await this.k8s.apis.apps.v1beta1.namespaces(namespace).deployments(deployment).patch({
        body: patchData
      })
      res = updateImage;
      res.code = 1;
    } catch(e) {
      console.log(e)
      res = {
        code: 0,
        message: e
      }
    }
    return res
  }
  // 回滚
  async rollback(namespace, deployment) {
    let res = {}
    try {
      let rollback = await this.k8s.apis.apps.v1beta1.namespaces(namespace).deployments(deployment).rollback.post({
        body: {
          kind: 'DeploymentRollback',
          apiVersion: 'apps/v1beta1',
          name: deployment
        }
      })
      res = rollback;
      res.code = 1;
    } catch(e) {
      console.log(e)
      res = {
        code: 0,
        message: e
      }
    }
    return res
  }
  static combineDeploymentConfig(deploymentInfo) {
    let basic = JSON.stringify(basicDeployment);
    return JSON.stringify(basic);
  }
}

module.exports = K8sDeploymentService ;