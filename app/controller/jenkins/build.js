const Controller = require('egg').Controller;

class JenkinsBuildController extends Controller {
  async getInfo() {
    const { ctx } = this;
    const query = ctx.query;
    const res = await ctx.service.jenkins.build.getInfo(query);
    ctx.body = res;
    ctx.status = res.status;
  }
  async start() {
    const { ctx } = this;
    const rule = {
      view: { type: 'string' },
      job: { type: 'string' }
    }
    try {
      ctx.validate(rule);
      const req = ctx.request.body;
      const res = await ctx.service.jenkins.build.start(req);
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
  async stop() {
    const { ctx } = this;
    const rule = {
      view: { type: 'string' },
      job: { type: 'string' },
      id: { type: 'number' }
    }
    try {
      ctx.validate(rule);
      const req = ctx.request.body;
      const res = await ctx.service.jenkins.build.stop(req);
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
  async delete() {
    const { ctx } = this;
    const rule = {
      view: { type: 'string' },
      job: { type: 'string' },
      id: { type: 'number' }
    }
    try {
      ctx.validate(rule);
      const req = ctx.request.body;
      const res = await ctx.service.jenkins.build.delete(req);
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
  async last() {
    const { ctx } = this;
    const query = ctx.query;
    const res = await ctx.service.jenkins.build.last(query);
    ctx.body = res;
    ctx.status = res.status;
  }
  async lastSuccessfulBuild() {
    const { ctx } = this;
    const query = ctx.query;
    const res = await ctx.service.jenkins.build.lastSuccessfulBuild(query);
    ctx.body = res;
    ctx.status = res.status;
  }
}
module.exports = JenkinsBuildController;