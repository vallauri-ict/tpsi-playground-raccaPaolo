"use strict"

$(document).ready(function () {

    let _login = $("#login")
    let _test = $("#test")
   
    let _txtUsr = $("#usr")
    let _txtPwd = $("#pwd")
    let _btnLogin = $("#btnLogin")
    let _lblErrore = $("#lblErrore")
	
	let _domande = $(".domande")
	
	/* ******************************* */

    _login.show()
    _test.hide()
    _lblErrore.hide()
   
    _btnLogin.on("click", function(){
        let json={
            "user":_txtUsr.val(),
            "pwd":_txtPwd.val()
        }
        let request = inviaRichiesta("get","/studenti",json);//restituisce sempre vettore
        request.fail(errore);
        request.done(function (data) {
            console.log(data);
            if(data.length>0){
                _login.hide();
                _test.show();
            }else{
                _lblErrore.fadeIn(600);
            }
        })
    })

    _lblErrore.children("button").on("click", function(){
		_lblErrore.fadeOut(600)
	})
	

});
