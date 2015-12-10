var installedMenuItem = false;

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action == 'addReadableMenuItem' && !installedMenuItem) {
            installedMenuItem = true;
            var contextItemProperties = {};
            contextItemProperties.title = 'Readable';
            contextItemProperties.contexts = ["selection"];
            contextItemProperties.onclick = makeReadable;
            var handle = chrome.contextMenus.create(contextItemProperties);
        }
    }
);

function makeReadable(info) {
    chrome.tabs.executeScript(null, {file:"makeSelectionReadable.js"});
}
