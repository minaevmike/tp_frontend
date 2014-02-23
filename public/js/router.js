define([
    'backbone',
    'views/scoreboard',
    'views/main',
    'views/game'
], function(
     Backbone,
     scoreboard,
     main,
     game
){

    var lastScreen = "main";
    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            '*default': 'defaultActions'
        },
        defaultActions: function () {
            main.show();
            if(lastScreen == "scoreboard"){
                scoreboard.hide();
            }
            if(lastScreen == "game"){
                game.hide();
            }
            lastScreen = "main";
        },
        scoreboardAction: function () {
            scoreboard.show();
            if(lastScreen == "main"){
                main.hide();
            }
            lastScreen = "scoreboard";
        },
        gameAction: function () {
            game.show();
            if(lastScreen == "main"){
                main.hide();
            }
            lastScreen = "game";
        }
    });

    return new Router();
});