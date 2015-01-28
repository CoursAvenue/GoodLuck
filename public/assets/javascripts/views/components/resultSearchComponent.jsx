var React               = require('React'),
    Backbone            = require('Backbone'),
    _                   = require('underscore'),

    Structure           = require('../../models/structure.model');



var StructureObjectComponent = React.createClass({

  handleOnClick: function (e) {
    e.stopPropagation();
    Backbone.trigger('clickedOnStructure', this.props.structure.position);
  },

  handleOnMouseOver: function (e) {
    e.stopPropagation();
    Backbone.trigger('hoveredOnStructure', this.props.structure.position);
  },

  handleOnMouseLeave: function (e) {
    e.stopPropagation();
    Backbone.trigger('LeaveOnStructure', this.props.structure.position);
  },

  render: function () {
    return (
      <div className="p1" onMouseOver={this.handleOnMouseOver} onMouseLeave={this.handleOnMouseLeave} onClick={this.handleOnClick}>
        <div className="mb-10">
          <img src={this.props.structure.image_url} className="fit" />
        </div>
        <h1 className="h2 mb-5">{this.props.structure.name}</h1>
        <span className="h5">{this.props.structure.subject}</span>
        <div className="description ellipsis">
          <p className="ellipsis">{this.props.structure.description}</p>
        </div>
      </div>
    )
  }
});


var ResultSearchComponent = React.createClass({

  getInitialState: function () {
    return {structureList: this.props.structureList};
  },

  render: function () {

    var list = _.map(this.props.structureList, function (structure) {
        return (
          <div className="structure border bg-white rounded m-10">
            <StructureObjectComponent structure={structure}/>
          </div>
        );

    });
    
    return (
      <div className="list-content">
        {list}
      </div>
    )
  }
});




module.exports = ResultSearchComponent;
