const jenkins = require('../../config/config.jenkins');
const k8s = require('../../config/config.kubernetes');

module.exports = {
  get jenkins() {
    return jenkins;
  },
  get k8s() {
    return k8s;
  }
};