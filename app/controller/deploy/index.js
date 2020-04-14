const { Controller } = require('egg');


class DeployController extends Controller {
  async show() {
    const { ctx } = this;
    const query = ctx.query;
    const { view, job } = query;
    const res = await ctx.service.deploy.index.show(job, view);
    ctx.body = res;
    ctx.status = res.status;
  }
  async status() {
    const { ctx } = this;
    const query = ctx.query;
    const { id } = query;
    const res = await ctx.service.deploy.index.status(id);
    ctx.body = res;
    ctx.status = res.status;
  }
  async updateBuildStatus() {
    const { ctx } = this;
    const rule = {
      id: { type: 'number' }
    }
    try {
      ctx.validate(rule);
      const req = ctx.request.body;
      const { id } = req;
      const res = await ctx.service.deploy.index.updateBuildStatus(id);
      ctx.body = res;
      ctx.status = res.status;
    } catch (e) {
      ctx.logger.warn(e.errors);
      ctx.status = 400;
      ctx.body = {
        message: '参数不合法'
      };
    }
  }
  async updateDeployStatus() {
    const { ctx } = this;
    const rule = {
      id: { type: 'number' },
      env: { type: 'string' }
    }
    try {
      ctx.validate(rule);
      const req = ctx.request.body;
      const { id, env = 'dev' } = req;
      const res = await ctx.service.deploy.index.updateDeployStatus(id, env);
      ctx.body = res;
      ctx.status = res.status;
    } catch (e) {
      ctx.logger.warn(e.errors);
      ctx.status = 400;
      ctx.body = {
        message: '参数不合法'
      };
    }
  }
}


module.exports = DeployController;