// eslint-disable-next-line @typescript-eslint/no-var-requires
const globalRules = require('../../.eslintrc.js')

module.exports = {
  ...globalRules,

  extends: ['eslint-config-next', ...globalRules.extends],

  rules: {
    ...globalRules.rules,
    'react/sort-comp': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@next/next/no-html-link-for-pages': ['error', 'packages/admin/pages/'],
  },
}
