const Service = require('egg').Service;
const basicPod = require('./basicPod.json');

class K8sPodService extends Service {
  static combinePodConfig(podInfo) {
    return Object.assign({}, basicPod, podInfo);
  }
  constructor(ctx) {
    super(ctx);
    this.k8s = this.app.k8s;
  }
  async index(namespace) {
    let res = {}
    try {
      res = await this.k8s.api.v1.namespaces(namespace).pods.get();
    } catch (e) {
      res = e
    }
    return res
  }
  async show(namespace, pod) {
    let res = {}
    try {
      res = await this.k8s.api.v1.namespaces(namespace).pods(pod).get();
    } catch (e) {
      res = e
    }
    return res
  }
  async create(namespace, podInfo) {
    let res = {}
    const pod = K8sPodService.combinePodConfig(podInfo);
    try {
      res = await this.k8s.api.v1.namespaces(namespace).pods.post({
        body: pod
      });
    } catch (e) {
      res = e
    }
    return res
  }
  async destroy(namespace, pod) {
    let res = {}
    try {
      res = await this.k8s.api.v1.namespaces(namespace).pods(pod).delete();
    } catch (e) {
      res = e
    }
    return res
  }
  async update(namespace, pod, req) {
    let res = {}
    try {
      res = await this.k8s.api.v1.namespaces(namespace).pods(pod).patch({
        body: req
      });
    } catch (e) {
      res = e
    }
    return res
  }
}

module.exports = K8sPodService ;