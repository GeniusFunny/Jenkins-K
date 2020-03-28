const Controller = require('egg').Controller;

class JenkinsViewController extends Controller {
  async index() {}
  async show() {
    const { ctx } = this;
    const id = ctx.params.id;
    let res = await ctx.service.jenkins.view.show(id);
    this.ctx.body = res;
    if (res.code) {
      this.status = res.statusCode;
    } else {
      this.status = 200;
    }
  }
  async create() {
    const { ctx } = this;
    const createRule = {
      name: {
        type: 'string'
      }
    }
    try {
      ctx.validate(createRule);
      const req = ctx.request.body;
      console.log(req)
      let res = await ctx.service.jenkins.view.create(req);
      if (res.code) {
        this.status = res.statusCode;
      } else {
        this.status = 201;
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
    const name = query.name;
    let res = await ctx.service.jenkins.view.delete(name);
    this.ctx.body = res;
    if (res.code) {
      this.status = res.statusCode;
    } else {
      this.status = 200;
    }
  }
  async getConfig() {
    const { ctx } = this;
    const query = ctx.query;
    const name = query.name;
    let res = await ctx.service.jenkins.view.getInfo(name);
    this.ctx.body = res;
    if (res.code) {
      this.status = res.statusCode;
    } else {
      this.status = 200;
    }
  }
  async update() {
    // Todo: 待更改
    const { ctx } = this;
    const query = ctx.query;
    const name = query.name;
    let res = await ctx.service.jenkins.view.updateConfig(name);
    this.ctx.body = res;
    if (res.code) {
      this.status = res.statusCode;
    } else {
      this.status = 200;
    }
  }
}

module.exports = JenkinsViewController;