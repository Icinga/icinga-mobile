/**
 * Displays the commands from the View.Commands.Definitions file
 *
 * @author jannis.mosshammer <jannis.mosshammer@netways.de>
 */


Ext.ns("Icinga.Mobile.View");
(function() {

	var cmdView = new Ext.DataView({
		layout:'fit',
		fullscreen:true,
		store:new Ext.data.JsonStore({
			proxy: {
				type: 'memory',
				reader: {
					type: 'json'
				}
			},
			fields: ['title','icon']
		}),
		overClass:'x-view-over',
        itemSelector:'div.selCommand',
        emptyText: 'No images to display',
		tpl: new Ext.XTemplate('<tpl for=".">',
			"<div class='selCommand'>",
				"<div class='label  {icon}'>{title}</div>",
			"</div>",
			"</tpl>"
		),
		listeners: {
			'itemtap' : function(_this,idx,item,e) {
				Icinga.Mobile.View.CommandDetailView.updateForm(_this.getRecord(item),_this.curTargets);
				Icinga.Mobile.MainPanel.setCard(2,'slide');
			}

		}
	});
	Icinga.Mobile.View.CommandSelectionView = new (Ext.extend(Ext.Panel,{
		fullscreen:true,
		layout:'fit',
		items: [cmdView],
		showCommands: function(object) {
			var tpl;
			cmdView.curTargets = object;
			if(object[0]["service"]) {
				tpl = Icinga.Mobile.View.Commands.Definitions["Service"];
			} else {
				tpl = Icinga.Mobile.View.Commands.Definitions["Host"];
			}

			cmdView.getStore().loadData(tpl);

		},
		constructor :function(cfg) {
			Ext.Container.prototype.constructor.call(this,cfg);
			cmdView.addDocked(
				new Ext.Toolbar({
					dock:'top',
					items: [{
						xtype:'component',
						html: 'Select a command',
						cls: 'icinga-cmd-header'
					}]
				})
			);
			cmdView.addDocked(
				new Ext.Toolbar({
					dock: 'bottom',
					items: [{
						text: 'Cancel',
						handler: function() {
							Icinga.Mobile.MainPanel.setCard(0,'slide');
						}
					}]
				})
			);
		}
	}));
})()