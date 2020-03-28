const Controller = require('egg').Controller;

class JenkinsJobController extends Controller {
  async getInfo() {
    const { ctx } = this;
    const query = ctx.query;
    const name = query.name;
    let res = await ctx.service.jenkins.job.getInfo(name);
    this.ctx.body = res;
    if (res.code) {
      this.status = res.statusCode;
    } else {
      this.status = 200;
    }
  }
  async enable() {
    const { ctx } = this;
    const query = ctx.query;
    const name = query.name;
    let res = await ctx.service.jenkins.job.enable(name);
    this.ctx.body = res;
    if (res.code) {
      this.status = res.statusCode;
    } else {
      this.status = 200;
    }
  }
  async disable() {
    const { ctx } = this;
    const query = ctx.query;
    const name = query.name;
    let res = await ctx.service.jenkins.job.disable(name);
    this.ctx.body = res;
    if (res.code) {
      this.status = res.statusCode;
    } else {
      this.status = 200;
    }
  }
  async create() {
    const { ctx } = this;
    const query = ctx.query;
    const name = query.name;
    let res = await ctx.service.jenkins.job.create(name);
    this.ctx.body = res;
    if (res.code) {
      this.status = res.statusCode;
    } else {
      this.status = 200;
    }
  }
  async delete() {
    const { ctx } = this;
    const query = ctx.query;
    const name = query.name;
    let res = await ctx.service.jenkins.job.delete(name);
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
    let res = await ctx.service.jenkins.job.getConfig(name);
    this.ctx.body = res;
    if (res.code) {
      this.status = res.statusCode;
    } else {
      this.status = 200;
    }
  }
  async updateConfig() {
    // Todo: 待更改
    const { ctx } = this;
    const query = ctx.query;
    const name = query.name;
    let res = await ctx.service.jenkins.job.updateConfig(name);
    this.ctx.body = res;
    if (res.code) {
      this.status = res.statusCode;
    } else {
      this.status = 200;
    }
  }
}

module.exports = JenkinsJobController;