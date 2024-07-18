// background.js
let currentDownloadId = null;
let shouldCancelDownload = true;

chrome.downloads.onCreated.addListener(function (downloadItem) {
    chrome.downloads.pause(downloadItem.id);
    currentDownloadId = downloadItem.id;
    shouldCancelDownload = true;

    chrome.tabs.create({
        url: 'dialog.html',
        active: true
    }, function (tab) {
        chrome.tabs.onRemoved.addListener(function listener(tabId) {
            if (tabId === tab.id) {
                if (shouldCancelDownload && currentDownloadId !== null) {
                    chrome.downloads.cancel(currentDownloadId);
                } else if (currentDownloadId !== null) {
                    chrome.downloads.resume(currentDownloadId);
                }
                currentDownloadId = null;
                shouldCancelDownload = true;
                chrome.tabs.onRemoved.removeListener(listener);
            }
        });
    });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "continueDownload") {
        shouldCancelDownload = false;
        sendResponse({ success: true });
    }
});