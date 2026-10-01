const { createConfig } = require('@openedx/frontend-build');

const config = createConfig('webpack-dev');
const setupMiddlewares = config.devServer && config.devServer.setupMiddlewares;

config.ignoreWarnings = [
  ...(config.ignoreWarnings || []),
  /legacy JS API is deprecated/,
  /Sass @import rules are deprecated/,
  /Deprecation Warning/,
];

config.devServer = {
  ...config.devServer,
  client: {
    ...(config.devServer && config.devServer.client),
    overlay: {
      errors: true,
      warnings: false,
    },
  },
  setupMiddlewares(middlewares, devServer) {
    devServer.app.get('/', (_req, res) => {
      res.redirect(302, '/discussions/');
    });
    return setupMiddlewares ? setupMiddlewares(middlewares, devServer) : middlewares;
  },
};

module.exports = config;
