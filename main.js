// should only work when the right configuration flag has been turned on.
function add_dash_to_end_of_line(){
	console.log('blat');
	$("span[class^=word]").each(function(index, element){ 
		$(element).text($(element).text() + "/");
	});
}

$(document).ready(function() {

  chrome.storage.sync.get(null, function(items) {
    loadCSS = function(href) { // this call is inside a storage.sync get in case we need to switch csss
      var cssLink = $("<link rel='stylesheet' type='text/css' href='"+href+"'>");
      $("head").append(cssLink);
    };

    /**
     * function to load a given js file
     */

    // load the css file
    loadCSS(chrome.extension.getURL("style.css"));
    // Find the CSS we just loaded
    var stylesheet = undefined;
    for( var i in document.styleSheets ){
      if( document.styleSheets[i].href && document.styleSheets[i].href.indexOf("chrome-extension") ) {
        stylesheet = document.styleSheets[i];
        break;
      }
    }

    // change css according to settings;
    // you are getting the setting via items.settingName - insert rules accordingly
    chrome.storage.sync.get(null, function(items) {
          var settings_enumerator = 0
          if (items.shouldChangeTextColor){
            stylesheet.insertRule(`span[class^=char]:last-child{color: ${items.textColor}}`, settings_enumerator);
            settings_enumerator++;
          }
          if (items.shouldChangeBackgroundColor){
            stylesheet.insertRule(`span[class^=char] { background-color: ${items.backgroundColor}; }`, settings_enumerator); 
            settings_enumerator++;
          }
          if (items.shouldHighlightOnHover){
            if (items.shouldVertical){
              stylesheet.insertRule(`span[class^=word] { opacity: 0.4;}`, settings_enumerator); 
              settings_enumerator++;
              stylesheet.insertRule(`span[class^=word]:hover { opacity: 1;}`, settings_enumerator); 
              settings_enumerator++;
            }else{
              stylesheet.insertRule(`span[class^=line] { opacity: 0.4;}`, settings_enumerator); 
              settings_enumerator++;
              stylesheet.insertRule(`span[class^=line]:hover { opacity: 1;}`, settings_enumerator); 
              settings_enumerator++;
            }
          }
          if (items.shouldVertical){
            stylesheet.insertRule(`span[class^=word] { margin-top: 3px; margin-bottom: 3px; display: block;}`, settings_enumerator); 
            settings_enumerator++;
          }
          if (items.shouldPaintLastLetter){
              stylesheet.insertRule(`span[class^=char]:last-child { color: red;}`, settings_enumerator); 
              settings_enumerator++;
          }
          if (items.shouldAnimateLastLetter){
              stylesheet.insertRule(`span[class^=char]:last-child { animation: myfirst 2s infinite; -moz-animation:myfirst 2s infinite; -webkit-animation: myfirst 2s infinite;}`, settings_enumerator); 
              settings_enumerator++;
          }
          if (items.shouldPaintFirstLetter){
              stylesheet.insertRule(`span[class^=char]:first-child { color: red;}`, settings_enumerator); 
              settings_enumerator++;
          }
          if (items.shouldAnimateFirstLetter){
              stylesheet.insertRule(`span[class^=char]:first-child { animation: myfirst 2s infinite; -moz-animation:myfirst 2s infinite; -webkit-animation: myfirst 2s infinite;}`, settings_enumerator); 
              settings_enumerator++;
          }
          if (items.shouldLetterSpacing){
              stylesheet.insertRule(`span[class^=word] { letter-spacing: ${items.letterSpacing}px; }`, settings_enumerator); 
              settings_enumerator++;
          }

          if (items.disableRunningOnAllPage){
            makeElementReadable($("p, li"));
            // add_dash_to_end_of_line();
          }

        });;
    });
});

chrome.runtime.sendMessage({action: "addReadableMenuItem"});