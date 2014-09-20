'use strict';

var _ = require('lodash');
var Getshop = require('./getshop.model');

// Get list of getshops
exports.index = function(req, res) {
  Getshop.find(function (err, getshops) {
    if(err) { return handleError(res, err); }
    return res.json(200, getshops);
  });
};

// Get a single getshop
exports.show = function(req, res) {
  Getshop.findById(req.params.id, function (err, getshop) {
    if(err) { return handleError(res, err); }
    if(!getshop) { return res.send(404); }
    return res.json(getshop);
  });
};

// Creates a new getshop in the DB.
exports.create = function(req, res) {
  Getshop.create(req.body, function(err, getshop) {
    if(err) { return handleError(res, err); }
    return res.json(201, getshop);
  });
};

// Updates an existing getshop in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Getshop.findById(req.params.id, function (err, getshop) {
    if (err) { return handleError(res, err); }
    if(!getshop) { return res.send(404); }
    var updated = _.merge(getshop, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, getshop);
    });
  });
};

// Deletes a getshop from the DB.
exports.destroy = function(req, res) {
  Getshop.findById(req.params.id, function (err, getshop) {
    if(err) { return handleError(res, err); }
    if(!getshop) { return res.send(404); }
    getshop.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}