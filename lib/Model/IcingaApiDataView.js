/**
 * Base class for implementing custom DataViews for IcingaMobile
 *
 * @params: Object cfg
 *		- preset:		String that contains the name of a preset (service, host)
 *		- viewConfigDescriptor: (excludes preset) a manual config
 *		- viewTpl:		Name of the template to use for the preset
 *
 * @author Jannis Moßhammer <jannis.mosshammer@netways.de>
 */
Ext.onReady(function() {
	Ext.ns("Icinga.Mobile.Model")
	Icinga.Mobile.Model.IcingaApiDataView = Ext.extend(Ext.DataView,{
		
		presetDefinitions : Icinga.Mobile.View.Templates,
		selectedItems: [],

		constructor: function(cfg) {
			if(!cfg)
				cfg = {}
			Ext.apply(this,cfg,{
				overClass: 'item-selected',
				itemSelector: 'div.infoField'
			});

			if(!(this.setupView(cfg) && this.setupStore(cfg))) {
				IBus.fireCustomEvent("displayConfigDialog");
				return;
			}
	
			Ext.apply(this,cfg);
			Ext.DataView.prototype.constructor.call(this,cfg);
			this.on("show",function(){
				this.getStore().isActive = true;
				this.getStore().load();
			},this)
			this.on("hide",function() {
				Ext.each(Ext.DomQuery.select(".selectedIcingaItem"), function(item) {
					Ext.get(item).removeClass("selectedIcingaItem");
					item.data = null;
				});
			},this)
			this.on("itemtap", function(_this,idx,item,e) {
				if(this.cmdMode)  {
					if(item.data) {
						Ext.get(item).removeClass("selectedIcingaItem");
						item.data = null;
					} else {
						Ext.get(item).addClass("selectedIcingaItem");
						item.data =  _this.getRecord(item);
					}
					return true;
				}
				if(!this.detailParser)
					this.detailParser = new Icinga.Mobile.Model.Template.DetailParser(this.viewConfigDescriptor);
				var record = _this.getRecord(item);

				Icinga.Mobile.View.Sheets.DetailSheet.parseConfig(this.detailParser,record);
				Icinga.Mobile.View.Sheets.DetailSheet.show();
			},this)

			this.on("hide",function(){
				this.getStore().isActive = false;
			},this)
		},

		setupStore: function(cfg) {
			if(!this.viewConfigDescriptor)
				return false;
			var vD = this.viewConfigDescriptor;
			var proxyUrl = IConf.getConfigVar("icinga_url");
			var apiKey = IConf.getConfigVar("icinga_apikey");
			if(!proxyUrl || !apiKey) {
				Ext.Msg.alert("Missing config parameters","Can't access icinga without url and credentials!");
				return false;
			}
			var store = {
				storeId: vD.target,
				fields :vD.fields,
				proxy : new Icinga.Mobile.Model.IcingaApiStoreProxy({
				//	type: 'ajax',
					reader: {
						type: 'json',
						root: 'result',
						idProperty: vD.idProperty,
						successProperty: 'success',
						totalProperty: 'total'
					}
				})
			
			};
			store.proxy.searchFields = vD.searchFields;
			var url = proxyUrl+"/web/api/"+vD.target+"/";
			url += this.getColumnsURI();
			url += "/authkey="+apiKey;
			url += "/countColumn="+vD.idProperty;
			url += "/withMeta=1";
			store.proxy.url = url;
			cfg.store = new Icinga.Mobile.Model.IcingaApiStore(store);
			return true;
		},

		getColumnsURI : function() {
			var vD = this.viewConfigDescriptor;
			var cols = "columns[";
			var first = true;
			Ext.each(vD.fields,function(field) {
				if(field.mapping)
					return true;
				if(!first)
					cols += "|";
				cols += field.name || field;
				first = false;
			});
			return cols+"]";
		},
		refreshStore: function() {
			this.getStore().load();
		},
		setupView: function(cfg) {

			if(this.preset && this.presetDefinitions[this.preset])
				this.viewConfigDescriptor = this.presetDefinitions[this.preset];
			var templateName = IConf.getConfigVar("defaultViewTpl");
			if(!this.templates[templateName]) {
				alert("Invalid template "+templateName+" specified!");
				IConf.clear();
				return false;
			}
			this.filterDef = this.viewConfigDescriptor.filters;
			this.sortDef = this.viewConfigDescriptor.sort;
			var templateToUse = this.templates[templateName];
			// build final template from intermediate template
			Ext.apply(this.viewConfigDescriptor.XTemplateConf,{"TPL": '<tpl for=".">',"TPL_END":'</tpl>'});
			cfg.tpl = new Ext.XTemplate(templateToUse.apply(this.viewConfigDescriptor.XTemplateConf));
			cfg.title = this.viewConfigDescriptor.title;
			return true;
		},



		templates: {
			'pregnancyTest' : new Ext.XTemplate(
				'<div class="listing">',
					'{TPL}',
						'<div class="listingThumb">',
							'<div class="infoField state_{TARGET}_{STATEFIELD}" id="{ID}">',
								'{CONTENT}',
							'</div>',
						'</div>',
					'{TPL_END}',
				'</div>'
			)
		}


	});

})