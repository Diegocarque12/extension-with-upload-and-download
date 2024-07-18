let currentDownloadId = null;

chrome.downloads.onCreated.addListener(function (downloadItem) {
    chrome.downloads.pause(downloadItem.id);
    currentDownloadId = downloadItem.id;

    chrome.windows.create({
        url: 'dialog.html',
        type: 'popup',
        width: 300,
        height: 200
    });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (currentDownloadId !== null) {
        if (request.action === 'continueDownload') {
            chrome.downloads.resume(currentDownloadId);
            console.log('Descarga continuada:', currentDownloadId);
        } else if (request.action === 'cancelDownload') {
            chrome.downloads.cancel(currentDownloadId);
            console.log('Descarga cancelada:', currentDownloadId);
        }
        currentDownloadId = null;
    }
    sendResponse({ success: true });
});