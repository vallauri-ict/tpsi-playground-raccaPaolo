"use strict"

$(document).ready(function(){
	let _wrapper = $("#wrapper")[0];      // js
	let _coordinate = $("#coordinate")

	if(!navigator.geolocation) { 
		alert("il dispositivo in uso non è HTML5 e non supporta la geolocation")
		return
	}

	let gpsOptions = {
		enableHighAccuracy: false,
		timeout: 5000,		
		maximumAge: 0 // tempo max di presenza in cache della risposta (ms). se 0 ogni volta richiede la posizione
	}
	navigator.geolocation.getCurrentPosition(visualizzaPosizione, errore, gpsOptions)

    /* ******************************************************************** */

	function visualizzaPosizione(position){
		let posizione = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
		let mapOptions={
			"center":posizione,
			"zoom":16			 
		}
		let mappa = new google.maps.Map(_wrapper,mapOptions);
		let marker = new google.maps.Marker({"position":posizione,"map":mappa,"animation":google.maps.Animation.BOUNCE,"title":"Questa è la tua posizione"});
	}

	function errore(err) {
		let msg = `ERRORE: ${err.code} - ${err.message}`
		alert(msg)
		_coordinate.html(msg)
	}

});
