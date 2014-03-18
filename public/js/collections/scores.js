define([
    'backbone',
    'models/score'
], function(
    Backbone,
    score
){

    var Collection = Backbone.Collection.extend({
    	model: score,
    	url: '/scores',
    	comparator: function(item) {
    		return -item.get('score');
    	},
        fetch : function() {
            var collection = this;
            $.ajax({
                type : "GET",
                url : this.url,
                dataType : 'json',
                success : function(data) {
                    //setTimeout(function(){collection.reset(data)},1000);
                    collection.reset(data);
                }
            });
        }
    });

    return new Collection();
});