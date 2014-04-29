define([
    'backbone',
    'tmpl/joystick',
    'jquery'
], function(
    Backbone,
    tmpl,
    $
){
    var alpha, beta, gamma, i = 0;
    var View = Backbone.View.extend({
        template: tmpl,
        className: "#joystick",

        initialize: function () {
        },
        render: function () {
            $(this.className).html(this.template());
            $("#helpMsg").hide();
            $("#helpMsg").css("opacity", 0.5)
            $("#helpMsg").css("font-size" , "30px");
            require(['joystick'], function (joystick) {

            });
            
            window.addEventListener('orientationchange', function(){
                alert("Orientation: " + window.orientation);
            });
            $(this.className).on("start",function(){
                $("#helpMsg").show();
                $("#connectForm").hide();
                document.addEventListener('click', function(){
                    window.server.send("3 ", function(){});
                });
            });
            /*codes
            1 * - move
            1 1 - move left
            1 2 - move right
            1 3 - move bot
            1 4 - move top
            2 * - acceleration
            2 1 - acceleration x
            2 2 - acceleration y
            3 - shoot
            */
            window.addEventListener('devicemotion',function(event){
                var div = document.getElementById('joystick');
                //div.innerHTML = event.acceleration.x + " " +event.acceleration.y + " " +event.acceleration.z;
                window.server.send("2 1 " + Math.abs(event.acceleration.x))
                window.server.send("2 2 " + Math.abs(event.acceleration.y))

            });
            window.addEventListener('deviceorientation', function(event){
                var div = document.getElementById('joystick');
                    if (i==0){
                        alpha = event.alpha;
                        beta = event.beta;
                        gamma = event.gamma;
                        i++;
                    }
                    else{
                        //if(Math.abs(event.alpha - alpha) > 0.5){
                            if(event.alpha > 90  ){
                                //window.server.send("1 1", function(){});
                            }
                            else{
                                //div.innerHTML = "move right <br/>";
                                //window.server.send("1 2", function(){});
                            }
                            alpha = event.alpha;
                        //}
                        //if(Math.abs(event.gamma - gamma) > 0.5){
                            if(event.gamma  > -45 ){
                                //div.innerHTML += "move top <br/>";
                                window.server.send("1 4", function(){});
                            }
                            else{
                                //div.innerHTML += "move bot <br/>";
                                window.server.send("1 3", function(){});                            
                            }
                            gamma = event.gamma;
                        //}
                    }
                //var div = document.getElementById('joystick');
                //div.innerHTML = event.alpha +  " " + event.beta + " " + event.gamma + "<br/>";
            });

        },
        show: function () {
            $(this.className).trigger( "show" );
            //console.log($(this.className))
            //$(this.className).trigger('show');
        },
        hide: function () {
            //this.$el.style.display = 'none';
        }

    });

    return new View();
});