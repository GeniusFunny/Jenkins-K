module.exports = app => {
  const { router, controller } = app;
  const jenkinsPath = '/api/jenkins';
  const k8sPath = '/api/k8s';
  router.get('/', controller.home.index);
  /*
    Jenkins API：
    1. View
    2. Job
    3. Build
  */
  router.resources('view', `${jenkinsPath}/views`,controller.jenkins.view);
  router.get(`${jenkinsPath}/viewConfig`, controller.jenkins.view.getConfig);
  router.put(`${jenkinsPath}/viewConfig`, controller.jenkins.view.updateConfig);

  router.resources('job', `${jenkinsPath}/jobs`, controller.jenkins.job);
  router.get(`${jenkinsPath}/jobConfig`, controller.jenkins.job.getConfig);
  router.put(`${jenkinsPath}/jobConfig`, controller.jenkins.job.updateConfig);
  router.post(`${jenkinsPath}/job/enable`, controller.jenkins.job.enable);
  router.post(`${jenkinsPath}/job/disable`, controller.jenkins.job.disable);

  router.get(`${jenkinsPath}/build/info`, controller.jenkins.build.getInfo);
  router.get(`${jenkinsPath}/build/last`, controller.jenkins.build.last);
  router.get(`${jenkinsPath}/build/lastSuccessfulBuild`, controller.jenkins.build.lastSuccessfulBuild);
  router.post(`${jenkinsPath}/build/start`, controller.jenkins.build.start);
  router.delete(`${jenkinsPath}/build/delete`, controller.jenkins.build.delete);
  router.post(`${jenkinsPath}/build/stop`, controller.jenkins.build.stop);


  /*
    Kubernetes API：
    1. Deployment
    2. Pod
    3. Namespace
    4. Service
  */
  router.resources('deployment', `${k8sPath}/deployments`, controller.k8s.deployment);
  router.resources('pod', `${k8sPath}/pods`, controller.k8s.pod);
  router.resources('service', `${k8sPath}/services`, controller.k8s.service);
  router.resources('namespace', `${k8sPath}/namespaces`, controller.k8s.namespace);
  
  router.post(`${k8sPath}/rollback`, controller.k8s.deployment.rollback);
  router.post(`${k8sPath}/scale`, controller.k8s.deployment.scale)
};