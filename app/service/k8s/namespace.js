const Service = require('egg').Service;
const basicNamespace = require('./basicNamespace.json');
class K8sNamespaceService extends Service {
  constructor(ctx) {
    super(ctx);
    this.k8s = this.app.k8s;
  }
  static combineNamespaceConfig(namespaceInfo) {
    return Object.assign({}, basicNamespace, namespaceInfo)
  }
  async index() {
    let res = {}
    try {
      res = await this.k8s.api.v1.namespaces.get();
    } catch (e) {
      res = e
    }
    return res
  }
  async show(namespace) {
    let res = {}
    try {
      res = await this.k8s.api.v1.namespaces(namespace).get();
    } catch (e) {
      res = e
    }
    return res
  }
  async create(namespaceInfo) {
    let res = {}
    const namespace = K8sNamespaceService.combineNamespaceConfig(namespaceInfo);
    try {
      res = await this.k8s.api.v1.namespaces.post({
        body: namespace
      });
    } catch (e) {
      res = e
    }
    return res
  }
  async destroy(namespace) {
    let res = {}
    try {
      res = await this.k8s.api.v1.namespaces(namespace).delete();
    } catch (e) {
      res = e
    }
    return res
  }
  async update(namespace, req) {
    let res = {}
    try {
      res = await this.k8s.api.v1.namespaces(namespace).status.patch({
        body: req
      });
    } catch (e) {
      res = e
    }
    return res
  }
}

module.exports = K8sNamespaceService;