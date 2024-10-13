import { useEffect, useMemo, useState } from 'react';
import { createBybitApi } from './utils';

export const useActiveTab = (): chrome.tabs.Tab | undefined => {
  const [activeTab, setActiveTab] = useState<chrome.tabs.Tab>();

  useEffect(() => {
    const syncActiveTab = async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      setActiveTab(tab);
    };

    const syncActiveTabOnComplete = async (
      _tabId: number,
      changeInfo: chrome.tabs.TabChangeInfo,
    ) => {
      if (changeInfo.status !== 'complete') {
        return;
      }
      await syncActiveTab();
    };

    syncActiveTab();
    chrome.tabs.onActivated.addListener(syncActiveTab);
    chrome.tabs.onUpdated.addListener(syncActiveTabOnComplete);

    return () => {
      chrome.tabs.onActivated.removeListener(syncActiveTab);
      chrome.tabs.onUpdated.removeListener(syncActiveTabOnComplete);
    };
  }, []);

  return activeTab;
};

export const useBybitApi = () => {
  const activeTab = useActiveTab();
  const tabId = activeTab?.id;
  const bybitApi = useMemo(
    () => (tabId ? createBybitApi(tabId) : undefined),
    [tabId],
  );
  return bybitApi;
};
