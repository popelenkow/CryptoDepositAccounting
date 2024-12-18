import { format } from 'date-fns';

export const toUiDateTime = (date: string) =>
  format(new Date(date), 'dd.MM.yyyy HH:mm');

export const mapSecondsToDays = (seconds: number) => seconds / 60 / 60 / 24;
