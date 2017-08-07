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

    //oscillator
    var osc = {
        type: 'square',
        types: ['sine', 'square', 'sawtooth', 'triangle'],
        changeType: Synth.changeType,
        frequency: 440,
        changeFrequency: Synth.changeFrequency,
        volume: Synth.volumeDisplay,
        changeVolume: function(val) {
            Synth.changeVolume(val);
            this.volume = Synth.volumeDisplay;   
        }
    };
    $scope.osc = osc;
    osc.changeVolume(1);

    //filter
    var filter = {
        type: 'bandpass',
        types: ['lowpass', 'highpass', 'bandpass', 'notch'],
        changeType: Synth.changeFilterType,
        step: function(freq){
          return (freq/1000);
        },
        changeFrequency: Synth.changeFilterFrequency,
        frequency: 500
    };
    $scope.filter = filter;

    //LFO
    var lfo = {
        changeRouting: Synth.changeLfoRouting,
        changeType: Synth.changeLfoType,
        dest: 'volume',
        destOptions: ['filter', 'volume'],
        rate: 3,
        type: 'sawtooth',
        changeRate: Synth.changeRate
    };

    $scope.lfo = lfo;

    $scope.effectTypes = ['distortion', 'delay'];

    Synth.start();
  });
