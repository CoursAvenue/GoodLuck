var React                 = require('React'),
    mapUtils              = require('../../libs/mapUtils'),
    Search                = require('../../libs/searchUtils'),

    ResultSearchComponent = require('./resultSearchComponent.jsx');


SearchTopBarComponent = React.createClass({

  getInitialState: function () {
    return {structureObjList: {}}
  },

  doSearch: function (e) {
    var that  = this;
    var query = this.refs.searchInput.getDOMNode().value;

    Search.doSearch(this.props.structureList, query, function (err, result) {

      if (result) {
        mapUtils.modStructureList(result, function (err, newList) {
          that.setState({structureObjList: newList});
        });
      }

    });
  },

  render: function () {
    return (
      <div className="">
        <input type="text" ref="searchInput" placeholder="Search..."/>
        <button onClick={this.doSearch}>Search!</button>
        <div className="results">
          <ResultSearchComponent structureList={this.state.structureObjList}/>
        </div>
      </div>
    )
  }

});




module.exports = SearchTopBarComponent;
