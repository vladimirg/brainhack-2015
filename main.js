$(document).ready(function() {
  // $(".mw-content-rtl p").lettering('words').children('span').lettering();
  $("p").lettering('words').children('span').lettering();
});

chrome.runtime.sendMessage({action: "addReadableMenuItem"});