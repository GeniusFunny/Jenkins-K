const Service = require('egg').Service;

class JenkinsBuildService extends Service {
  constructor(ctx) {
    super(ctx);
    const jenkins = this.app.jenkins;
    this.jenkinsBuild = jenkins.buildAPI;
    this.jenkinsRequest = jenkins.request.bind(this.app.jenkins);
  }
  async getInfo(query) {
    let res
    try {
      const { view, job, id } = query;
      res = await this.jenkinsRequest(this.jenkinsBuild.getInfo(view, job, id));
      if (res.status === 'failed') {
        res.status = res.message;
      } else {
        res.status = 200;
      }
    } catch (e) {
      res = {
        statusCode: e,
      }
    }
    return res;
  }
  async start(req) {
    let res
    try {
      const { view, job } = req;
      res = await this.jenkinsRequest(this.jenkinsBuild.build(view, job));
      if (res.status === 'failed') {
        res.status = res.message;
      } else {
        res.status = 200;
      }
    } catch (e) {
      res = {
        statusCode: e,
      }
    }
    return res;
  }
  async stop(req) {
    let res
    try {
      const { view, job, id } = req;
      res = await this.jenkinsRequest(this.jenkinsBuild.stop(view, job, id));
      if (res.status === 'failed') {
        res.status = res.message;
      } else {
        res.status = 200;
      }
    } catch (e) {
      res = {
        status: e,
      }
    }
    return res;
  }
  async delete(req) {
    let res
    try {
      const { view, job, id } = req;
      res = await this.jenkinsRequest(this.jenkinsBuild.delete(view, job, id));
      if (res.status === 'failed') {
        res.status = res.message;
      } else {
        res.status = 200;
      }
    } catch (e) {
      res = {
        status: e,
      }
    }
    return res;
  }
  async last(query) {
    let res
    try {
      const { view, job } = query;
      res = await this.jenkinsRequest(this.jenkinsBuild.last(view, job));
      if (res.status === 'failed') {
        res.status = res.message;
      } else {
        res.status = 200;
      }
    } catch (e) {
      res = {
        status: e,
      }
    }
    return res;
  }
  async lastSuccessfulBuild(query) {
    let res
    try {
      const { view, job } = query;
      res = await this.jenkinsRequest(this.jenkinsBuild.lastSuccessfulBuild(view, job));
      if (res.status === 'failed') {
        res.status = res.message;
      } else {
        res.status = 200;
      }
    } catch (e) {
      res = {
        status: e,
      }
    }
    return res;
  }
  /* 
    Todo: 监听构建成功的事件
    构建成功 ---> 通知前端 ---> 部署测试环境 ---> 测试环境验证通过 ---> 部署生产环境
    构建失败 ---> 通知前端
  */
  async watchBuild() {
    
  }
}

module.exports = JenkinsBuildService;