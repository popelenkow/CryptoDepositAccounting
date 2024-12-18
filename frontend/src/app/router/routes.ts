export const routePatterns = {
  home: '/',
  transactionNew: '/transaction/new',
  transactionEdit: '/transaction/edit/:transactionId',
  grids: '/grids',
  account: '/account',
} as const;

export const routeLinks = {
  ...routePatterns,
  transactionEdit: (transactionId: number) =>
    `/transaction/edit/${transactionId}`,
};

export const matchPathPatterns = (pathName: string, patterns: string[]) => {
  const toRegex = (pattern: string) => {
    const regex = pattern.replace(/:[^\s/]+/g, '([\\w-]+)');
    return new RegExp(`^${regex}$`);
  };

  const isMatch = patterns.some((pattern) => {
    const regex = toRegex(pattern);
    return regex.test(pathName);
  });

  return isMatch;
};
