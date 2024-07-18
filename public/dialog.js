document.getElementById('continueButton').addEventListener('click', function () {
    chrome.runtime.sendMessage({ action: 'continueDownload' }, function (response) {
        window.close();
    });
});

document.getElementById('cancelButton').addEventListener('click', function () {
    chrome.runtime.sendMessage({ action: 'cancelDownload' }, function (response) {
        window.close();
    });
});