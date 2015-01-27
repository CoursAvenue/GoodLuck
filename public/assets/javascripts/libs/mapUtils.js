var _     = require('underscore'),
    async = require('async');

function codeAddress(address, cb) {
  var google    = window.google,
      geocoder  = new google.maps.Geocoder();

  geocoder.geocode({ 'address': address}, function(results, status) {

    if (status == google.maps.GeocoderStatus.OK) {
      var marker = new google.maps.Marker({
        position: results[0].geometry.location
      });
      cb(null, marker);
    }
    // I HATE YOU FUCKING GOOGLE.
    else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
      setTimeout(function () {
        codeAddress(address, cb);
      }, 50);
    }
    else {
      // console.log("Geocode was not successful for the following reason: " + status);
      cb(null, 'bad request');
    }

  });
}

var getPosition = function (address, callback) {
  codeAddress(address, function (err, coord) {
    callback(null, coord);
  })
};

var formatAddress = function () {

};

var modStructureList = function (structuresList, callback) {


  var structuresList = _.sortBy(structuresList, function (structure) {
    return structure.created_at;
  });

  async.mapSeries(

    structuresList.slice(0, 15),

    function (structureObj, cb) {
      getPosition(structureObj.street + ', ' + structureObj.zip_code, function (err, coord) {
        if (err)
          cb(null, err);
        else
          cb(null, _.extend(structureObj, {position: coord}));
      });
    },

    function (err, result) {
      console.log('result', err, result);
      callback(err, result);
    }

  )

};

module.exports.getPosition        = getPosition;
module.exports.formatAddress      = formatAddress;
module.exports.modStructureList   = modStructureList;
