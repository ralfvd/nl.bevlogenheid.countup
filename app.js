"use strict";

var fs = require('fs');
var variableManager = require('./lib/variablemanagement/variablemanagement.js');
var util = require('./lib/util/util.js');

var autoCompleteActions = require('./lib/autocomplete/actions.js');
var autoCompleteConditions = require('./lib/autocomplete/conditions.js');
var autoCompleteTriggers = require('./lib/autocomplete/triggers.js');

var flowActions = require('./lib/flow/actions.js');
var flowConditions = require('./lib/flow/conditions.js');
//var flowTriggers = require('./lib/flow/triggers.js');

var self = {
  init: function() {
	Homey.log("CountUp started");
	variableManager.init();

	autoCompleteActions.createAutocompleteActions();
  autoCompleteConditions.createAutocompleteConditions();
  autoCompleteTriggers.createAutocompleteTriggers();

	flowActions.createActions();
	flowConditions.createConditions();

        Homey.manager('flow').on('trigger.countup_to_zero', function (callback,args,state) {
        if ( args.variable.name == state.variable ) {
                callback(null,true);
                return;
           } else {
                callback(null, false); // true to make the flow continue, or false to abort
         }
        });

        Homey.manager('flow').on('trigger.countup_started', function (callback,args,state) {
        if (args.variable.name == state.variable) {
          callback(null,true);
          return;
         } else {
        callback(null, false); // true to make the flow continue, or false to abort
        }
        });

        Homey.manager('flow').on('trigger.countup_stopped', function (callback,args,state) {
        if ( args.variable.name == state.variable ) {
            callback(null,true);
            return;
         } else {
        callback(null, false); // true to make the flow continue, or false to abort
        }
        });

        Homey.manager('flow').on('trigger.countup_timer_changed', function (callback,args,state) {
        if ( args.variable.name == state.variable ) {
            //Homey.log(args);
            callback(null,true);
            return;
         } else {
        callback(null, false); // true to make the flow continue, or false to abort
        }
        });


	var currentVariables= variableManager.getvariables();
  Homey.log(currentVariables.length);
	setInterval(timers_update,1000);
	function timers_update() {
		var currentVariables= variableManager.getvariables();
		//Homey.log(currentVariables);
	        currentVariables.forEach(function( obj) {
		 	//Homey.log(obj.name);
			//Homey.log(obj.value);
      var tokens = { 'variable' : obj.name, 'value' : obj.value };
      var state = { 'variable' : obj.name };
      if (obj.value != -1) {
				variableManager.updatevariable(obj.name, parseInt(obj.value) + 1, 'number','');
        Homey.manager('flow').trigger('countup_timer_changed', tokens, state);
			}
		});
	};
  }
}


module.exports = self;
