/**
 * Icinga Mobile Generic View
 *
 * Helper class that puts IcingaApiDataView, Filterbars, Pagination and Sorter together
 * Requires a template name that will be passed to the IcingaApiDataView
 *
 * @author Jannis Moßhammer <jannis.mosshammer@netways.de>
 */
Ext.ns("Icinga.Mobile.View");

Icinga.Mobile.View.GenericView = function(template,isActive) {
	var viewContainer = new  Icinga.Mobile.Model.IcingaApiDataView({
		preset: template,
		autoHeight:true
	});
	if(isActive && viewContainer.getStore())
		viewContainer.getStore().isActive = true;
	var filterBar = new Icinga.Mobile.View.Dock.FilterToolBar({
		dView:viewContainer
	});
	if(viewContainer.sortDef) {
		var sorter = new Icinga.Mobile.View.Sheets.SortSheet({
			dView: viewContainer
		});
		filterBar.add(sorter.btnInterface);
	}
	filterBar.add({
		xtype: 'button',
		ui: 'mask',
		iconCls: 'refresh',
		dock: 'right',
		stretch: false,
		align: 'center',
		handler: function() {
			viewContainer.refreshStore();
		}
	});
	var cmdBtnId = Ext.id("cmdBtn");
	filterBar.add({
		xtype: 'button',
		ui: 'round',
		text: "<div id='"+cmdBtnId+"' class='icinga-btn-command'> </div>",
		dock: 'right',
		stretch: false,
		align: 'center',
		handler: function() {
			var elem = Ext.get(cmdBtnId);
			if(elem.isOn)  {
				elem.replaceClass('icinga-btn-excl','icinga-btn-command');
				var selected = Ext.DomQuery.select(".selectedIcingaItem");
				if(!selected.length) {
					alert("Nothing selected!");
					
				} else {
					var dataSet = [];
					Ext.each(selected,function(item) {
						var dSet = 	{"instance": item.data.get("INSTANCE_NAME")};
						if(item.data.get("SERVICE_NAME")) {
							dSet["service"] = item.data.get("SERVICE_NAME");
							dSet["host"] = item.data.get("HOST_NAME");
						} else
							dSet["host"] = item.data.get("HOST_NAME");
						dataSet.push(dSet);
						Icinga.Mobile.MainPanel.fireEvent("sendCommand",dataSet);
					});
				}
			} else {
				elem.replaceClass('icinga-btn-command','icinga-btn-excl');
			}
			elem.isOn = ! elem.isOn;
			viewContainer.cmdMode = elem.isOn;
		}
	});

	viewContainer.on("render",function() {
		Ext.EventManager.addListener(viewContainer.getEl(),"pinch",function() {
			Icinga.Mobile.View.Sheets.SearchSheet.showSearchField(viewContainer.getStore());
		});
	})
	viewContainer.on("hide",function() {
		var elem = Ext.get(cmdBtnId);
		elem.replaceClass('icinga-btn-excl','icinga-btn-command');
		viewContainer.cmdMode = false;
		elem.isOn = false;
	},this);

	var pagerBar = new Icinga.Mobile.View.Dock.PagerBottomBar({
		dView:viewContainer
	});
	viewContainer.addDocked(filterBar);
	viewContainer.addDocked(pagerBar);
	return viewContainer;
}
