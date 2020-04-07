const Controller = require('egg').Controller;

class JenkinsJobController extends Controller {
  async index() {
    const { ctx } = this;
    const res = await ctx.service.jenkins.job.index();
    ctx.body = res;
    ctx.status = res.status;
  }
  async show() {
    const { ctx } = this;
    const id = ctx.params.id;
    const res = await ctx.service.jenkins.job.show(id);
    ctx.body = res;
    ctx.status = res.status;
  }
  async enable() {
    const { ctx } = this;
    const rule = {
      job: {
        type: 'string',
      }
    }
    try {
      ctx.validate(rule);
      const req = ctx.request.body;
      const res = await ctx.service.jenkins.job.enable(req);
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
  async disable() {
    const { ctx } = this;
    const rule = {
      job: {
        type: 'string',
      }
    }
    try {
      ctx.validate(rule);
      const req = ctx.request.body;
      const res = await ctx.service.jenkins.job.disable(req);
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
      const res = await ctx.service.jenkins.job.create(req);
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
    const res = await ctx.service.jenkins.job.destroy(id);
    ctx.body = res;
    ctx.status = res.status;
  }
  async getConfig() {
    const { ctx } = this;
    const query = ctx.query;
    const job = query.job;
    const res = await ctx.service.jenkins.job.getConfig(job);
    ctx.body = res;
    ctx.status = res.status;
  }
  async updateConfig() {
    const { ctx } = this;
    const query = ctx.query;
    const job = query.job;
    const updateRule = {}
    try {
      ctx.validate(updateRule);
      const req = ctx.request.body;
      const res = await ctx.service.jenkins.job.updateConfig(job, req);
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

module.exports = JenkinsJobController;