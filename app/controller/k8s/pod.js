const Controller = require('egg').Controller;

class K8sPodController extends Controller {
  async index() {
    const { ctx } = this;
    const query = ctx.query;
    const namespace = query.namespace;
    let res = await ctx.service.k8s.pod.index(namespace);
    this.ctx.body = res;
    if (res.code) {
      ctx.status = 200;
    } else {
      ctx.status = res.statusCode;
    }
  }
  async show() {
    const { ctx } = this;
    const query = ctx.query;
    const namespace = query.namespace;
    const pod = query.pod;
    let res = await ctx.service.k8s.pod.show(namespace, pod);
    this.ctx.body = res;
    if (res.code) {
      ctx.status = 200;
    } else {
      ctx.status = res.statusCode;
    }
  }
  async create() {
    const { ctx } = this;
    const createRule = {
      metadata: {
        name: {
          type: 'string'
        },
        labels: {
          type: 'object'
        }
      },
      spec: {
        containers: {
          type: 'object'
        }
      }
    }
    try {
      ctx.validate(createRule);
      const req = ctx.request.body;
      let res = await ctx.service.k8s.pod.create(req);
      if (res.code) {
        if (res.message === 201) {
          ctx.body = {
            message: 'created'
          }
          ctx.status = 201;
        } else {
          ctx.status = 400;
          ctx.body = {
            message: `job ${req.name} is existed`
          }
        }
      }
    } catch(err) {
      ctx.logger.warn(err.errors);
      ctx.body = {
        success: false,
        message: '参数不合法'
      };
    }
  }
  async delete() {
    const { ctx } = this;
    const query = ctx.query;
    const namespace = query.namespace;
    const pod = query.pod;
    let res = await ctx.service.k8s.pod.delete(namespace, pod);
    this.ctx.body = res;
    if (res.code) {
      ctx.status = 200;
    } else {
      ctx.status = res.statusCode;
    }
  }
}

module.exports = K8sPodController;