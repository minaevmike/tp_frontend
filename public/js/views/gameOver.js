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

        },
        show: function (pScore) {
            console.log(pScore);
            $(this.className).trigger( "show" );
            var a = {"score":pScore};
            console.log(JSON.stringify(a));
            $(this.className).html(tmpl(a));
            $("#score_form").submit(function(event){
                console.log("Click");
                //var score = $("#score").text();
                var username = $( "input:first" ).val();
                console.log(pScore);
                $.ajax({
                    type: "POST",
                    url: "/scores",
                    data : {name : username, score : pScore},
                    statusCode :{
                        400: function() {
                            console.log("Wrong data");
                            localStorage["shotemup_"+username + "_" + Date.now()] = pScore;
                        },
                        500: function() {
                            console.log("Server out");
                            localStorage["shotemup_"+username + "_" + Date.now()] = pScore;
                        },
                        200: function(){
                            console.log("Ok");
                            window.location.href = "/#scoreboard";
                        },
                        0: function(){
                            console.log("SDAASDASD");
                            localStorage["shotemup_"+username + "_" + Date.now()] = pScore;

                        }
                    },
                })
                event.preventDefault();
            });
        },
        hide: function () {
            $(this.className).hide();
            //this.$el.style.display = 'none';
        }

    });

    return new View();
});