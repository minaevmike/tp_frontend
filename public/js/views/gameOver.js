define([
    'backbone',
    'tmpl/gameover'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({
        className: "#gameOver",
        initialize: function () {
        },
        render: function () {
            //$(this.className).html(this.template());
            var score = Math.ceil(Math.random() * 10000);
            var a = {"score":score};
            $(this.className).html(tmpl(JSON.stringify(a)));
            $("#score_form").submit(function(event){
                var score = $("#score").text();
                var username = $( "input:first" ).val();
                $.ajax({
                    type: "POST",
                    url: "/scores",
                    data : {name : username, score : score },
                    statusCode :{
                        400: function() {
                            console.log("Wrong data");
                        },
                        200: function(){
                            console.log("Ok");
                            window.location.href = "/#scoreboard";
                        }
                    },
                    error: function(){
                        localStorage["shotemup_"+username + "_" + Date.now()] = score;
                    }
                })
                event.preventDefault();
            });
        },
        show: function (viewManager) {
            $(this.className).trigger( "show" );
        },
        hide: function () {
            $(this.className).hide();
            //this.$el.style.display = 'none';
        }

    });

    return new View();
});