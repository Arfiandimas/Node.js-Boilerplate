export default {
  env: {
    node: true,
    es2022: true,
    mocha: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.cjs', '.mjs'],
      },
    },
  },
  rules: {
    // Allow explicit .js extensions (Node ESM requires them)
    'import/extensions': ['error', 'always', { js: 'always', cjs: 'always', mjs: 'always' }],
    // Project prefers named exports in some files; disable strict default-export rule
    'import/prefer-default-export': 'off',
    // Turn off console rule for now (server logs)
    'no-console': 'off',
    // Allow importing default objects that also have named exports (common pattern here)
    'import/no-named-as-default-member': 'off',
    // Allow some legacy patterns in model loader (for..of, continue, __dirname)
    'no-restricted-syntax': 'off',
    'no-underscore-dangle': 'off',
    'no-continue': 'off',
  },
};
