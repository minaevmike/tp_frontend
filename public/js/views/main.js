define([
    'backbone',
    'tmpl/main'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({
        el: '#page',
        template: tmpl,
        initialize: function () {
            // TODO
        },
        render: function () {
            this.$el.html(this.template());
        },
        show: function () {
            this.render(); 
        },
        hide: function () {
            console.log("Main hide");
        }

    });

    return new View();
});