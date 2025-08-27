/** @type {import("prettier").Config} */
export default {
  printWidth: 120,
  semi: false,
  singleQuote: true,

  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss', // remove if not using Tailwind
  ],

  // Import sorting (tweak for your aliases)
  importOrder: [
    '^react$',
    '^react',
    '<THIRD_PARTY_MODULES>',
    '^@/(.*)$', // e.g. alias to src/*
    '^[./]', // relative imports
  ],
};
