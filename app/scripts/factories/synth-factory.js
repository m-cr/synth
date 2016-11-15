'use strict';

angular.module('synthApp')
	.factory('Synth', function($window){
		
		var SynthFactory = {};

		var context = new $window.AudioContext();
		var _oscillator = context.createOscillator();
		var _gainNode = context.createGain();
		var _filter = context.createBiquadFilter();
		_filter.type = _filter.LOWPASS;
		var _masterFilter = context.createBiquadFilter();
		_filter.frequency.value = 300;
		_masterFilter.frequency.value = 5000;

		

		_gainNode.gain.value = 0.01;
		_oscillator.frequency.value = 60;
		_oscillator.type = 'sine';

		SynthFactory.oscillator = _oscillator;
		SynthFactory.gain = _gainNode;
		SynthFactory.filter = _filter;

		SynthFactory.start = function(){
			return _oscillator.start();
		};

		SynthFactory.stop = function(){
			return _oscillator.stop();
		};

		SynthFactory.changeFrequency = function(value){
			_oscillator.frequency.value = value;
		};

		SynthFactory.changeType = function(type){
			_oscillator.type = type;
		};

		SynthFactory.changeLfoType = function(type){
			lfo.type = type;
		};

		SynthFactory.filterFrequency = function(frequency){
			_filter.frequency.value = frequency;
		};

		SynthFactory.startOscillator = function(){
			_oscillator.start();
		};

		SynthFactory.changeVolume = function(value){
			_gainNode.gain.value = value;
		};

		SynthFactory.changeRate = function(rate){
			console.log(rate);
			lfo.frequency.value = rate;
			console.log(_filter.frequency.value);
		};

		var lfo = context.createOscillator();
		lfo.frequency.value = 0;
		lfo.type = 'sine';


		var modulationGain = context.createGain();
		modulationGain.gain.value = 0.15;

		_oscillator.connect(_filter);
		lfo.connect(modulationGain);
		modulationGain.connect(_gainNode.gain);
		lfo.start(0);
		_filter.connect(_gainNode);
		_masterFilter.connect(_gainNode);
		_gainNode.connect(context.destination);


		return SynthFactory;
	});