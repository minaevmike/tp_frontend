define([
    'backbone',
    'tmpl/scoreboard',
    'collections/scores',
    'jquery'
], function(
    Backbone,
    tmpl,
    collection,
    $
){

    var View = Backbone.View.extend({
        template: tmpl,
        className: "#scoreboard",
        initialize: function () {

        },
        render: function () {

        },
        show: function () {
            for(var i=0, len=localStorage.length; i<len; i++) {
                (function(i){
                    var name = localStorage.key(i);
                    var score = localStorage[name];
                    console.log(name + " " + score);
                    title = name.substring(0, name.indexOf('_'));
                    username = name.substring(name.indexOf('_') + 1, name.lastIndexOf('_'));
                    var toDelete = name;
                    if (title == "shotemup") {
                        $.ajax({
                            type: "POST",
                            url: "/scores",
                            data: {
                                name: username,
                                score: score
                            },
                            statusCode: {
                                400: function () {
                                    console.log("Wrong data");
                                },
                                200: function () {
              
                                    localStorage.removeItem(name)
                                }
                            },

                        });
                    }

                })(i);
            }
            console.log(collection.size());
            var tm = this.template;
            var clName = this.className;
            if(collection.size() == 0) {
                $(clName).html("Loading");
            }
            else {
                $(clName).html(tm(collection.toJSON()));
            }
            collection.fetch({reset : true});
            collection.on("reset",function(){
                $(clName).html(tm(collection.toJSON()));
                $(clName).trigger( "show" );
            });
            
            //this.$el.style.display = 'none';
        },
        hide: function () {
            //this.$el.style.display = 'none';
            // TODO
        }

    });

    return new View();
});