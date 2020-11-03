"use strict"

$(document).ready(function()
{	
	let _calciatore = $("#calciatore");
	let _palla = $("#palla");
	
	let btnEntra=$("#btnEntra");
	let btnEsci = $("#btnEsci");
	let btnVisualizzaPalla = $("#btnVisualizzaPalla");
	let btnNascondiPalla = $("#btnNascondiPalla");
	let btnTira = $("#btnTira");

	_calciatore.hide();//possibile problema relativo a riposizionamento una volta nascosot+
	_palla.hide();
	_palla.prop("gol",false)
	//btnEsci.hide();
	btnEsci.css("visibility","hidden");
	btnNascondiPalla.css({"visibility":"hidden"});
	//btnTira.hide();//ultimo non sposta nulla
	btnTira.css({"visibility":"hidden"});

	//#region funzioni
	btnEntra.on("click",function(){
		//this rappresenta l'elemento che scatena l'evento ma tramite un puntatore Js non riconosciuto da Jquery
		//this.css({"visibility":"hidden"}); !! non funziona
		//this.style.visibility="hidden"; funziona
		//se metto $ prima viene trasformato in puntatore Jquery TIPO casting
		$(this).css({"visibility":"hidden"});
		_calciatore.show(2000, function(){
			btnEsci.css({"visibility":"visible"});
		});//metodi eseguiti su thread paralleli, per far eseguire qualcosa alla fine dell'animazione devo metterlo nella funzione di callback
		//show senza parametri default tempo
		checkTira();
	})

	btnEsci.on("click",function(){
		$(this).css({"visibility":"hidden"});
		_calciatore.hide(2000, function(){
			btnEntra.css({"visibility":"visible"});
		});
		btnTira.css({"visibility":"hidden"});
	});

	btnVisualizzaPalla.on("click",function(){
		$(this).css({"visibility":"hidden"});
		_palla.fadeIn(2000, function(){//default 400 ms
			btnNascondiPalla.css({"visibility":"visible"});
		});
		checkTira();
	});
	
	btnNascondiPalla.on("click",function(){
		$(this).css({"visibility":"hidden"});
		_palla.fadeOut(2000, function(){//default 400 ms
			//sono dentro a palla, this rappresenta quindi palla
			btnVisualizzaPalla.css({"visibility":"visible"});
			btnTira.css({"visibility":"hidden"});
		if($(this).prop("goal")){
			let pos = {
				"left":"",
				"top":"",
				"width":"",
				"height":""
			};
			$(this).css(pos);
			$(this).prop("goal",false);
		}
		});
		
	});

	function checkTira(){
		//pseudoselettore Is per verificare se un elemento dato appartiene a una determinata collezione
		if (_calciatore.is(":visible")&&_palla.is(":visible")) {// verifico se calciatore e palla appartengono al gruppo degli elementi visibili, ovvero sono visibili sulla pagina
			btnTira.css("visibility","visible");
		} 
	}

	btnTira.on("click",function(){
		$(this).css({"visibility":"hidden"});
		let pos = {
			"left":"1025px",
			"top":"300px",
			"width":"50px",
			"height":"50px"
		};
		_palla.animate(pos,1500,function(){
			_palla.prop("goal",true);
		});
		
	});

	$("#btnRosso").on("click",function(){
		_palla.prop("src","img/pallaRossa.jpg");

	});

	$("#btnBianco").on("click",function(){
		_palla.prop("src","img/palla.jpg");

	});

	//#endregion
	
});