"use strict"

$(document).ready(function(){
	let header =$("#header")
	let button = header.children("input")
	let partenza = header.find("input").eq(0)
	let arrivo = header.find("input").eq(1)
	let wrapper = $("#wrapper") 
	let map =  wrapper.children(".map")[0]     // js
	let panel= wrapper.children(".panel")[0]   // js
	let msg =  wrapper.children(".msg") 


	button.on("click", function(){
		if (partenza.val() == "" || arrivo.val() == "") 
			alert("Prego compilare i campi di partenza e arrivo")
		else{	

			let geocoder = new google.maps.Geocoder();
			geocoder.geocode({'address':partenza.val()},function(resultStart,status){
				if(status!=google.maps.GeocoderStatus.OK)
					alert("Stringa immessa non valida");
				else
				{
					geocoder.geocode({'address':arrivo.val()},function(resultArrivo,status){
						if(status!=google.maps.GeocoderStatus.OK)
							alert("Stringa immessa non valida");
						else
						{
							let coordStart = resultStart[0].geometry.location;
							let coordArrivo = resultArrivo[0].geometry.location; 
							visualizzaPercorso(coordStart,coordArrivo);
						}
					})
				}
			})
		}
	})

	function visualizzaPercorso(start,arrive)
	{
		let directionsService = new google.maps.DirectionsService();
		let directionsRenderer = new google.maps.DirectionsRenderer();
		let percorso = {
			"origin": start,
			"destination": arrive,
			"travelMode": google.maps.TravelMode.DRIVING // default
		}; 

		directionsService.route(percorso, function(routes,status){
			if (status == google.maps.DirectionsStatus.OK) {
				let mapOptions = {
					"center":start,
					"zoom":16,
					//"mapTypeId": google.maps.MapTypeId.HYBRID
				}
				let mappa = new google.maps.Map(map, mapOptions);
				directionsRenderer.setMap(mappa);
				directionsRenderer.setDirections(routes);
			   // Pannello contenente tutte le indicazioni sul percorso
				directionsRenderer.setPanel(panel);
				let distanza = routes.routes[0].legs[0].distance.text;
				let tempo = routes.routes[0].legs[0].duration.text;
				msg.html("Distanza: " + distanza + "</br>Tempo di percorrenza: " + tempo);
			}
			else
			{
				alert("Percorso non valido!");
			}		   
		});
	}
});