const Service = require('egg').Service;
const basicService = require('./basicService.json');

class K8sServiceService extends Service {
  static combineServiceConfig(serviceInfo) {
    return Object.assign({}, basicService, serviceInfo);
  }
  constructor(ctx) {
    super(ctx);
    this.k8s = this.app.k8s;
  }
  async index(namespace) {
    let res = {}
    try {
      res = await this.k8s.api.v1.namespaces(namespace).services.get();
    } catch (e) {
      res = e
    }
    return res
  }
  async show(namespace, service) {
    let res = {}
    try {
      res = await this.k8s.api.v1.namespaces(namespace).services(service).get();
    } catch (e) {
      res = e
    }
    return res
  }
  async create(namespace, serviceInfo) {
    let res = {}
    const service = K8sPodService.combineServiceConfig(serviceInfo);
    try {
      res = await this.k8s.api.v1.namespaces(namespace).services.post({
        body: service
      });
    } catch (e) {
      res = e
    }
    return res
  }
  async destroy(namespace, service) {
    let res = {}
    try {
      res = await this.k8s.api.v1.namespaces(namespace).services(service).delete();
    } catch (e) {
      res = e
    }
    return res
  }
  async update(namespace, service, req) {
    let res = {}
    try {
      res = await this.k8s.api.v1.namespaces(namespace).service(service).patch({
        body: req
      });
    } catch (e) {
      res = e
    }
    return res
  }
}

module.exports = K8sServiceService ;