const Controller = require('egg').Controller;

class JenkinsBuildController extends Controller {
  async getInfo() {
    const { ctx } = this;
    const query = ctx.query;
    const id = query.id;
    let res = await ctx.service.jenkins.build.getInfo(id);
    this.ctx.body = res;
    if (res.code) {
      this.status = res.statusCode;
    } else {
      this.status = 200;
    }
  }
  async build() {
    const { ctx } = this;
    const query = ctx.query;
    const name = query.name;
    let res = await ctx.service.jenkins.build.build();
    this.ctx.body = res;
    if (res.code) {
      this.status = res.statusCode;
    } else {
      this.status = 200;
    }
  }
  async stop() {
    const { ctx } = this;
    const query = ctx.query;
    const id = query.id;
    let res = await ctx.service.jenkins.job.stop(id);
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
    const id = query.id;
    let res = await ctx.service.jenkins.build.delete(id);
    this.ctx.body = res;
    if (res.code) {
      this.status = res.statusCode;
    } else {
      this.status = 200;
    }
  }
  async last() {
    const { ctx } = this;
    const query = ctx.query;
    const name = query.name;
    let res = await ctx.service.jenkins.build.last();
    this.ctx.body = res;
    if (res.code) {
      this.status = res.statusCode;
    } else {
      this.status = 200;
    }
  }
}
module.exports = JenkinsBuildController;