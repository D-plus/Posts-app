module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  plugins: [
    'html',
    'vue',
  ],
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended'
  ],
  rules: {
    'no-console': 0,
    'quotes': [2, "single", { "avoidEscape": true }]
  },
};

