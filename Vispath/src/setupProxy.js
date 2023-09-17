const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
        createProxyMiddleware('/api',{
            target: 'http://localhost:5000', // 代理服务器的地址
            changeOrigin: true,
            pathRewrite(path) {
                return path.replace('/api', 'http://localhost:5000');
          }
        })
  );
};
