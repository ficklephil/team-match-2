'use strict';

angular.module('teamMatch2App')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.snap = function(){

        var colorThief = new ColorThief();

        context.drawImage(video, 0, 0, 640, 480);
        var canvasImage = new CanvasImage(canvas);

        console.log(colorThief.getColor(canvasImage));
        console.log(colorThief.getPalette(canvasImage));
    };

    //HTML5 VIDEO
    // Grab elements, create settings, etc.
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        video = document.getElementById("video"),
        videoObj = { "video": true },
        errBack = function(error) {
            console.log("Video capture error: ", error.code);
        };

    // Put video listeners into place
    if(navigator.getUserMedia) { // Standard
        navigator.getUserMedia(videoObj, function(stream) {
            video.src = stream;
            video.play();
        }, errBack);
    } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
        navigator.webkitGetUserMedia(videoObj, function(stream){
            video.src = window.webkitURL.createObjectURL(stream);
            video.play();
        }, errBack);
    }
    else if(navigator.mozGetUserMedia) { // Firefox-prefixed
        navigator.mozGetUserMedia(videoObj, function(stream){
            video.src = window.URL.createObjectURL(stream);
            video.play();
        }, errBack);
    }
});


angular.module('teamMatch2App')
    .directive('picture', function () {

        console.log('In directive');

        return{
            restrict: 'A',
            link: function ($scope, $element) {
                console.log('In link');
            },
            controller: function ($scope, $http, $element) {
                console.log('In controller');

//                var colorThief = new ColorThief();
//
//                var image = new Image();
//                image.src = $('.fashion-image').attr('src');
//
//                colorThief.getColor(image);
            }
        };
    });