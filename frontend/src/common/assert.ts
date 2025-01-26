export const assertDefined = <T>(value: T, message: string): NonNullable<T> => {
  if (value === undefined || value === null) {
    throw new Error(message);
  }
  return value;
};

export const warnDefined = <T>(
  value: T,
  defaultValue: NonNullable<T>,
  message: string,
): NonNullable<T> => {
  if (value === undefined || value === null) {
    console.warn(message);
    return defaultValue;
  }
  return value;
};

export const assertNever = (
  value: never,
  message: string = 'Unexpected value',
): never => {
  throw new Error(`${message}: ${JSON.stringify(value)}`);
};
