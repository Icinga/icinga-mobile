Ext.ns("Icinga.Mobile.Model");
/**
 * General purpose converters that can be included into the template files
 *
 * @author Jannis Moßhammer <jannis.mosshammer@netways.de>
 */
Icinga.Mobile.Model.IcingaFieldConverter = {

	'hostStateName': function(v) {
		if(!v)
			v = '0';
		if(isNaN(v))
			return v;
		stateTypes = {'0' : 'UP','1' : 'DOWN','2' : 'UNREACHABLE','99':'PENDING'}
		return stateTypes[v];
	},

	'serviceStateName': function(v) {
		if(!v)
			v = '0';
		if(isNaN(v))
			return v;
		stateTypes = {'0' : 'OK','1' : 'WARNING','2' : 'CRITICAL','3' : 'UNKNOWN','99':'PENDING'}
		return stateTypes[v];
	},

	'booleanString': function(v) {
		return v ? 'True' : 'No'
	},
	'booleanIcon': function(v) {
		return v ? '<div class="icinga-icon enabled"></div>' : '<div class="icinga-icon disabled"></div>';
	},
	'detailEllipsis': function(v) {
		if(v.substr(0,4) != '<div')
			v = '<div class="icinga-detailField">'+v+'</div>';
		return v;
	},

	'flagsToIcons' : function(v) {
		v = parseInt(v,2);

	}
}