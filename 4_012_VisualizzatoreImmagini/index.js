"use strict"

window.onload = function(){
    let _input=$("input");
    let _img=$("#img");
    let pos=1;



    let _btnIndietro=$("#btnIndietro");
    let _btnAvanti=$("#btnAvanti");
    _btnIndietro.click(function(){

        cambiaImmagine(false);
    });
    _btnAvanti.click(function(){

        cambiaImmagine(true);
    });

    _btnIndietro.attr("disabled","disabled");
    let cssInput={
        "width":"140px",
        "height":"40px",
        "fontWeight":"bold",
        "background-color":"orange",
        "border-radius":"50%",
        "text-align":"center"
    }
    _input.css(cssInput);
    _img.attr("src","img/img"+pos+".jpg");
    _img.width("400px");

    function cambiaImmagine(oper){
        if (oper) {
            _btnIndietro.attr("disabled",false);
             if (pos<7) {
                    pos++;
                    _img.attr("src","img/img"+pos+".jpg");
                
            }
            if (pos==7) {
                _btnAvanti.attr("disabled","disabled");
            }

        }else{
            _btnAvanti.attr("disabled",false);
            if (pos>1) {
                    pos--;
                    _img.attr("src","img/img"+pos+".jpg");
                
            }
            if (pos==1) {
                _btnIndietro.attr("disabled","disabled");
            }
        }
    }
}


