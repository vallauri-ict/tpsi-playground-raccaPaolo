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
                _opt.appendTo(_lstModelli);
                }
                _lstModelli.prop("selectedIndex",-1);
        })
    });
    _lstModelli.on("change",function(){
        let selectedOpt=$("#lstModelli option").eq(_lstModelli.prop("selectedIndex")).html().split(" - ");
        _lstModelli.prop("nome",selectedOpt[0]);
        _lstModelli.prop("alimentazione",selectedOpt[1]);
        let codModello =_lstModelli.val();
        let request = inviaRichiesta("get",URL+"/automobili?codModello="+codModello);
        request.fail(errore);
        request.done(function(automobili){
            let _thead=$("<thead>");
            _thead.appendTo(_table);
            let _tr = $("<th>");
            _tr.appendTo(_thead);
            for (let i = 0; i < intestazione.length; i++) {
                let _th=$(`<${intestazione[i].tag}>`);
                 _th.html(intestazione[i].text);
                 _th.css({"width":intestazione[i].width});
                 _th.appendTo(_tr);
            }
            let _tbody=$("<tbody>");
            _tbody.appendTo(_table);
            for (const item of automobili){
                console.log(item);
                let _tr = $("<tr>");
                _tr.appendTo(_tbody);
                let _td = $("<td>");
                _td.appendTo(_tr);
                _td.html(_lstModelli.prop("nome"));
                _td = $("<td>");
                _td.appendTo(_tr);
                _td.html(_lstModelli.prop("alimentazione"));
                _td = $("<td>");
                _td.appendTo(_tr);
                _td.html(item.colore);
                _td = $("<td>");
                _td.appendTo(_tr);
                _td.html(item.anno);
                _td = $("<td>");
                _td.appendTo(_tr);
                let _img = $("<img>");
                _img.appendTo(_td);
                _img.prop("src",`img/${item.img}`);
                _img.css({"heigth":"65px"});
                _td = $("<td>");
                _td.appendTo(_tr);
                let _btn = $("<button>");
                _btn.appendTo(_td);
                _btn.text("Dettagli");
                _td = $("<td>");
                _td.appendTo(_tr);
                _btn = $("<button>");
                _btn.appendTo(_td);
                _btn.text("Elimina");
            }
        })
    });

		
});


