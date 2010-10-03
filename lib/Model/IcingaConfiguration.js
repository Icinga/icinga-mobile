/**
 * Icinga Mobile configuration
 * Uses HTML5 localStorage in order to save data. Sencha already offers a LocalStorageProxy, but
 * after some hours of frustration I decided to do it by myself.
 *
 * @author Jannis Moßhammer <jannis.mosshammer@netways.de>
 */
Ext.onReady(function() {
	Ext.ns("Icinga.Mobile.Model");
	
	Icinga.Mobile.Model.IcingaConfiguration =  (function() {
		
		var cfg_defaults = {
			'hasSetup' : 'true',
			'defaultViewTpl': 'pregnancyTest', 
			'icinga_apikey' : 'noKey',
			'icinga_url' : 'http://localhost/icinga-web',
			'noStartup' : 'false'
		}
		var pub = {
			setConfigVar : function(key,_var) {
				var data = Ext.decode(localStorage["icingaMobile"]);
				data[key] = _var;
				localStorage["icingaMobile"] = Ext.encode(data);
			},
			getConfigVar : function(key) {
				
				var data = Ext.decode(localStorage["icingaMobile"]);
				return data[key];
			},
			clear: function() {
				localStorage["icingaMobile"] = '';
			}
		}
		
		var initSetup = function() {
			localStorage["icingaMobile"] = Ext.encode(cfg_defaults);
			console.log()
			IBus.fireCustomEvent("displayConfigDialog");
		}
		try {
			if(!Ext.decode(localStorage["icingaMobile"]))
				initSetup();				
		} catch(e) {
			initSetup();
		}
		return pub;
	})();
// shorthand
	IConf = Icinga.Mobile.Model.IcingaConfiguration;
});
