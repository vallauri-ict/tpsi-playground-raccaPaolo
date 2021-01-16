"use strict";
 
$(document).ready(function () {
	let wrapper = $('#elencoArticoli');
	let details =$(".details")
	let posizione=-1;
	let _elencoArticoli = $("#elencoArticoli");
	
	for (let i=0;i<articoli.length;i++) {
		let item = articoli[i];
		let _articolo=$("<div>");
		_articolo.prop("id",`article-${i}`);
		_articolo.addClass("article");
		_elencoArticoli.append(_articolo);
		let _img=$("<img>");
		_img.prop("src",`img/${item.src}.jpg`);
		_img.prop("title","Aggiungi al carrello");
		_img.addClass("image");
		_img.appendTo(_articolo);
		let _name=$("<div>");
		_name.addClass("name");
		_name.prop("id",articoli[i].nome)
		_name.appendTo(_articolo);
	}

	_elencoArticoli.on("mouseenter","img", visualizzaNome);
	_elencoArticoli.on("mouseleave","img", rimuoviNome);
	_elencoArticoli.on("click","div.article", visualizzaDettagli);

	function visualizzaNome(){
		let pos=$("img").index($(this));
		let _nome=$(".name").eq(pos);
		_nome.html(articoli[pos].nome);
	}
	function rimuoviNome(){
		let pos=$("img").index($(this));
		let _nome=$(".name").eq(pos);
		_nome.html("");
	}
  
	details.hide();

	function visualizzaDettagli(){
		let pos=$(".article").index($(this));
		posizione=pos;
		details.slideDown(1000);
		details.html("");
		details.css({"display":"block"});
		let _close = $("<div>");
		_close.addClass("detail-close");
		details.append(_close);
		let _x = $("<span>");
		_x.html("X");
		_x.appendTo(_close);
		let _detailsImg = $("<div>");
		_detailsImg.addClass("detail-img");
		details.append(_detailsImg);
		let _img = $("<img>");
		_img.prop("src",`img/${articoli[pos].src}.jpg`);//$(this).children("img").prop("src")
		_img.appendTo(_detailsImg);
		let _detailsInfo = $("<div>");
		_detailsInfo.addClass("detail-info");
		details.append(_detailsInfo);
		let _h4 = $("<h4>");
		_h4.addClass("item-title");
		_h4.html(articoli[pos].nome);
		_h4.appendTo(_detailsInfo);
		let _pDesc = $("<p>");
		_pDesc.html(articoli[pos].descrizione);
		_pDesc.appendTo(_detailsInfo);
		let _pPrezzo = $("<p>");
		_pPrezzo.html(`$ ${articoli[pos].prezzo}`);
		_pPrezzo.appendTo(_detailsInfo);
		let _button=$("<button>");
		_button.addClass("item-add");
		_button.html("Aggiungi al carrello");
		_button.appendTo(_detailsInfo);
	}
	details.on("click","span",function(){
		details.slideUp(1000);
	});

	let _carrello=$("#carrello");
	let _btnCarrello=$("#btnCarrello");
	let aperto=false;
	let articoliCarrello={"articoli":[]};
	_btnCarrello.on("click",visualizzaCarrello);

	function visualizzaCarrello(){
		console.log($(this).html());
			if(!aperto){
				aperto=true;
				_carrello.slideDown(1000,function(){(_btnCarrello.html("&#708 Chiudi carrello"));});
			}
			else{
				aperto=false;
				_carrello.slideUp(1000,function(){(_btnCarrello.html("&#709 Apri carrello "));});
			}
	}
	details.on("click","button",aggiungiAlCarrello);
	function aggiungiAlCarrello(){
		console.log(posizione);
		let pos=posizione;
		let aus={};
		if(articoliCarrello.articoli.length>0){
			let presente=cercaJson(pos);
			if(presente!=-1){
				articoliCarrello.articoli[presente].quantita++;
			}
			else{
				aus.nome=articoli[pos].nome;
				aus.prezzo=articoli[pos].prezzo;
				aus.quantita=1;
				articoliCarrello.articoli.push(aus);
			}
						
			
		}
		else{

		aus.nome=articoli[pos].nome;
			aus.prezzo=articoli[pos].prezzo;
			aus.quantita=1;
			articoliCarrello["articoli"].push(aus);
			
	}
	console.log(articoliCarrello);
	mostraSuTabella();
	}

	function cercaJson(pos){
		let i=-1;
		for(let j=0;j<articoliCarrello.articoli.length;j++){
			if(articoli[pos].nome==articoliCarrello.articoli[j].nome){
				i=j;
				break;
			}
		}
		return i;
	}
	let _table = _carrello.children("table");
	function mostraSuTabella(){
		_table.html(`<tr>
		<th width="30%">nome</th>
		<th width="30%">prezzo</th>
		<th width="30%">quantità</th>
		<th width="10%"></th>
	</tr>`);
	for (let i = 0; i < articoliCarrello.articoli.length; i++) {
		let _tr = $("<tr>");
		_table.append(_tr);
		let _tdNome =$("<td>");
		_tdNome.html(articoliCarrello.articoli[i].nome);
		_tr.append(_tdNome);
		let _tdPrezzo =$("<td>");
		_tdPrezzo.html(articoliCarrello.articoli[i].prezzo);
		_tr.append(_tdPrezzo);
		let _tdQuantita =$("<td>");
		_tdQuantita.html(articoliCarrello.articoli[i].quantita);
		_tr.append(_tdQuantita);
		let _tdImg=$("<td>");
		let _img = $("<img>");
		_img.prop("src","img/_cestino.png");
		_img.appendTo(_tdImg);
		_tdImg.appendTo(_tr);
	}};
	_table.on("click","img",function(){
		let pos=$(_table.find("img")).index($(this));
		console.log(pos); 
		articoliCarrello.articoli.splice(pos,1);
		mostraSuTabella();
	})
});
