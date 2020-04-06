const Client = require('kubernetes-client').Client;
const config = require('kubernetes-client').config;

const k8sClient = new Client({ config: config.fromKubeconfig(), version: '1.9' });

module.exports = k8sClient;