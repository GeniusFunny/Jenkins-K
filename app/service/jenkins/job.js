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
      if (res.status === 'failed') {
        res.status = res.message;
      } else {
        let names = res.jobs.map(item => item.name);
        const jobs = []
        for(const name of names) {
          let jobItem = await this.show(name);
          if (jobItem.status === 200) {
            delete jobItem.status;
            jobs.push(jobItem);
          }
        }
        res = jobs
        res.status = 200;
      }
    } catch(e) {
      res = {
        status: e
      }
    }
    return res;
  }
  async show(id) {
    let res
    try {
      res = await this.jenkinsRequest(this.jenkinsJob.getInfo(id));
      if (res.status === 'failed') {
        res.status = res.message;
      } else {
        res.status = 200;
      }
    } catch(e) {
      res = {
        status: e
      }
    }
    return res;
  }
  async enable({job}) {
    let res
    try {
      res = await this.jenkinsRequest(this.jenkinsJob.enable(job));
      if (res.status === 'failed') {
        res.status = res.message;
      } else {
        res.status = 200;
      }
    } catch(e) {
      res = {
        status: e
      }
    }
    return res;
  }
  async disable({ job }) {
    let res
    try {
      res = await this.jenkinsRequest(this.jenkinsJob.disable(job));
      if (res.status === 'failed') {
        res.status = res.message;
      } else {
        res.status = 200;
      }
    } catch(e) {
      res = {
        status: e
      }
    }
    return res;
  }
  // Todo: 待确定参数
  async create({ name }) {
    let res
    try {
      res = await this.jenkinsRequest(this.jenkinsJob.crete(name, {}));
      if (res.status === 'failed') {
        res.status = res.message;
      } else {
        res.status = 200;
      }
    } catch(e) {
      res = {
        status: e
      }
    }
    return res;
  }
  async destroy(name) {
    let res
    try {
      res = await this.jenkinsRequest(this.jenkinsJob.delete(name));
      if (res.status === 'failed') {
        res.status = res.message;
      } else {
        res.status = 200;
      }
    } catch(e) {
      res = {
        status: e
      }
    }
    return res;
  }
  async getConfig(name) {
    let res
    try {
      res = await this.jenkinsRequest(this.jenkinsJob.getConfig(name));
      if (res.status === 'failed') {
        res.status = res.message;
      } else {
        res.status = 200;
      }
    } catch(e) {
      res = {
        status: e
      }
    }
    return res;
  }
  async updateConfig(name, data) {
    let res
    try {
      res = await this.jenkinsRequest(this.jenkinsJob.updateConfig(name, data));
      if (res.status === 'failed') {
        res.status = res.message;
      } else {
        res.status = 200;
      }
    } catch(e) {
      res = {
        status: e
      }
    }
    return res;
  }
}

module.exports = JenkinsJobService;