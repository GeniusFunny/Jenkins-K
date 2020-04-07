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
      if (res.status === 'failed') {
        res.status = res.message;
      } else {
        let names = res.views.map(item => item.name);
        const views = []
        for(const name of names) {
          let viewItem = await this.show(name);
          if (viewItem.status === 200) {
            delete viewItem.status;
            views.push(viewItem);
          }
        }
        res = views
        res.status = 200;
      }
    } catch(e) {
      res = {
        status: e
      }
    }
    return res;
  }
  async show(name) {
    let res
    try {
      res = await this.jenkinsRequest(this.jenkinsView.getInfo(name));
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
  async create(data) {
    let res
    try {
      res = await this.jenkinsRequest(this.jenkinsView.create(data));
      if (res.statusCode === 200) {
        res.message = 201;
      }
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
      res = await this.jenkinsRequest(this.jenkinsView.delete(name));
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
      res = await this.jenkinsRequest(this.jenkinsView.getConfig(name));
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
      res = await this.jenkinsRequest(this.jenkinsView.updateConfig(name, data));
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

module.exports = JenkinsViewService;