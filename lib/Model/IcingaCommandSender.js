/**
 * Simple object that sends commands to the icinga-web instance
 *
 * @author Jannis Moßhammer <jannis.mosshammer@netways.de>
 */
Ext.onReady(function() {
	Ext.ns("Icinga.Mobile.Model")
	Icinga.Mobile.Model.IcingaCommandSender = new function() {
		var pub = {
			submitCommand: function(command,target,data,fn) {
				alert("Sending command");
				target = Ext.encode(target);
				data = Ext.encode(data);
				var proxyUrl = IConf.getConfigVar("icinga_url");
				var apiKey = IConf.getConfigVar("icinga_apikey");
				var url = proxyUrl+"/web/api/cmd/cmd="+command+"/authkey="+apiKey+"/target="+target+"/data="+data;
				Ext.Ajax.request({
				   url: url,
				   success: function(resp){console.log("resp");alert("Command send!");if(fn) fn();},
				   failure:function(resp){console.log("resp");alert("Could not send command");if(fn) fn();}
				});

				
					
			}
		}
		return pub;

	}
});