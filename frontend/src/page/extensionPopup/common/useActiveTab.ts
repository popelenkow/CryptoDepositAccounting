import { useEffect, useState } from 'react';

export const useActiveTabId = (): number | undefined => {
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

  return activeTab?.id;
};
