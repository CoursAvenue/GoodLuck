var React               = require('React'),
    _                   = require('underscore'),

    GoogleMapsComponent = require('./googleMapsComponent.jsx'),

    Structure           = require('../../models/structure.model');










ResultSearchComponent = React.createClass({

  getInitialState: function () {
    return {structureList: this.props.structureList};
  },

  render: function () {
    console.log('render: ', this.props.structureList)

    if (this.props.structureList !== 'undefined') {

      var list = _.map(this.props.structureList, function (structure) {
          return (
            <li>
              <span>Subject: {structure.subject}</span>
              <img src={structure.image_url}/>
              <span>Name: {structure.name}</span>
            </li>
          );

      });
    }

    console.log('list', list);
    return (
      <div className="result-search">
        <div className="structure-map">
          <GoogleMapsComponent structureObjList={this.props.structureList}/>
        </div>
        <div className="structure-list">
          <ul>
            {list}
          </ul>
        </div>

      </div>
    )
  }
});




module.exports = ResultSearchComponent;
