const Service = require('egg').Service;

class JenkinsJobService extends Service {
  constructor(ctx) {
    super(ctx);
    const jenkins = this.app.jenkins;
    this.jenkinsJob = jenkins.jobAPI;
    this.jenkinsRequest = jenkins.request.bind(this.app.jenkins);
  }
  async index() {
    let res
    try {
      res = await this.jenkinsRequest(this.app.jenkins.list());
      res = res.jobs;
      res.code = 1;
    } catch(e) {
      res = {
        statusCode: e,
        code: 0
      }
    }
    return res;
  }
  async show(id) {
    let res
    try {
      res = await this.jenkinsRequest(this.jenkinsJob.getInfo(id));
      res.code = 1;
    } catch(e) {
      res = {
        statusCode: e,
        code: 0
      }
    }
    return res;
  }
  async enable({job}) {
    let res
    try {
      res = await this.jenkinsRequest(this.jenkinsJob.enable(job));
      res.code = 1;
    } catch(e) {
      res = {
        statusCode: e,
        code: 0
      }
    }
    return res;
  }
  async disable({job}) {
    let res
    try {
      res = await this.jenkinsRequest(this.jenkinsJob.disable(job));
      res.code = 1;
    } catch(e) {
      res = {
        statusCode: e,
        code: 0
      }
    }
    return res;
  }
  // Todo: 待确定参数
  async create({name}) {
    let res
    try {
      res = await this.jenkinsRequest(this.jenkinsJob.crete(name, {}));
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
  // Todo： 底层模块尚未完成
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