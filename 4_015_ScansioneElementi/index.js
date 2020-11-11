"use strict"

window.onload = function(){

}

function generaNumero(min,max){
    // formula per generare numeri tra min e max, estremi inclusi
    // math.floor tronca il numero con la virgola all'intero più basso (approssimo per difetto)
    let n = Math.floor((max-min+1)*Math.random())+min  
    return n;
}

