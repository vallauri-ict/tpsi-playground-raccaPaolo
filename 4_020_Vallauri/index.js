"use strict"

$(document).ready(function(){
    let _wrapper=$("#wrapper");//NB dentro ready
    for (let i = 0; i < 36; i++) {
        $("<div>").addClass("box").appendTo(_wrapper);
    }
    setInterval(aggiorna,33);
    function aggiorna(){
        let rnd=generaNumero(0,36);
        let _box=_wrapper.children(".box").eq(rnd);
        _box.animate({"opacity":0.3},400);
        _box.animate({"opacity":0.6},400);
        _box.animate({"opacity":0.1},400);//400 default posso omettere, lavorano sullo stesso oggetto quindi stesso thread e vengono eseguite in sequenza
    }
})

function generaNumero(min,max){
    let n = Math.floor((max-min+1)*Math.random())+min  
    return n;
}


