"use strict"

let _form1;
$(document).ready(function(){
    _form1=$("#form1");
})

function visualizza(codice){
    let msg = "";
    let _chk;
    let _opts;
    switch(codice){
        case 1:
            msg = _form1.find("input[type=text]:first-of-type").val();
            break;
        case 2:
            //msg=_form1.children("label:nth-of-type(2)");
            //msg=_form1.children("label").eq(1);
            msg=_form1.children("label").filter(":nth-of-type(2)").children("select").val();
            break;
        case 3:
            _chk=_form1.children("fieldset").eq(0).find("input[type=checkbox]");
            // forof restituisce puntatore js
            //posso usare each()
            for (let i = 0; i < _chk.length; i++) {
                msg+=_chk.eq(i).prop("name")+" - "+_chk.eq(i).val()+"\n";// eq perchè [] js
            }
            break;
        case 4:
            //
            _chk=_form1.children("fieldset").eq(0).find("input[type=checkbox]:checked");
            _chk.each(function(i,ref){
                //msg+=$(this).prop("name")+" - "+$(this).val()+"\n";
                //msg+=$(ref).prop("name")+" - "+$(ref).val()+"\n";
                msg+=_chk.eq(i).prop("name")+" - "+_chk.eq(i).val()+"\n";
            })
            break;
        case 5:
            _chk=_form1.children("fieldset").eq(0).find("input[type=checkbox]").not(":checked");
            _chk.each(function(i,ref){
                msg+=$(ref).prop("name")+" - "+$(ref).val()+"\n";
            })
            break;
        case 6:
            _opts=_form1.children("fieldset:nth-of-type(2)").find("input[type=radio]");//enum
            if (_opts.is(":checked")){//se uno qualunque è checkato
                msg=_opts.filter(":checked").val();
            }
            else{
                msg="Nessun OPT selezionato";
            }
            break;
        case 7:
            _opts=_form1.children("fieldset:nth-of-type(2)").find("input[type=radio]").not(":checked");
            _opts.each(function(i,ref){
                msg+=$(ref).val()+"\n";
            })
            break;
        case 8:
            //let _select=_form1.children("select:last-of-type");
            let _select=_form1.find("select").last();//ultimo elemento di una collezzione
            /*_select.children("option:selected").each(function(i,ref){
                msg+=$(ref).val()+"\n";
            })*/
            //se utilizzo val su collezzione mi restituisce enum con tutti val
            let _selected=_select.val();
            for (const item of _selected){
                msg+=item+"\n";
            }
            break;
    }
    alert(msg);
}

function imposta (codice){
    switch(codice){
        case 1:
            _form1.find("input[type=text]").first().val("Nuovo valore");
            break;
        case 2: 
        
    }
}

