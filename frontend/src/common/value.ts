export const roundTo = (value: number, decimals: number) => {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
};

export const floorTo = (value: number, decimals: number) => {
  const factor = 10 ** decimals;
  return Math.floor(roundTo(value * factor, 6)) / factor;
};

export const ceilTo = (value: number, decimals: number) => {
  const factor = 10 ** decimals;
  return Math.ceil(roundTo(value * factor, 6)) / factor;
};

export const getDecimalPrecision = (value: number) => {
  if (value === 0) return 0;

  const str = value.toString();
  if (!str.includes('.')) {
    return -Math.floor(Math.log10(Math.abs(value)));
  }

  const [, decimalPart] = str.split('.');
  return decimalPart.length;
};
