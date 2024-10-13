import { queryOptions } from '@tanstack/react-query';
import { requestGetInfo } from '../../api/info';

export const getInfoOptions = queryOptions({
  queryKey: ['info'],
  queryFn: requestGetInfo,
  refetchInterval: 1000,
});
