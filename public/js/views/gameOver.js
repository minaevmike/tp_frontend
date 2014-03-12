define([
    'backbone'
], function(
    Backbone
){

    var View = Backbone.View.extend({
        className: "#gameOver",
        initialize: function () {
        },
        render: function () {
            //$(this.className).html(this.template());
            var score = Math.ceil(Math.random() * 10000);
            $(this.className).append("<form id=\"score_form\"> Your score is <div id = \"score\">" + score + "</div><br />Username: <input type=\"text\" name=\"name\" required> <br /> <input type=\"submit\"> </form>")
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
                    }
                })
                event.preventDefault();
            });
        },
        show: function (viewManager) {
            //$('body').append($('<div/>', {id: this.className.replace('#','')}));
            $(this.className).trigger( "show" );
            //$(this.className).trigger( "show" );
            //$('body').append("<div id=\"gameOver\"> <form action=\"#\">Username: <input type=\"text\" name=\"name\" required> <input type=\"submit\"> </form> </div>");
            //$("#gameOver").hide();
        },
        hide: function () {
            $(this.className).hide();
            //this.$el.style.display = 'none';
        }

    });

    return new View();
});