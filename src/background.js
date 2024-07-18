let currentDownloadId = null;

chrome.downloads.onCreated.addListener(function (downloadItem) {
    chrome.downloads.pause(downloadItem.id);
    currentDownloadId = downloadItem.id;

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs[0]) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: showDialog
            }, (injectionResults) => {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                    // Fallback to popup if injection fails
                    chrome.windows.create({
                        url: 'dialog.html',
                        type: 'popup',
                        width: 400,
                        height: 200
                    });
                }
            });
        }
    });
});

function showDialog() {
    const dialog = document.createElement('div');
    dialog.id = 'download-interrupt-dialog';
    dialog.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999999;
  `;

    const content = document.createElement('div');
    content.style.cssText = `
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
  `;

    content.innerHTML = `
    <h2>¿Desea continuar con la descarga?</h2>
    <button id="continueButton">Continuar</button>
    <button id="cancelButton">Cancelar</button>
  `;

    dialog.appendChild(content);
    document.body.appendChild(dialog);

    document.getElementById('continueButton').addEventListener('click', function () {
        chrome.runtime.sendMessage({ action: 'continueDownload' });
        dialog.remove();
    });

    document.getElementById('cancelButton').addEventListener('click', function () {
        chrome.runtime.sendMessage({ action: 'cancelDownload' });
        dialog.remove();
    });
}

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
});