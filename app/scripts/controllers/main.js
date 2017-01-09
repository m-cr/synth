'use strict';

/**
 * @ngdoc function
 * @name synthApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the synthApp
 */
angular.module('synthApp')
  .controller('MainCtrl', function ($scope, Synth, $window) {
  $scope.Math = $window.Math;
	$scope.type = 'sine';
	$scope.types = ['sine', 'square', 'sawtooth', 'triangle'];
  $scope.changeType = Synth.changeType;
  $scope.changeLfoType = Synth.changeLfoType;

  $scope.frequency = 0;
  $scope.changeFrequency = Synth.changeFrequency;
  $scope.filterType = 'lowpass';
  $scope.filterTypes = ['lowpass', 'highpass', 'bandpass', 'notch'];
	$scope.changeFilterType = Synth.changeFilterType;
	$scope.changeFrequency(0);
	$scope.step = function(frequency){return (frequency/1000);};
	
	$scope.volume = 0;
	$scope.changeVolume = Synth.changeVolume;
	$scope.changeVolume(0);
  Synth.oscillator.start();

  $scope.changeLfo = Synth.changeLfo;
  $scope.dests = ['filter', 'volume'];

  $scope.filterFrequency = Synth.filterFrequency;

  $scope.lfoRate = 0;
  $scope.lfoType = 'sine';
  $scope.changeRate = Synth.changeRate;
  // $scope.changeRate(0);

  $scope.effectTypes = ['distortion', 'delay'];

  });
