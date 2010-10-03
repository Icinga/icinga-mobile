/**
 * Sheet that allows sorting by the fields defined in the view template (see Templates)
 *
 * @author Jannis Moßhammer <jannis.mosshammer@netways.de>
 */
Ext.onReady(function() {
	Ext.ns("Icinga.Mobile.View.Sheets");
	
	Icinga.Mobile.View.Sheets.SortSheet = Ext.extend(Ext.ActionSheet,{
		arrive:'left',
		depart:'left',

		centered: true,
		constructor : function(cfg) {
			Ext.apply(this,cfg);
			this.buildSortItems(cfg);
			Ext.ActionSheet.prototype.constructor.call(this,cfg);
			this.btnInterface = new Ext.Button({
				text: 'Sort',
				ui:'action',
				handler:function() {this.show()},
				scope:this
			});
		},

		buildSortItems: function(cfg) {
			this.dView = cfg.dView;
			cfg.items = [];
			var vBoxItems = [];
			var defSort = null;
			Ext.each(this.dView.sortDef, function(sortDef) {
				vBoxItems.push({
					text: 'Sort by '+sortDef.label,
					value: sortDef.label,
					xtype:'button',
					handler: function(b) {
						this.dView.getStore().setSortField(sortDef.field);
					},
					active: sortDef.isDefault,
					scope:this
				});
				if(sortDef.isDefault)
					defSort = sortDef;
			},this);
			if(defSort)
				this.dView.getStore().setSortField(defSort.field);
			var id = Ext.id();
			cfg.items.push(new Ext.ButtonContainer({
				items: vBoxItems,
				style:"width:200px",
				maxWidth:200,
				componentLayout:'vbox',
				cls:'x-button-label'
			}));
			cfg.items.push([
				{xtype:'spacer',height:25},
				{
					xtype:'slider',
					values:['ASC','DESC'],
					centered: true,
					value:1,
					minValue:0,
					maxValue:1,
					label: '<div class="th_label_'+id+'"style="text-align:center;width:100%;color:#9aa7b2">DESC</div>',
					listeners: {
						change: function(slider,thumb,old,val) {
							if(!this._thLabel)
								this._thLabel = Ext.Element.get(Ext.DomQuery.selectNode('.th_label_'+id));

							var store = this.dView.getStore();
							if(val) {
								this._thLabel.setHTML('DESC');
								store.setSortDir('DESC');
							} else {
								this._thLabel.setHTML('ASC');
								store.setSortDir('ASC');
							}
						},
						drag: function(sl,th,val) {
							if(!this._thLabel)
								this._thLabel = Ext.Element.get(Ext.DomQuery.selectNode('.th_label_'+id));
							var store = this.dView.getStore();
							if(val) {
								this._thLabel.setHTML('DESC');
								store.setSortDir('DESC');
							} else {
								this._thLabel.setHTML('ASC');
								store.setSortDir('ASC');
							}
						},
						scope:this
					}

				},
				{
					xtype: 'button',
					ui: 'action',
					text: 'Close',
					handler: function() {
						this.hide();
						this.dView.getStore().load();
					},scope:this
				}
			]);

		}
	});
});