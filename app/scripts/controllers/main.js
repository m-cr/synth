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
  	
    //oscillator
    $scope.type = 'square';
  	$scope.types = ['sine', 'square', 'sawtooth', 'triangle'];
    $scope.changeType = Synth.changeType;
    $scope.frequency = 80;
    $scope.changeFrequency = Synth.changeFrequency;
    // $scope.changeFrequency(440);
    $scope.volume = 1;
    $scope.changeVolume = Synth.changeVolume;
    $scope.changeVolume(1);

    //filter
    $scope.filterType = 'bandpass';
    $scope.filterTypes = ['lowpass', 'highpass', 'bandpass', 'notch'];
    $scope.changeFilterType = Synth.changeFilterType;
    $scope.step = function(frequency){
      return (frequency/1000);
    };
    $scope.filterFrequency = Synth.filterFrequency;
    $scope.filter = 500;
    
    Synth.oscillator.start();

    //LFO
    $scope.changeLfo = Synth.changeLfo;
    $scope.changeLfoType = Synth.changeLfoType;
    $scope.dest = 'filter';
    $scope.dests = ['filter', 'volume'];
    $scope.lfoRate = 3;
    $scope.lfoType = 'sawtooth';
    $scope.changeRate = Synth.changeRate;

    $scope.effectTypes = ['distortion', 'delay'];

  });
