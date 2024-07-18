let originalFileInput = null;

function injectUploadDialog() {
    const dialog = document.createElement('div');
    dialog.id = 'custom-file-picker-dialog';
    dialog.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
    z-index: 9999;
  `;
    dialog.innerHTML = `
    <h2>Choose an option:</h2>
    <button id="upload-imanage">Upload to iManage</button>
    <button id="continue-file-picker">Continue with File Picker</button>
  `;
    document.body.appendChild(dialog);

    document.getElementById('upload-imanage').addEventListener('click', handleIManageUpload);
    document.getElementById('continue-file-picker').addEventListener('click', handleContinueFilePicker);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "showDownloadDialog") {
        showDownloadDialog(message.filename, message.downloadId);
    }
});

function showDownloadDialog(filename, downloadId) {
    const dialog = document.createElement('div');
    dialog.innerHTML = `
        <h2>Download: ${filename}</h2>
        <button id="continueDownload">Download</button>
        <button id="cancelDownload">Cancel</button>
    `;
    document.body.appendChild(dialog);

    document.getElementById('continueDownload').addEventListener('click', () => {
        chrome.runtime.sendMessage({ action: "continueDownload", downloadId: downloadId });
        dialog.remove();
    });

    document.getElementById('cancelDownload').addEventListener('click', () => {
        chrome.runtime.sendMessage({ action: "cancelDownload", downloadId: downloadId });
        dialog.remove();
    });
}


function handleIManageUpload() {
    console.log('iManage button clicked');
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
        chrome.runtime.sendMessage({ action: "uploadToIManage" }, function (response) {
            if (chrome.runtime.lastError) {
                console.error("Error:", chrome.runtime.lastError.message);
                alert('Error uploading to iManage: ' + chrome.runtime.lastError.message);
            } else {
                console.log("Response from background:", response);
                alert('Uploading to iManage');
            }
        });
    } else {
        console.warn('chrome.runtime.sendMessage is not available');
        alert('Uploading to iManage (fallback)');
    }
    document.getElementById('custom-file-picker-dialog').remove();
}

function handleContinueFilePicker() {
    console.log('Continue with File Picker button clicked');
    alert('Continuing with File Picker');
    document.getElementById('custom-file-picker-dialog').remove();
    if (originalFileInput) {
        window.removeEventListener('click', handleFileInputClick, true);
        setTimeout(() => {
            originalFileInput.click();
            setTimeout(() => {
                window.addEventListener('click', handleFileInputClick, true);
            }, 100);
        }, 0);
    }
}

function handleFileInputClick(event) {
    if (event.target.type === 'file') {
        event.preventDefault();
        originalFileInput = event.target;
        injectUploadDialog();
    }
}

window.addEventListener('click', handleFileInputClick, true);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "fileUploadDetected") {
        injectUploadDialog();
    } else if (message.action === "downloadStarted") {
        injectDownloadDialog(message.filename);
    }
});
