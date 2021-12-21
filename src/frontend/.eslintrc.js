module.exports = {
  root: true,
  env: {
    node: true,
  },
  //extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  extends: ["plugin:vue/essential", "plugin:vue/strongly-recommended", "eslint:recommended"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/prop-name-casing": ["error", "camelCase"],
    //"vue/match-component-file-name": [
    //  "error",
    //  {
    //    extensions: ["vue"],
    //    shouldMatchCase: true,
    //  },
    //],
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: {
          max: 1,
        },
        multiline: {
          max: 1,
        },
      },
    ],
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
