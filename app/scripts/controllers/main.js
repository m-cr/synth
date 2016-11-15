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

	$scope.type = 'sine';
	$scope.types = ['sine', 'square', 'sawtooth', 'triangle'];
  $scope.changeType = Synth.changeType;
  $scope.changeLfoType = Synth.changeLfoType;

  $scope.frequency = 0;
	$scope.changeFrequency = Synth.changeFrequency;
	$scope.changeFrequency(0);
	$scope.step = function(frequency){return (frequency/1000);};
	
	$scope.volume = 0;
	$scope.changeVolume = Synth.changeVolume;
	$scope.changeVolume(0);
  Synth.oscillator.start();

  $scope.filterFrequency = Synth.filterFrequency;

  $scope.lfoRate = 0;
  $scope.changeRate = Synth.changeRate;
  // $scope.changeRate(0);

  });
