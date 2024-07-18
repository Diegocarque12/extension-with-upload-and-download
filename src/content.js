// content.js
console.log('Content script loaded');

function showDialog() {
    console.log('Showing dialog');
    const dialog = document.createElement('div');
    dialog.id = 'download-interrupt-dialog';
    dialog.innerHTML = `
    <div class="dialog-content">
      <h2>¿Desea continuar con la descarga?</h2>
      <button id="cancelButton">Cancelar Descarga</button>
      <button id="continueButton">Continuar Descarga</button>
    </div>
  `;
    document.body.appendChild(dialog);

    document.getElementById('cancelButton').addEventListener('click', function () {
        console.log('Cancel button clicked');
        chrome.runtime.sendMessage({ action: "cancelDownload" }, function (response) {
            if (chrome.runtime.lastError) {
                console.error('Error sending cancelDownload message:', chrome.runtime.lastError);
            } else {
                console.log('cancelDownload message sent, response:', response);
                if (response && response.success) {
                    dialog.remove();
                }
            }
        });
    });

    document.getElementById('continueButton').addEventListener('click', function () {
        console.log('Continue button clicked');
        chrome.runtime.sendMessage({ action: "continueDownload" }, function (response) {
            if (chrome.runtime.lastError) {
                console.error('Error sending continueDownload message:', chrome.runtime.lastError);
            } else {
                console.log('continueDownload message sent, response:', response);
                if (response && response.success) {
                    dialog.remove();
                }
            }
        });
    });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('Message received in content script:', request);
    if (request.action === "showDialog") {
        showDialog();
        sendResponse({ success: true });
    }
    return true;  // Keeps the message channel open for asynchronous responses
});