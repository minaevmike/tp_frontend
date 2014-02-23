define([
    'backbone'
], function(
    Backbone
){

    var Model = Backbone.Model.extend({
    	initialize: function(){
           console.log("Oh hey! ");
       },
       defaults: {
           name: '',
           score: 0,
       }
    });

    return Model;
});