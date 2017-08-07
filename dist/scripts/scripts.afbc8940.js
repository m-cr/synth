"use strict";angular.module("synthApp",["ngAnimate","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"})}]),angular.module("synthApp").controller("MainCtrl",["$scope","Synth",function(a,b){a.knobValue=71;var c={type:"square",types:["sine","square","sawtooth","triangle"],changeType:b.changeType,frequency:440,changeFrequency:b.changeFrequency,volume:b.volume,oldVolume:0,mute:function(){this.oldVolume=this.volume,this.volume=0,b.changeVolume(0)},unMute:function(){this.volume=this.oldVolume,b.changeVolume(this.volume)}};a.osc=c;var d={type:"bandpass",types:["lowpass","highpass","bandpass","notch"],changeType:b.changeFilterType,step:function(a){return a/1e3},changeFrequency:b.changeFilterFrequency,frequency:500};a.filter=d;var e={changeRouting:b.changeLfoRouting,changeType:b.changeLfoType,dest:"volume",destOptions:["filter","volume"],rate:3,type:"sawtooth"};a.lfo=e,a.effectTypes=["distortion","delay"],a.lforate=20;var f=function(a,b,c){this.change=a,this.min=b,this.max=c,this.angleOffset=-90,this.height=100,this.angleArc=180,this.fgColor="white",this.bgColor="grey",this.inputColor="grey",this.cursor=5,this.displayInput=!1},g=function(c){b.changeVolume(c),a.osc.volume=b.volume};g(1);var h=new f(g,0,3);h.step=.005,$("#volumeKnob").knob(h),a.$watch("osc.volume",function(a,b){$("#volumeKnob").val(a).trigger("change")});var i=b.changeFrequency,j=new f(i,20,1e3);$("#oscKnob").knob(j),a.$watch("osc.frequency",function(a,b){$("#oscKnob").val(a).trigger("change")});var k=function(c){a.lfo.rate=c,b.changeRate(c)},l=new f(k,0,100);$("#lfoknob").knob(l),a.$watch("lfo.rate",function(a,b){$("#lfoknob").val(a).trigger("change")});var m=function(c){a.filter.frequency=c,b.changeFilterFrequency(c)},n=new f(m,20,5e3);$("#filterknob").knob(n),a.$watch("filter.frequency",function(a,b){$("#filterknob").val(a).trigger("change")}),b.start()}]),angular.module("synthApp").factory("Synth",["$window",function(a){var b={},c=new a.AudioContext,d=c.createOscillator(),e=c.createGain(),f=c.createBiquadFilter();f.type="bandpass";var g=c.createBiquadFilter();f.frequency.value=1e3,g.frequency.value=5e3;var h=c.createGain();e.gain.value=.01,d.frequency.value=440,d.type="square";var i=c.createOscillator();i.frequency.value=3,i.type="sawtooth";var j=c.createGain();j.gain.value=.01;var k=c.createGain();return k.gain.value=500,i.connect(j),i.connect(k),d.connect(f),f.connect(e),e.connect(h),h.connect(c.destination),i.start(0),b.oscillator=d,b.gain=e,b.filter=f,b.start=function(){return b.volume=h.gain.value,d.start()},b.changeLfoRouting=function(a){"filter"===a?(i.disconnect(),j.disconnect(),i.connect(k),k.connect(f.frequency)):(i.disconnect(),k.disconnect(),i.connect(j),j.connect(e.gain))},b.changeLfoRouting("volume"),b.stop=function(){return d.stop()},b.changeFrequency=function(a){d.frequency.value=a},b.changeType=function(a){d.type=a},b.changeFilterType=function(a){f.type=a},b.changeLfoType=function(a){i.type=a},b.changeFilterFrequency=function(a){f.frequency.value=a},b.startOscillator=function(){d.start()},b.changeVolume=function(a){h.gain.value=a,b.volume=a},b.changeRate=function(a){i.frequency.value=a},b}]),angular.module("synthApp").run(["$templateCache",function(a){a.put("views/main.html",'<div class="synth-component amp"> <div class="pull-right"> <button ng-show="osc.volume !== 0" class="btn btn-default" ng-click="osc.mute()" type="submit">Mute</button> <button ng-show="osc.volume === 0" class="btn btn-default" ng-click="osc.unMute();" type="submit">Un-mute</button> </div> <h3>Amp</h3> <p>Level</p> <input class="dial" id="volumeKnob" value="{{ osc.volume }}"> </div> <div class="synth-component osc"> <h3>Oscillator</h3> <span>Type: </span> <select ng-model="osc.type" ng-options="t for t in osc.types" ng-change="osc.changeType(osc.type)"></select> <p>Frequency</p> <input class="dial" id="oscKnob" value="{{ osc.frequency }}"> </div> <div class="synth-component filter"> <h3>Filter</h3> <span>Type: </span> <select ng-model="filter.type" ng-options="t for t in filter.types" ng-change="filter.changeType(filter.type)"></select> <p>Filter Frequency</p> <input id="filterknob" value="{{ filter.frequency}}" class="dial"> </div> <div class="synth-component lfo"> <h3>LFO</h3> <span>Destination: </span> <select ng-model="lfo.dest" ng-options="d for d in lfo.destOptions" ng-change="lfo.changeRouting(lfo.dest)"></select> <br> <span>Type: </span> <select ng-model="lfo.type" ng-options="t for t in osc.types" ng-change="lfo.changeType(lfo.type)"></select> <p>Rate</p> <input id="lfoknob" value="{{ lfo.rate }}" class="dial"> </div>')}]);