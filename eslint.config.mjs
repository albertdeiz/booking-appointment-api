import config from "eslint-config-standard";

export default [
  ...[].concat(config),
  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
];
