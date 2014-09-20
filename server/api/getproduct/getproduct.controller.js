'use strict';

var http = require('http');
var request = require('request');
var Q = require('q');

var _ = require('lodash');
var Getproduct = require('./getproduct.model');

// Get list of getproducts
exports.index = function(req, res) {

    var articleUrl = 'http://api.shopstyle.com/api/v2/products?pid=uid8025-25655195-60&fts=red+dress&offset=0&limit=10';

    var options = {
        url:articleUrl,
        timeout:10000
    };

    request(options,function (error, response, html){

        if(!error && response.statusCode == 200){

            return res.json(200, JSON.parse(response.body));

//            deferred.resolve(createArticleDescrition(articleUrl,html));
        }else{

            return res.json(200,'error' );
            console.log('error');
//            deferred.resolve(createArticleErrorDescrition(articleUrl, error));
        }
    });


//    return res.json(200,hello );
//  Getproduct.find(function (err, getproducts) {
//    if(err) { return handleError(res, err); }
//    return res.json(200, getproducts);
//  });
};

// Get a single getproduct
exports.show = function(req, res) {
  Getproduct.findById(req.params.id, function (err, getproduct) {
    if(err) { return handleError(res, err); }
    if(!getproduct) { return res.send(404); }
    return res.json(getproduct);
  });
};

// Creates a new getproduct in the DB.
exports.create = function(req, res) {
  Getproduct.create(req.body, function(err, getproduct) {
    if(err) { return handleError(res, err); }
    return res.json(201, getproduct);
  });
};

// Updates an existing getproduct in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Getproduct.findById(req.params.id, function (err, getproduct) {
    if (err) { return handleError(res, err); }
    if(!getproduct) { return res.send(404); }
    var updated = _.merge(getproduct, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, getproduct);
    });
  });
};

// Deletes a getproduct from the DB.
exports.destroy = function(req, res) {
  Getproduct.findById(req.params.id, function (err, getproduct) {
    if(err) { return handleError(res, err); }
    if(!getproduct) { return res.send(404); }
    getproduct.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}