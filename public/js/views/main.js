define([
    'backbone',
    'tmpl/main',
    'jquery'
], function(
    Backbone,
    tmpl,
    $
){

    var View = Backbone.View.extend({
        template: tmpl,
        className: "#main",
        initialize: function () {
            // TODO
        },
        render: function () {
            $(this.className).html(this.template());
        },
        show: function () {
            $(this.className).trigger( "show" );
            //console.log($(this.className))
            //$(this.className).trigger('show');
        },
        hide: function () {
            //this.$el.style.display = 'none';
        }

    });

    return new View();
});