$(document).ready(function() {

	let _btnAvvia = $("#btnAvvia");
	_btnAvvia.on("click", eseguiAnimazione);
 
	function eseguiAnimazione(){ 
		_btnAvvia.hide();//!NB
		$("#pedina")
		.css({left:"10px",top:"260px", width:"15px", height:"15px"})
		.animate({left:'+=60px', width:"8px", height:"8px"},'1300')
		.animate({top:'+=38px',  width:"15px", height:"15px"},'1300')
		.animate({left:'+=116px',width:"8px", height:"8px"},'1300')
		.animate({top:'+=77px',  width:"15px", height:"15px"}, '1300')
		.animate({left:'+=250px',width:"8px", height:"8px"},'1300',function(){_btnAvvia.show();});//qui così viene eseguito al termine dell'ultima operazione della animazione
		/*  per lampeggio infinito$(this).stop(true);
		$(this).animate({"opacity":"1"});*/
	}
	
	lampeggioStart();
	
	//#region funzioni
	function lampeggioStart(){
			//x lampeggio infinito _btnAvvia.animate({opacity:0},900,function(){_btnAvvia.animate({opacity:1},900),lampeggioStart()});

		_btnAvvia.off("click");
		_btnAvvia.animate({opacity:0},900,function()
		{_btnAvvia.animate({opacity:1},900,function()
			{
				_btnAvvia.on("click", eseguiAnimazione);
			}
		)});

	}
	//#endregion

});
