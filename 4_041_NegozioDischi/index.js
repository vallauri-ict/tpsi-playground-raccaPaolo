"use strict"
$(document).ready(function () {
    //non inserire mai lo / nell'url della richiesta sennò lo interpreta come path assoluto
    let _div =$("#table>div")
    let request = inviaRichiesta("GET","server/elencoDischi.php");//viene inviata automaticamente allo stesso server che ha inviato la pagina
    request.fail(errore),
    request.done(function (data) {
        console.log(data);
        for (const item of data) {
            /*let _div = $("<div>")
            _div.appendTo(_table);*/
            let _input=$("<input [type=text]>");
            _input.val(item.id);
            _input.appendTo(_div);
            _input=$("<input [type=text]>");
            _input.val(item.autore);
            _input.appendTo(_div);
            _input=$("<input [type=text]>");
            _input.val(item.titolo);
            _input.appendTo(_div);
            _input=$("<input [type=text]>");
            _input.val(item.anno);
            _input.appendTo(_div);
            let _button=$("<button>");
            _button.html("Salva");
            _button.appendTo(_div);
            _button=$("<button>");
            _button.html("Elimina");
            _button.appendTo(_div);
        }
    })

});