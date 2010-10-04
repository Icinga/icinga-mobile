/**
 * Icinga Mobile
 *
 * Allows mobile access to icinga via the icinga-web REST Interface
 * 
 * @author Jannis Moßhammer <jannis.mosshammer@netways.de>
 */

Ext.setup({
	tabletStartupScreen: 'icons/icinga-throbber.gif',
	phoneStartupScreen: 'icons/startup_iphone.png',
	icon: 'icons/idot-icon_big.png',
	glossOnIcon:true,
	onReady: function() {

		var views = [];
		if(!IConf.getConfigVar("noStartup")) {
			var startup = new Ext.ActionSheet({
				modal:true,
				hideOnMaskTap:true,
				fullscreen:true,
				centered:true,
				layout:'fit',

				html: '<div id="startup" class="startup-wrap">'+
					'<div class="startup-logo">'+
						' <img src="icons/idot-icon_big.png" />'+
					'</div>'+
					 '<div class="startup-cr">'+
						' Icinga-mobile v0.1.1 <br/>'+
						' © 2010 - The icinga team'+
						'<p><a href="http://www.icinga.org">www.icinga.org</a></p>'+
					 '</div>'+

					 '<div class="disclaimer">'+
						'Icinga-mobile is licensed under the GNU General Public License and is provided AS IS with NO WARRANTY OF ANY KIND, INCLUDING THE WARRANTY OF DESIGN, MERCHANTABILITY, AND FITNESS FOR A PARTICULAR PURPOSE.'+
						'<p>'+
						'All other trademarks are the property of their respective owners.'+
						'</p>'+
					 '</div>'+
				 '</div>'

			});
			Ext.EventManager.addListener(Ext.getBody(),"tap",function() {startup.hide()},{single:true});
			startup.show();
		}
		for(var target in Icinga.Mobile.View.Templates) {
		
			views.push(Icinga.Mobile.View.GenericView(target,views.length == 0));
		}
		views.push(Icinga.Mobile.View.ConfigView());
		Ext.ns("Icinga.Mobile");
		Icinga.Mobile.MainPanel = new Ext.Panel({
			fullscreen:true,
			events: ['sendCommand'],
			layout: 'card',
			items: [
				new Ext.TabPanel({
				    fullscreen: true,
					animation: 'slide',
				    items:views
				}),
				Icinga.Mobile.View.CommandSelectionView,
				Icinga.Mobile.View.CommandDetailView
			]
		})
		Icinga.Mobile.MainPanel.on("sendCommand",function(params) {
			Icinga.Mobile.View.CommandSelectionView.showCommands(params);
			this.setCard(1,"slide");

			},Icinga.Mobile.MainPanel
		);

		Icinga.Mobile.MainPanel.doLayout();

	}
});

