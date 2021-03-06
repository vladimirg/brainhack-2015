// should only work when the right configuration flag has been turned on.
function add_dash_to_end_of_line() {
  console.log('blat');
  $("span[class^=word]").each(function(index, element) {
    $(element).text($(element).text() + "/");
  });
}

$(document).ready(function() {

  chrome.storage.sync.get(null, function(items) {
    loadCSS = function(href) { // this call is inside a storage.sync get in case we need to switch csss
      var cssLink = $("<link rel='stylesheet' type='text/css' href='" + href + "'>");
      $("head").append(cssLink);
    };

    /**
     * function to load a given js file
     */

      // load the css file
    loadCSS(chrome.extension.getURL("style.css"));
    // Find the CSS we just loaded
    var stylesheet = undefined;
    for (var i in document.styleSheets) {
      if (document.styleSheets[i].href && document.styleSheets[i].href.indexOf("chrome-extension")) {
        stylesheet = document.styleSheets[i];
        break;
      }
    }

    // change css according to settings;
    // you are getting the setting via items.settingName - insert rules accordingly
    var settings_enumerator = 0;
    if (items.shouldChangeTextColor) {
      stylesheet.insertRule(`span[class^=char]:last-child{color: ${items.textColor}}`, settings_enumerator);
      settings_enumerator++;
    }
    if (items.shouldHighlightOnHover != "nothing") {
      if (items.shouldVertical) {
        stylesheet.insertRule(`span[class^=word] { opacity: 0.2;}`, settings_enumerator);
        settings_enumerator++;
        stylesheet.insertRule(`span[class^=word]:hover { opacity: 1;}`, settings_enumerator);
        stylesheet.insertRule(`span[class^=word]:hover { font-weight: bold;}`, settings_enumerator);
        settings_enumerator++;
      } else {
        stylesheet.insertRule(`span[class^=${items.shouldHighlightOnHover}] { opacity: 0.2;}`, settings_enumerator);
        settings_enumerator++;
        stylesheet.insertRule(`span[class^=${items.shouldHighlightOnHover}]:hover { opacity: 1;}`, settings_enumerator);
        stylesheet.insertRule(`span[class^=${items.shouldHighlightOnHover}]:hover { font-weight: bold;}`, settings_enumerator);
        settings_enumerator++;
      }
    }
    if (items.shouldVertical) {
      stylesheet.insertRule(`span[class^=word] { margin-top: 3px; margin-bottom: 3px; display: block;}`, settings_enumerator);
      settings_enumerator++;
    }
    if (items.shouldPaintLastLetter) {
      stylesheet.insertRule(`span[class^=char]:last-child { color: red;}`, settings_enumerator);
      settings_enumerator++;
    }
    if (items.shouldAnimateLastLetter) {
      stylesheet.insertRule(`span[class^=char]:last-child { animation: myfirst 2s infinite; -moz-animation:myfirst 2s infinite; -webkit-animation: myfirst 2s infinite;}`, settings_enumerator);
      settings_enumerator++;
    }
    if (items.shouldPaintFirstLetter) {
      stylesheet.insertRule(`span[class^=char]:first-child { color: red;}`, settings_enumerator);
      settings_enumerator++;
    }
    if (items.shouldAnimateFirstLetter) {
      stylesheet.insertRule(`span[class^=char]:first-child { animation: myfirst 2s infinite; -moz-animation:myfirst 2s infinite; -webkit-animation: myfirst 2s infinite;}`, settings_enumerator);
      settings_enumerator++;
    }
    if (items.shouldLetterSpacing) {
      stylesheet.insertRule(`span[class^=word] { letter-spacing: ${items.letterSpacing}px; }`, settings_enumerator);
      settings_enumerator++;
    }



    if (!items.disableRunningOnAllPage) {
      makeElementReadable($("p, li"));
      // add_dash_to_end_of_line();
    }

    if (items.shouldChangeBackgroundColor) {
      element = $("span[class^=char]");
      while (element.length != 0) {
        element.css("background-color", items.backgroundColor)
        element = element.parent();
      }
    }

      select = function(element) {
        $("span.selected").removeClass("selected");
        $(element).addClass("selected").focus();
      };
      next_word = function(element) {
        var $words = $("span[class^=word]");
        return $words.eq($words.index(element) + 1);
      };
      prev_word = function(element) {
        var $words = $("span[class^=word]");
        return $words.eq($words.index(element) - 1);
      };
      $("span[class^=word]").click(function() {
        select(this);
      });
      var interval = null;
      $("body").keydown(function(e) {
        if (e.keyCode == 79) {
          select(prev_word($("span.selected")));
        } else if (e.keyCode == 80) {
          select(next_word($("span.selected")));
        } else if (e.keyCode == 77) {
          if (interval) {
            window.clearInterval(interval);
            interval = null;
          } else {
            interval = setInterval(function() {
              select(next_word($("span.selected")))
            }, 500);
          }
        }
      });

    });
});

chrome.runtime.sendMessage({action: "addReadableMenuItem"});