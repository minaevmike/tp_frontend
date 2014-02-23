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
        el: '#page',
        template: tmpl,
        initialize: function () {
            collection.bind('reset', this.render, this);
            //is.listenTo(coll, "change", this.render);
            //this.listenTo(this.model, "change", this.render);
        },
        render: function () {
            //console.log(this.template());
            //this.$el.html(this.template(this.model.toJSON()));
            /*collection.fetch({
                success : function() {
                    self.$el.html(self.template());
                }
            });*/
            //console.log(collection.toJSON());
            console.dir(collection.toJSON());
            collection.sort();
            console.dir(collection.toJSON());
            this.$el.html(this.template(collection.toJSON()));
        },
        show: function () {
            console.log("show");
            //this.render();
            collection.fetch({reset : true});
        },
        hide: function () {
            console.log("Scoreboard Hide");
            // TODO
        }

    });

    return new View();
});