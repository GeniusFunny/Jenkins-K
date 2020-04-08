const Controller = require('egg').Controller;

class K8sPodController extends Controller {
  async index() {
    const { ctx } = this;
    const query = ctx.query;
    const namespace = query.namespace || 'default';
    const res = await ctx.service.k8s.pod.index(namespace);
    ctx.body = res;
    ctx.status = res.statusCode || res.status;
  }
  async show() {
    const { ctx } = this;
    const query = ctx.query;
    const namespace = query.namespace || 'default';
    const pod = ctx.params.id;
    const res = await ctx.service.k8s.pod.show(namespace, pod);
    ctx.body = res;
    ctx.status = res.statusCode || res.status;
  }
  async create() {
    const { ctx } = this;
    try {
      const req = ctx.request.body;
      const namespace = req.namespace || 'default';
      const res = await ctx.service.k8s.pod.create(namespace, req);
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
      const pod = ctx.params.id;
      const res = await ctx.service.k8s.pod.destroy(namespace, pod);
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
    const updateRule = {
      spec: {
        type: 'object'
      }
    }
    try {
      ctx.validate(updateRule);
      const req = ctx.request.body;
      const pod = ctx.params.id;
      const namespace = req.namespace || 'default';
      const res = await ctx.service.k8s.pod.update(namespace, pod, req);
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

module.exports = K8sPodController;