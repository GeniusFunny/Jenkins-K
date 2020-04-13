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
  async create(serviceInfo) {
    let res = {}
    const namespace = serviceInfo.namespace || 'default';
    const service = K8sServiceService.combineServiceConfig(serviceInfo);
    try {
      const port = service.spec.ports[0].port;
      // dev环境
      service.metadata.name = service.metadata.name + '-dev';
      service.spec.ports[0].port = Math.floor(Math.random() * 10000);
      res = await this.k8s.api.v1.namespaces(namespace).services.post({
        body: service
      });
      // prod环境
      service.metadata.name = service.metadata.name + '-prod';
      service.spec.ports[0].port = port;
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
  async update(service, req) {
    let res = {}
    const namespace = req.namespace || 'default';
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