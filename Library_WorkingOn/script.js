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