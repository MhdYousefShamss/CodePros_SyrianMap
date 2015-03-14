(function(window,Codepros){

	var myMap = Codepros.CreateNew(document.getElementById("container"),{
		center: new google.maps.LatLng(33,36),
		zoom:7,
		geocoder:true
	});
	var input = document.getElementById("text-field");
	//myMap.gMap.controls[google.maps.ControlPosition.TOP].push(input);
	myMap.PushControl(input,'top');
	myMap.AutoComplete(input);
	myMap.GetDirections({
		start:new google.maps.LatLng(13.687140112679154, 100.53525868803263),
		end:new google.maps.LatLng(13.683660045847258, 100.53900808095932),
		travelMode:"walking"
	});
	/*var marker = myMap.CreateMarker({
		lat:33.1,
		lng:33,
		id:1,
		content:"hello",
		draggable:true,
		event:{
			name:'dragend',
			callback:function(){
				alert("teze");
			}
		}
	});
	var marker1 = myMap.CreateMarker({
		lat:33.1,
		lng:33.1,
		content:"hello1",
		draggable:true,
		event:{
			name:'dragend',
			callback:function(){
				alert("teze");
			}
		}
	});*/
	/*myMap.GetDirections({
		start:132,
		end:123,
		travelMode:'walking'
	});*/
	/*var matches = myMap.FindBy(function(marker){
		return marker.id === 1;
	});
	//console.log(matches);
	myMap.RemoveBy(function(marker){
		return marker.id === 1;
	});*/
	/*myMap.Geocode({
		location:"Damascus",
		success: function(results){
			console.log(results);
		},
		error: function(){
			console.log("5ra");
		}
	});*/
	/*myMap.GetCurrentPosition(function(position){
		myMap.CreateMarker({
			lat:position.coords.latitude,
			lng:position.coords.longitude
		})
	});*/
	myMap.MarkCurrentPosition();

})(window,window.Codepros)