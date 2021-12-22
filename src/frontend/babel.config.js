module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  // plugins: ["require-context-hook"],
  env: {
    test: {
      plugins: ["require-context-hook"],
    },
  },
};
