/**
 * Global message bus to receive or send broadcast messages beyond object scope
 * 
 * @author Jannis Moßhammer <jannis.mosshammer@netways.de>
 */
Ext.ns("Icinga.Mobile.Model")
Icinga.Mobile.Model.IcingaMessageBus = new (Ext.extend(Ext.util.Observable, {
	customEvents : {},
	constructor : function(config) {
		this.listeners = config;
		this.superclass.constructor.call(this,config);
	},
	addCustomListener : function(eventName, handler, scope,options) {
		this.addEvents(eventName);
		this.customEvents[eventName] = true;
		this.addListener(eventName,handler,scope,options);
	},
	fireCustomEvent : function() {
		var eventName = (Ext.toArray(arguments))[0];

		if(!this.customEvents[eventName])
			return false;
		this.fireEvent.apply(this,arguments);
	}
}))();

//shorthand
Ext.ns('IBus');
IBus = Icinga.Mobile.Model.IcingaMessageBus;
