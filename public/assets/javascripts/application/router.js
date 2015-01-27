var Backbone      = require('Backbone'),

    ContainerView = require('../views/container.view.jsx');


router = {};

router.routes = {
  ""     : "base"
};



router.base = function () {
  var containerView = new ContainerView();
  // containerView.render();
};





module.exports = Backbone.Router.extend(router);
