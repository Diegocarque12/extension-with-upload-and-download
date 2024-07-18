// dialog.js
document.getElementById('cancelButton').addEventListener('click', function () {
    alert('Descarga cancelada');
    window.close();
});

document.getElementById('continueButton').addEventListener('click', function () {
    chrome.runtime.sendMessage({ action: "continueDownload" }, function (response) {
        if (response && response.success) {
            window.close();
        }
    });
});