"use strict"

let _ul=[];

$(document).ready(function(){
    let _wrapper = $("#wrapper");
    _ul.push(_wrapper.children("ul").first());//puntatore jquery al primo dei due ul
    _ul.push(_wrapper.children("ul").eq(1));
})

//#region FUNZIONI

function aggiungi(index){
    index--;
    let n=_ul[index].children().length+1;
    let _li = $("<li>");
    _li.html("menu "+(index+1)+" voce <b>"+n+"</b>");
    _ul[index].append(_li);
}

function sposta(index){
    index--;
    let li = _ul[index].children("li").last();
    li.appendTo(index==0?_ul[1]:_ul[0]);

}

function aggiungiPrima(index){
    index--;
    let _li = $("<li>");
    _li.text("voce iniziale");
    _ul[index].children("li").first().before(_li);
    //_li.insertBefore(_ul[index].children("li").first());
}

function aggiungiDopo(index){
    index--;
    let _li = $("<li>");
    _li.text("voce dopo first");
    _ul[index].children("li").first().after(_li);
    //_li.insertAfter(_ul[index].children("li").first());
}

function replica(index){
    index--;
    let _li = $("<li>");
    _li.text("voce prima di ogni elemento");
    _ul[index].children("li").before(_li);
}



//#endregion



