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
	myMap.AddInfoWindow("<div style='color:red;'>Hello</div>",myMap.CreateMarker({
		lat:33,
		lng:32
	}));
	console.log(myMap.markers);
})(window,window.Codepros)