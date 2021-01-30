﻿"use strict";

$(document).ready(function(){	

	let _login = $("#login")
	let _btn = _login.children("div").eq(2).children("div").eq(1)

    _btn.on("click", function(){
		let _user = _login.find("input").eq(0)
		let _pwd = _login.find("input").eq(1)
		

		if(_user.val()=="" || _pwd.val()==""){
			alert ("attenzione campi non compilati")
		}
		else{
			let user = _user.val();
			let pwd=_pwd.val();
			const url = `http://localhost:3000/utenti?nome=${user}`
			let rq = inviaRichiesta("GET", url);
			rq.fail(errore)
			rq.done(function(data){	
				console.log(data);
				if(data.length==0){
					alert("Inserire un utente valido");
					window.location.reload(); // refresh della pagina
				}
				else{
					if(data[0].password!=_pwd.val()){
						alert("Password errata");
						window.location.reload(); // refresh della pagina
					}
					else{
						alert("Benvenuto!");
						window.location.href=("index.html"); // apre nuova pagina
					}
				}
			})	
		}
	})
}) 