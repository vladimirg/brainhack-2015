//Creating Elements
var btn = document.createElement("BUTTON")
var t = document.createTextNode("CLICK ME");
btn.appendChild(t);
//Appending to DOM 
document.body.appendChild(btn);

$(document).ready(function() {
  $(".mw-content-rtl p").lettering('words');
  
});