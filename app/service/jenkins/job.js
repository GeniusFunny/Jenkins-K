const Service = require('egg').Service;

class JenkinsJobService extends Service {
  constructor(ctx) {
    super(ctx);
    const jenkins = this.app.jenkins;
    this.jenkinsJob = jenkins.jobAPI;
    this.jenkinsRequest = jenkins.request.bind(this.app.jenkins);
  }
  async getInfo(name) {
    let res
    try {
      res = await this.jenkinsRequest(this.jenkinsJob.getInfo(name));
      res.code = 1;
    } catch(e) {
      res = {
        statusCode: e,
        code: 0
      }
    }
    return res;
  }
  async enable(name) {
    let res
    try {
      res = await this.jenkinsRequest(this.jenkinsJob.enable(name));
      res.code = 1;
    } catch(e) {
      res = {
        statusCode: e,
        code: 0
      }
    }
    return res;
  }
  async disable(name) {
    let res
    try {
      res = await this.jenkinsRequest(this.jenkinsJob.disable(name));
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
      res = await this.jenkinsRequest(this.jenkinsJob.crete(name));
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
      res = await this.jenkinsRequest(this.jenkinsJob.delete(name));
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
      res = await this.jenkinsRequest(this.jenkinsJob.getConfig(name));
      res.code = 1;
    } catch(e) {
      res = {
        statusCode: e,
        code: 0
      }
    }
    return res;
  }
  async updateConfig(name, data) {
    let res
    try {
      res = await this.jenkinsRequest(this.jenkinsJob.updateConfig(name, data));
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

module.exports = JenkinsJobService;