define(['backbone','jquery'],
	function (Backbone, $){
		var views = new Array();
		var View = Backbone.View.extend({
			add: function (view){			
				if($.inArray(view.className, views) == -1){
						$('body').append($('<div/>', {id: view.className.replace('#','')}));
						$(view.className).on( "show", function() {
							var view = "#" + $(this).attr("id");
							for (var i = views.length - 1; i >= 0; i--) {
								if(views[i] == view){
									$(views[i]).show();
								}
								else{
									$(views[i]).hide();
								}							
							};
					});
					views.push(view.className);
					view.render();
				}
			}

		});

		return new View();
	});