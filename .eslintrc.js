module.exports = {
  env: {
    browser: false,
    es6: true,
    node: true,
    mocha: true
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    'arrow-body-style': 'off',
    'arrow-parens': ['error', 'always'],
    'class-methods-use-this': 'off',
    'comma-dangle': ['error', 'never'],
    'consistent-return': 'off',
    eqeqeq: 'off',
    'func-names': ['error', 'as-needed'],
    'global-require': 'off',
    'implicit-arrow-linebreak': 'off',
    'new-cap': 'off',
    'no-console': 'off',
    'no-shadow': 'off',
    'no-restricted-syntax': 'off',
    'no-multiple-empty-lines': ['error', {
      max: 1,
      maxBOF: 0,
      maxEOF: 1
    }],
    'no-param-reassign': ['error', {
      props: false
    }],
    'no-prototype-builtins': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-expressions': ['error', {
      allowShortCircuit: true,
      allowTernary: true
    }],
    'no-unused-vars': ['error', {
      vars: 'all',
      args: 'after-used',
      ignoreRestSiblings: true
    }],
    'operator-linebreak': ['error', 'before', {
      overrides: {
        '=': 'after'
      }
    }],
    'padded-blocks': ['error', 'never'],
    semi: ['error', 'never'],
    'import/order': ['error', {
      groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
      'newlines-between': 'always'
    }],
    'import/prefer-default-export': 'off',
    'no-return-await': 0,
    'import/no-mutable-exports': 0
  }
}
