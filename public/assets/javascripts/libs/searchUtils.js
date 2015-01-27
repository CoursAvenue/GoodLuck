var _ = require('underscore');

module.exports = {

  doSearch: function (list, query, cb) {
    var searchBySubject = this.bySubject(list, query);
    var searchByName    = this.byName(list, query);
    var fusionResult    = _.extend(searchBySubject, searchByName);

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
  }

};
