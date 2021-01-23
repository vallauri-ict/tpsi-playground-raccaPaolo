"use strict";
$(document).ready(function(){		
			
	//let wrapper = $("#wrapper"); non necessario perchè fatto in automatico da jquery. per ogni id della pagina viene creato un puntatore con nome dell'id 
	let ombrelloni = []
	let utenti = [
		{"id":1, "nome":"pippo", "password":"pippo"}, 
		{"id":2, "nome":"pluto", "password":"pluto"}, 
		{"id":3, "nome":"minnie","password":"minnie"},
		{"id":4, "nome":"sonny", "password":"sonny"}
	 ];
	/*
		[{"id":1, stato:[0,0,0,0, etc]},
		 {"id":2, stato:[0,0,0,0, etc]},
		 {"id":3, stato:[0,0,0,0, etc]}]  */
	
	for (let i=1; i<=666; i++){
		let ombrellone = {"id":i, stato:[]}
		for (let j=1; j<=107; j++)
			ombrellone.stato.push(0)
		ombrelloni.push(ombrellone);
	}
	
	let json = {"utenti":utenti, "ombrelloni":ombrelloni};
	json = JSON.stringify(json, null, 3);//3° parametro indica la formattazione del json, ad ogni voce va a capo e indenta di 3 spazi
	let blob = new Blob([json], {type : 'application/json'});
	$("a").prop("href", URL.createObjectURL(blob));
})
