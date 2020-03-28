module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // router.resources('views', '/api/jenkins/views', controller.jenkins.views);
  // router.resources('jobs', 'api/jenkins/jobs/', controller.jenkins.view);
  // router.resources('builds', 'api/jenkins/builds/');

  router.resources('view', '/api/jenkins/view',controller.jenkins.view);
  // router.resources('job', 'api/jenkins/jobs/', controller.jenkins.job);
};