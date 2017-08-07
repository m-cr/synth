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
 
    $scope.knobValue = 71;

    //oscillator
    var osc = {
        type: 'square',
        types: ['sine', 'square', 'sawtooth', 'triangle'],
        changeType: Synth.changeType,
        frequency: 440,
        changeFrequency: Synth.changeFrequency,
        volume: Synth.volume,
        oldVolume: 0,
        mute: function(){ 
            this.oldVolume = this.volume; 
            this.volume = 0;
            Synth.changeVolume(0); 
        },
        unMute: function(){ 
            this.volume = this.oldVolume; 
            Synth.changeVolume(this.volume);
        }
    };
    $scope.osc = osc;

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
        type: 'sawtooth'
    };

    $scope.lfo = lfo;
    $scope.effectTypes = ['distortion', 'delay'];
    $scope.lforate = 20;

    //knob class
    class Knob {
        constructor (onChange, min, max) {
            this.angleOffset = -90;
            this.height = 100;
            this.change = onChange;
            this.angleArc = 180;
            this.min = min;
            this.max = max;
            this.fgColor = 'white';
            this.bgColor = 'grey';
            this.inputColor = 'grey';
            this.cursor = 5;
            this.displayInput = false;
        }
    }

    //osc volume
    var volumeChange = function(v) {
        Synth.changeVolume(v);
        $scope.osc.volume = Synth.volume;
    };
    volumeChange(1);
    var volumeKnob = new Knob(volumeChange, 0, 3);
    volumeKnob.step = 0.005;
    $('#volumeKnob').knob(volumeKnob);
    $scope.$watch(
        'osc.volume',
        function (newValue, oldValue) {
            $('#volumeKnob').val(newValue).trigger('change');
        }
    );

    //osc frequence
    var oscFreqChange = Synth.changeFrequency;
    var oscKnob = new Knob(oscFreqChange, 20, 1000);
    $('#oscKnob').knob(oscKnob);
    $scope.$watch(
        'osc.frequency',
        function (newValue, oldValue) {
            $('#oscKnob').val(newValue).trigger('change');
        }
    );

    //lfo knob
    var lfoChange = function (v) {
        $scope.lfo.rate = v;
        Synth.changeRate(v);
    };
    var lfoKnob = new Knob(lfoChange, 0, 100);
    $('#lfoknob').knob(lfoKnob);
    $scope.$watch(
        'lfo.rate',
        function (newValue, oldValue) {
            $('#lfoknob').val(newValue).trigger('change');
        }
    );

    //filter knob
    var filterChange = function (v) {
        $scope.filter.frequency = v;
        Synth.changeFilterFrequency(v);
    };
    var filterKnob = new Knob(filterChange, 20, 5000);
    $('#filterknob').knob(filterKnob);
    $scope.$watch(
        'filter.frequency',
        function (newValue, oldValue) {
            $('#filterknob').val(newValue).trigger('change');
        }
    );

    Synth.start();
  });
