(function(window,google,list){

	var Codepros=(function(){
		//Constructor
		function Codepros( element,mapOption ){
			this.gMap = new google.maps.Map(element,mapOption);
			this.markers=list.Create();
			//Remember To Provide a Style for a Cluterer
			//Cuz it Needs a VPN Connection to get the default.
			if(mapOption.markerClusterer){
				this.markerClusterer = new MarkerClusterer(this.gMap , []);	
			}
			if(mapOption.geocoder){
				this.geocoder = new google.maps.Geocoder();
			}
		}
		Codepros.prototype={
			Zoom:function( zoomLevel ){
				if(zoomLevel){
					this.gMap.setZoom(zoomLevel);
				} else {
					return this.gMap.getZoom();
				}
			},
			Center:function( LatLng ){
				if(LatLng){
					this.gMap.setCenter(LatLng);
				} else {
					return this.gMap.getCenter();
				}
			},
			_on:function( options ){
				google.maps.event.addListener(options.obj,options.event,options.callback);
			},
			CreateMarker:function( options ){
				var marker;
				//Error While Calling Need To Fix
				//Pass it to jQueryUI
				/*if(options.location){
					this.Geocode({
						address:options.location,
						success:function(results){
							results.forEach(function(result){
								options.position={
									lat : result.geometry.location.lat(),
									lng : result.geometry.location.lng()
								}
								marker = this._AddMarker(options);
								console.log(marker);
							})
							alert("Done");
						},
						error:function(status){
							console.error(status);
						}
					});
				} else {
					options.position={
					lat:options.lat,
					lng:options.lng
					};
					marker = this._AddMarker(options);
				}*/
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
			Geocode:function( geoCoderOptions ){
				this.geocoder.geocode({
					address : geoCoderOptions.location,
				},function(results,status){
					if(status === google.maps.GeocoderStatus.OK){
						geoCoderOptions.success.call(this,results,status);
					} else {
						geoCoderOptions.error.call(this,status);
					}
				})
			},
			FindBy:function( callback ){
				return this.markers.find(callback);
			},
			RemoveBy:function( callback,action ){
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
			GetDirections:function( directionOption ){
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
				//bounds.extend(directionOption.start);
				//bounds.extend(directionOption.end);
				//this.gMap.fitBounds(bounds);
				var request = {
					origin : directionOption.start,
					destination : directionOption.end,
					travelMode : directionOption.travelMode
				};
				directionsService.route(request,function(response,status){
					if(status == google.maps.DirectionsStatus.OK){
						directionsDisplay.setDirections(response);
					} else {
						alert("not OK");
					}
				});
			},
			GetCurrentPosition:function( callback ) {
				var self = this;
				if(navigator.geolocation){
					navigator.geolocation.getCurrentPosition(function(position){
						//Self = Codepros
						//'this' in getCurrentPosition refers to navigator
						//console.log(self);
						callback.call(self,position);
					});
				}
			},
			MarkCurrentPosition:function(){
				this.GetCurrentPosition(function(position){
					//console.dir(position);
					var objPosition = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
					this.Center(objPosition);
					this.Zoom(16);
					this.CreateMarker({
						lat:objPosition.lat(),
						lng:objPosition.lng()
					});
				})
			}
		};
		return Codepros;
	})();
	Codepros.CreateNew=function( element,mapOption ){
		return new Codepros(element,mapOption);
	}
	window.Codepros=Codepros;
})(window,google,list);