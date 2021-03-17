"use strict";
window.onload=function(){
    let wr = $("#wrapper");
    let _btnInvia  = $("#btnInvia");
    let _tbody = $("tbody");
    let _canvas = $("canvas");
    
    _btnInvia.on("click", function(){
        //passaggio parametri :
        //1) "/?results=100"
        //2) con json ("/", {"results":"100"})
        //3) con urlEncoded "/", "results=100"
        let request = inviaRichiesta("get","/",{"results":"100"})
        request.fail(errore)
        request.done(function(persone){
            _canvas.empty();
            _tbody.empty();
            let vettoreNations = {};
            //console.log(data)
            for (const persona of persone.results) {
                if (persona.location.country in vettoreNations) { //se la chiave fa parte delle chiavi del vettore
                    vettoreNations[persona.location.country]++;
                }
                else{
                    vettoreNations[persona.location.country] = 1;
                }
            }
            for (const key in vettoreNations) { // chiave del vettore corrente
                let tr = $("<tr>");
                tr.appendTo(_tbody);

                let td = $("<td>");
                td.appendTo(tr);
                td.text(key);

                td = $("<td>");
                td.appendTo(tr);
                td.text(vettoreNations[key]);
            }
            let values=[];
            let colors = [];
            for (const key in vettoreNations) {
               values.push(vettoreNations[key]);
               let r = generaNumero(0,255);
               let g = generaNumero(0,255);
               let b = generaNumero(0,255);
               colors.push(`rgb(${r},${g},${b}`)
            }
            let chart;
           if(chart!=undefined){
               chart.destroy();
           }
           chart = new Chart(_canvas, { 
                type: 'pie',                 
                data: {                
                    "labels":Object.keys(vettoreNations),                 
                    "datasets": [{              
                        "label": 'Titolo del grafico', 
                        "data": values,                 
                        "backgroundColor": colors,                 
                        "borderColor": "black",                
                        "borderWidth": 1  // default=2                   
                    }] 
                } 
            });
            let a = $("<a>");
            a.appendTo(wr);
            a.prop("href","#")
            a.prop("download", "canvas")
            a.text("Salva immagine")


            a.prop("href", _canvas[0].toDataURL("image.png"));
        })
    })
}