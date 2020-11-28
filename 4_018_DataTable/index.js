"use strict"

$(document).ready(function(){
    const _table=$("#wrapper table");
    const finalUrl = "https://randomuser.me/api"+"?results=50";
    $.ajax({
        "url": finalUrl,
		contentType: "application/x-www-form-urlencoded;charset=utf-8", //default 
        dataType: "json",   //default        
        timeout: 5000, //se entro 5 sec non ho risposta da errore, maybe default
        //funzioni di risposta
        "success":function (data){  //richiamata da $ajax alla ricezione dei dati e passa data (json già parsificato ricevuto dal server)
            console.log(data);
            for (let user of data.results) {
                let _tr = $("<tr>");
                _tr.appendTo(_table.children("tbody"));
                $("<td>").appendTo(_tr).text(user.name.first+" "+user.name.last);
                $("<td>").appendTo(_tr).text(user.nat);
                $("<td>").appendTo(_tr).text(user.location.country);
                $("<td>").appendTo(_tr).text(user.location.state);
                $("<td>").appendTo(_tr).text(user.cell);
                let _td = $("<td>").appendTo(_tr);
                $("<img>").appendTo(_td).prop("src",user.picture.medium);
                //$("<img>").appendTo($("<td>").appendTo(_tr)).prop("src",user.picture.medium);
            }
            //se lancio il metodo DataTable prima che la tabella sia stata popolata, l'applicazione rilascia una riga con un messaggio iniziale di tabella vuota
            _table.DataTable( {
                "bPaginate": true, // paginazione dei record da visualizzare
                "bLengthChange": true, // visualizzare campo pe scegliere n. di record per pagina
                "bFilter": true, // ricerca della voce impostata
                "bSort": true, // ordinamento dei record sul click on the header
               });               
        },
        "error":errore
    });

})

function errore(jqXHR, text_status, string_error) {
    if (jqXHR.status == 0)
        alert("Connection Refused or Server timeout");
	else if (jqXHR.status == 200)
        alert("Formato dei dati non corretto : " + jqXHR.responseText);
    else
        alert("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
}
