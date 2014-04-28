define(['exports','jquery'], function(exports, $){
    var player;
    var width;
    var height;
    var sky = new Array();
    var game;
    var name = "#canvas";
    var keys = [];
    var bullets = new Array();
    var enemys = new Array();
    var enemyBullets = new Array();
    var powerUps = new Array();
    var score = 0;
    var gameOver;
    var intervals = new Array();

    function Game(Vx, Vy, width, height, collisionDmg, starSpeed){
        this.Vx = Vx;
        this.Vy = Vy;
        this.width = width;
        this.height = height;
        this.collisionDmg = collisionDmg;
        this.starSpeed = starSpeed;
    }
    function drawPowerUps(){
        for(i = 0; i < powerUps.length; ++i){
            powerUps[i].draw();
        }
    }
    function updatePowerUps(){
        for(i = 0; i < powerUps.length; ++i){
            powerUps[i].y  -= powerUps[i].Vy;
            if(powerUps[i].y > game.height){
                powerUps.splice(i, 1);
            }
        }
    }
    function drawBullets(){
        for(i = 0; i < bullets.length; ++i){
            bullets[i].draw();
        }
    }
    function updateBullets(){
        for(i = 0; i < bullets.length; ++i){
            bullets[i].y  -= bullets[i].Vy;
            bullets[i].x -= bullets[i].Vx;
            if(bullets[i].y < 0 || bullets[i].x < 0 || bullets.x > game.width){
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
    function powerUp(x, y, Vy, type, src){
        this.img = new Image();
        this.img.src = src
        this.x = x;
        this.y = y;
        this.Vy = Vy;
        this.type = type;
        this.draw = function() {
            context.drawImage(this.img, this.x , this.y , 20, 20);

        }
    }
    function Bullet(x, y, Vx, Vy, color, damage){
        this.x = x;
        this.y = y;
        this.color = color;
        this.Vy = Vy;
        this.Vx = Vx;
        this.damage = damage;
        this.draw = function(){
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, 3, 10);
        }
    }
    function Enemy(x, y, Vy, width, height, health){
        this.x = x;
        this.y = y;
        this.Vy = Vy;
        this.width = width;
        this.height = height;
        this.health = health;
        this.price = health;
        this.img = new Image();
        this.img.src = '/images/enemy.png';
        this.draw = function(){
            context.drawImage(this.img, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        } 
    }
    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.round(Math.random() * 15)];
        }
        return color;
    }
    function star(x,y,color){
        this.x = x;
        this.y = y;
        this.color = color;
        this.depth = Math.random() * 100;
        this.draw = function(){
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, 3, 3);
        }
    }

    function drawSky(){
        for(i = 0 ; i < sky.length; ++i){
            sky[i].draw();
        }
    }
    function aiMove(){
        for(i = 0; i < enemys.length; ++i){
            if(Math.random() > 0.5){
                enemys[i].x += 3;
            }
            else
                enemys[i].x -= 3;
        }
    }
    function updateStarSky(){
        out = 0;
        for(i = 0; i < sky.length; ++i){
            sky[i].y += game.starSpeed + 1 / sky[i].depth;
            if(sky[i].y > game.height){
                sky.splice(i,1);
                out ++;
            }
        }
        for(i = 0; i < out; ++i){
            sky.push(new star(Math.round(Math.random() * game.width), 0, getRandomColor()));
        }
    }

    function drawScore(){
        context.fillStyle = "#FF0000";
        context.font = "30px Arial";
        context.textAlign = "right";
        context.textBaseline = "top";
        context.fillText("Score: " + score, game.width, 0);
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
    function updateEnemys(){
        for(i = 0; i < enemys.length; ++i){
            enemys[i].y  -= enemys[i].Vy;

            if(enemys[i].y > game.height){
                enemys.splice(i, 1);
            }
        }
    }
    function Player(x, y, width, height, health){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.health = health;
        this.maxHP = health;
        this.damage = 10;
        this.tshot = 1;
        this.attackSpeed = 30;
        this.shotTimer = 0;
        this.img = new Image();
        this.img.src = '/images/player.png';
        this.draw = function(){
            context.drawImage(this.img, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        }
    }

    function genEnemys(){
        switch (true) {
            case score < 100:
                if (enemys.length < 3) {
                    if (Math.random() > 0.95) {
                        enemys.push(new Enemy(Math.random()*game.width, 20,  -(game.Vy/5), 60, 60, 20));
                    }
                }
            break
            case ((score > 100) && (score < 500)):
                if (enemys.length < 7) {
                    if (Math.random() > 0.8) {
                        enemys.push(new Enemy(Math.random()*game.width, 20,  -(game.Vy/5), 60, 60, 30));
                        enemys.push(new Enemy(Math.random()*game.width, 20,  -(game.Vy/5), 60, 60, 30));
                    }
                }
            break
            case ((score > 500) && (score < 1000)):
                if (enemys.length < 7) {
                    if (Math.random() > 0.5) {
                        enemys.push(new Enemy(Math.random()*game.width, 20,  -(game.Vy/5), 60, 60, 45));
                        enemys.push(new Enemy(Math.random()*game.width, 20,  -(game.Vy/5), 60, 60, 45));
                    }
                }
            break
            case score > 1000:
                if (enemys.length < 9) {
                    if (Math.random() > 0.5) {
                        enemys.push(new Enemy(Math.random()*game.width, 20,  -(game.Vy/5), 60, 60, 60));
                        enemys.push(new Enemy(Math.random()*game.width, 20,  -(game.Vy/5), 60, 60, 60));
                    }
                }
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
                        score += enemys[i].price;
                        enemys.splice(i, 1);
                    }
                }
            }
        }

        for(i = 0; i < enemys.length; ++i){
            distance = Math.sqrt(Math.pow(enemys[i].x - player.x,2) + Math.pow(enemys[i].y - player.y,2));
            if(distance < 30){
                player.health -= game.collisionDmg;
                if (player.health <= 0){
                        //enemys.splice(i, 1);
                        gameover();
                }
            }
        }

        for(i = 0; i < enemyBullets.length; ++i){
            distance = Math.sqrt(Math.pow(enemyBullets[i].x - player.x,2) + Math.pow(enemyBullets[i].y - player.y,2));
            if(distance < 30) {
                player.health -= enemyBullets[i].damage;
                enemyBullets.splice(i, 1);
                if(player.health < 0){
                    gameover();
                }
            }
        }
        for(i = 0; i < powerUps.length; ++i){
            distance = Math.sqrt(Math.pow(powerUps[i].x - player.x,2) + Math.pow(powerUps[i].y - player.y, 2));
            if(distance < 30) {
                if (powerUps[i].type == "shootBonus") {
                    if (player.tshot < 3) {
                        player.tshot++;
                    }
                    player.damage += 5;
                    score += 5;
                    powerUps.splice(i, 1);
                }
                else
                if (powerUps[i].type == "attackSpeedBonus") {
                    if(player.attackSpeed > 10) 
                        player.attackSpeed = player.attackSpeed - 5;
                    powerUps.splice(i, 1);
                    score += 5;
                }
                else
                    if(powerUps[i].type == "healthBonus"){
                        if(player.health < player.maxHP){
                            player.health += player.maxHP / 10;
                        }
                        powerUps.splice(i,1);
                        score += 5;
                    }
            }
        }
    }
    function drawHeathBar(){
        context.fillStyle = "#280000";
        context.fillRect(0, 0, 2 * player.maxHP, 20);
        context.fillStyle = "#FF0000";
        context.fillRect(0, 0, 2 * player.health, 20);
    }
    function gameover(){
        for(i = 0; i < intervals.length; ++i){
            clearInterval(intervals[i]);
        }
        console.log("OVER");
        gameOver.show(score);
    }
    function play(){
        collision();
        updatePosition();
        updateEnemys();
        updatePowerUps();
        updateBullets();
        field.draw();
        updateStarSky();
        drawSky();
        aiMove();
        player.draw();
        drawEnemys();
        drawPowerUps();
        drawBullets();
        drawEnemyBullets();
        drawScore();
        drawHeathBar();

    }

    function init() {
        canvas = document.getElementById("canvas");
        canvas1 = $("canvas")
        canvas1.css('margin',0);
        canvas1.css('padding',0);
        canvas1.css('position','absolute');
        canvas1.css('top', 0);
        canvas1.css('left',0);
        window.addEventListener('resize', resizeCanvas, false);
        function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                
                /**
                 * Your drawings need to be inside this function otherwise they will be reset when 
                 * you resize the browser window and the canvas goes will be cleared.
                 */
        }
        resizeCanvas();
        game = new Game(6, 6, canvas.width, canvas.height, 20, 0.2);
        console.log(canvas.width); console.log(canvas.height);
        sky;
        count = 100;
        for(i = 0; i < count; ++i){
            sky.push(new star(Math.round(Math.random() * game.width), Math.round(Math.random() * game.height), getRandomColor()));
        } 
        $(document).
        keydown(function(e){
            keys[e.keyCode] = true;
        }).keyup(function(e){
            keys[e.keyCode] = false;
        });
        enemys.push(new Enemy(Math.round(Math.random()*game.width), 20, -(game.Vy/5), 60, 60, 10));
        //enemys.push(new Enemy(350,200, 60, 60, 100));
        //canvas.width = game.width; // задаём ширину холста
        //canvas.height = game.height; // задаём высоту холста
        context = canvas.getContext('2d');
        field = new Field(0, 0, game.width, game.height, "#000000")
        player = new Player( canvas.width / 2, canvas.height - 30 / 2, 60, 60, 100);

        intervals.push(setInterval(function(){
            if (Math.random() > 0.98 && powerUps.length < 2) {
                powerUps.push(new powerUp(Math.random()*game.width, 20, -(game.Vy / 6), "shootBonus",'/images/bulletup.png'));
            }
            if (Math.random() > 0.98 && powerUps.length < 2) {
                powerUps.push(new powerUp(Math.random()*game.width, 20, -(game.Vy / 6), "attackSpeedBonus", '/images/firespeed.png'));
            }
            if (Math.random() > 0.98 && powerUps.length < 2) {
                powerUps.push(new powerUp(Math.random()*game.width, 20, -(game.Vy / 6), "healthBonus", '/images/health.png'));
            }
        }, 350));
        intervals.push(setInterval(genEnemys, 350));
        intervals.push(setInterval(function(){
            for(i = 0; i < enemys.length; ++i)
                if (Math.random() > 0.8)
                    enemyBullets.push(new Bullet(enemys[i].x, enemys[i].y, 0, -game.Vy, "#FF0000", 10, 10));
        }, 350));
        intervals.push(setInterval(play, 1000 / 50));

    }
    function updatePosition(){
        player.shotTimer++;
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
            if( player.shotTimer > player.attackSpeed){
                player.shotTimer = 0;
                if (player.tshot == 6) {
                    bullets.push(new Bullet(player.x - 17, player.y, 0, game.Vy , "#FFFF00", player.damage));
                    bullets.push(new Bullet(player.x - 17, player.y, -5, game.Vy , "#FFFF00", player.damage));
                    bullets.push(new Bullet(player.x + 17, player.y, 0, game.Vy , "#FFFF00", player.damage));
                    bullets.push(new Bullet(player.x + 17, player.y, 5, game.Vy , "#FFFF00", player.damage));
                }
                if (player.tshot == 3) {
                    bullets.push(new Bullet(player.x - 17, player.y, -5, game.Vy , "#FFFF00", player.damage));
                    bullets.push(new Bullet(player.x, player.y, 0, game.Vy , "#FFFF00", player.damage));
                    bullets.push(new Bullet(player.x + 17, player.y, 5, game.Vy , "#FFFF00", player.damage));
                } else if (player.tshot == 2) {
                    bullets.push(new Bullet(player.x - 17, player.y, 0, game.Vy , "#FFFF00", player.damage));
                    bullets.push(new Bullet(player.x + 17, player.y, 0, game.Vy , "#FFFF00", player.damage));
                } else {
                    bullets.push(new Bullet(player.x, player.y, 0, game.Vy , "#FFFF00", player.damage));
                }
                keys[32] = false;
            }
        }
    }
    exports.start = function start(a){
        gameOver = a;
        init();
    }
    return exports;
});
