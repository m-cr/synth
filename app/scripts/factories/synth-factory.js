'use strict';

angular.module('synthApp')
	.factory('Synth', function($window){
		
		var SynthFactory = {};

		var context = new $window.AudioContext();
		var _oscillator = context.createOscillator();
		var _gainNode = context.createGain();
		var _filter = context.createBiquadFilter();
		_filter.type = 'bandpass';
		var _masterFilter = context.createBiquadFilter();
		_filter.frequency.value = 1000;
		_masterFilter.frequency.value = 5000;
		var _masterGain = context.createGain();

		_gainNode.gain.value = 0.01;
		_oscillator.frequency.value = 440;
		_oscillator.type = 'square';
		
		var lfo = context.createOscillator();
		lfo.frequency.value = 3;
		lfo.type = 'sawtooth';


		var modulationGain = context.createGain();
		modulationGain.gain.value = 0.01;

		var modulationFilter = context.createGain();
		modulationFilter.gain.value = 500;

		lfo.connect(modulationGain);
		lfo.connect(modulationFilter);
		
		_oscillator.connect(_filter);
		_filter.connect(_gainNode);
		
		_gainNode.connect(_masterGain);
		_masterGain.connect(context.destination);

		lfo.start(0);

		SynthFactory.oscillator = _oscillator;
		SynthFactory.gain = _gainNode;
		SynthFactory.filter = _filter;

		SynthFactory.start = function(){
			SynthFactory.volumeDisply = Math.floor(_masterGain.gain.value * 50);
			return _oscillator.start();
		};

		SynthFactory.changeLfoRouting = function(dest){
			if(dest === 'filter'){
				lfo.disconnect();
				modulationGain.disconnect();
				lfo.connect(modulationFilter);
				modulationFilter.connect(_filter.frequency);
			} else {
				lfo.disconnect();
				modulationFilter.disconnect();
				lfo.connect(modulationGain);
				modulationGain.connect(_gainNode.gain);
			}
		};

		SynthFactory.changeLfoRouting('volume');

		SynthFactory.stop = function(){
			return _oscillator.stop();
		};

		SynthFactory.changeFrequency = function(value){
			_oscillator.frequency.value = value;
		};

		SynthFactory.changeType = function(type){
			_oscillator.type = type;
		};

		SynthFactory.changeFilterType = function(type){
			_filter.type = type;
		};

		SynthFactory.changeLfoType = function(type){
			lfo.type = type;
		};

		SynthFactory.changeFilterFrequency = function(frequency){
			_filter.frequency.value = frequency;
		};

		SynthFactory.startOscillator = function(){
			_oscillator.start();
		};

		SynthFactory.changeVolume = function(value){
			_masterGain.gain.value = value;
			SynthFactory.volumeDisplay = Math.floor(value * (50));
			console.log('synthfactory.volumeDisplay', SynthFactory.volumeDisplay);
		};

		SynthFactory.changeRate = function(rate){
			lfo.frequency.value = rate;
		};


		return SynthFactory;
	});