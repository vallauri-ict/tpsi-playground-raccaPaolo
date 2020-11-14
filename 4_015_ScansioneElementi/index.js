"use strict"
let _wrapper;
function evidenzia(selector) {
    _wrapper.children().css({"backgroundColor":""});//azzero al default
    _wrapper.children(selector).css({"backgroundColor":"#FF0"});
}

$(document).ready(function(){
    _wrapper=$("#wrapper");

    $("#btn1").on("click",function(){
        alert($("#wrapper li").length);
        alert($("#wrapper").children().length);
    })

    $("#btn2").on("click",function(){
        let list = $("#wrapper").children();
        let msg="";

        //sol 1
        /*for (let i = 0; i < list.length; i++) {
            //msg+=list[i].innerHTML;
            //msg+=$(list[i]).html();
           // msg+=list.eq(i).html();
            
        }*/

        //sol2
        /*for (const item of list) {
            msg+=$(item).html();
        }*/

        list.each(function (i,ref){
            //msg+=list.eq(i).html();
            //msg+=$(ref).html();
            msg+= $(this).html();
        });
        alert(msg);
    });

    $("#btn3").on("click",function(){
        //$("#wrapper li:nth-of-type(even)").css({"backgroundColor":"#FF0"}) ;
        //$("#wrapper").children(":nth-of-type(even)").css({"backgroundColor":"#FF0"});
        $("#wrapper").children().filter(":nth-of-type(even)").css({"backgroundColor":"#FF0"});
    })

    $("#btn4").on("click",function(){
        //$("#wrapper li:nth-of-type(even)").css({"backgroundColor":"#FF0"}) ;
        //$("#wrapper").children(":nth-of-type(even)").css({"backgroundColor":"#FF0"});
        let listAus=$("#wrapper").children().filter(":nth-of-type(odd)");
        let colore;
        listAus.each(function(i,ref){
            colore=50*(i+1);
             $(ref).css({"backgroundColor":`rgb(0,${colore},0)`});      
         });
    });

})

