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
            let request= inviaRichiesta("patch",URL+"/quadri/"+quadriArtista.id,{
                "nLike":quadriArtista[numeroQuadro].nLike+1
            });
            request.error(errore);
            //corregggere
            request.done(visualizzaQuadro(elencoQuadri[numeroQuadro],$("input[type='radio']:checked").prop("artista").gender));
        })
        if(quadriArtista.img.includes("base64,")){
            $("<img>").prop("src",+quadriArtista.img).appendTo(_img);
        }
        else{
            $("<img>").prop("src","img/"+quadriArtista.img).appendTo(_img);
        }

    }
    ///todo sistemare
    _btnNext.on("click",function(){
        _btnPrev.prop("disabled",false);
        numeroQuadro++;
        visualizzaQuadro(elencoQuadri[numeroQuadro],$("input[type='radio']:checked").prop("artista").gender);
        if(numeroQuadro==elencoQuadri.length-1){
            $(this).prop("disabled",true);
        }

    });
    _btnPrev.on("click",function(){
        _btnNext.prop("disabled",false);
        numeroQuadro--;
        if(numeroQuadro==0){
            $(this).prop("disabled",true);
        }
        else{
            visualizzaQuadro(elencoQuadri[numeroQuadro],$("input[type='radio']:checked").prop("artista").gender);
        }

    });
})
