document.getElementById('uploadToiManage').addEventListener('click', function () {
    chrome.runtime.sendMessage({ action: 'uploadToiManage' }, function (response) {
        window.close();
    });
});

document.getElementById('continueFilePicker').addEventListener('click', function () {
    chrome.runtime.sendMessage({ action: 'continueFilePicker' }, function (response) {
        window.close();
    });
});