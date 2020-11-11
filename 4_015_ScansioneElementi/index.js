"use strict"
let _wrapper;
function evidenzia(selector) {
    _wrapper.children().css({"backgroundColor":""});//azzero al default
    _wrapper.children(selector).css({"backgroundColor":"#FF0"});
}

$(document).ready(function(){
    _wrapper=$("#wrapper");

})

