import { assertDefined } from '../../common/assert';
import { BybitApi, BybitApiArg, BybitApiMessage } from '.';

export const createBybitRequest = <Key extends keyof BybitApi>(
  rawTabId: number | undefined,
  key: Key,
): BybitApi[Key] => {
  const method = async (arg: BybitApiArg<Key>) => {
    const tabId = assertDefined(rawTabId);

    const message: BybitApiMessage<Key> = { key, arg };
    type Message = BybitApiMessage<Key>;
    type Result = ReturnType<BybitApi[Key]>;
    const response = await chrome.tabs.sendMessage<Message, Result>(
      tabId,
      message,
    );
    if (chrome.runtime.lastError) {
      throw new Error(chrome.runtime.lastError.message);
    }
    return response;
  };
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return method as unknown as BybitApi[Key];
};
