module.exports = app => {
  const { router, controller } = app;
  const jenkinsPath = '/api/jenkins';
  const k8sPath = '/api/k8s';
  router.get('/', controller.home.index);

  router.resources('view', `${jenkinsPath}/views`,controller.jenkins.view);
  router.get(`${jenkinsPath}/viewConfig`, controller.jenkins.view.getConfig);
  router.post(`${jenkinsPath}/viewConfig`, controller.jenkins.view.updateConfig);

  router.resources('job', `${jenkinsPath}/jobs`, controller.jenkins.job);
  router.get(`${jenkinsPath}/jobConfig`, controller.jenkins.job.getConfig);
  router.post(`${jenkinsPath}/jobConfig`, controller.jenkins.job.updateConfig);

  router.post(`${jenkinsPath}/job/enable`, controller.jenkins.job.enable);
  router.post(`${jenkinsPath}/job/disable`, controller.jenkins.job.disable);

  router.get(`${k8sPath}/pods`, controller.k8s.pod.index);
  router.get(`${k8sPath}/pod`, controller.k8s.pod.show);
  router.post(`${k8sPath}/pods`, controller.k8s.pod.create);
  router.delete(`${k8sPath}/pod`, controller.k8s.pod.delete);

  router.get(`${k8sPath}/deployments`, controller.k8s.deployment.index);
  router.get(`${k8sPath}/deployment`, controller.k8s.deployment.show);
  router.post(`${k8sPath}/deployments`, controller.k8s.deployment.create);
  router.delete(`${k8sPath}/deployment`, controller.k8s.deployment.delete);
  router.post(`${k8sPath}/deployment/rollback`, controller.k8s.deployment.rollback);
  router.post(`${k8sPath}/deployment/patch`, controller.k8s.deployment.patch);
};