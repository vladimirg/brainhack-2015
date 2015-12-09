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
  // $("p, li").lettering('lines').children('span').lettering('words').children('span').lettering();
  $("p, li").lettering('lines').children('span').lettering('words').children('span').lettering();
  // add_dash_to_end_of_line();
});



