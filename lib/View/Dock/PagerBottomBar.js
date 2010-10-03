/**
 * Bottom bar that allows pagination. Uses the data delivered by the IcingaApiStore
 * and it's proxy
 *
 * @author Jannis Moßhammer <jannis.mosshammer@netways.de>
 */
Ext.onReady(function() {
	Ext.ns("Icinga.Mobile.View.Dock");


	Icinga.Mobile.View.Dock.PagerBottomBar = Ext.extend(Ext.Toolbar,{
		dock:'bottom',
		currentPage: 1,
		totalPages: 1,
		displayedItems: 0,
		totalItems: 0,
		
	
		constructor: function(cfg) {
			this.paginatorBtn = new Ext.Button({
				text: 'Page 1 / 1',
				ui: 'normal',
				tpl: '<span class="x-button-label">'+
					'Page {current_page} / {total_pages} ({displayed_items} of {total_items} items)'+
					'</span>',
				width:175
			});
			
			if(!cfg)
				cfg=  {};
			
			Ext.apply(this,cfg,{
				items: [{
					text: 'Back',
					ui:'back',
					handler: function() {
						this.dView.getStore().previousPage();
					},
					scope: this
				},
				this.paginatorBtn,
				
				{
					text: 'Next', 
					ui : 'forward',
					handler: function() {
						this.dView.getStore().nextPage();
					},
					scope: this
				}]
			});
			this.paginatorBtn.setHandler(this.displayPageSelector.createDelegate(this));
			Ext.Toolbar.prototype.constructor.call(this,cfg);
			IBus.addCustomListener("paginatorvalueschanged",this.updatePaginator,this);
		},

		updatePaginator: function() {
			var store = this.dView.getStore();
			this.paginatorBtn.update({
				"current_page": store.getCurrentPage()+1,
				"total_pages":store.getMaxPages(),
				"displayed_items": store.getCurrentCount(),
				"total_items":  store.getTotal()
			});
		},

		displayPageSelector: function() {
			var btnItems = [];
			var store = this.dView.getStore();
			for(var i=1;i<=store.getMaxPages();i++) {
				btnItems.push(
					new Ext.Button({
						text:i.toString(),
						ui:'rounded',
						idx: i-1,
						handler: function(b) {

							store.setCurrentPage(b.idx);
							selSheet.hide();
						},
						scope:this
					})
				);
			}
			var ctrlItems = [
				{xtype:'spacer',height:25},
				{xtype: 'button', ui: 'action',text: 'Close', handler: function() {selSheet.hide()}}
			];
			var selSheet = new Ext.ActionSheet({
				arrive:'left',
				depart:'left',
				maxWidth: 300,

				centered:true,
				items: [{
					xtype:'component',
					html:'Jump to page',
					style: "font-weight: bold;text-rendering: optimizeLegibility;-webkit-font-smoothing: antialiased;color: #9aa7b2;padding-bottom:1em"
				},{
					layout:'hbox',
					xtype:'container',
					items: btnItems,
					width: 300,
					scroll: 'horizontal'
				},{
					xtype:'container',
					layout:'vbox',
					items: ctrlItems
				}]
			});
			selSheet.show();
		}
		
	});
});