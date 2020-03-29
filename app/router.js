module.exports = app => {
  const { router, controller } = app;
  const jenkinsPath = '/api/jenkins'
  router.get('/', controller.home.index);

  router.resources('view', `${jenkinsPath}/views`,controller.jenkins.view);
  router.get(`${jenkinsPath}/viewConfig`, controller.jenkins.view.getConfig);
  router.post(`${jenkinsPath}/viewConfig`, controller.jenkins.view.updateConfig);

  router.resources('job', `${jenkinsPath}/jobs`, controller.jenkins.job);
  router.get(`${jenkinsPath}/jobConfig`, controller.jenkins.job.getConfig);
  router.post(`${jenkinsPath}/jobConfig`, controller.jenkins.job.updateConfig);

  router.post(`${jenkinsPath}/job/enable`, controller.jenkins.job.enable);
  router.post(`${jenkinsPath}/job/disable`, controller.jenkins.job.disable);

};