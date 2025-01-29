import { TFunction } from 'i18next';

type TextFn = (t: TFunction) => string;
export type ItemText = TextFn | string;
export type Item<T extends string = string> = {
  key: T;
  text: TextFn | string;
};

export const renderItemText = (text: ItemText | undefined, t: TFunction) =>
  typeof text === 'function' ? text(t) : text;
