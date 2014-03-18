define([
    'backbone',
    'tmpl/scoreboard',
    'collections/scores'
], function(
    Backbone,
    tmpl,
    collection
){

    var View = Backbone.View.extend({
        template: tmpl,
        className: "#scoreboard",
        initialize: function () {

        },
        render: function () {

        },
        show: function () {
            for(var i=0, len=localStorage.length; i<len; i++) {
                var key = localStorage.key(i);
                var value = localStorage[key];
                console.log(key + " => " + value);
            }
            collection.fetch({reset : true});
            var tm = this.template;
            var clName = this.className;
            $(clName).html("Loading");
            collection.on("reset",function(){
                $(clName).html(tm(collection.toJSON()));
                $(clName).trigger( "show" );
            });
            
            //this.$el.style.display = 'none';
        },
        hide: function () {
            //this.$el.style.display = 'none';
            // TODO
        }

    });

    return new View();
});