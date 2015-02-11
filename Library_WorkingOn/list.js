(function(window) {

	var list = (function() {
		function list(params){
			this.items = [];
		}
		list.prototype = {
			add:function(item){
				this.items.push(item);
			},
			remove:function(item){
				var indexOf=this.items.indexOf(item);
				if(indexOf!=-1){
					this.items.splice(indexOf, 1);
				}
			},
			find:function(item){

			}
		};
		return list;
	})();

	list.Create = function(params) {
		return new list(params);
	}
	window.list=list;

})(window);