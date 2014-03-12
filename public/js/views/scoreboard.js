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
            //collection.fetch({async : false});
            //collection.bind('reset', this.render, this);
            //is.listenTo(coll, "change", this.render);
            //this.listenTo(this.model, "change", this.render);
        },
        render: function () {
            //console.dir(collection.toJSON());
            //collection.sort();
            //console.dir(collection.toJSON());
            //$(this.className).html(this.template(collection.toJSON()));
        },
        show: function () {
            collection.fetch({reset : true});
            console.log(collection.toJSON());
            var tm = this.template;
            var clName = this.className;
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