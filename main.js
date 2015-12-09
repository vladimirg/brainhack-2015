//Creating Elements
var btn = document.createElement("BUTTON")
var t = document.createTextNode("CLICK ME");
btn.appendChild(t);
//Appending to DOM 
document.body.appendChild(btn);

// should only work when the right configuration flag has been turned on.
function add_dash_to_end_of_line(){
	console.log('blat');
	$("span[class^=word]").each(function(index, element){ 
		$(element).text($(element).text() + "/");
	});
}

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

    $("p, li").lettering('lines').children('span').lettering('words').children('span').lettering();
	// add_dash_to_end_of_line();

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
