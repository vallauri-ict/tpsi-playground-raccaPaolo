"use strict"

$(document).ready(function(){
    let _lampadina=$(".lampadina");
    let _btnSpegni=$("#btnSpegni");
    let _btnAccendi=$("#btnAccendi");
    let _descrizione=$("#descrizione")
    let _contenuto=$("#contenuto");
    //quando uso $ restituisce SEMPRE una collezione JQuery
    //se applico qualcosa a collezione applico a tutti elementi
    _btnSpegni.hide();//solitamente poche proprietà e tanti metodi in JQuery
    _lampadina.hide();//equivalente di display: none, elimina anche l'occupazione rimuovendo elemento da dom
    _btnAccendi.on("click",function(){
        _lampadina.addClass("accesa");
        _lampadina.fadeIn(2000,function(){
            _btnAccendi.hide();
            _btnSpegni.show();
        })//funziona di callback al termine del tempo;
        
    })
    _btnSpegni.on("click", function(){
        _lampadina.fadeOut(2000, function(){//funzione lavora su thread separato da principale
            _btnSpegni.hide();
            _btnAccendi.show();
        });
        _lampadina.removeClass("accesa");//essendo su thread separati, verrà eseguita subito
    })

    //JSON dove metto le proprietà css da modificare
    let descrizione={
        "width":"160px",
        "height":"40px",
        "text-align":"center",
        "lineHeight":"40px",
        "background-color":"#aaa",
        "textDecoration":"underline",
        "fontSize":"14pt",
        "cursor":"pointer",
        "borderRadius":"10px",
        "marginLeft":"10px"
    }

    _descrizione.css(descrizione);//se poche poso metterle direttamente dentro
    _contenuto.hide();

    _descrizione.on("mouseover",function(){
        _contenuto.slideDown(1000);//comprarire da alto a basso
    })

    _descrizione.on("mouseout",function(){
        _contenuto.slideUp(1000);//scomparire da basso a alto
    })

})
