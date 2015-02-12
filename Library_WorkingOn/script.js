(function(window,Codepros){

	var mapOption={
		center:new google.maps.LatLng(33,33),
		zoom:7
	};
	var element=document.getElementById("container");
	var myMap=Codepros.CreateNew(element,mapOption);
	var marker = myMap.CreateMarker({
		lat:33,
		lng:33,
		id:2,
		draggable:true,
		content:"Hello"
		/*event:{
			name:"click",
			callback:function(){
				myInfo.open(myMap.gMap,marker);
			}
		}*/
		//icon:'http://mapicons.nicolasmollet.com/wp-content/uploads/mapicons/shape-default/color-128e4d/shapecolor-color/shadow-1/border-dark/symbolstyle-white/symbolshadowstyle-dark/gradient-no/moose.png'
	});
	for (var i = 20; i >= 0; i--) {
		myMap.CreateMarker({
			lat:33.123234 + Math.random(),
			lng:32.123443 + Math.random(),
			id:2,
			content:'2'
		});
	};
	
})(window,window.Codepros)