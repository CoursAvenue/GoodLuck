var Backbone        = require('Backbone'),
    Structure       = require('../models/structure.model'),

    collection      = {};



collection.model = Structure;

collection.initialize = function () {
};





module.exports = Backbone.Collection.extend(collection);
