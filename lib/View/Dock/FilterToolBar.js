Ext.onReady(function() {
	Ext.ns("Icinga.Mobile.View.Dock");

	Icinga.Mobile.View.Dock.FilterToolBar = Ext.extend(Ext.Toolbar,{
		dock:'top',

		constructor: function(cfg) {
			if(!cfg)
				cfg = {}
			Ext.apply(this,cfg);
			this.buildFilterButtons(cfg);
			Ext.Toolbar.prototype.constructor.call(this,cfg);
		},

		buildFilterButtons: function(cfg) {
			var btnCfg = {
				allowMultiple:true,
				items: []
			};

			Ext.each(this.dView.filterDef, function(filter) {
				btnCfg.items.push({		
					text: filter.label || ' ',
					cls: filter.cls,
					value: filter.label+"_"+Ext.id('btn'),
					xtype: 'button',
					active: filter.isActive,
					handler: function(b,e) {
						
						if(b.active)
							this.dView.getStore().enableFilter(filter)
						else
							this.dView.getStore().disableFilter(filter)
					},
					scope: this
				});
				if(!filter.isActive) {
					this.dView.getStore().enableFilter(filter);
				}
			},this)
			
			Ext.apply(cfg,{
				items: [
					new Ext.ButtonContainer(btnCfg)
		
				]
			});
		}
	})
});