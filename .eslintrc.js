module.exports = {
  root: true,

  parserOptions: {
    ecmaVersion: '2021',
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },

  env: {
    node: true,
    browser: true,
    'vue/setup-compiler-macros': true
  },

  extends: [
    'plugin:vue/vue3-essential',
    'standard'
  ],

  plugins: [
    'vue'
  ],

  globals: {
    process: 'readonly',
    Capacitor: 'readonly',
    chrome: 'readonly'
  },

  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow paren-less arrow functions
    'arrow-parens': 'off',
    'one-var': 'off',
    'no-void': 'off',
    'multiline-ternary': 'off',

    'import/first': 'off',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    // 'simple-import-sort/imports': 'error',
    // 'simple-import-sort/exports': 'error',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',

    'prefer-promise-reject-errors': 'off',
    'no-unused-vars': 'error',

    'vue/attributes-order': 'error',
    'vue/order-in-components': 'error',
    'vue/max-attributes-per-line': 'error',
    'vue/html-indent': 'error',
    'vue/html-closing-bracket-spacing': 'error',
    'vue/no-multi-spaces': 'error',
    'no-console': [
      'warn',
      { allow: ['clear', 'info', 'error', 'dir', 'trace', 'groupEnd', 'groupCollapsed'] }
    ],

    'vue/multi-word-component-names': 'off',
    'vue/no-v-text-v-html-on-component': 'off',
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        ignores: []
      }
    ],
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'never'
      }
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'never',
          normal: 'always',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    'vue/first-attribute-linebreak': [
      'error',
      {
        singleline: 'beside',
        multiline: 'beside'
      }
    ],
    'space-before-function-paren': 0

  }
}
