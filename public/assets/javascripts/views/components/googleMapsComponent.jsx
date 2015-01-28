var React           = require('React/addons'),
    Backbone        = require('Backbone'),
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

    this.listenEventInit();
    this.listenEventClick();
    this.listenEventHover();
    this.listenEventLeave();
    this.listenEventResult();

    return {
      center: new LatLng(48.8546926, 2.3368740),
      zoom: 12,
      markersList: this.getMarkersPosition(this.props.initStructures),
      markers: {}
    };
  },

  listenEventClick: function () {
    var that = this;
    Backbone.on('clickedOnStructure', function (marker) {
      that.setState({center: marker.position})
    });
  },

  listenEventInit: function () {
    var that = this;
    Backbone.on('firstResult', function (structureObjList) {
      that.setState({markersList: that.getMarkersPosition(structureObjList)})
    });
  },

  listenEventHover: function () {
    var that = this;
    Backbone.on('hoveredOnStructure', function (markerHovered) {
      _.map(that.state.markersList, function (marker) {
        if (marker.position.D === markerHovered.position.D && marker.position.K === markerHovered.position.K) {
          marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
        }
      });

      that.forceUpdate();
    });
  },

  listenEventLeave: function () {
    var that = this;
    Backbone.on('LeaveOnStructure', function (markerLeave) {
      _.map(that.state.markersList, function (marker) {
        if (marker.position.D === markerLeave.position.D && marker.position.K === markerLeave.position.K) {
          delete marker.icon;
        }
      });

      that.forceUpdate();
    });
  },

  listenEventResult: function () {
    var that = this;
    Backbone.on('newResult', function (structureObjList) {
      that.setState({markersList: that.getMarkersPosition(structureObjList)})
    });
  },

  getMarkersPosition: function (structureObjList) {
    return _.map(structureObjList, function (structure) {
      return structure.position;
    });
  },

  render: function () {

    return (
      <Map
        className="g_map"
        initialZoom={this.state.zoom}
        center={this.state.center}
        onCenterChange={this.handleCenterChange}
        width={600}
        height={520}>
        {_.map(this.state.markersList, this.renderMarkers)}
      </Map>
      );
  },

  renderMarkers: function (state, i) {
    return (
      <Marker icon={state.icon} position={state.position} key={i} />
    );
  },

  handleCenterChange: function (map) {
    this.setState({
      center: map.getCenter()
    });
  }
});


var GoogleMapsComponent = React.createClass({

  render: function () {
    return (
      <div className="map-content">
        <GoogleMapMarkers initStructures={this.props.initStructures}/>
      </div>
    )
  }
});




module.exports = GoogleMapsComponent;
