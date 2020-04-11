module.exports = {
    extends: "plugin:prettier/recommended",
    rules: {
        trailingComma: "all",
        bracketSpacing: true,
        useTabs: true,
        tabWidth: 4,
        semi: true,
        singleQuote: true,
        arrowParens: "always",
    },
    parserOptions: {
        ecmaVersion: 2017,
    },
    parser: "babel-eslint",
    env: {
        es6: true,
    },
};
