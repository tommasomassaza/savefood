const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/boxes',
    createProxyMiddleware({
      target: 'http://127.0.0.1:8085',
      changeOrigin: true,
    })
  );
  
  app.use(
    '/api/shops',
    createProxyMiddleware({
      target: 'http://127.0.0.1:8082',
      changeOrigin: true,
    })
  );
  
};
