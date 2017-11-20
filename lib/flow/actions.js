var util = require('../util/util.js');
var variableManager = require('../variablemanagement/variablemanagement.js');

exports.createActions = function () {


    Homey.manager('flow').on('action.set_countup_timer', function (callback, args) {
          Homey.log('set countup timer');
           var setdate = getShortDate();
           if (args.variable && args.variable.name) {
            var variable = variableManager.getvariable(args.variable.name);
            var tokens = { 'variable' : args.variable.name };
            var state = { 'variable' : args.variable.name };
            Homey.log(tokens);
            Homey.manager('flow').trigger('countup_started', tokens, state);
            if (variable) {
              variableManager.updatevariable(args.variable.name, args.value, 'number',setdate);
                callback(null, true);
                return;
            }
       }
        callback(null, false);

});

Homey.manager('flow').on('action.set_random_countup_timer', function (callback, args) {
       var setdate = getShortDate();
       if (args.variable && args.variable.name) {
        var variable = variableManager.getvariable(args.variable.name);
        if (variable) {
            //the *1 is to make a number of args.valuemin
            var newtimer = Math.floor(Math.random() * (args.valuemax - args.valuemin + 1) + args.valuemin*1);
            variableManager.updatevariable(args.variable.name, newtimer, 'number',setdate);
            callback(null, true);
            return;
        }
   }
    callback(null, false);

});

Homey.manager('flow').on('action.increase_countup_timer', function (callback, args) {
      Homey.log('increase countup timer');
       var setdate = getShortDate();
       if (args.variable && args.variable.name) {
        var variable = variableManager.getvariable(args.variable.name);
        var tokens = { 'variable' : args.variable.name };
        var state = { 'variable' : args.variable.name };
        //Homey.log(tokens);
        //Homey.log(args.value);
        var newTimervalue = Number(args.value) + Number(variable.value);
        Homey.log(Number(newTimervalue));
        //Homey.manager('flow').trigger('countup_started', tokens, state);
        if (variable) {
          variableManager.updatevariable(args.variable.name, newTimervalue, 'number',setdate);
            callback(null, true);
            return;
        }
   }
    callback(null, false);
});

    Homey.manager('flow').on('action.stop_countup_timer', function (callback, args) {
          Homey.log('stop countup timer');
           var setdate = getShortDate();
           if (args.variable && args.variable.name) {
              var variable = variableManager.getvariable(args.variable.name);
              var tokens = { 'variable' : args.variable.name };
              var state = { 'variable' : args.variable.name };
              Homey.manager('flow').trigger('countup_stopped', tokens, state);
              if (variable) {
                variableManager.updatevariable(args.variable.name, -1, 'number',setdate);
                callback(null, true);
                return;
              }
            }
          callback(null, false);
});

Homey.manager('flow').on('action.stop_all_countup_timers', function (callback, args) {
      Homey.log('stop all countup timers');
      var setdate = getShortDate();
      var currentVariables= variableManager.getvariables();
      //Homey.log(currentVariables);
      currentVariables.forEach(function( obj) {
         Homey.log(obj.name);
         Homey.log(obj.value);
         var tokens = { 'variable' : obj.name, 'value' : obj.value };
         var state = { 'variable' : obj.name };
         Homey.manager('flow').trigger('countup_stopped', tokens, state);
           if (obj) {
              variableManager.updatevariable(obj.name, -1, 'number',setdate);
              callback(null, true);
              return;
           }
      })
    callback(null, false);
});
}

function isNumber(obj) { return !isNaN(parseFloat(obj)) }

function iskBoolean(bool) {
    return typeof bool === 'boolean' ||
          (typeof bool === 'object' && typeof bool.valueOf() === 'boolean');
}

function getShortDate() {
    now = new Date();
    year = "" + now.getFullYear();
    month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
    day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
    hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
    minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
    second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}
