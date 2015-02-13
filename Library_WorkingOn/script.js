(function(window,$){

	
	var myMap = $('#container').codepros({
		center:new google.maps.LatLng(33,33),
		zoom:9
	});
	myMap.codepros('addMarker',{
		lat:33,
		lng:33,
		content:'hello'
	});
	myMap.codepros('addMarker',{
		lat:33.1,
		lng:33.1,
		content:'hello b5she'
	})
	myMap.codepros('addMarker',{
		location:'damascus'
	});
	/*var matches = myMap.codepros('removeMarkers',function(marker){
		return marker.lat===33;
	})
	console.log(matches);
	var currentzoom = myMap.codepros('Zoom');
	console.log(currentzoom);
	var markers = myMap.codepros('getAllMarkers');
	console.log(markers);
	myMap.codepros('addMarker',{
		location:'damascus'
	});*/
})(window,jQuery)