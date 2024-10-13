export const availableDualDurations = [
  8,
  ...[1, 2, 3, 5, 9, 44, 45, 46, 47, 48, 49, 50, 51].map((x) => x * 24),
];

export const displayDuration = (duration: number) => {
  if (duration === 8) return '8 H';
  return duration / 24 + ' D';
};
