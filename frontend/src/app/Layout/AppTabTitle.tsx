import { useQuery } from '@tanstack/react-query';
import { FC, useEffect } from 'react';
import { getInfoOptions } from '../../api/backend/endpoints';

export const AppTabTitle: FC = () => {
  const info = useQuery(getInfoOptions);

  useEffect(() => {
    const originalTitle = document.title;

    document.title = `${info.data?.btcPrice ?? 0} BTC Tokemetric`;
    return () => {
      document.title = originalTitle;
    };
  }, [info.data?.btcPrice]);

  return null;
};
