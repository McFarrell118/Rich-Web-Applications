document.getElementById('applyChanges').addEventListener('click', function() {
    let chosenColor = document.getElementById('backgroundColor').value;
    let chosenFont = document.getElementById('fontFamily').value;
    let chosenFontSize = document.getElementById('fontSize').value;

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        let currentTab = tabs[0];
        chrome.scripting.executeScript({
            target: {tabId: currentTab.id},
            files: ['content.js']
        }, () => {
            chrome.tabs.sendMessage(currentTab.id, { action: "changeBackgroundColor", color: chosenColor });
            chrome.tabs.sendMessage(currentTab.id, { action: "changeFontFamily", fontFamily: chosenFont });
            chrome.tabs.sendMessage(currentTab.id, { action: "changeFontSize", size: chosenFontSize });
        });
    });
});
