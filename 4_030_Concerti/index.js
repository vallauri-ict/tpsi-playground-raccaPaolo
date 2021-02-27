"option strict"



$(document).ready(function () {
    const _lstCitta  =$("#lstCitta")
    const _lstGeneri = $("#lstGeneri")
    const _btnFiltro  = $("#btnFiltro")
    const _tbody = $("table tbody");
	const _divDettagli =$("#divDettagli")
    
	_divDettagli.hide()    
    caricaComboCitta();
    caricaComboGeneri();
    caricaTabella();
    _btnFiltro.on("click", caricaTabella)

    _lstCitta.on("click", "li", function(){
        let citta = $(this).prop("citta");
        _lstCitta.prop("citta",citta);
        if(citta!=undefined){
            _lstCitta.prev().html(citta.citta+' <span class="caret"></span></button>');
        }
        else{
            _lstCitta.prev().html('Tutti <span class="caret"></span></button>');
            _lstCitta.prop("citta",null);//null uguale ad undefinied
        }
    });

    _lstGeneri.on("click", "li", function(){
        let genere = $(this).prop("genere");
        _lstGeneri.prop("genere",genere);
        if(genere!=undefined){
            _lstGeneri.prev().html(genere.genere+' <span class="caret"></span></button>');
        }
        else{
            _lstGeneri.prev().html('Tutti <span class="caret"></span></button>');
            _lstGeneri.prop("genere",null);//null uguale ad undefinied
        }
    });

    //#region funzioni
    function caricaComboCitta(){
        let _li = $("<li>");
        _li.html("Tutti");
        _li.appendTo(_lstCitta);
        _li = $("<li>");
        let request = inviaRichiesta("get","/citta");
        request.fail(errore);
        request.done(function(citta){
            for (const item of citta) {
                let _li = $("<li>");
                _li.prop("citta",item);
                _li.html(item.citta);
                _li.appendTo(_lstCitta);
            }
        });
    }
    function caricaComboGeneri(){
        let _li = $("<li>");
        _li.html("Tutti");
        _li.appendTo(_lstGeneri);
        let request = inviaRichiesta("get","/generi");
        request.fail(errore);
        request.done(function(generi){
            for (const item of generi) {
                let _li = $("<li>");
                _li.prop("genere",item);
                _li.html(item.genere);
                _li.appendTo(_lstGeneri);
            }
        })
    }

    function caricaTabella(){
        let genere = _lstGeneri.prop("genere");
        let citta = _lstCitta.prop("citta");
        let params={};
        if(genere!=undefined){
            params.codGenere=genere.id;//push funziona solo su enum
        }
        if(citta!=undefined){
            params["codCitta"]=citta.id;
        }
        let request = inviaRichiesta("get","/concerti",params);
        request.fail(errore);
        request.done(visualizzaConcerti);
    }
    function visualizzaConcerti(concerti){
        _tbody.empty();
        for (const item of concerti) {
            let _tr= $("<tr>");
            _tr.appendTo(_tbody);

            let _td= $("<td>");
            _td.appendTo(_tr);
            _td.html(item.id);

            _td= $("<td>");
            _td.appendTo(_tr);
            _td.html(item.cantante);

            _td= $("<td>");
            _td.appendTo(_tr);
            _td.html(item.data);

            let _tdGenere = $("<td>");
            _tdGenere.appendTo(_tr);
            let requestGeneri=inviaRichiesta("get","/generi/"+item.codGenere);
            requestGeneri.fail(errore);
            requestGeneri.done(function(genere){//restituisce sempre array
                _tdGenere.html(genere.genere);
            });
            
            //creo fuori essendo asicrono
            let _tdCitta= $("<td>");
            _tdCitta.appendTo(_tr);
            let _tdStruttura= $("<td>");
            _tdStruttura.appendTo(_tr);
            let _tdNPosti= $("<td>");
            _tdNPosti.appendTo(_tr);
            let requestCitta=inviaRichiesta("get","/citta/"+item.codCitta);
            requestCitta.fail(errore);
            requestCitta.done(function(citta){//se passo ID restituisce record singolo
                _tdCitta.html(citta.citta);
                _tdStruttura.html(citta.struttura);
                _tdNPosti.html(citta.nPosti);
            });

            _td=$("<td>");
            let _buttonDettagli = $("<button>");
            _buttonDettagli.html("Dettagli");
            _buttonDettagli.appendTo(_td);
            _buttonDettagli.addClass("btn btn-info btn-xs");
            _td.appendTo(_tr);
            _td=$("<td>");
            let _buttonPrenota = $("<button>");
            _buttonPrenota.html("Prenota");
            _buttonPrenota.appendTo(_tr)
            _buttonPrenota.addClass("btn btn-success btn-xs");
            _td.appendTo(_tr);
        }
    }
    //#endregion

})