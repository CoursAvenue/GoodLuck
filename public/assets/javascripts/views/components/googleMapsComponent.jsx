var React           = require('React/addons'),
    ReactGoogleMaps = require('react-googlemaps'),
    _               = require('underscore'),
    async           = require('async'),

    Utils           = require('../../libs/utils');


var GoogleMapsAPI   = window.google.maps;
var Map             = ReactGoogleMaps.Map;
var Marker          = ReactGoogleMaps.Marker;
var OverlayView     = ReactGoogleMaps.OverlayView;
var LatLng          = GoogleMapsAPI.LatLng;



var GoogleMapMarkers = React.createClass({

  getInitialState: function () {
    return {
      center: new LatLng(48.858093, 2.294694),
      zoom: 13,
      markers: {}
    };
  },

  getMarkers: function (structureObjList) {
    return _.map(structureObjList, function (structure) {
      return structure.position;
    });
  },

  render: function () {

    var markersList = this.getMarkers(this.props.structureObjList);

    return (
      <Map
        initialZoom={this.state.zoom}
        center={this.state.center}
        onCenterChange={this.handleCenterChange}
        width={700}
        height={700}>
        {_.map(markersList, this.renderMarkers)}
      </Map>
      );
  },

  renderMarkers: function (state, i) {
    return (
      <Marker position={state.position} key={i} />
    );
  },

  handleCenterChange: function (map) {
    this.setState({
      center: map.getCenter()
    });
  }
});


GoogleMapsComponent = React.createClass({

  render: function () {
    return (
      <div className="map-content">
        <GoogleMapMarkers structureObjList={this.props.structureObjList}/>
      </div>
    )
  }
});




module.exports = GoogleMapsComponent;
