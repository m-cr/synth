'use strict';

angular.module('synthApp')
	.factory('Synth', function($window){
		
		var SynthFactory = {};

		var context = new $window.AudioContext();
		var _oscillator = context.createOscillator();
		var _gainNode = context.createGain();

		_oscillator.connect(_gainNode);
		_gainNode.connect(context.destination);
		

		_gainNode.gain.value = 0.01;
		_oscillator.frequency.value = 60;
		_oscillator.type = 'square';

		SynthFactory.oscillator = _oscillator;
		SynthFactory.gain = _gainNode;

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

		SynthFactory.startOscillator = function(){
			_oscillator.start();
		};

		SynthFactory.changeVolume = function(value){
			_gainNode.gain.value = value;
		};

		return SynthFactory;
	});