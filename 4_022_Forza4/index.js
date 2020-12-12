"use strict"
const RIGHE = 6;
const COLONNE = 7;
const GIALLO = "rgb(255, 255, 0)";
const ROSSO = "rgb(255, 0, 0)";
const GRIGIO = "rgb(187, 187, 187)";//colori restiuiti sempre cosi, anche se inizializzato come #BBB
let turno = GIALLO;//iniziamo col giallo
$(document).ready(function(){
    let _wr=$("#wrapper");
    let _header=$("#header");
    //creazione pedine intestazione
    for (let i = 0; i < COLONNE; i++) {
        let pedina=$("<div>");
        pedina.addClass("pedina")  ;
        pedina.appendTo(_header); 
        //quando assegno evento a oggetto creato dinamicamente devo chiedermi se tornerò a ripetere l'evento
        /*pedina.hover(//non gestisce delegate event
        function(){
            $(this).css({"backgroundColor":turno});
        },function(){
            $(this).css({"backgroundColor":GRIGIO});
        });*/
    }
    //creazione pedine wrapper
    for (let i = 0; i < RIGHE; i++) {
        for (let j = 0; j < COLONNE; j++) {
            let pedina=$("<div>");
            pedina.addClass("pedina")  ;
            pedina.appendTo(_wr);    
            pedina.prop("id",`btn-${i}-${j}`);
        }     
    }
    // equivalente a pedina.hover () ma con delegate events
    _header.on("mouseenter","div",function(){
        $(this).css({"backgroundColor":turno});
    });
    _header.on("mouseleave","div",function(){
        $(this).css({"backgroundColor":GRIGIO});
    });
    _header.on("click","div",discesa);

    //#region funzioni
    function discesa(){
        let colonna=_header.children("div").index($(this));//restituisce indice di $(this) nella collezione
        let riga=RIGHE-1;//nel caso non trovasse,contiene indice prima riga libera
        for (let i = 0; i < RIGHE; i++) {
            if($(`#btn-${i}-${colonna}`).css("backgroundColor")!=GRIGIO){
                riga=i-1;
                break;
            }        
        }
        if(riga!=-1){//se la prima cella non è occupata
            let _turno=turno;//convenzione per indicare aus
            turno=turno==GIALLO?ROSSO:GIALLO;
            $(this).trigger("mouseenter");
            let pedina=$("<div>");
            pedina.appendTo(_wr);
            pedina.addClass("pedina");
            pedina.css({"backgroundColor":_turno,"position":"absolute","left":colonna*60+5,"top":"-60px"});//se scrivo come numero già px senza virgolette

            _header.off("click");

            pedina.animate(({"top":(riga)*60+5}),200*riga+1,function(){
                _header.on("click","div",discesa);
                $(`#btn-${riga}-${colonna}`).css({"backgroundColor":_turno});
            });
        }
        else{
            alert("Riga piena!");
        }
        
    }
    //#endregion
})



