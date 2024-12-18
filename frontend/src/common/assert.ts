export const assertDefined = <T>(
  value: T,
  message: string = 'Value must be defined',
): NonNullable<T> => {
  if (value === undefined || value === null) {
    throw new Error(`${message}. Received: ${JSON.stringify(value)}`);
  }
  return value;
};

export const assertNever = (
  value: never,
  message: string = 'Unexpected value',
): never => {
  throw new Error(`${message}: ${JSON.stringify(value)}`);
};
