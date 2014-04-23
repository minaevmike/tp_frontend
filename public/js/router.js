define([
    'backbone',
    'views/scoreboard',
    'views/main',
    'views/game',
    'views/gameOver',
    'views/viewManager',
    'views/joystick'
], function(
     Backbone,
     scoreboard,
     main,
     game,
     gameOver,
     viewManager,
     joystick
){

    var lastScreen = "";
    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'joystick': 'joystickAction',
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
        },
        joystickAction: function() {
            viewManager.add(joystick);
            joystick.show();
        }
    });

    return new Router();
});