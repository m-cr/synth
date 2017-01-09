'use strict';

angular.module('synthApp')
	.factory('Synth', function($window){
		
		var SynthFactory = {};

		var context = new $window.AudioContext();
		var _oscillator = context.createOscillator();
		var _gainNode = context.createGain();
		var _filter = context.createBiquadFilter();
		_filter.type = 'lowpass';
		var _masterFilter = context.createBiquadFilter();
		_filter.frequency.value = 300;
		_masterFilter.frequency.value = 5000;
		var _masterGain = context.createGain();

		

		_gainNode.gain.value = 0.01;
		_oscillator.frequency.value = 60;
		_oscillator.type = 'sine';
		
		var lfo = context.createOscillator();
		lfo.frequency.value = 0;
		lfo.type = 'sine';


		var modulationGain = context.createGain();
		modulationGain.gain.value = 0.01;

		var modulationFilter = context.createGain();
		modulationFilter.gain.value = 1000;

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
			return _oscillator.start();
		};

		SynthFactory.changeLfo = function(dest){
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

		SynthFactory.filterFrequency = function(frequency){
			_filter.frequency.value = frequency;
		};

		SynthFactory.startOscillator = function(){
			_oscillator.start();
		};

		SynthFactory.changeVolume = function(value){
		//	_gainNode.gain.value = value;
			_masterGain.gain.value = value;
		};

		SynthFactory.changeRate = function(rate){
			console.log(rate);
			lfo.frequency.value = rate;
		};


		return SynthFactory;
	});