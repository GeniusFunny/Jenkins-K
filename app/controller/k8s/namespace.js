const Controller = require('egg').Controller;

class K8sNamespaceController extends Controller {
  async index() {
    const { ctx } = this;
    const res = await ctx.service.k8s.namespace.index();
    ctx.body = res;
    ctx.status = res.statusCode;
  }
  async show() {
    const { ctx } = this;
    const query = ctx.query;
    const namespace = query.namespace || 'default';
    const res = await ctx.service.k8s.namespace.show(namespace);
    ctx.body = res;
    ctx.status = res.statusCode;
  }
  async create() {
    const { ctx } = this;
    try {
      const req = ctx.request.body;
      const res = await ctx.service.k8s.namespace.create(req);
      ctx.body = res;
      ctx.status = res.statusCode;
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
      const namespace = ctx.params.id;
      const res = await ctx.service.k8s.pod.destroy(namespace);
      ctx.body = res;
      ctx.status = res.statusCode;
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
      const namespace = ctx.params.id;
      const res = await ctx.service.k8s.namespace.update(namespace, req);
      ctx.body = res;
      ctx.status = res.statusCode;
    } catch (e) {
      ctx.logger.warn(e.errors);
      ctx.body = {
        ...e,
        message: '参数不合法'
      };
    }
  }
}

module.exports = K8sNamespaceController;