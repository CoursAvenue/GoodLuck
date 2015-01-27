var Backbone  = require('Backbone'),
    $         = require('jquery');
var model     = {};


model.initialize = function () {
  console.log('model init');
};

model.url = "/api/v1/structure/all"



module.exports = Backbone.Model.extend(model);
