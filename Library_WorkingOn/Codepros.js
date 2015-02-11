(function(window,google,list){

	var Codepros=(function(){
		//Constructor
		function Codepros(element,mapOption){
			this.gMap = new google.maps.Map(element,mapOption);
			this.markers=list.Create();
		}
		Codepros.prototype={
			Zoom:function(zoomLevel){
				if(zoomLevel){
					this.gMap.setZoom(zoomLevel);
				} else {
					return this.gMap.getZoom();
				}
			},
			Center:function(LatLng){
				if(LatLng){
					this.gMap.setCenter(LatLng);
				} else {
					return this.gMap.getCenter();
				}
			},
			_on:function(options){
				google.maps.event.addListener(options.obj,options.event,options.callback);
			},
			CreateMarker:function(options){
				var marker;
				options.position={
					lat:options.lat,
					lng:options.lng
				};
				marker = this._AddMarker(options);
				this.markers.add(marker);
				if(options.event){
					this._on({
						obj:marker,
						event:options.event.name,
						callback:options.event.callback
					})
				}
				if(options.content){
					this._on({
						obj:marker,
						event:'click',
						callback:function(){
							var infoWindow = new google.maps.InfoWindow({
								content:options.content
							});
							infoWindow.open(this.gMap,marker);
						}
					});
				}
				return marker;
			},
			_AddMarker:function(options){
				options.map=this.gMap;
				return new google.maps.Marker(options);
			},
			AddInfoWindow:function(content,marker){
				this._on({
					obj:marker,
					event:'click',
					callback:function(){
						var infoWindow=new google.maps.InfoWindow({
							content:content
						});
						infoWindow.open(this.gMap,marker);
					}
				})
			},
			RemoveMarker:function(marker){
				var indexOf=this.markers.indexOf(marker);
				if(indexOf!=-1){
					this.markers.splice(indexOf,1);
					marker.setMap(null);
				}
			}
		};
		return Codepros;
	})();
	Codepros.CreateNew=function(element,mapOption){
		return new Codepros(element,mapOption);
	}
	window.Codepros=Codepros;
})(window,google,list);