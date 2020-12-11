"use strict"
const DIM = 4;
$(document).ready(function(){
    let _wr=$("#wrapper");
    creaElementi();
    assegnaValori();
    _wr.on("click","div",move);
    //#region funzioni
    function creaElementi(){
        let larghezza;
        for (let i = 0; i < DIM; i++) {
            for (let j = 0; j < DIM; j++) {
                let div=$("<div>").appendTo(_wr);
                div.addClass("pedina"); 
                if(i==0&&j==0){
                larghezza=parseInt(div.css("width"))+parseInt(div.css("margin-left"))*2+parseInt(div.css("padding-left"))*2+parseInt(div.css("border-left-width"))*2;
                }
                div.css({"top":larghezza*i,"left":larghezza*j});
                div.prop("id","btn-"+i+"-"+j);
            }  
        }
    }
    function assegnaValori(){
        let numeri=[];
        for (let i = 0; i < 15; i++) {
            numeri[i]=i+1;      
        }
        numeri[15]="";
        let divs=_wr.children("div");
        divs.each(function(i,ref){
            let pos = generaNumero(0,numeri.length-1);
            $(ref).text(numeri[pos]);
            if(numeri[pos]!=""){
                $(ref).addClass("grigio");
            }
            numeri.splice(pos,1);
        });
    }
    
    function generaNumero(min,max){
        return Math.floor((max-min+1)*Math.random());
    }

    function move(){
        //js let id = this.id;
        let id=$(this).prop("id");
        let aus = id.split('-');
        let i = parseInt(aus[1]);
        let j = parseInt(aus[2]);
        if(j>0 && $(`#btn-${i}-${j-1}`).text()==""){
            scambio($(this),$(`#btn-${i}-${j-1}`))
        }
        else if(i>0 && $(`#btn-${i-1}-${j}`).text()==""){
            scambio($(this),$(`#btn-${i-1}-${j}`))
        }
        else if(i<3 && $(`#btn-${i+1}-${j}`).text()==""){
            scambio($(this),$(`#btn-${i+1}-${j}`))
        }
        else if(j<3 && $(`#btn-${i}-${j+1}`).text()==""){
            scambio($(this),$(`#btn-${i}-${j+1}`))
        }
    }
    function scambio(cella1,cella2){
        _wr.off("click","div");
        cella1.animate({"top":cella2.css("top"),"left":cella2.css("left")},1000);
        cella2.animate({"top":cella1.css("top"),"left":cella1.css("left")},1000,function(){
            let aus = cella1.prop("id");
            cella1.prop("id",cella2.prop("id"));
            cella2.prop("id",aus);
            if(controllaVincita()){
                alert("Grande! Hai vinto")
            }
            else{
                _wr.on("click","div",move);
            }
        });
    }
    function controllaVincita(){
        let cont=0;
        for (let i = 0; i < DIM; i++) {
            for (let j = 0; j < DIM; j++) {
                let n=parseInt($(`#btn-${i}-${j}`).text());
                if(++n!=cont&&cont!=16){
                    return false;
                }     
            }
            
        }
        return true;
    }
    //#endregion
})



