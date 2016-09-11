var countryApp = angular.module('countryApp', ['ngRoute']);
      countryApp.config(function($routeProvider) {
        $routeProvider. 
           when('/', {
             templateUrl: 'template/country_list.html',
             controller: 'CountryListController'
           }).
           when('/:countryName', {
             templateUrl: 'template/country_detail.html',
             controller: 'CountryDetailController'
           }).
           otherwise({
             redirectTo: '/'
           });
      });

      countryApp.factory('countries', function($http){
        return {
          list: function(callback){
            $http.get('data/data.json').success(callback);
          }
        };
      });

      countryApp.controller('CountryListController', function ($scope, countries){
        countries.list(function(countries) {
          $scope.countries = countries;
        });
      });

      countryApp.controller('CountryDetailController', function ($scope, $routeParams, $http){
        $http.get('data/data.json').success(function(data) {
          $scope.country = data.filter(function(entry){
            return entry.name === $routeParams.countryName;
          })[0];         
        });
      });