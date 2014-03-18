define(['exports','jquery'], function(exports, $){
    var player;
    var width;
    var height;
    var game;
    var name = "#canvas";
    var keys = [];

    function Game(Vx, Vy, width, height){
        this.Vx = Vx;
        this.Vy = Vy;
        this.width = width;
        this.height = height;
    }
    function Field(x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.draw = function(){
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    function Player(x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.draw = function(){
            context.fillStyle = this.color;
            context.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        }
    }
    function play(){
        updatePosition();
        field.draw();
        player.draw();
    }
    function init() {
        canvas = document.getElementById("canvas");
        game = new Game(6, 6, 640, 480);
        $(name).attr("tabindex", 0).
        keydown(function(e){
            keys[e.keyCode] = true;
        }).keyup(function(e){
            keys[e.keyCode] = false;
        });
        canvas.width = game.width; // задаём ширину холста
        canvas.height = game.height; // задаём высоту холста
        context = canvas.getContext('2d');
        field = new Field(0, 0, game.width, game.height, "#000000")
        player = new Player( canvas.width / 2, canvas.height - 30 / 2, 30, 30, "#FFFFFF");
        setInterval(play, 1000 / 50);

    }
    function updatePosition(){
        if(keys[39]){
            player.x += game.Vx;
        }
        if(keys[37]){
            player.x -= game.Vx;
        }
        if(keys[38]){
            player.y -= game.Vy;
        }
        if(keys[40]){
            player.y += game.Vy;
        }
    }
    function keyDown(e){
        console.log(e.keyCode);
        if(e.keyCode == 39){
            player.x += game.Vx;
        }
        if(e.keyCode == 37){
            player.x -= game.Vx;
        }
        if(e.keyCode == 38){
            player.y -= game.Vy;
        }
        if(e.keyCode == 40){
            player.y += game.Vy;
        }
    }

    exports.start = function start(){
        init();
    }
    return exports;
});
