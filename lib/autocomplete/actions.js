var util = require('../util/util.js');
var variableManager = require('../variablemanagement/variablemanagement.js');
exports.createAutocompleteActions = function () {

    Homey.manager('flow').on('action.set_countup_timer.variable.autocomplete', function (callback, value) {
        callback(null, variableManager.getvariables().filter(util.filterVariable(value, 'number')));
    });

    Homey.manager('flow').on('action.set_random_countup_timer.variable.autocomplete', function (callback, value) {
        callback(null, variableManager.getvariables().filter(util.filterVariable(value, 'number')));
    });

    Homey.manager('flow').on('action.stop_countup_timer.variable.autocomplete', function (callback, value) {
        callback(null, variableManager.getvariables().filter(util.filterVariable(value, 'number')));
    });

    Homey.manager('flow').on('action.adjust_countup_timer.variable.autocomplete', function (callback, value) {
        callback(null, variableManager.getvariables().filter(util.filterVariable(value, 'number')));
    });
}
