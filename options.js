// Saves options to chrome.storage.sync.
function save_options() {
  chrome.storage.sync.set({
    shouldChangeTextColor: document.getElementById('should-change-text-color').checked,
    textColor: document.getElementById('text-color').value,
    shouldChangeBackgroundColor: document.getElementById('should-change-background-color').checked,
    backgroundColor: document.getElementById('background-color').value,
    shouldVertical: document.getElementById('should-vertical').checked,
    shouldHighlightOnHover: document.getElementById('should-highlight-on-hover').checked,
    shouldPaintLastLetter: document.getElementById('should-paint-last-letter').checked,
    shouldAnimateLastLetter: document.getElementById('should-animate-last-letter').checked,
    shouldPaintFirstLetter: document.getElementById('should-paint-first-letter').checked,
    shouldAnimateFirstLetter: document.getElementById('should-animate-first-letter').checked,
    shouldLetterSpacing: document.getElementById('should-letter-spacing').checked,
    letterSpacing: document.getElementById('letter-spacing').value, 
    disableRunningOnAllPage: document.getElementById('disable-running-on-all-page').checked,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved :D';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    shouldChangeTextColor: false,
    textColor: 'black',
    shouldChangeBackgroundColor: false,
    backgroundColor: 'black',
    shouldVertical: false,
    shouldHighlightOnHover: false,
    shouldPaintLastLetter: false,
    shouldAnimateLastLetter: false,
    shouldPaintFirstLetter: false,
    shouldAnimateFirstLetter: false,
    shouldLetterSpacing: false,
    letterSpacing: '2',
    disableRunningOnAllPage: false
  }, function(items) {
    document.getElementById('should-change-text-color').checked = items.shouldChangeTextColor;
    document.getElementById('text-color').value = items.textColor;
    document.getElementById('should-change-background-color').checked = items.shouldChangeBackgroundColor;
    document.getElementById('background-color').value = items.backgroundColor;
    document.getElementById('should-vertical').checked = items.shouldVertical;
    document.getElementById('should-highlight-on-hover').checked = items.shouldHighlightOnHover;
    document.getElementById('should-paint-last-letter').checked = items.shouldPaintLastLetter;
    document.getElementById('should-animate-last-letter').checked = items.shouldAnimateLastLetter;
    document.getElementById('should-paint-first-letter').checked = items.shouldPaintFirstLetter;
    document.getElementById('should-animate-first-letter').checked = items.shouldAnimateFirstLetter;
    document.getElementById('should-letter-spacing').checked = items.shouldLetterSpacing;
    document.getElementById('letter-spacing').value = items.letterSpacing;
    document.getElementById('disable-running-on-all-page').checked = disableRunningOnAllPage;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);

document.getElementById('save').addEventListener('click',
  save_options);