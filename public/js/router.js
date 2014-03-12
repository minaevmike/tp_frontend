define([
    'backbone',
    'views/scoreboard',
    'views/main',
    'views/game',
    'views/gameOver',
    'views/viewManager'
], function(
     Backbone,
     scoreboard,
     main,
     game,
     gameOver,
     viewManager
){

    var lastScreen = "";
    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            '*default': 'defaultActions'
        },
        defaultActions: function () {
            viewManager.add(main);
            main.show();
        },
        scoreboardAction: function () {
            viewManager.add(scoreboard);
            scoreboard.show();
        },
        gameAction: function () {
            viewManager.add(game);
            viewManager.add(gameOver);
            gameOver.hide();
            game.show();
            //game.gameOver();
        }
    });

    return new Router();
});