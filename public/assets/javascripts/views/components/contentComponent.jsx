var React                 = require('React'),
    Utils                 = require('../../libs/utils'),

    GoogleMapsComponent   = require('./googleMapsComponent.jsx'),

    ResultSearchComponent = require('./resultSearchComponent.jsx');


SearchTopBarComponent = React.createClass({

  getInitialState: function () {
    return {structureObjList: {}}
  },

  doSearch: function (e) {
    var that  = this;
    var query = this.refs.searchInput.getDOMNode().value;

    Utils.doSearch(this.props.structureList, query, function (err, result) {

      if (result) {
        Utils.modStructureList(result, function (err, newList) {
          that.setState({structureObjList: newList});
        });
      }

    });
  },

  render: function () {
    return (
      <div className="content">
        <div className="search-container">
          <input type="text" ref="searchInput" placeholder="Search..."/>
          <button onClick={this.doSearch}>Search!</button>
        </div>
        <div className="results-container">
          <GoogleMapsComponent structureObjList={this.state.structureObjList}/>
          <ResultSearchComponent structureList={this.state.structureObjList}/>
        </div>
      </div>
    )
  }

});




module.exports = SearchTopBarComponent;
