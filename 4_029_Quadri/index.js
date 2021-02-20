"option strict"

const URL = "http://localhost:3000"

$(function () {
    let _head = $('.head');
    let _info = $('.info');
    let _img = $('.img');
    let _btnPrev = $('button').eq(0);
    let _btnNext = $('button').eq(1);
    _btnPrev.prop("disabled", true)
    let numeroQuadro=0;
    let elencoQuadri;

	let _wrapperAdd = $('.wrapper').eq(1);

    let request=inviaRichiesta("get",URL+"/artisti");
    request.done(function(artisti){
        for (const artista of artisti) {
            let _label=$("<label>");
            _label.appendTo(_head);
            let _radio = $("<input type='radio'>")
            _radio.appendTo(_label);
            _radio.prop("artista",artista);
            _radio.prop("name","optArtisti");
            _label.append(artista.name);
            
            //_label.html(`${_label.html()} ${artista.name}`);//DA EVITARE PER ERRORI SU PROP
        }
        
        let n = generaNumero(0,artisti.length-1);

        let _selRadio=$("input[type='radio']").eq(n);
        _selRadio.prop("checked", true);
        _wrapperAdd.children("h1").html(`Inserisci un nuovo quadro di ${_selRadio.prop("artista").name}`);
        let idArtista=_selRadio.prop("artista").id;
        inviaRichiestaQuadro(idArtista,_selRadio.prop("artista").gender);
    });
    request.fail(errore);

    _head.on("click", "input",function(){
        _btnPrev.prop("disabled",true);
        _btnNext.prop("disabled",false);
        numeroQuadro=0;
        let id = $(this).prop("artista").id;
        let gender = $(this).prop("artista").gender;
        _wrapperAdd.children("h1").html(`Inserisci un nuovo quadro di ${$("input[type='radio']:checked").prop("artista").name}`);
        inviaRichiestaQuadro(id,gender);
    });

    function inviaRichiestaQuadro(idArtista,gender){
        let request=inviaRichiesta("get",URL+"/quadri?artist="+idArtista);
        request.done(function(quadriArtista){
            visualizzaQuadro(quadriArtista[numeroQuadro],gender);//potrei rifare anche una chiamata
            elencoQuadri=quadriArtista;
        });
        request.fail(errore);
    }
    function visualizzaQuadro(quadriArtista,gender){
        _info.empty();
        _img.empty();
        $("<p>").html(`ID: ${quadriArtista.id}`).appendTo(_info);
        $("<p>").html(`Titolo: ${quadriArtista.title}`).appendTo(_info);
        $("<p>").html(`Genere: ${gender}`).appendTo(_info);
        let _p=$("<p>").html(`Like: ${quadriArtista.nLike}`).appendTo(_info);
        let _imgLike = $("<img>").prop("src","like.jpg").addClass("like").appendTo(_p);
        _imgLike.on("click",function(){
            let request= inviaRichiesta("patch", URL +"/quadri/"+quadriArtista.id,{
                
                "nLike":elencoQuadri[numeroQuadro].nLike+1
            });
            request.error(errore);
            //corregggere
            request.done(function(quadro){
                elencoQuadri[numeroQuadro].nLike= elencoQuadri[numeroQuadro].nLike+1;
                visualizzaQuadro(elencoQuadri[numeroQuadro],$("input[type='radio']:checked").prop("artista").gender)});
        })
        if(quadriArtista.img.includes("base64,")){
            $("<img>").prop("src",quadriArtista.img).appendTo(_img);
        }
        else{
            $("<img>").prop("src","img/"+quadriArtista.img).appendTo(_img);
        }

    }
    _btnNext.on("click",function(){
        _btnPrev.prop("disabled",false);
        numeroQuadro++;
        if(numeroQuadro==elencoQuadri.length-1){
            $(this).prop("disabled",true);
        }
        visualizzaQuadro(elencoQuadri[numeroQuadro],$("input[type='radio']:checked").prop("artista").gender);
    });
    _btnPrev.on("click",function(){
        _btnNext.prop("disabled",false);
        numeroQuadro--;
        if(numeroQuadro==0){
            $(this).prop("disabled",true);
        }
        visualizzaQuadro(elencoQuadri[numeroQuadro],$("input[type='radio']:checked").prop("artista").gender);
        

    });

    let _btnSalva=$("#btnSalva");
    let _txtImg=$("#immagine");
    let _txtTitolo=$("#titolo");
    let _btnAnnulla=$("#btnAnnulla");

    _btnSalva.on("click",function(){
        if(_txtTitolo.val()==="" || _txtImg.prop("files"==="")){
            alert("Compilare correttamente i campi");
        }
        else{
            let fileName = _txtImg.prop("files")[0];//sempre array, per più file mettere in html multiple
            let reader = new FileReader();
            reader.readAsDataURL(fileName);//metodo asincrono al cui termine richiama evento onloadend
            reader.onloadend = function() {
                console.log('RESULT', reader.result);
                let codArtista=$("input[type='radio']:checked").prop("artista").id;
                let jsonAus ={
                    //se non passo  id, json-server lo mette in automatico a +1 dal maggiore
                    "artist": codArtista,
                    "title": _txtTitolo.val(),
                    "img": reader.result,
                    "nLike": 0
                };
                let request=inviaRichiesta("post", URL +"/quadri",jsonAus);
                request.error(errore);
                request.done(function(data){
                    console.log(data);
                    alert("Quadro aggiunto correttamente");
                    inviaRichiestaQuadro(codArtista);
                })
            }
            
        }
    })
})
