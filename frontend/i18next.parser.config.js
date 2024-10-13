export default {
  input: ['src/**/*.{ts,tsx}'],
  locales: ['en', 'ru'],
  defaultNamespace: 'MusetricApp',
  output: 'src/translation/$LOCALE.json',
  indentation: 2,
  sort: true,
  createOldCatalogs: false,
};
