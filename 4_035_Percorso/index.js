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
		if (partenza.val() == "" || arrivo.val() == "") {
			alert("Prego compilare i campi di partenza e arrivo")
		}

		else{	
			let geocoder = new google.maps.Geocoder();
			geocoder.geocode( {'address': partenza.val()}, function(resultsP, status) {
				if (status != google.maps.GeocoderStatus.OK){
					alert("Stringa immessa non valida");
				}
				else{
					geocoder.geocode( {'address': arrivo.val()}, function(resultsA, status) {
						if (status != google.maps.GeocoderStatus.OK){
							alert("Stringa immessa non valida");
						}
						else{
							let coorPart = resultsP[0].geometry.location;
							let coorArr = resultsA[0].geometry.location;
							visualizzaPercorso(coorPart,coorArr);
						}	
					});	
				}					
			});
			}
				
		
	});

	
	function visualizzaPercorso(start,arrive){
		let renderOptions = {
				polylineOptions: {
				strokeColor : "rgb (A, A, A)",
				strokeWeight : 6,
				zIndex : 100
				}
			}
			
		let directionsService = new google.maps.DirectionsService();
		let directionsRenderer ;
		let params={"origin":start,"destination":arrive,"travelMode":google.maps.TravelMode.DRIVING};//driving default
		
		directionsService.route(params,function(routes,status){
			if(status!=google.maps.DirectionsStatus.OK){
				alert("Percorso non valido");
			}
			else{
				let mapOptions={
					"center":start,
					"zoom":16,
					"mapTypeId":google.maps.MapTypeId.HYBRID//default ROADMAP
					 
				}
				let mappa = google.maps.Map(map,mapOptions);
				for (let i = 0; i < routes.routes.length; i++) {
					let color;
					if(i==0){
						color = "blue";
					}
					else{
						color = "rgb (A, A, A)";
					}
					let renderOptions = {
						polylineOptions: {
						strokeColor : color,
						strokeWeight : 6,
						zIndex : 100-i
						}
					}
					directionsRenderer = new google.maps.DirectionsRenderer(renderOptions);
					directionsRenderer.setMap(mappa);
					directionsRenderer.setRouteIndex(i);
					directionsRenderer.setDirections(routes);
					
				}
				directionsRenderer.setPanel(panel);
				let distanza = routes.routes[0].legs[0].distance.text;
				let tempo = routes.routes[0].legs[0].duration.text;
				msg.html("Distanza: "+distanza+"<br>Tempo previsto: "+tempo);
			}
		})
	}


});