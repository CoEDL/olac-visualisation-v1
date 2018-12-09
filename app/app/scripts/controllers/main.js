"use strict";

/**
 * @ngdoc function
 * @name appApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appApp
 */
angular.module("appApp").controller("MainCtrl", [
  "$scope",
  "$http",
  "$mdSidenav",
  "$mdDialog",
  "_",
  "dataService",
  "$timeout",
  "$location",
  function($scope, $http, $mdSidenav, $mdDialog, _, ds, $timeout, $location) {
    $scope.dataLoaded = false;
    /*
        $mdDialog.show({
            template: '<div aria-label="loading" layout="column" layout-align="center center">' + 
                      '    <md-progress-circular md-mode="indeterminate"></md-progress-circular>' +
                      '</div>',
            parent: angular.element(document.body),
            clickOutsideToClose: false
        });
        */

    $scope.datasets = {
      languages: undefined,
      countries: undefined,
      regions: undefined
    };

    if (_.isNull(ds.datasets.languages) || _.isNull(ds.datasets.countries)) {
      ds.init().then(function() {
        $scope.datasets = ds.datasets;
        $scope.dataLoaded = true;
      });
    } else {
      $scope.datasets = ds.datasets;
      $scope.dataLoaded = true;
    }

    $scope.toggleSideNav = function() {
      $mdSidenav("right").toggle();
    };

    $scope.reset = function() {
      ds.reset();
    };

    $scope.jumpToAnalyse = function() {
      var p = $location.path();
      $location.path(p + "analyse");
    };
  }
]);
