"use strict";

$(function () {
	let _wFiliali=$("#wrapFiliali");
	let _wCorrentisti= $("#wrapCorrentisti");
    let _lstBanche = $("#lstBanche");
	let _lstFiliali = $("#lstFiliali");
	let _tbody = $("tbody");

    //_wFiliali.css("display", "none");
	_wCorrentisti.css("display", "none");
	_lstBanche.prop("selectedIndex",-1);
	_lstBanche.on("change",function(){
		let req = inviaRichiesta("get","servizi/elencoFiliali.php",{"cBanca":_lstBanche.val()});
		req.fail(errore);
		req.done(function(data){
			_lstFiliali.empty();
			for (const item of data) {
				let _option = $("<option>");
				_option.html(item.Nome);
				_option.val(item.cFiliale)
				_option.appendTo(_lstFiliali);
			}
			_lstFiliali.prop("selectedIndex",-1);
		});
	});
    _lstFiliali.on("change",function(){
		let req = inviaRichiesta("get","servizi/elencoCorrentisti.php",{"cFiliale":_lstFiliali.val()});
		req.fail(errore);
		req.done(function(data){
			console.log(data);
			_wCorrentisti.css("display", "block");
			for (const item of data) {
				let _tr = $("<tr>");
				_tr.appendTo(_tbody);
				
				let _td = $("<td>");
				_td.appendTo(_tr);
				_td.html(item.cCorrentista);


				_td = $("<td>");
				_td.appendTo(_tr);
				_td.html(item.Nome);

				_td = $("<td>");
				_td.appendTo(_tr);
				_td.html(item.cComune);

				_td = $("<td>");
				_td.appendTo(_tr);
				_td.html(item.Telefono);

				_td = $("<td>");
				_td.appendTo(_tr);
				_td.html(item.cConto);

				_td = $("<td>");
				_td.appendTo(_tr);
				_td.html(item.Saldo);
			}
		});
	});
	
	
});