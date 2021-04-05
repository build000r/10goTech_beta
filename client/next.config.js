const withImages = require("next-images");

module.exports = withImages({
  fileExtensions: ["jpg", "jpeg", "png", "gif"],
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
});
