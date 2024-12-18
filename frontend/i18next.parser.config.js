export default {
  input: ['src/**/*.{ts,tsx}'],
  locales: ['en', 'ru'],
  output: 'src/translation/$LOCALE.json',
  indentation: 2,
  sort: true,
  createOldCatalogs: false,
};
