"use strict";
const X_OFFSET = 180;
const Y_OFFSET = 210;
const MMG = 24*3600*1000; // msec in un giorno
const RIGHE = 18;
const COLONNE = 37;

let ombrelloni;

$(document).ready(function(){	
	
	let _wrapper = $("#wrapper")
	let _mappa = $("#wrapper").children("div")
	let _btnVisualizzaMappa = $("#wrapper").children("button").eq(0)
	//  tag input sono NIPOTI d wrapper
	let _dataInizio = $("#wrapper").find("input").eq(0)
	let _dataFine = $("#wrapper").find("input").eq(1)
	let _msg = $("#wrapper").children("label").eq(2)
	let dataStart;
	let dataEnd;
	let url = "http://localhost:3000/ombrelloni";
		
	_mappa.hide();
	_btnVisualizzaMappa.prop("disabled",true);
	_dataFine.prop("disabled",true);
	_dataInizio.on("change",function(){
		_dataFine.prop("disabled",false);
		_dataFine.prop("min",$(this).val());
		dataStart= new Date($(this).val());//definisco oggetto data
		_btnVisualizzaMappa.prop("disabled",true);
		_btnVisualizzaMappa.removeClass("buttonEnabled");
		_dataFine.val("");
		_msg.html("");
	})
	_dataFine.on("change",function(){
		_btnVisualizzaMappa.prop("disabled",false);
		_btnVisualizzaMappa.addClass("buttonEnabled");
		dataEnd= new Date($(this).val())
		_msg.html(`Giorni scelti: ${(dataEnd-dataStart)/MMG+1}`)
	});
	_btnVisualizzaMappa.on("click",function(){
		_mappa.show();
		$.ajax({
			"url":"http://localhost:3000/ombrelloni",
			"error":errore,
			"success":function(data){
				console.log(data);
				ombrelloni=data;
				let pos = 0;
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
									});
									if(!isDisponibile(ombrelloni[pos++])){//ombrelloni[$(".ombrellone").index(div)]
										div.addClass("red");
									}
									else{
										div.on("click",ombrelloneClick);
									}
								}
							}
					}		
				}
				creaPulsantePrenota();
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
	function isDisponibile(item){
		let pos1= (dataStart-Date.parse(_dataInizio.prop("min")))/MMG;
		let pos2= (dataEnd-Date.parse(_dataInizio.prop("min")))/MMG;
		for (let i = pos1; i < pos2; i++) {
			if(item.stato[i]!=0){
				return false
			}			
		}
		return true;
	}
	
	function creaPulsantePrenota(){
		//let pos1= (dataStart-Date.parse(_dataInizio.prop("min")))/MMG;
				//let pos2= (dataEnd-Date.parse(_dataInizio.prop("min")))/MMG;
		let _a = $("<a>");
		_a.addClass("button buttonEnabled");
		_a.addClass("prenota");
		_a.html("Prenota");
		_a.appendTo(_mappa);
		_a.on("click",function(){
			let pos1 = (dataStart-new Date(_dataInizio.prop("min")))/MMG;
			let pos2 = (dataEnd-new Date(_dataInizio.prop("min")))/MMG;
			for (const id of prenotazioni) {
				for (let i = pos1; i <= pos2; i++) {
					ombrelloni[id]["stato"][i] = 1;
				}
				let request = inviaRichiesta("Patch", url + "/" + (id+1),ombrelloni[id]);
				request.fail(errore);
				request.done(function(data){
					console.log(data);
				})
				sleep();//per evitare sovraccarico di json-server
			}
			alert("Prenotazione eseguita correttamente");
			window.location.reload(); // refresh della pagina
		})
	}

	function sleep(){
		let now = new Date().getTime();
		while(new Date().getTime()<now+(300));
	}

	let prenotazioni=[];
	function ombrelloneClick() {
		if($(this).hasClass("blue")){
			$(this).removeClass("blue");
			let pos = (prenotazioni.indexOf($(".ombrellone").index($(this))));//indexOf perchè vettore
			console.log(pos);
			prenotazioni.splice(pos,1);

		}
		else{
			$(this).addClass("blue");

			prenotazioni.push($(".ombrellone").index($(this)));
		}
		console.log(prenotazioni);
	}
	console.log(prenotazioni);

	let _login = $("#login")
	let _btn = _login.children("div").eq(2).children("div").eq(1)

	_wrapper.hide();
    _btn.on("click", function(){
		let _user = _login.find("input").eq(0)
		let _pwd = _login.find("input").eq(1)
		

		if(_user.val()=="" || _pwd.val()==""){
			alert ("attenzione campi non compilati")
		}
		else{
			let user = _user.val();
			let pwd=_pwd.val();
			const url = `http://localhost:3000/utenti?nome=${user}`
			let rq = inviaRichiesta("GET", url);
			rq.fail(errore)
			rq.done(function(data){	
				console.log(data);
				if(data.length==0){
					alert("Inserire un utente valido");
					window.location.reload(); // refresh della pagina
				}
				else{
					if(data[0].password!=_pwd.val()){
						alert("Password errata");
						window.location.reload(); // refresh della pagina
					}
					else{
						_wrapper.show();
						alert("Benvenuto!");
						_login.hide();
						$("body").css({"backgroundColor":"#FFF"})
						$("h1").css({
							"text-align": "center",
							"margin": 20,
							"color":"black"
						})
					}
				}
			})	
		}
	})
})



