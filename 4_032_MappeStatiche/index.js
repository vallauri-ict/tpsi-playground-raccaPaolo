"use strict";

const URL = "https://maps.googleapis.com/maps/api/staticmap"
const key  = key

const params = {
	"key":key,
	"center": "via san michele 68, fossano", //"44.5557763,7.7347183",
	"location": "via san michele 68, fossano", //"44.5557763,7.7347183",
	"zoom":16,
	"size":"800x600",	
	// maptype viene aggiunto dopo  manualmente
	"markers":"color:blue|size:big|label:V|44.5557763,7.7347183",
	"heading":"-60",
	"pitch":"7",
	"fov":"45",
}
const mapType = ['roadmap', 'satellite', 'hybrid', 'terrain', 'streetview'];



window.onload = function () {	
    let imgBox = $("#imgBox");
    let btnBox = $("#btnBox");
	for (const item of mapType) {
		let _btn = $("<button>");
		_btn.html(item);
		_btn.appendTo(btnBox);
		_btn.on("click",visualizzaMappa);
		
	}
	$("button").eq(0).trigger("click");
	function visualizzaMappa(){
		$("button").removeClass("active");
		$(this).addClass("active");
		imgBox.empty();
		let url;
		if($(this).html()!="streetview"){
			url = URL+"?"+setParams($(this).html());
			imgBox.prop("src",url);
		}
		else{
			url = URL + "/streetview?"+setParams($(this).html());
			url= url.replace("center","location");
			urt += "&heading="+""
		}
	}

	function setParams(mapType){
		let queryString="";
		for (const key in params) {
			queryString+=`${key}=${params[key]}&`;
		}
		queryString+="maptype="+mapType;
		console.log(mapType);
		return queryString;
	}
}