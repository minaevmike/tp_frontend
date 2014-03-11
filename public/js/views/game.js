define([
    'backbone',
    'tmpl/game'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({
        template: tmpl,
        className: "#game",
        initialize: function () {
            // TODO
        },
        render: function () {
            $(this.className).html(this.template());
        },
        show: function () {
            $(this.className).trigger( "show" );
        },
        hide: function () {
            //this.$el.style.display = 'none';
        }

    });

    return new View();
});