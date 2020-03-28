const Service = require('egg').Service;

class JenkinsViewService extends Service {
  constructor(ctx) {
    super(ctx);
    const jenkins = this.app.jenkins;
    this.jenkinsView = jenkins.viewAPI;
    this.jenkinsRequest = jenkins.request.bind(this.app.jenkins);
  }
  async show(id) {
    let res
    try {
      res = await this.jenkinsRequest(this.jenkinsView.getInfo(id));
      res.code = 1;
    } catch(e) {
      res = {
        statusCode: e,
        code: 0
      }
    }
    return res;
  }
  async create(name) {
    let res
    try {
      res = await this.jenkinsRequest(this.jenkinsView.crete(name));
      res.code = 1;
    } catch(e) {
      res = {
        statusCode: e,
        code: 0
      }
    }
    return res;
  }
  async delete(name) {
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
  async update(name, data) {
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
  async ['new']() {}
}

module.exports = JenkinsViewService;