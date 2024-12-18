export const getRatio = (to: number, from: number, baseline: number = 0) => {
  return (to - baseline) / (from - baseline);
};

export const getRatioPercent = (
  to: number,
  from: number,
  baseline: number = 0,
) => {
  const ratio = getRatio(to, from, baseline);
  return ratio * 100;
};

export const getExcessRatioPercent = (
  to: number,
  from: number,
  baseline: number = 0,
) => {
  const ratio = getRatio(to, from, baseline);
  return (ratio - 1) * 100;
};
