const Service = require('egg').Service;
const basicPod = require('./basicPod.json');

class K8sPodService extends Service {
  constructor(ctx) {
    super(ctx);
    this.k8s = this.app.k8s;
  }
  async index(namespace) {
    let res = {}
    try {
      let data = await this.k8s.api.v1.namespaces(namespace).pod.get();
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
  async show(namespace, pod) {
    let res = {}
    try {
      let data = await this.k8s.api.v1.namespaces(namespace).pods(pod).get();
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
  async create(namespace, podInfo) {
    const pod = K8sPodService.combinePodConfig(podInfo);
    let res = {}
    try {
      let data = await this.k8s.api.v1.namespaces(namespace).pods.post({
        body: pod
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
  async delete(namespace, pod) {
    let res = {}
    try {
      let data = await this.k8s.api.v1.namespaces(namespace).pods(pod).delete();
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
  static combinePodConfig(podInfo) {
    let basic = JSON.stringify(basicPod);
    basic.metadata = Object.assign(basic.metadata, podInfo.metadata);
    basic.spec = Object.assign(basic.spec, podInfo.spec);
    return JSON.stringify(basic);
  }
}

module.exports = K8sPodService ;