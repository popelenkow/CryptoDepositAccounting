export const getProfitColor = (profit: number) => {
  if (profit > 10) {
    return 'green.main';
  }
  if (profit > 5) {
    return 'green.medium';
  }
  if (profit > 0.1) {
    return 'green.light';
  }
  if (profit < -10) {
    return 'red.main';
  }
  if (profit < -5) {
    return 'red.medium';
  }
  if (profit < -0.1) {
    return 'red.light';
  }
  return undefined;
}