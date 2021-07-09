module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'no-inferrable-types': 0,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        'args': 'after-used',
        'argsIgnorePattern': '^_|type',
        'varsIgnorePattern': '^_'
      }
    ],
    'no-empty': ['error', { 'allowEmptyCatch': true }],
    'no-var': 'error',
    'no-console': ['error', { 'allow': ['warn', 'error'] }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'prettier/prettier': 'error',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    'import/no-unresolved': [
      'error',
      {
        'ignore': ['express-serve-static-core']
      }
    ],
    'import/order': [
      'error',
      {
        'groups': [
          'external',
          'builtin',
          'parent',
          'sibling',
          'index',
          'internal',
          'object'
        ],
        'alphabetize': {
          'order': 'asc',
          'caseInsensitive': false
        }
      }
    ]
  },
};
