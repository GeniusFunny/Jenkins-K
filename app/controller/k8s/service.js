const Controller = require('egg').Controller;

class K8sServiceController extends Controller {
  async index() {
    const { ctx } = this;
    const query = ctx.query;
    const namespace = query.namespace || 'default';
    const res = await ctx.service.k8s.service.index(namespace);
    ctx.body = res;
    ctx.status = res.statusCode || res.status;
  }
  async show() {
    const { ctx } = this;
    const query = ctx.query;
    const namespace = query.namespace || 'default';
    const service = ctx.params.id;
    const res = await ctx.service.k8s.service.show(namespace, service);
    ctx.body = res;
    ctx.status = res.statusCode || res.status;
  }
  async create() {
    const { ctx } = this;
    try {
      const req = ctx.request.body;
      const res = await ctx.service.k8s.service.create(req);
      ctx.body = res;
      ctx.status = res.statusCode || res.status;
    } catch (e) {
      ctx.logger.warn(e.errors);
      ctx.body = {
        ...e,
        message: '参数不合法'
      };
    }
  }
  async destroy() {
    const { ctx } = this;
    try {
      const req = ctx.request.body;
      const namespace = req.namespace || 'default';
      const service = ctx.params.id;
      const res = await ctx.service.k8s.service.destroy(namespace, service);
      ctx.body = res;
      ctx.status = res.statusCode || res.status;
    } catch (e) {
      ctx.logger.warn(e.errors);
      ctx.body = {
        ...e,
        message: '参数不合法'
      };
    }

  }
  async update() {
    const { ctx } = this;
    const updateRule = {}
    try {
      ctx.validate(updateRule);
      const req = ctx.request.body;
      const service = ctx.params.id;
      const res = await ctx.service.k8s.service.update(service, req);
      ctx.body = res;
      ctx.status = res.statusCode || res.status;
    } catch (e) {
      ctx.logger.warn(e.errors);
      ctx.body = {
        ...e,
        message: '参数不合法'
      };
    }
  }
}

module.exports = K8sServiceController;