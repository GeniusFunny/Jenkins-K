const Controller = require('egg').Controller;

class JenkinsJobController extends Controller {
  async index() {
    const { ctx } = this;
    let res = await ctx.service.jenkins.job.index();
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
    let res = await ctx.service.jenkins.job.show(id);
    this.ctx.body = res;
    if (res.code) {
      ctx.status = 200;
    } else {
      ctx.status = res.statusCode;
    }
  }
  async enable() {
    const { ctx } = this;
    const createRule = {
      job: {
        type: 'string',
      }
    }
    try {
      ctx.validate(createRule);
      const req = ctx.request.body;
      let res = await ctx.service.jenkins.job.enable(req);
      if (res.code) {
        if (res.statusCode === 200) {
          ctx.body = {
            message: 'enabled'
          }
          ctx.status = res.statusCode;
        } else {
          ctx.status = res.message || 400;
          ctx.body = {
            message: `failed`
          };
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
  async disable() {
    const { ctx } = this;
    const createRule = {
      job: {
        type: 'string',
      }
    }
    try {
      ctx.validate(createRule);
      const req = ctx.request.body;
      let res = await ctx.service.jenkins.job.disable(req);
      if (res.code) {
        if (res.statusCode === 200) {
          ctx.body = {
            message: 'disabled'
          }
          ctx.status = res.statusCode;
        } else {
          ctx.status = res.message || 400;
          ctx.body = {
            message: `failed`
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
      let res = await ctx.service.jenkins.job.create(req);
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
  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;
    let res = await ctx.service.jenkins.job.destroy(id);
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
    const job = query.job;
    let res = await ctx.service.jenkins.job.getConfig(job);
    this.ctx.body = res;
    
    if (res.code) {
      ctx.status = 200;
      delete res.code
    } else {
      ctx.status = res.statusCode;
    }
  }
  async updateConfig() {
    const { ctx } = this;
    const query = ctx.query;
    const job = query.job;
    const updateRule = {}
    try {
      ctx.validate(updateRule);
      const req = ctx.request.body;
      let res = await ctx.service.jenkins.job.updateConfig(job, req);
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

module.exports = JenkinsJobController;