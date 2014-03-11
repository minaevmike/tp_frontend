define([
    'backbone',
    'views/scoreboard',
    'views/main',
    'views/game',
    'views/viewManager'
], function(
     Backbone,
     scoreboard,
     main,
     game,
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
            game.show();
        }
    });

    return new Router();
});