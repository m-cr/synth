'use strict';

angular.module('synthApp')
	.factory('Synth', function($window){
		
		var SynthFactory = {};

		// create context
		var context;
		if('webkitAudioContext' in $window) {
	    context = new webkitAudioContext();
		} else {
			context = new $window.AudioContext();
		}

		//osc
		var _oscillator = context.createOscillator();
		_oscillator.frequency.value = 80;
		_oscillator.type = 'square';
		SynthFactory.oscillator = _oscillator;

		// filter
		var _filter = context.createBiquadFilter();
		_filter.type = 'lowpass';
		_filter.frequency.value = 1000;
		SynthFactory.filter = _filter;
		
		var modulationFilter = context.createGain();
		modulationFilter.gain.value = 500;

		// gain for osc>filter>gain
		var _gainNode = context.createGain();
		_gainNode.gain.value = 0.01;
		SynthFactory.gain = _gainNode;
		
		var modulationGain = context.createGain();
		modulationGain.gain.value = 0.01;

		// lfo
		var lfo = context.createOscillator();
		lfo.frequency.value = 3;
		lfo.type = 'sine';
		SynthFactory.lfo = lfo;
		lfo.start(0);

		// master filter and master gain
		var _masterFilter = context.createBiquadFilter();
		_masterFilter.frequency.value = 5000;
		
		var _masterGain = context.createGain();

		// connections
		// osc > filter > gain
		_oscillator.connect(_filter);
		_filter.connect(_gainNode);
		//lfo > mod gain > gain
		lfo.connect(modulationGain);
		modulationGain.connect(_gainNode.gain);
		//gain > master gain > speakers
		_gainNode.connect(_masterGain);
		_masterGain.connect(context.destination);

		SynthFactory.start = function(){
			SynthFactory.volume = _masterGain.gain.value;
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

		SynthFactory.stop = function(){
			return _oscillator.stop();
		};

		SynthFactory.changeOscFrequency = function(value){
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
			SynthFactory.volume = value;
		};

		SynthFactory.changeRate = function(rate){
			lfo.frequency.value = rate;
		};


		return SynthFactory;
	});