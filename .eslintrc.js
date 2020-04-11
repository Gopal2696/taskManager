module.exports = {
    "extends": "plugin:prettier/recommended",
    "rules": {
        "semi":["error", "always"],
        "camelcase":"off",
        "comma-dangle":"off",
        "indent":["error", 2],
        "prefer-const": ["error", {
            "destructuring": "any",
            "ignoreReadBeforeAssign": false
        }]
    },
    "parserOptions": {
        "ecmaVersion": 2017
    },
    "parser": "babel-eslint",
    "env": {
        "es6": true
    }
  };