Ext.onReady(function() {
	Ext.ns("Icinga.Mobile.View.Sheets");

	Icinga.Mobile.View.Sheets.SearchSheet = new (Ext.extend(Ext.Sheet,{
		modal:true,

		centered:true,
		showSearchField: function(store) {
			this.currentStore = store;
			this.searchField.setValue(store.getSearchText());
			this.show();
		},

		constructor: function(cfg) {
			cfg = cfg || {};
			cfg.searchField =  new Ext.form.TextField({
				name: 'search'
			});
			Ext.apply(this,cfg);
			cfg.style = "text-align:center;";

			cfg.items = [
				this.searchField,
				new Ext.Spacer({
					height: 25
			}),{
				xtype:'button',
				text: 'Search',
				toggle:false,
				handler: function(cmp) {
					this.currentStore.setSearchText(this.searchField.getValue());
					this.currentStore.load();
					this.hide();
				},
				scope:this
			},{
				xtype: 'button',
				text: 'Show all',
				toggle:false,
				handler: function(cmp) {
					this.searchField.setValue("");
					this.currentStore.setSearchText("");
					this.currentStore.load();
					this.hide();
				},
				scope:this
			}];
			Ext.Sheet.prototype.constructor.call(this,cfg);
		}
	}));
});