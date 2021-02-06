"use strict"

const URL = "http://localhost:3000"

let intestazione=[{
    "tag":"th",
    "text":"Nome",
    "width":"15%"
},
{
    "tag":"th",
    "text":"Alimentazione",
    "width":"15%"
},
{
    "tag":"th",
    "text":"Colore",
    "width":"15%"
},
{
    "tag":"th",
    "text":"Anno",
    "width":"10%"
},
{
    "tag":"th",
    "text":"Img",
    "width":"20%"
},
{
    "tag":"th",
    "text":"Dettagli",
    "width":"12%"
},
{
    "tag":"th",
    "text":"Elimina",
    "width":"12%"
}]

$(document).ready(function () {
    let _lstMarche = $("#lstMarche");
    let _lstModelli = $("#lstModelli");
	let _table= $("table")
    let _dettagli=$(".row").eq(2).children("div").eq(1)
    let idModelloSelezionato;
    
    _dettagli.hide()
    let request = inviaRichiesta("get",URL+"/marche");//get no parametri
    request.fail(errore);
    request.done(function(marche)
    { 
        for (const item of marche){
        let _opt = $("<option>");
        _opt.val(item.id);
        _opt.html(item.nome);
        _opt.appendTo(_lstMarche);
        }
        _lstMarche.prop("selectedIndex",-1);
    });
    _lstMarche.on("change",function(){
        _lstModelli.html("");
        let codMarca =_lstMarche.val();//nel caso di listbox da value di voce selezionatoi
        let request = inviaRichiesta("get",URL+"/modelli?codMarca="+codMarca);
        request.fail(errore);
        request.done(function(modelli){
            for (const item of modelli){
                let _opt = $("<option>");
                _opt.val(item.id);
                _opt.html(item.nome+" - "+item.alimentazione);
                //_opt.prop("modello",item);
                _opt.appendTo(_lstModelli);
                }
                _lstModelli.prop("selectedIndex",-1);
        })
    });
    _lstModelli.on("change",function(){
        _table.empty();
        idModelloSelezionato=_lstModelli.val();//salvo id del modello selezionato
        /*let selectedOpt=$("#lstModelli option").eq(_lstModelli.prop("selectedIndex"));
        $(this).prop("modello",selectedOpt.prop("modello"));//salva nel lst le informazioni relative al modello selezionato*/
        let codModello =_lstModelli.val();
        let request = inviaRichiesta("get",URL+"/automobili?codModello="+codModello);
        request.fail(errore);
        request.done(function(automobili){
            let _thead = $("<thead>");
            _thead.appendTo(_table);
            let _tr=$("<tr>");
            _tr.appendTo(_thead);
            for (let i = 0; i < intestazione.length; i++) {
                let _th = $(`<${intestazione[i].tag}>`);
                _th.appendTo(_tr);
                _th.text(intestazione[i].text);
                _th.css({"width":intestazione[i].width});
            }
            let _tbody=$("<tbody>");
            _tbody.appendTo(_table);
            for (const auto of automobili){
                let _tr = $("<tr>");
                _tr.appendTo(_tbody);
                let _td=$("<td>");
                _td.appendTo(_tr);
                _td.text(_lstModelli.prop("modello").nome);
                /********* */
                _td = $("<td>");
                _td.appendTo(_tr);
                _td.text(_lstModelli.prop("modello").alimentazione);
                /******************** */
                _td = $("<td>");
                _td.appendTo(_tr);
                _td.text(auto.colore);
                /********************** */
                _td = $("<td>");
                _td.appendTo(_tr);
                _td.text(auto.anno);
                /*********************** */
                _td = $("<td>");
                _td.appendTo(_tr);
                let _img =$("<img>");
                _img.appendTo(_td);
                _img.prop("src",`img/${auto.img}`);
                _img.css("height","65px");
                /***************** */
                _td = $("<td>");
                _td.appendTo(_tr);
                let _btn =$("<button>");
                _btn.on("click",dettagli);
                _btn.appendTo(_td);
                _btn.text("Dettagli");
                _btn.addClass("btn btn-success btn-xs");
                _btn.prop("automobile",auto);//proprieta contiene json
                /******** */
                _td = $("<td>");
                _td.appendTo(_tr);
                _btn =$("<button>");
                _btn.appendTo(_td);
                _btn.addClass("btn btn-secondary btn-xs")
                _btn.text("Elimina");
                _btn.prop("id",auto.id);
                _btn.on("click",elimina);
            }
        })
    });

	function dettagli(){
        let jsonModello=_lstModelli.prop("modello");
        _dettagli.show();
        //console.log($(this).prop("automobile"))
        $("#txtId").val($(this).prop("automobile").id);
        $("#txtTarga").val($(this).prop("automobile").targa);
        $("#txtColore").val($(this).prop("automobile").colore);
        $("#txtAnno").val($(this).prop("automobile").anno);
        $("#txtKm").val($(this).prop("automobile").km);
        $("#txtPrezzo").val($(this).prop("automobile").prezzo);
        let url = URL+"/modello"+idModelloSelezionato;
        let request = inviaRichiesta("get",url);
        request.fail(errore);
        request.done(function(data){
            $("#txtNome").val(data.nome);
            $("#txtAlimentazione").val(data.alimentazione);
            $("#txtCilindrata").val(data.cilindrata);
        })
    }	

    function elimina(){
        let url=URL+"/automobili/"+$(this).prop("id");
        let request = inviaRichiesta("delete",url);
        request.fail(errore);
        request.done(function(){
            alert("Elemento eliminato correttamente");
            _lstModelli.trigger("change");
        })
    }
    $("#btnAggiorna").on("click",function(){
        let url=URL+"/automobili/"+$(txtId).val();
        let request = inviaRichiesta("patch",url,{prezzo:parseInt($("#txtPrezzo").val())});
        alert("Modifica effettuata correttamente");
        _lstModelli.trigger("change");
    })
});


