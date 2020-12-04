
var utenti = [ {"user":"pippo",  "pwd":"pwdPippo1"},
               {"user":"pluto",  "pwd":"pwdPluto2"},
			   {"user":"minnie", "pwd":"pwdMinnie3"} ];

			   
$(document).ready(function() {
   let _txtUser= $("#txtUser");
   let _spanMsg=$("#msgUser");
   let _txtPwd=$("#txtPwd");
   let _msgPwd=$("#msgPwd");

   _txtUser.on("change",function(){//svuoto anche la pwd
        _spanMsg.hide();
        _msgPwd.hide();
        _txtPwd.val("");
        _txtPwd.removeClass("nok");
        _txtPwd.addClass("ok");
        let user= _txtUser.val();
        if(user==""){
            _txtUser.removeClass("ok");
            _txtUser.addClass("nok");
            _spanMsg.text("Inserire un utente non vuoto");
            _spanMsg.css({"color":"#F00"});
            _spanMsg.fadeIn(2000, function(){    
            });
        }
        else{
        let userOk;
        for (const item of utenti) {
            if(user==item.user){
                userOk=true;
                break;
            }
        }
        if(userOk){
        _txtUser.removeClass("nok");
        _txtUser.addClass("ok");
        _spanMsg.text("Ok");
            _spanMsg.css({"color":"#0F0"});
            _spanMsg.fadeIn(2000, function(){    
            });
        }
        else{
            _txtUser.removeClass("ok");
            _txtUser.addClass("nok");
            _spanMsg.text("Inserire un utente valido");
            _spanMsg.css({"color":"#F00"});
            _spanMsg.fadeIn(2000, function(){    
            });
        }
       }
   });

   _txtPwd.on("change",function(){     
    _msgPwd.hide();   
    let password=_txtPwd.val();
    let reg=(/^((?=.*\d)((?=.*[A-Za-z])).{8,})$/);
    if(reg.test(password)){   
        let pwdOk;
        for (const item of utenti) {
            if(item.user==_txtUser.val()&&password==item.pwd){
                pwdOk=true;
                break;
            }
        }
        if(pwdOk){
            _txtPwd.removeClass("nok");
            _txtPwd.addClass("ok");
            _msgPwd.text("Ok");
            _msgPwd.css({"color":"#0F0"});
            _msgPwd.fadeIn(2000, function(){    
           });
        }
        else{
            _txtPwd.removeClass("ok");
            _txtPwd.addClass("nok");
            _msgPwd.text("Password errata");
            _msgPwd.css({"color":"#F00"});
            _msgPwd.fadeIn(2000, function(){    
           });
        }
    }
    else{
        _txtPwd.removeClass("ok");
        _txtPwd.addClass("nok");
        _msgPwd.text("Inserire una password valida");
        _msgPwd.css({"color":"#F00"});
        _msgPwd.fadeIn(2000, function(){    
        });
    }
    });

   $('input').hover(function(){
       $(this).addClass("over");
   },
   function(){
    $(this).removeClass("over");
});


	
});