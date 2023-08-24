module.exports = {
  $schema: 'https://json.schemastore.org/eslintrc',
  extends: [
    'next/core-web-vitals',
    'prettier',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:prettier/recommended',
    // rtl-friendly
    // 'plugin:rtl-friendly/recommended',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'tailwindcss', 'prettier'],
  rules: {
    'prettier/prettier': 'warn',
    'react/react-in-jsx-scope': 'off',
    // 'rtl-friendly/no-physical-properties': 'warn',
  },
  settings: {
    tailwindcss: {
      callees: ['cn'],
      config: 'tailwind.config.ts',
    },
    next: {
      rootDir: ['./'],
    },
  },
  ignorePatterns: [
    'node_modules/',
    '.next/',
    'out/',
    'public/',
    'dist/',
    '.cache/',
  ],
};
