const Service = require('egg').Service;

class JenkinsBuildService extends Service {
  constructor(ctx) {
    super(ctx);
    const jenkins = this.app.jenkins;
    this.jenkinsBuild = jenkins.jobAPI;
    this.jenkinsRequest = jenkins.request.bind(this.app.jenkins);
  }
  async getInfo(id) {
    let res
    try {
      res = await this.jenkinsRequest(this.jenkinsBuild.getInfo(id));
      res.code = 1;
    } catch(e) {
      res = {
        statusCode: e,
        code: 0
      }
    }
    return res;
  }
  async build() {
    let res
    try {
      res = await this.jenkinsRequest(this.jenkinsBuild.build());
      res.code = 1;
    } catch(e) {
      res = {
        statusCode: e,
        code: 0
      }
    }
    return res;
  }
  async stop(id) {
    let res
    try {
      res = await this.jenkinsRequest(this.jenkinsBuild.stop(id));
      res.code = 1;
    } catch(e) {
      res = {
        statusCode: e,
        code: 0
      }
    }
    return res;
  }
  async delete(id) {
    let res
    try {
      res = await this.jenkinsRequest(this.jenkinsBuild.delete(id));
      res.code = 1;
    } catch(e) {
      res = {
        statusCode: e,
        code: 0
      }
    }
    return res;
  }
  async last() {
    let res
    try {
      res = await this.jenkinsRequest(this.jenkinsBuild.last());
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

module.exports = JenkinsBuildService;