var Backbone              = require('Backbone'),
    _                     = require('underscore'),
    async                 = require('async'),
    React                 = require('React'),

    Structure             = require('../models/structure.model'),

    ContentComponent      = require('./components/contentComponent.jsx');




var ContainerComponent = React.createClass({

  render: function () {
    return (
      <div className="container">
        <ContentComponent structureList={this.props.completeStructuresList}/>
      </div>
    )
  }

});


/***
 VIEW INIT && RENDER
***/

var view = {};

view.el       = 'body';
view.events   = {};




view.render = function () {

  React.render(<ContainerComponent completeStructuresList={this.structuresList}/>, $('.app').get(0));
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
