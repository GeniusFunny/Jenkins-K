const Service = require('egg').Service;

class JenkinsViewService extends Service {
  constructor(ctx) {
    super(ctx);
    const jenkins = this.app.jenkins;
    this.jenkinsView = jenkins.viewAPI;
    this.jenkinsRequest = jenkins.request.bind(this.app.jenkins);
  }
  async index() {
    let res
    try {
      res = await this.jenkinsRequest(this.app.jenkins.list());
      res = res.views;
      res.code = 1;
    } catch(e) {
      res = {
        statusCode: e,
        code: 0
      }
    }
    return res;
  }
  async show(name) {
    let res
    try {
      res = await this.jenkinsRequest(this.jenkinsView.getInfo(name));
      res.code = 1;
    } catch(e) {
      res = {
        statusCode: e,
        code: 0
      }
    }
    return res;
  }
  async create(data) {
    let res
    try {
      res = await this.jenkinsRequest(this.jenkinsView.create(data));
      if (res.statusCode === 200) {
        res.message = 201;
      }
      res.code = 1;
    } catch(e) {
      res = {
        statusCode: e,
        code: 0
      }
    }
    return res;
  }
  async destroy(name) {
    let res
    try {
      res = await this.jenkinsRequest(this.jenkinsView.delete(name));
      res.code = 1;
    } catch(e) {
      res = {
        statusCode: e,
        code: 0
      }
    }
    return res;
  }
  async getConfig(name) {
    let res
    try {
      res = await this.jenkinsRequest(this.jenkinsView.getConfig(name));
      res.code = 1;
    } catch(e) {
      res = {
        statusCode: e,
        code: 0
      }
    }
    return res;
  }
   // Todo： 底层模块尚未完成
  async updateConfig(name, data) {
    let res
    try {
      res = await this.jenkinsRequest(this.jenkinsView.updateConfig(name, data));
      res.code = 1;
    } catch(e) {
      res = {
        statusCode: e,
        code: 0
      }
    }
    return res;
  }
}

module.exports = JenkinsViewService;