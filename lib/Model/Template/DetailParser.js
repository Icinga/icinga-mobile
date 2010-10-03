/**
 * Parses the detail field of the template and can be used for retrieving data and
 * the XTemplate for the detail view
 *
 * @author Jannis Moßhammer <jannis.mosshammer@netways.de>
 */

Ext.ns("Icinga.Mobile.Model.Template");

Icinga.Mobile.Model.Template.DetailParser = Ext.extend(Ext.util.Observable,{
	storeFieldDefinition: [],
	requestColumns:		  [],
	tpl : [],

	gridTpl: (new Ext.XTemplate(
		"<table class='x-icinga-table'>",
			"<tbody>",
				"<tr>",
					"<td colspan='2' class='x-icinga-grid-cell-head'>{TITLE}</td>",
						
				"</tr>",
				'<tpl for="rows">',
					"<tr>",
						"<td class='x-icinga-grid-cell'>",
							"<div class='x-icinga-grid-cell-inner'>",
								"{LABEL}",
							"</div>",
						"</td>",
						"<td class='x-icinga-grid-cell'>",
							"<div class='x-icinga-grid-cell-inner'>",
								"{VALUE}",
							"</div>",
						"</td>",
					"<tr>",
				"</tpl>",
			"</tbody>",
		"</table>"
	)).compile(),
	
	events: {
		'load' :true
	},

	constructor: function(config) {
		this.config = config;
		if(!Ext.isDefined(config.detail))
			return;
		this.storeFieldDefinition = [];
		this.requestColumns =  [];
		this.tpl = [];
		this.parseConfig(config);
	},

	parseConfig: function(config) {
		var rawData = config.detail;
		this.parseDataField(rawData);
		this.setupStore(config);
	},

	parseDataField: function(dataField) {
		this.extractDatabaseDefinitions(dataField);
		this.buildTemplate(dataField)
	},

	extractDatabaseDefinitions: function(dataField) {
		
		Ext.each(dataField.fields,this.extractRequestColumns,this);
		Ext.each(dataField.fields,this.addStoreField,this);
	},

	extractRequestColumns: function(dataField) {
		if(dataField.mapping) // mapped fields can't be requested
			return true;
		
		if(!Ext.isArray(dataField.field))
			dataField.field = [dataField.field];
		Ext.each(dataField.field, function(dbColumn) {
			if(this.requestColumns.indexOf(dbColumn)<0) {
				this.requestColumns.push(dbColumn);
			}
		},this);
		return true;
	},

	addStoreField: function(dataField) {
		if(!Ext.isArray(dataField.field))
			dataField.field = [dataField.field];
		Ext.each(dataField.field, function(dbColumn) {
			this.storeFieldDefinition.push({
				name: dbColumn,
				mapping: dataField.mapping || null,
				convert: dataField.convert ? Icinga.Mobile.Model.IcingaFieldConverter[dataField.convert] : null
			});
		},this)
		return true;
	},

	buildTemplate: function(dataField) {
		var rows  = [];
		
		Ext.each(dataField.fields,function(field) {
			if(field.hidden)
				return true;
			rows.push({
				"LABEL": field["labelTpl"] || field["label"],
				"VALUE": field["valueTpl"] || "{"+field["field"]+"}"
			});
		},this);

		this.tpl.push(this.gridTpl.apply({"TITLE": dataField.title,rows:rows}));
	},

	setupStore: function(conf) {
		var proxyUrl = IConf.getConfigVar("icinga_url");
		var apiKey = IConf.getConfigVar("icinga_apikey");
		if(!proxyUrl || !apiKey) {
			Ext.Msg.alert("Missing config parameters","Can't access icinga without url and credentials!");
			return;
		}
		
		var store = {
			fields : this.storeFieldDefinition,
			proxy : new Icinga.Mobile.Model.IcingaApiStoreProxy({
			//	type: 'ajax',
				reader: {
					type: 'json',
					root: 'result',
					idProperty: conf.idProperty,
					successProperty: 'success',
					totalProperty: 'total'
				}
			})

		};

		var url = proxyUrl+"/web/api/"+conf.target+"/";
		url += this.getColumnsURI();
		url += "/authkey="+apiKey;
		url += "/countColumn="+conf.idProperty;
		url += "/withMeta=1";
		store.proxy.url = url;
		this.store = new Ext.data.JsonStore(store);
		
		this.store.on("read",this.updateContainers,this)
	},
	loadDataForItem: function(item) {
		var idProperty = this.config.idProperty;
		var id = item.get(idProperty);
		this.store.proxy.filters = {SELECTED: {field: idProperty,val: id, op: "="}};
		this.store.load();
	
	},
	updateContainers: function(store) {
		var dataSet = [];
		store.each(function(rec) {dataSet.push(rec.data)},this);
		this.fireEvent("load",dataSet[0]);
	},

	getColumnsURI : function() {
		var cols = "columns[";
		cols += this.requestColumns.join("|");
		return cols+"]";
	}
})
