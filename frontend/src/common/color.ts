export const getProfitPercentColor = (profitPercent: number) => {
  if (profitPercent > 10) {
    return 'green.main';
  }
  if (profitPercent > 5) {
    return 'green.medium';
  }
  if (profitPercent > 0.1) {
    return 'green.light';
  }

  if (profitPercent < -10) {
    return 'red.main';
  }
  if (profitPercent < -5) {
    return 'red.medium';
  }
  if (profitPercent < -0.1) {
    return 'red.light';
  }

  return undefined;
};

export const getRangeRatioColor = (
  currentRatioPercent: number,
  startRatioPercent: number,
) => {
  const green =
    (currentRatioPercent - startRatioPercent) / (100 - startRatioPercent);
  const red = (currentRatioPercent - startRatioPercent) / startRatioPercent;

  if (green > 1) {
    return 'green.main';
  }
  if (green > 0.5) {
    return 'green.medium';
  }
  if (green > 0.05) {
    return 'green.light';
  }

  if (red < -1) {
    return 'red.main';
  }
  if (red < -0.5) {
    return 'red.medium';
  }
  if (red < -0.05) {
    return 'red.light';
  }

  return undefined;
};
