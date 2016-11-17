"use strict";angular.module("synthApp",["ngAnimate","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"})}]),angular.module("synthApp").controller("MainCtrl",["$scope","Synth",function(a,b){a.type="sine",a.types=["sine","square","sawtooth","triangle"],a.changeType=b.changeType,a.changeLfoType=b.changeLfoType,a.frequency=0,a.changeFrequency=b.changeFrequency,a.changeFrequency(0),a.step=function(a){return a/1e3},a.volume=0,a.changeVolume=b.changeVolume,a.changeVolume(0),b.oscillator.start(),a.filterFrequency=b.filterFrequency,a.lfoRate=0,a.lfoType="sine",a.changeRate=b.changeRate,a.effectTypes=["distortion","delay"]}]),angular.module("synthApp").factory("Synth",["$window",function(a){var b={},c=new a.AudioContext,d=c.createOscillator(),e=c.createGain(),f=c.createBiquadFilter();f.type=f.LOWPASS;var g=c.createBiquadFilter();f.frequency.value=300,g.frequency.value=5e3,e.gain.value=.01,d.frequency.value=60,d.type="sine",b.oscillator=d,b.gain=e,b.filter=f,b.start=function(){return d.start()},b.stop=function(){return d.stop()},b.changeFrequency=function(a){d.frequency.value=a},b.changeType=function(a){d.type=a},b.changeLfoType=function(a){h.type=a},b.filterFrequency=function(a){f.frequency.value=a},b.startOscillator=function(){d.start()},b.changeVolume=function(a){e.gain.value=a},b.changeRate=function(a){console.log(a),h.frequency.value=a,console.log(f.frequency.value)};var h=c.createOscillator();h.frequency.value=0,h.type="sine";var i=c.createGain();return i.gain.value=.15,d.connect(f),h.connect(i),i.connect(e.gain),h.start(0),f.connect(e),g.connect(e),e.connect(c.destination),b}]),angular.module("synthApp").run(["$templateCache",function(a){a.put("views/main.html",'<div class="well"> <h3>Oscillator</h3> <p>Volume: {{volume * (100/.03)}}</p> <input type="range" min="0" max=".03" value="{{volume}}" step=".0005" ng-model="volume" ng-change="changeVolume(volume)"> <br> <p>Type: {{type}}</p> <select ng-model="type" ng-options="t for t in types" ng-change="changeType(type)"></select> <br><br> <p>Oscillator Frequency: {{frequency}}</p> <input type="range" min="20" max="1000" value="{{frequency}}" step="1" ng-model="frequency" ng-change="changeFrequency(frequency)"> <br> <p>Filter Frequency: {{filter}}</p> <input type="range" min="20" max="15000" value="{{filter}}" step="1" ng-model="filter" ng-change="filterFrequency(filter)"> </div> <div class="well"> <h3>LFO</h3> <p>Rate: {{lfoRate}} </p> <input type="range" min="0" max="10" value="{{lfoRate}}" step=".05" ng-model="lfoRate" ng-change="changeRate(lfoRate)"> <br> <p>Type: {{lfoType}}</p> <select ng-model="lfoType" ng-options="t for t in types" ng-change="changeLfoType(lfoType)"></select> <br><br> </div>')}]);