var angular  = require("angular");
var app = angular.module('ngUploadProgress', []);
require('./rest.js');

app.controller('appController', ["$scope", "restService", function($scope, restService) {
	
	$scope.caption1 = "Upload file - Progress - One By One";
    $scope.caption2 = "Upload file - Progress - All at a time";
    $scope.inProgress = false;
    $scope.upLoadPercent = 0;
	
	$scope.photos = [];
	

	$scope.onInputChange = function(elem) {
        $scope.inProgress = false;
		var filesLen = elem.files.length;
		$scope.$apply(function(scope) {
			for (var i = 0; i < filesLen; i++) {
				var obj = {};
				var file = elem.files[i];

				obj.file = file;
				obj.uniqueId = file.name + "_" + Math.random();
				obj.imgUrl = window.URL.createObjectURL(file);
				$scope.photos.push(obj);
			}
		});
	}

	/**
	 * this function uploads the photos to the server
	*/ 
	$scope.uploadPhotosToServer = function() {

        $scope.inProgress = true;
        for (var i = 0, len = $scope.photos.length; i < len; i++) {
            var formData = new FormData();
            var photo = $scope.photos[i];
            formData.append('file', photo.file);
            formData.append('uniqueId', photo.uniqueId);

            restService.upload('upload', formData, uploadProgress).then(onSuccess);
        }
	}
	
	var onSuccess = function(data) {
		console.log("Completed");
        console.log(data);
	}

    var uploadProgress = function(data) {
        console.log(data);
        $scope.upLoadPercent = (data.loaded/data.total)*100
    }


    $scope.caption2 = "Upload file - Progress - All at a time";
    $scope.inProgress2 = false;
    $scope.upLoadPercent2 = 0;
	
	$scope.photos2 = [];
	

	$scope.onInputChange2 = function(elem) {
        $scope.inProgress2 = false;
		var filesLen = elem.files.length;
		$scope.$apply(function(scope) {
			for (var i = 0; i < filesLen; i++) {
				var obj = {};
				var file = elem.files[i];

				obj.file = file;
				obj.uniqueId = file.name + "_" + Math.random();
				obj.imgUrl = window.URL.createObjectURL(file);
				$scope.photos2.push(obj);
			}
		});
	}

	/**
	 * this function uploads the photos to the server
	*/ 
	$scope.uploadPhotosToServer2 = function() {

        $scope.inProgress2 = true;
        //var filesData = [];
        var formData = new FormData();
        for (var i = 0, len = $scope.photos2.length; i < len; i++) {
            // var formData = new FormData();
            var photo = $scope.photos2[i];
            formData.append('file' + i, photo.file);
            formData.append('uniqueId' + i, photo.uniqueId);
            //filesData.push(formData)
        }

        restService.upload('upload', formData, uploadProgress2).then(onSuccess2);
	}
	
	var onSuccess2 = function(data) {
		console.log("Completed");
        console.log(data);
	}

    var uploadProgress2 = function(data) {
        console.log(data);
        $scope.upLoadPercent2 = (data.loaded/data.total)*100
    }
}]);
