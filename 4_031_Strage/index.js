"use strict"

$(document).ready(function () {

    let _login = $("#login")
    let _test = $("#test")
   
    let _txtUsr = $("#usr")
    let _txtPwd = $("#pwd")
    let _btnLogin = $("#btnLogin")
    let _lblErrore = $("#lblErrore");
    let idStudente;
	
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
            idStudente=data[0].id;
            console.log(data);
            if(data.length>0){
                _login.hide();
                _test.show();
                inviaRichiestaDomande();
            }else{
                _lblErrore.fadeIn(600);
            }
        })
    })

    _lblErrore.children("button").on("click", function(){
		_lblErrore.fadeOut(600)
	})
	
    //#region 
    function inviaRichiestaDomande(){
        let request = inviaRichiesta("get","/domande");
        request.fail(errore);
        request.done(function(domande){
            for (const item of domande) {
                let _div=$("<div>");//utilizzassi var non funzionerebbe perchè in tutti i done si vedrebbe l'ultimo div
                _div.appendTo(_test.children().eq(2));
                let _p=$("<p>");
                _p.addClass("domanda");
                _p.html(item.domanda);
                _p.prop("id",item.id);
                _div.append(_p);
                let richiestaRisposte = inviaRichiesta("get",`/risposte?codDomanda=${_p.prop("id")}`)
                richiestaRisposte.fail(errore);
                richiestaRisposte.done(function(risposte){
                    for (const risposta of risposte) {
                        let _opt = $("<input type=radio>");
                        _opt.prop("risposta",risposta);
                        _opt.appendTo(_div);
                        _opt.prop("name",item.id)
                        let _span = $("<span>");
                        _span.html(risposta.risposta);
                        _span.appendTo(_div);
                        $("<br>").appendTo(_div);
                        
                    }
                    let _opt = $("<input type=radio>");
                    _opt.prop("risposta",{"correct":false});
                    _opt.appendTo(_div);
                    _opt.prop("name",item.id);
                    _opt.prop("checked",true);
                    let _span = $("<span>");
                    _span.html("Mi avvalgo della facoltà di non rispondere");
                    _span.appendTo(_div);
                    $("<br>").appendTo(_div);

                });
                
            }
            let _btn=$("<button>");
                _btn.appendTo(_test.children().eq(2));
                _btn.html("Invia");
                _btn.on("click",function () {
                    let punti=0;
                    for (const item of $("input[type=radio]:checked")) {
                        if($(item).prop("risposta").correct){
                            punti++;
                        }
                        else{
                            $(item).next().css({"color":"red"});
                        }
                    }
                    let requestVoto=inviaRichiesta("patch","/studenti/"+idStudente,{"voto":punti});
                    requestVoto.fail(errore);
                    requestVoto.done(function(data){
                        alert(punti);
                    });
                });
        });
    }
    //#endregion

});
