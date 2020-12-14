"use strict"

 $(document).ready(function(){
     let _header = $("#header");
     let _wr = $("#wrapper");
     let _timer=$("#timer");

     lampeggioHeader();
     let sec=0;
     let intervallo=setInterval(function(){aggiornaTimer();sec++;},1000);

     
     function lampeggioHeader(){
          _header.animate({"width":60*15,"height":6*15,"fontSize":2*15},1500,generaDomande);
     }
     
     function generaDomande(){
          for (const item of elencoDomande) {
               let _fieldset = $("<fieldset>");
               _fieldset.appendTo(_wr);
               let _legend = $("<legend>");
               _legend.html(item.argomento)
               _legend.css({"color":"blue","fontSize":"12pt"})
               _fieldset.append(_legend);
               let i=0;
               for (const domanda of item.domande) {
                    let _label = $("<label>");
                    _label.addClass("domanda");
                    _label.html(domanda.domanda);
                    _fieldset.append(_label);
                    let _radio1=$("<input>");
                    _radio1.attr("type","radio");
                    _radio1.attr("name",`radioDomanda${domanda.domanda}`);
                    _fieldset.append(_radio1);
                    let _labelRadio1 = $("<label>"); 
                    _labelRadio1.html("T");
                    _fieldset.append(_labelRadio1);
                    _radio1.attr("id",`radio${i}V`);
                    let _radio2=$("<input>");
                    _radio2.attr("id",`radio${i}F`);
                    _radio2.attr("type","radio");
                    _radio2.attr("name",`radioDomanda${domanda.domanda}`);
                    _fieldset.append(_radio2);
                    let _labelRadio2 = $("<label>"); 
                    _labelRadio2.html("F");
                    _fieldset.append(_labelRadio2);
                    _fieldset.children("input[type=radio]").first().val("T");
                    _fieldset.children("input[type=radio]").last().val("F");
                    if(domanda.risposta=="F"){
                        _radio2.attr("corretta","T");
                         _radio1.attr("corretta","F");
                    }
                    else{
                         _radio1.attr("corretta","T");
                         _radio2.attr("corretta","F");
                    }
                    _fieldset.append($("<br>"));
               }
               
          }
          let _invia = $("<button>");
          _invia.attr("id","invia");
          _invia.html("invia");
          _invia.on("click",invia);
          _invia.addClass("invia")
          _wr.append(_invia);
          generaTimer();
     }

     function generaTimer(){
          let _minuti = $("<span>");
          let _sep = $("<p>");
          _sep.html(":");
          let _secondi = $("<span>");
          let css={"display":"inline"};
          _minuti.css(css);
          _sep.css(css);
          _secondi.css(css);
          _timer.append(_minuti);
          _timer.append(_sep);
          _timer.append(_secondi);
     }

     function aggiornaTimer(){
          let minuti=_timer.children("span").first().html(parseInt(pad(sec/60)));
          _timer.children("span").last().html(pad(sec-(60*parseInt(minuti.html()))));
          if(minuti.html()=="2"){
               clearInterval(intervallo);
               invia();
          }
     }

     function invia(){
          clearInterval(intervallo);
          let _btnInvia=$("#invia");
          _btnInvia.off();
          _btnInvia.css({"backgroundColor":"#CCC","color":"#999"});
          let punti=0;
         _wr.find("label").filter(".domanda").each(function(i,ref){
              let _radio1=_wr.find("input").eq(i*2);
              let _radio2=_wr.find("input").eq((i*2)+1);
               if(_radio1.is(":checked")){
                    if(_radio1.attr("corretta")=="T"){
                         punti++;
                    }
                    else{
                         punti--;
                         _wr.find("label").not(".domanda").eq(i*2).css({"color":"#F00"});
                    }
               }
               else if(_radio2.is(":checked")){
                    if(_radio2.attr("corretta")=="T"){
                         punti++;
                    }
                    else{
                         punti-=0.25;
                         _wr.find("label").not(".domanda").eq((i*2)+1).css({"color":"#F00"});
                    }
               }
               
         });
         alert(punti);
     }
 });



 
// Una semplice funzione per aggiungere uno 0 davanti ad un numero < 10
function pad(number) {
     return (number < 10 ? '0' : '') + number;
}
