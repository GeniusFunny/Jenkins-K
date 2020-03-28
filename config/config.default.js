exports.keys = 'jenkinsK';
exports.security = {
  csrf: {
    // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
    enable: false
  },
}