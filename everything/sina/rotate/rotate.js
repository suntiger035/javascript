// JavaScript Document

//author : suntiger035
//date   : 2012-12-11 

(function(window, undefined){
	
var Util = {
	data : (function() {
		function formatStr( text ) {
			return text.replace(/([A-Z])/g, "-$1").toLowerCase()
		}
		function setAttribute( elem, name, value) {
			elem.setAttribute("data-" + formatStr(name), value);
		}
		function getAttribute( elem, name) {
			var ret = elem.getAttribute("data-" + formatStr(name));
			return ret || undefined
		}
		return function(elem, name, value) {
			if (arguments.length > 2) {
				try {
					elem.dataset[name] = value;
				} catch (e) {
					setAttribute(elem, name, value);
				}
			} else {
				try {
					return elem.dataset[name];
				} catch (e) {
					return getAttribute(elem, name);
				}
			}
		}
	}()),
	get : function( selector ){
		return document.querySelector(selector);
	},
	removeClass : function( elem, className ){
		var regExp = new RegExp("(^|\\s)+(" + className + ")(\\s|$)+", "g");
		elem.className = elem.className.replace(regExp, "$1$3");
		regExp = null;		
	},
	addClass : function( elem, className ){
		this.removeClass( elem, className );
		elem.className += " " + className;	
	}
}

function Rorate(){
	var $card = Util.get(".card");
	if (!$card) {
		return;
	}
	$card.addEventListener("click", function(event){
		if (event.target.tagName && event.target.tagName.toLowerCase() == "a" && event.target.className == "autotel") {
			return;
		}
		var	i = Util.data($card, "side");
		if (!i) {
			i = 1
		}
		if (i == 1) {
			Util.addClass($card, "flip");
		} else {
			Util.removeClass($card, "flip");
		}
		i *= -1;
		Util.data($card, "side", i);	
	});	
}

	window.Rotate = Rorate;

})(window);