
$(document).ready(function(){
    
	let _wr = $("#wrapper");
	$("#btnVisualizza").on("click",function(){
		let address = $("#txtIndirizzo").val();
		if(address==""){
			alert("Inserisci un indirizzo valido");
		}
		else{
			geocoder.geocode( {'address': address}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK)
				disegnaMappa(results[0]);
				else
				alert("Stringa immessa non valida");
				});
				
		}
	});
	function disegnaMappa(geocoderResult){
		let mapOpt = {
			"center":geocoderResult.geometry.location,
			"zoom":17
		};
		let mappa = new google.maps.Map(_wr[0],mapOpt);
		let marker = new google.maps.Marker({
			"map":mappa,
			"position":geocoderResult.geometry.location,
			"title":"I.I.S G. Vallauri"
		});
		let infoWindow = new google.maps.InfoWindow({
			"content":"Vallauri"
		});
		marker.addListener("click",function(){
			infoWindow.open(mappa,marker);
		})
	}

})