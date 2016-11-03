'use strict';

/**
 * @ngdoc function
 * @name synthApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the synthApp
 */
angular.module('synthApp')
  .controller('MainCtrl', function ($scope, Synth) {

  	$scope.types = ['sine', 'square', 'sawtooth', 'triangle'];
    $scope.changeType = Synth.changeType;
	$scope.changeFrequency = Synth.changeFrequency;
	$scope.volume = 0;
	$scope.changeVolume = Synth.changeVolume;
	$scope.changeVolume(0);
    Synth.oscillator.start();

  });
