const Controller = require('egg').Controller;

class JenkinsViewController extends Controller {
  async index() {
    const { ctx } = this;
    let res = await ctx.service.jenkins.view.index();
    this.ctx.body = res;
    if (res.code) {
      ctx.status = 200;
    } else {
      ctx.status = res.statusCode;
    }
  }
  async show() {
    const { ctx } = this;
    const id = ctx.params.id;
    let res = await ctx.service.jenkins.view.show(id);
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
      name: {
        type: 'string',
      }
    }
    try {
      ctx.validate(createRule);
      const req = ctx.request.body;
      let res = await ctx.service.jenkins.view.create(req);
      if (res.code) {
        if (res.message === 201) {
          ctx.status = 201;
        } else {
          ctx.body = {
            message: `view ${req.name} is existed`,
          }
          ctx.status = 500;
        }
      }
    } catch(err) {
      ctx.logger.warn(err.errors);
      ctx.status = 500;
      ctx.body = {
        message: '参数不合法'
      };
    }
  }
  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;
    let res = await ctx.service.jenkins.view.destroy(id);
    this.ctx.body = res;
    if (res.status === 'failed' || !res.code) {
      ctx.status = res.message;
    } else {
      ctx.status = 200;
    }
  }
  async getConfig() {
    const { ctx } = this;
    const query = ctx.query;
    const view = query.view;
    let res = await ctx.service.jenkins.view.getConfig(view);
    this.ctx.body = res;

    if (res.code) {
      ctx.status = 200;
    } else {
      ctx.status = res.statusCode;
    }
  }
  async updateConfig() {
    const { ctx } = this;
    const query = ctx.query;
    const view = query.view;
    const updateRule = {}
    try {
      ctx.validate(updateRule);
      const req = ctx.request.body;
      let res = await ctx.service.jenkins.view.updateConfig(view, req);
      this.ctx.body = res;
      if (res.code) {
        ctx.status = 200;
      } else {
        ctx.status = res.statusCode;
      }
    } catch(err) {
      ctx.logger.warn(err.errors);
      ctx.body = {
        success: false,
        message: '参数不合法'
      };
    } 
  }
}

module.exports = JenkinsViewController;