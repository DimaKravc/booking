module.exports = {
    root: true,
    parserOptions: {
        sourceType: 'module',
        parser: 'babel-eslint',
    },
    extends: [
        // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
        'standard',
        // https://github.com/vuejs/eslint-plugin-vue
        'plugin:vue/essential',
    ],
    // add your custom rules here
    'rules': {
        // allow paren-less arrow functions
        'arrow-parens': 'off',
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // enforce consistent indentation
        'indent': ['error', 4]
    },
    'overrides': [
        {
            'files': ['*.vue'],
            'rules': {
                'indent': 'off',
                'vue/script-indent': ['error', 4, {'baseIndent': 1}],
            },
        },
    ],
};
