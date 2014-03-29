define([
    'backbone',
    'tmpl/game',
    'views/gameOver',
    'mechanics/mechanics'
], function(
    Backbone,
    tmpl,
    gameOver,
    game
){

    var View = Backbone.View.extend({
        template: tmpl,
        className: "#game",
        initialize: function () {
        },
        render: function () {
            $(this.className).html(this.template());
            $('[name="button_finish"]').click(function(){
                $(this.className).hide();
                gameOver.show();
            });
            game.start(gameOver);

            //init();
        },
        show: function () {
            $("#score").replaceWith( "<div id = \"score\">" + Math.ceil(Math.random() * 10000) + "</div>" );
            $(this.className).trigger( "show" );
            //$('body').append("<div id=\"gameOver\"> <form action=\"#\">Username: <input type=\"text\" name=\"name\" required> <input type=\"submit\"> </form> </div>");
            //$("#gameOver").hide();
        },
        gameOver: function() {
            //$("#gameOver").show();

        },
        hide: function () {
            //this.$el.style.display = 'none';
        }

    });

    return new View();
});