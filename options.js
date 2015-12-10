// Saves options to chrome.storage.sync.
function save_options() {
  chrome.storage.sync.set({
    textColor: document.getElementById('text-color').value,
    backgroundColor: document.getElementById('background-color').value
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saaaaved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    backgroundColor: 'black',
    textColor: 'black'
  }, function(items) {
    document.getElementById('background-color').value = items.backgroundColor;
    document.getElementById('text-color').value = items.textColor;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
  save_options);