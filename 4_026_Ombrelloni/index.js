"use strict";
const X_OFFSET = 180;
const Y_OFFSET = 210;
const MMG = 24*3600*1000; // msec in un giorno
const RIGHE = 18;
const COLONNE = 37;

$(document).ready(function(){	
	
	let _wrapper = $("#wrapper")
	let _mappa = $("#wrapper").children("div")
	let _btnVisualizzaMappa = $("#wrapper").children("button").eq(0)
	//  tag input sono NIPOTI d wrapper
	let _dataInizio = $("#wrapper").find("input").eq(0)
	let _dataFine = $("#wrapper").find("input").eq(1)
	let _msg = $("#wrapper").children("label").eq(2)
		
	_mappa.hide();
	_btnVisualizzaMappa.prop("disabled",true);
	_dataFine.prop("disabled",true);
	_dataInizio.on("change",function(){
		_dataFine.prop("disabled",false);
		_dataFine.prop("min",$(this).val());
	})
	_dataFine.on("change",function(){
		_btnVisualizzaMappa.prop("disabled",false);
		_btnVisualizzaMappa.addClass("buttonEnabled");
	});
	_btnVisualizzaMappa.on("click",function(){
		_mappa.show();
		$.ajax({
			"url":"http://localhost:3000/ombrelloni",
			"error":errore,
			"success":function(data){
				console.log(data);
				for (let i = 0; i < RIGHE+1; i++) {
					if(i!=9){
						for (let j = 0; j < COLONNE+1; j++) {
								if(j!=22){
									let div = $("<div>");
									div.appendTo(_mappa);
									div.addClass("ombrellone")
									div.css({
										"top":Y_OFFSET+(i*16),
										"left":X_OFFSET+(j*(16)+(-2*i))
									})
								}
							}
					}		
				}
			}
		})
	});
	function errore (jqXHR, textStatus, str_error){
		if(jqXHR.status==0)
			alert("connection refused or server timeout");
			else if (jqXHR.status == 200)
			alert("Errore Formattazione dati\n" + jqXHR.responseText);
			else
			alert("Server Error: "+jqXHR.status+ " - " +jqXHR.responseText);
		}
})

