const Controller = require('egg').Controller;

class JenkinsViewController extends Controller {
  async index() {
    const { ctx } = this;
    const res = await ctx.service.jenkins.view.index();
    ctx.body = res;
    ctx.status = res.status;
  }
  async show() {
    const { ctx } = this;
    const id = ctx.params.id;
    const res = await ctx.service.jenkins.view.show(id);
    ctx.body = res;
    ctx.status = res.status;
  }
  async create() {
    const { ctx } = this;
    const rule = {
      name: {
        type: 'string',
      }
    }
    try {
      ctx.validate(rule);
      const req = ctx.request.body;
      const res = await ctx.service.jenkins.view.create(req);
      ctx.body = res;
      ctx.status = res.status;
    } catch(e) {
      ctx.logger.warn(e.errors);
      ctx.status = 400;
      ctx.body = {
        message: '参数不合法'
      };
    }
  }
  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;
    const res = await ctx.service.jenkins.view.destroy(id);
    ctx.body = res;
    ctx.status = res.status;
  }
  async getConfig() {
    const { ctx } = this;
    const query = ctx.query;
    const view = query.view;
    const res = await ctx.service.jenkins.view.getConfig(view);
    ctx.body = res;
    ctx.status = res.status;
  }
  async updateConfig() {
    const { ctx } = this;
    const query = ctx.query;
    const view = query.view;
    const updateRule = {}
    try {
      ctx.validate(updateRule);
      const req = ctx.request.body;
      const res = await ctx.service.jenkins.view.updateConfig(view, req);
      ctx.body = res;
      ctx.status = res.status;
    } catch(e) {
      ctx.logger.warn(e.errors);
      ctx.status = 400;
      ctx.body = {
        message: '参数不合法'
      };
    } 
  }
}

module.exports = JenkinsViewController;