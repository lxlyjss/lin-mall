module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/typescript"],
  rules: {
    "no-console": process.env.VUE_APP_ENV === "prod" ? "error" : "off",
    "no-debugger": process.env.VUE_APP_ENV === "prod" ? "error" : "off"
  },
  parserOptions: {
    parser: "@typescript-eslint/parser"
  }
};
