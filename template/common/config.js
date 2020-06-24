const server = 'dev'
const servers = {
  // 前方服务器
  qf: {
  },
  // 测试服务器
  test: {
  },
  // 开发服务器
  dev: {
    mockApi: 'http://192.168.8.171:7300/mock/5ee09e2d2a3baa482028ea9a/platform/api',
    connectionApi: 'http://192.168.8.123/IBP_SYS'
  }
}
window.server = server
window.servers = servers