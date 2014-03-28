define(['exports','jquery'], function(exports, $){
    var player;
    var width;
    var height;
    var game;
    var name = "#canvas";
    var keys = [];
    var bullets = new Array();
    var enemys = new Array();
    var enemyBullets = new Array();

    function Game(Vx, Vy, width, height, collisionDmg){
        this.Vx = Vx;
        this.Vy = Vy;
        this.width = width;
        this.height = height;
        this.collisionDmg = collisionDmg;
    }
    function drawBullets(){
        for(i = 0; i < bullets.length; ++i){
            bullets[i].draw();
        }
    }
    function updateBullets(){
        for(i = 0; i < bullets.length; ++i){
            bullets[i].y  -= bullets[i].Vy;
            if(bullets[i].y < 0){
                bullets.splice(i, 1);
            }
        }
        for(i = 0; i < enemyBullets.length; ++i){
            enemyBullets[i].y -= enemyBullets[i].Vy;
            if(enemyBullets[i].y > game.height){
                enemyBullets.splice(i, 1);
            }
        }
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
    function Bullet(x, y, Vy, color, damage){
        this.x = x;
        this.y = y;
        this.color = color;
        this.Vy = Vy;
        this.damage = damage;
        this.draw = function(){
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, 3, 10);
        }
    }
    function Enemy(x, y, width, height, health){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.health = health;
        this.img = new Image();
        this.img.src = '/images/enemy.png';
        this.draw = function(){
            context.drawImage(this.img, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        } 
    }
    function drawEnemys(){
        for(i = 0; i < enemys.length; ++i){
            enemys[i].draw();
        }
    }
    function drawEnemyBullets(){
        for(i = 0; i < enemyBullets.length; ++i){
            enemyBullets[i].draw();
        }
    }
    function Player(x, y, width, height, health){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.health = health;
        this.img = new Image();
        this.img.src = '/images/player.png';
        this.draw = function(){
            context.drawImage(this.img, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        }
    }

    function collision(){
        for(i = 0; i < enemys.length; ++i){
            for(j = 0 ; j < bullets.length; ++j){
                distance = Math.sqrt(Math.pow(enemys[i].x - bullets[j].x,2) + Math.pow(enemys[i].y - bullets[j].y,2));
                if (distance < 30){
                    enemys[i].health -= bullets[j].damage;
                    bullets.splice(j, 1);
                    if (enemys[i].health <= 0){
                        enemys.splice(i, 1);
                    }
                }
            }
        }

        for(i = 0; i < enemys.length; ++i){
            distance = Math.sqrt(Math.pow(enemys[i].x - player.x,2) + Math.pow(enemys[i].y - player.y,2));
            if(distance < 30){
                enemys[i].health -= game.collisionDmg;
                if (enemys[i].health <= 0){
                        enemys.splice(i, 1);
                }
            }
        }

        for(i = 0; i < enemyBullets.length; ++i){
            distance = Math.sqrt(Math.pow(enemyBullets[i].x - player.x,2) + Math.pow(enemyBullets[i].y - player.y,2));
            if(distance < 30) {
                player.health -= enemyBullets[i].damage;
                enemyBullets.splice(i, 1);
                if(player.health < 0){
                    gameOver();
                }
            }
        }
    }

    function gameOver(){
        console.log("OVER");
    }
    function play(){
        collision();
        updatePosition();
        field.draw();
        player.draw();
        updateBullets();
        drawBullets();
        drawEnemyBullets();
        drawEnemys();
    }

    function init() {
        canvas = document.getElementById("canvas");
        game = new Game(6, 6, 640, 480, 20);
        $(document).
        keydown(function(e){
            keys[e.keyCode] = true;
        }).keyup(function(e){
            keys[e.keyCode] = false;
        });
        enemys.push(new Enemy(350,200, 60, 60, 100));
        canvas.width = game.width; // задаём ширину холста
        canvas.height = game.height; // задаём высоту холста
        context = canvas.getContext('2d');
        field = new Field(0, 0, game.width, game.height, "#000000")
        player = new Player( canvas.width / 2, canvas.height - 30 / 2, 60, 60, 100);
        setInterval(function(){
            for(i = 0; i < enemys.length; ++i)
                if (Math.random() > 0.5)
                    enemyBullets.push(new Bullet(enemys[i].x, enemys[i].y, -game.Vy, "#FF0000", 10));
        }, 350);
        setInterval(play, 1000 / 50);

    }
    function updatePosition(){
        if(keys[39]){
            if(player.x + player.width / 2 + game.Vx <= game.width)
                player.x += game.Vx;
        }
        if(keys[37]){
            if(player.x - player.width / 2- game.Vx >= 0)
                player.x -= game.Vx;
        }
        if(keys[38]){
            if(player.y - player.height / 2 - game.Vy >= 0)
                player.y -= game.Vy;
        }
        if(keys[40]){
            if(player.y + player.height / 2 + game.Vy <= game.height)
                player.y += game.Vy;
        }
        if(keys[32]){
            bullets.push(new Bullet(player.x, player.y, game.Vy , "#FFFF00", 10));
            keys[32] = false;
        }
    }
    exports.start = function start(){
        init();
    }
    return exports;
});
