var Backbone              = require('Backbone'),
    _                     = require('underscore'),
    async                 = require('async'),
    mapUtils              = require('../libs/mapUtils'),
    React                 = require('React'),

    Structure             = require('../models/structure.model'),

    SearchTopBarComponent = require('./components/searchTopBarComponent.jsx'),
    GoogleMapsComponent   = require('./components/googleMapsComponent.jsx'),
    ResultSearchComponent = require('./components/resultSearchComponent.jsx');




var ContainerComponent = React.createClass({

  render: function () {
    return (
      <div className="content">
        <SearchTopBarComponent structureList={this.props.completeStructuresList}/>
      </div>
    )
  }

});


/***
 VIEW INIT && RENDER
***/

var view = {};

view.el       = 'body';
view.template = '<div class="container"></div>';
view.events   = {};




view.render = function () {

  this.$el.html(this.template);
  React.render(<ContainerComponent completeStructuresList={this.structuresList}/>, $('.container').get(0));
  return this;

};

view.initialize = function () {
  var that                = this;

  this.structuresList     = {};
  this.structureModel     = new Structure();

  this.structureModel.fetch().complete(function (modelCompleted) {
    that.structuresList = modelCompleted.responseJSON;
    console.log('all: ', that.structuresList);
    that.render();
  });
};





module.exports = Backbone.View.extend(view);
