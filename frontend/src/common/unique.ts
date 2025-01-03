export const unique = <T>(element: T, index: number, array: T[]) =>
  array.indexOf(element) === index;
