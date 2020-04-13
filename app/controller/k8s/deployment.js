const Controller = require('egg').Controller;

class K8sDeployController extends Controller {
  async index() {
    const { ctx } = this;
    const query = ctx.query;
    const namespace = query.namespace || 'default';
    const res = await ctx.service.k8s.deployment.index(namespace);
    ctx.body = res;
    ctx.status = res.statusCode || res.status;
  }
  async show() {
    const { ctx } = this;
    const query = ctx.query;
    const namespace = query.namespace || 'default';
    const deployment = ctx.params.id;
    const res = await ctx.service.k8s.deployment.show(namespace, deployment);
    ctx.body = res;
    ctx.status = res.statusCode || res.status;
  }
  async watch() {
    const { ctx } = this;
    const query = ctx.query;
    const namespace = query.namespace;
    const deployment = query.deployment;
    const res = await ctx.service.k8s.deployment.watch(namespace, deployment);
    ctx.body = res;
    ctx.status = res.statusCode || res.status;
  }
  async create() {
    const { ctx } = this;
    try {
      const req = ctx.request.body;
      const res = await ctx.service.k8s.deployment.create(req);
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
      const deployment = ctx.params.id;
      const res = await ctx.service.k8s.deployment.destroy(namespace, deployment);
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
  async rollback() {
    const { ctx } = this;
    const rollbackRule = {
      deployment: {
        type: 'string'
      }
    }
    try {
      ctx.validate(rollbackRule);
      const req = ctx.request.body;
      const namespace = req.namespace || 'default';
      const res = await ctx.service.k8s.deployment.rollback(namespace, deployment);
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
      const deployment = ctx.params.id;
      const res = await ctx.service.k8s.deployment.watchUpdate(deployment, req);
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
  async scale() {
    const { ctx } = this;
    const scaleRule = {
      size: {
        type: 'number'
      },
      deployment: {
        type: 'string'
      }
    }
    try {
      ctx.validate(scaleRule);
      const req = ctx.request.body;
      const namespace = req.namespace || 'default';
      const size = req.size || 3;
      const res = await ctx.service.k8s.deployment.scale(namespace, deployment, size);
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

module.exports = K8sDeployController;