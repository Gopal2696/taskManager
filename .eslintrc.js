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
    }
  };