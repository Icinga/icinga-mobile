/**
 * Icinga Mobile Config
 *
 * The yet minimalistic config view. Passes data to the localStorage
 *
 * @author Jannis Moßhammer <jannis.mosshammer@netways.de>
 */
Ext.ns("Icinga.Mobile.View");

Icinga.Mobile.View.ConfigView = function() {
	
	var view = new Ext.form.FormPanel({
		title: 'Config',
		fullscreen:true,
		
		items: [{
			xtype: 'component',
			cls: 'funkyIcingaBox'
		},{
			xtype: 'textfield',
			name: 'url',
			label: 'Icinga Web URL',
			value: IConf.getConfigVar('icinga_url')
		},new Ext.form.PasswordField({
			xtype: 'passwordField',
			name: 'authkey',
			label: 'Auth key',
			value: IConf.getConfigVar('icinga_apikey')
		
		}),new Ext.form.Checkbox({
			name: 'noStartup',
			label: 'Hide startup',
			value: IConf.getConfigVar('noStartup')
		})],
		cls: 'icinga-panel-config'

	});
	view.addDocked(
		new Ext.Toolbar({
			dock: 'top',
			items: [{
				text: 'Clear configuration',
				handler: function() {
					if(confirm("Really clear the config?")) {
						IConf.clear();
						view.setValues({
							'url' : null,
							'authkey' : null
						})
					}
					
				}
			},{
				text: 'Save',
				ui: 'action',
				handler: function() {
					if(confirm("Do you want to save these changes?")) {
						var vals = view.getValues();
						IConf.setConfigVar('icinga_url',vals["url"]);
						IConf.setConfigVar('icinga_apikey',vals["authkey"]);
						IConf.setConfigVar('noStartup',vals["noStartup"]);
						window.location.reload();
					}
				}
			},{
				text: 'Reset',
				ui: 'action',
				handler: function() {
					var vals = {
						'url' : IConf.getConfigVar('icinga_url'),
						'authkey' : IConf.getConfigVar('icinga_apikey')
					}
					view.setValues(vals);

				}
			}]
			
		})
	);
	return view;

}