//Creating Elements
var btn = document.createElement("BUTTON")
var t = document.createTextNode("CLICK ME");
btn.appendChild(t);
//Appending to DOM 
document.body.appendChild(btn);

$(document).ready(function() {

  chrome.storage.sync.get(null, function(items) {
    loadCSS = function(href) {
      var cssLink = $("<link rel='stylesheet' type='text/css' href='"+href+"'>");
      $("head").append(cssLink);
    };

    /**
     * function to load a given js file
     */

      // load the css file

    $("p").lettering('words').children('span').lettering();

    loadCSS(chrome.extension.getURL("style.css"));

    // Find the CSS we just loaded
    var stylesheet = undefined;
    for( var i in document.styleSheets ){
      if( document.styleSheets[i].href && document.styleSheets[i].href.indexOf("chrome-extension") ) {
        stylesheet = document.styleSheets[i];
        break;
      }
    }


    stylesheet.insertRule(`span[class^=char]:last-child{color: ${items.textColor}}`, 0);
    stylesheet.insertRule(`span[class^=char] { background-color: ${items.backgroundColor}; }`, 1);
    //stylesheet.insertRule('span[class^=char]:last-child{color: green}', 0);
    //items.favoriteColor;
  });

});