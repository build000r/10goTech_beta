const withImages = require("next-images");

module.exports = withImages({
  fileExtensions: ["jpg", "jpeg", "png", "gif"],

  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
});

webpack = (config, options) => {
  const externals = {
    ...config.externals,
    useQuill: "react-quilljs",
  };
  return {
    ...config,
    module: {
      ...config.module,
      rules: [...config.module.rules, ...rules],
    },
    externals,
  };
};
