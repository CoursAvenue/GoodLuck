var Backbone              = require('Backbone'),
    React                 = require('React'),
    _                     = require('underscore'),
    Utils                 = require('../../libs/utils'),

    GoogleMapsComponent   = require('./googleMapsComponent.jsx'),

    ResultSearchComponent = require('./resultSearchComponent.jsx');


var SearchTopBarComponent = React.createClass({

  getInitialState: function () {
    var that = this;
    var sortedList = _.sortBy(this.props.structureList, function (structure) {
      return structure.creat_at;
    });

    Utils.modStructureList(sortedList.slice(0, 5), function (err, newList) {
      if (!err) {
        Backbone.trigger('firstResult', newList);
        that.setState({structureObjList: newList});
      }
    });

    return {structureObjList: {}}
  },

  doSearch: function (e) {
    e.stopPropagation();

    var that  = this;
    var query = this.refs.searchInput.getDOMNode().value;

    Utils.doSearch(this.props.structureList, query, function (err, result) {

      if (result) {
        Utils.modStructureList(result, function (err, newList) {
          if (!err) {
            Backbone.trigger('newResult', newList);
            that.setState({structureObjList: newList});
          }
        });
      }

    });
  },

  render: function () {
    return (
      <div className="content">
        <header className="search-topbar goodluck-header">
          <input type="text" className="location bd-1 mr-1" ref="searchInput" placeholder="Search..."/>
          <button onClick={this.doSearch} className="btn-primary btn search-btn">Search!</button>
        </header>

        <div className="results-container">
          <div className="result-search left mx-55 p1">
            <ResultSearchComponent structureList={this.state.structureObjList}/>
          </div>

          <div className="map-search right mx-45">
            <GoogleMapsComponent/>
          </div>
        </div>
      </div>
    )
  }

});




module.exports = SearchTopBarComponent;
