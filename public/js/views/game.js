define([
    'backbone',
    'tmpl/game',
    'views/gameOver',
    'mechanics/mechanics',
    'tmpl/console'
], function(
    Backbone,
    tmpl,
    gameOver,
    game,
    consol
){

    var View = Backbone.View.extend({
        template: tmpl,
        con:consol,
        className: "#game",
        initialize: function () {
        },
        render: function () {
            $(this.className).html(this.con());
            require(['console'], function (console) {
                
            });
            $(this.className).on( "start", function(){
                $("#console").hide();
                game.start(gameOver);

            });
            $(this.className).on('action', function(event, param){
                par = param.split(' ');
                if(par[0] == 1){
                    game.move(par[1]);
                }
                if(par[0] == 2){
                    if(par[1] == 1)
                        game.accelerationX(par[2]);
                    if(par[1] == 2)
                        game.accelerationY(par[2]);
                }
                if(par[0] == 3){
                    game.shoot();
                }
                //console.log('ping', param);
            });
            /*$(this.className).html(this.template());
            $('[name="button_finish"]').click(function(){
                $(this.className).hide();
                gameOver.show();
            });
            game.start(gameOver);*/
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