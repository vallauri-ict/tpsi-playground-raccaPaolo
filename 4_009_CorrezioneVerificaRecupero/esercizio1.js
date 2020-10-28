"use strict";

window.onload=function () {
	let btn = document.getElementsByTagName("input")[0];
	btn.addEventListener("click", function(){
		localStorage.setItem("orologi.json", JSON.stringify(swatches)); 		
	});
}