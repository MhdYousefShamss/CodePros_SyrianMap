(function(window,google,list){

	var Codepros=(function(){
		//Constructor
		function Codepros(element,mapOption){
			this.gMap = new google.maps.Map(element,mapOption);
			this.markers=list.Create();
			//Remember To Provide a Style for a Cluterer
			//Cuz it Needs a VPN Connection to get the default.
			this.markerClusterer = new MarkerClusterer(this.gMap , []);
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
				if(this.markerClusterer){
				this.markerClusterer.addMarker(marker);	
				}
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
					})
				}
				return marker;
			},
			_AddMarker:function(options){
				options.map=this.gMap;
				return new google.maps.Marker(options);
			},
			/*AddInfoWindow:function(content,marker){
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
			},*/
			RemoveMarker:function(marker){
				var indexOf=this.markers.indexOf(marker);
				if(indexOf!=-1){
					this.markers.splice(indexOf,1);
					marker.setMap(null);
				}
			},
			FindBy:function(callback){
				return this.markers.find(callback);
			},
			RemoveBy:function(callback,action){
				var self = this;
				return self.markers.find(callback,function(markers){
					markers.forEach(function(marker){
						if(self.markerClusterer){
							self.markerClusterer.removeMarker(marker);
						} else {
							marker.setMap(null);							
						}
					});
				})
			},
			GetDirections:function(directionOption){
				switch(directionOption.travelMode){
					case 'driving':
					directionOption.travelMode = google.maps.TravelMode.DRIVING;
					break;
					default:
					directionOption.travelMode= google.maps.TravelMode.WALKING;
					break;
				}
				var directionsService = new google.maps.DirectionsService(),
					directionsDisplay = new google.maps.DirectionsRenderer(),
					bounds = new google.maps.LatLngBounds();
					directionsDisplay.setMap(this.gMap);
				if(directionOption.panel){
					directionsDisplay.setPanel(document.getElementById(directionOption.panel));
				}
				bounds.extend(directionOption.start);
				bounds.extend(directionOption.end);
				this.gMap.fitBounds(bounds);
				var request = {
					origin : directionOption.start,
					destination : directionOption.end,
					travelMode : directionOption.travelMode
				};
				directionsService.route(request,function(response,status){
					if(status == google.maps.DirectionsStatus.OK){
						directionsDisplay.setDirections(response);
						directionsDisplay.setMap(this.gMap);
					} else {
						alert("not OK");
					}
				});
			}
		};
		return Codepros;
	})();
	Codepros.CreateNew=function(element,mapOption){
		return new Codepros(element,mapOption);
	}
	window.Codepros=Codepros;
})(window,google,list);