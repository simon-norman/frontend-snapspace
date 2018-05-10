// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint',
    ecmaVersion: 2017
  },
  env: {
    browser: true,
  },
 
  "extends": [
    "airbnb-base",
    "plugin:vue/recommended"
  ],
  // required to lint *.vue files
  "plugins": [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-trailing-spaces': 0, // set it to 1 to get a warning.,
    'linebreak-style': ["error", "windows"],
    "import/no-unresolved": "off"
  }
}
