const { mysql } = require('./config.mysql');
exports.keys = 'jenkinsK';
exports.security = {
  domainWhiteList: ['http://localhost:8000', 'http://localhost:7070'],
  csrf: {
    // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
    enable: false
  },
}
exports.mysql = mysql