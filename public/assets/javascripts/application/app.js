var $        = require('jquery'),
    _        = require('underscore'),
    Backbone = require('Backbone'),

    Router   = require('./router.js');

Backbone.$ = window.$ = $;


module.exports = {

  init: function () {
    var router = new Router();
    Backbone.history.start();
  }

};
