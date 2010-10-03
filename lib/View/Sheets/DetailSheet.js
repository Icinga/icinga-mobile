/**
 * Detailview that displays data delivered by the the detailparser
 *
 * @TODO: Scrolling doesn'T work yet
 * @TODO: Perfdata overview
 * @author Jannis Moßhammer <jannis.mosshammer@netways.de>
 */
Ext.onReady(function() {
	Ext.ns("Icinga.Mobile.View.Sheets");

	Icinga.Mobile.View.Sheets.DetailSheet = new (Ext.extend(Ext.Sheet,{
		arrive:'left',
		depart:'left',
		animation: 'slide',
		modal:true,
		baseCls: 'icinga-sheet',
		fullscreen:true,
		stretchY: true,
		centered:true,
		scroll:'vertical',
		dataContainer : new Ext.Container({
			autoDestroy:true,
			height: Ext.getBody().getHeight(),
			width: Ext.getBody().getWidth()*0.98
		}),
		constructor: function(cfg) {
			cfg = cfg || {}
			cfg.items = [
				this.dataContainer
			];
			Ext.Sheet.prototype.constructor.call(this,cfg);
			
			this.on("show",function() {
				Ext.EventManager.on(document.body,"swipe",this.swipeCloser,this);
			},this);
		},

		updateContainer: function(data) {
			this.dataContainer.update(data,true);
			this.buildDetailBox.defer(100,this);
		
		},
		swipeCloser: function(e) {
			if(this.isVisible())
				if(e.direction == "left") {
					this.hide();
					Ext.EventManager.removeListener(document.body,"swipe",this.swipeCloser);
				}
		},

		parseConfig: function(cfgParser,selected) {
			this.buildItems(cfgParser);
			cfgParser.loadDataForItem(selected);
			this.doLayout();
		},
	
		buildItems: function(cfgParser) {
			
			var items = [];
			Ext.each(cfgParser.tpl, function(cfgItem) {
				if(!Ext.isObject(cfgParser.tpl))
					cfgParser.tpl = new Ext.XTemplate(cfgParser.tpl).compile();
				
				this.dataContainer.tpl = cfgParser.tpl;
				
				cfgParser.on("load",this.updateContainer,this,{single:true});
			},this);
			
			this.add(items);
		},

		buildDetailBox: function(val) {
			var el = this.dataContainer.el;

			var infoBoxes = Ext.DomQuery.select("div.icinga-detailField");
			Ext.each(infoBoxes,function(box) {
				if(box.processed)
					return true;
				Ext.EventManager.on(box,"click", function(cmp) {
				var text = (Ext.get(cmp.target).getHTML());
				alert(text);
					
				},this);
				return true;
			},this);
		}
		
	}));
	
});