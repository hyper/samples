module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    'consistent-return': 'off',
    'global-require': 'off',
    'no-console': 'off',
    'func-names': 'off',
  },
};
