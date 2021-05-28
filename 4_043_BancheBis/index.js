"use strict";

$(function () {
	let _wrapper=$("#wrapper");
	let _divTitolo = $("#divTitolo");
    let _divFiliali = $("#divFiliali");
    let _divMovimenti = $("#divMovimenti");
	let _btnLogOut = $("#btnLogout");
	_btnLogOut.on("click",function(){
		let reqLogOut=inviaRichiesta("post","servizi/logout.php");
		reqLogOut.fail(errore);
		reqLogOut.done(function(){
			alert("Disconnessione avvenuta correttamente");
			window.location.href="login.html";
		})
	});
	_wrapper.hide();
	
	let _richiestaFiliali = inviaRichiesta("get", "servizi/elencoFiliali.php");
	
	_richiestaFiliali.fail(errore);
	
	_richiestaFiliali.done(function (data) {
		console.log(data)
		let dataFiliale = data.Filiali;
		_wrapper.show();
		_divMovimenti.hide();
		let _lstFiliali = $("<select>");
		_lstFiliali.on("change", caricaDatiUtente);
		_lstFiliali.appendTo(_divFiliali);
		for (const filiale of dataFiliale) {
			let _opt = $("<option>");
			_opt.html(filiale.Nome);
			_opt.val(filiale.cFiliale);
			_opt.appendTo(_lstFiliali);			
		}
		_lstFiliali.prop("selectedIndex",-1);
		let p=$("<p>");
		p.html("Benvenuto "+data.Nome);
		_divTitolo.append(p);
		/*let _button = $("<button>");
		_button.appendTo(_divFiliali);
		_button.html("Visualizza movimenti")*/
		
    });
	function caricaDatiUtente(){
		let reqDatiUtente = inviaRichiesta("post","servizi/datiUtente.php",{"cFiliale":$(this).val()});
		reqDatiUtente.fail(errore);
		reqDatiUtente.done(function(data){
			console.log(data);
			_divMovimenti.show();
			let _tbody = _divMovimenti.find("tbody");
			_tbody.empty();
			for (const item of data) {
				let _tr = $("<tr>");
				_tr.appendTo(_tbody);
				
				let _td = $("<td>");
				_td.appendTo(_tr);
				_td.html(item.cMov);


				_td = $("<td>");
				_td.appendTo(_tr);
				_td.html(item.descrizione);

				_td = $("<td>");
				_td.appendTo(_tr);
				_td.html(item.Data);

				_td = $("<td>");
				_td.appendTo(_tr);
				_td.html(item.Importo);
			}
		});
	}
	
		
	
});
