const Service = require('egg').Service;
const freestyleProject = require('./configTemplate/freeStyleProject.json');


class JenkinsJobService extends Service {
  constructor(ctx) {
    super(ctx);
    const jenkins = this.app.jenkins;
    this.jenkinsJob = jenkins.jobAPI;
    this.jenkinsRequest = jenkins.request.bind(this.app.jenkins);
  }
  static combineConfig(config, patchData) {
    console.log(config, patchData)
    if (patchData.description) {
      config.project.description = patchData.description;
    }
    if (patchData.gitUrl) {
      config.project.scm.userRemoteConfigs['hudson.plugins.git.UserRemoteConfig'].url = patchData.gitUrl;
    }
    if (patchData.gitCredetialsId) {
      config.project.scm.userRemoteConfigs['hudson.plugins.git.UserRemoteConfig'].credetialsId = patchData.gitCredetialsId;
    }
    if (patchData.webhookToken) {
      config.project.triggers['org.jenkinsci.plugins.gwt.GenericTrigger'].token = patchData.webhookToken;
    }
    if (patchData.recipientList) {
      config.project.publishers['hudson.plugins.emailext.ExtendedEmailPublisher'].recipientList = patchData.recipientList;
      config.project.publishers['hudson.plugins.emailext.ExtendedEmailPublisher'].configuredTriggers = {
        ['hudson.plugins.emailext.plugins.trigger.AlwaysTrigger']: {
          email: {
            recipientList: patchData.recipientList
          }
        }
      }
    }
    if (patchData.command) {
      config.project.builders['hudson.tasks.Shell'].command = patchData.command;
    }
    return config;
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
        for (const name of names) {
          let jobItem = await this.show(name);
          if (jobItem.status === 200) {
            delete jobItem.status;
            jobs.push(jobItem);
          }
        }
        res = jobs
        res.status = 200;
      }
    } catch (e) {
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
    } catch (e) {
      res = {
        status: e
      }
    }
    return res;
  }
  async enable({ job }) {
    let res
    try {
      res = await this.jenkinsRequest(this.jenkinsJob.enable(job));
      if (res.status === 'failed') {
        res.status = res.message;
      } else {
        res.status = 200;
      }
    } catch (e) {
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
    } catch (e) {
      res = {
        status: e
      }
    }
    return res;
  }
  async create(req) {
    const name = req.name;
    const description = req.description || '';
    let res
    try {
      res = await this.jenkinsRequest(this.jenkinsJob.create(name, description));
      if (res.status === 'failed') {
        res.status = res.message;
      } else {
        try {
          const config = JenkinsJobService.combineConfig(freestyleProject, req);
          res = await this.jenkinsRequest(this.jenkinsJob.updateConfig(name, config));
          res.status = 201;
        } catch (e) {
          console.log(e)
          await this.destroy(name);
          res.status = res.message;
        }
      }
    } catch (e) {
      console.log(e)
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
    } catch (e) {
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
    } catch (e) {
      res = {
        status: e
      }
    }
    return res;
  }
  async updateConfig(name, req) {
    let res
    try {
      let oldConfig = await this.getConfig(name);
      delete oldConfig.status;
      const config = JenkinsJobService.combineConfig(oldConfig, req);
      res = await this.jenkinsRequest(this.jenkinsJob.updateConfig(name, config));
      if (res.status === 'failed') {
        res.status = res.message;
      } else {
        res.status = 200;
      }
    } catch (e) {
      res = {
        status: e
      }
    }
    return res;
  }
}
module.exports = JenkinsJobService;