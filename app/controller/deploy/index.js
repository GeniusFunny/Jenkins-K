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
}


module.exports = DeployController;