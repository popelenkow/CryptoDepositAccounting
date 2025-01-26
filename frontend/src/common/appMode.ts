export type AppMode = 'extensionPopup' | 'extensionPage' | 'default';
export const getAppMode = () => {
  const urlParams = new URLSearchParams(window.location.search);
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const mode = urlParams.get('mode') as AppMode | null;
  return mode ?? 'default';
};
