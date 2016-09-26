var angular  = require("angular");
angular.module('ngUploadProgress')
.service('restService', ['$http', function($http){
    
    this.upload = function(api, params, uploadProgressCallBack) {
		var url = "http://localhost:8081/api/upload";
		
		var configData = {
		    transformRequest: angular.identity,
		    headers: {
                'Content-Type': undefined //Content type will decide at runtime as multipart/form-data
            },
            uploadEventHandlers: {
                progress: uploadProgressCallBack
            }
		}

		return $http.post(url, params, configData);
	}
}]);