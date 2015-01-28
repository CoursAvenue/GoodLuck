var _     = require('underscore'),
    async = require('async');


module.exports = {


  getPosition: function (address, callback) {

    var that      = this,
        google    = window.google,
        geocoder  = new google.maps.Geocoder();

    geocoder.geocode({ 'address': address}, function(results, status) {

      if (status == google.maps.GeocoderStatus.OK) {
        var marker = new google.maps.Marker({
          position: results[0].geometry.location
        });
        callback(null, marker);
      }
      // I HATE YOU FUCKING GOOGLE.
      else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
        setTimeout(function () {
          that.getPosition(address, callback);
        }, 50);
      }
      else {
        // console.log("Geocode was not successful for the following reason: " + status);
        callback(null, 'bad request');
      }

    });

  },

  modStructureList: function (structuresList, callback) {
    var that = this;

    var structuresList = _.sortBy(structuresList, function (structure) {
      return structure.created_at;
    });

    async.mapSeries(

      structuresList.slice(0, 15),

      function (structureObj, cb) {
        that.getPosition(structureObj.street + ', ' + structureObj.zip_code, function (err, coord) {
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

  },

  doSearch: function (list, query, cb) {
    var searchBySubject     = this.bySubject(list, query);
    var searchByName        = this.byName(list, query);
    var searchByDescription = this.byDescription(list, query);
    var fusionResult        = _.extend({}, searchBySubject, searchByName, searchByDescription);

    cb(null, fusionResult);
  },

  bySubject: function (list, query) {
    var results = list.filter(function(entry) {
      return entry.subject.toUpperCase().indexOf(query.toUpperCase()) !== -1;
    });

    console.log('bySubject', results);
    return results;
  },

  byName: function (list, query) {
    var results = list.filter(function(entry) {
      return entry.name.toUpperCase().indexOf(query.toUpperCase()) !== -1;
    });

    console.log('byName', results);
    return results;
  },

  byDescription: function (list, query) {
    var results = list.filter(function(entry) {
      return entry.description.toUpperCase().indexOf(query.toUpperCase()) !== -1;
    });

    console.log('byDescription', results);
    return results;
  }


};
