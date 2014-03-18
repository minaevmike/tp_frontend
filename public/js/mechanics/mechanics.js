define(['exports','jquery'], function(exports, $){
    var player;
    var width;
    var height;
    var name = "#canvas";
    function draw() {
                context.fillStyle = "#000";
                context.fillRect(0, 0, width, height);
    }
    function init() {
                canvas = document.getElementById("canvas");
                $(name).attr("tabindex", 0).
                keydown(keyDown);
                width = 640;
                height = 480;
                canvas.width = width; // задаём ширину холста
                canvas.height = height; // задаём высоту холста
                context = canvas.getContext('2d');
                draw();
    }

    function keyDown(e){
        console.log(e.keyCode);
        return false;
    }

    exports.start = function start(){
        init();
    }
    return exports;
});
