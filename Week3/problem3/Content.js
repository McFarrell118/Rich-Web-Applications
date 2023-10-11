chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    switch (message.action) {
        case "changeBackgroundColor":
            document.body.style.backgroundColor = message.color;
            break;
        case "changeFontFamily":
            document.body.style.fontFamily = message.fontFamily;
            break;
        case "changeFontSize":
            switch (message.size) {
                case "small":
                    document.body.style.fontSize = "12px";
                    break;
                case "medium":
                    document.body.style.fontSize = "16px";
                    break;
                case "large":
                    document.body.style.fontSize = "20px";
                    break;
                case "x-large":
                    document.body.style.fontSize = "24px";
                    break;
                default:
                    document.body.style.fontSize = "16px"; // default to medium if something unexpected comes
            }
            break;
        default:
            console.log("Unrecognized action: ", message.action);
    }
    sendResponse({ status: "done" });
});
