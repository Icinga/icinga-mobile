
Ext.ns("Icinga.Mobile.Model");

Icinga.Mobile.Model.IcingaFieldConverter = {

	hostStateName: function(v) {
		if(isNaN(v))
			return v;
		stateTypes = {0 : 'UP',1 : 'DOWN',2 : 'UNREACHABLE',99:'PENDING'}
		return stateTypes[v];
	},

	serviceStateName: function(v) {
		if(isNaN(v))
			return v;
		stateTypes = {0 : 'OK',1 : 'WARNING',2 : 'CRITICAL',3 : 'UNKNOWN',99:'PENDING'};
		return stateTypes[v];
	},

	booleanString: function(v) {
		return v ? 'True' : 'No';
	},
	booleanIcon: function(v) {
		return v ? '<div class="icinga-icon enabled"></div>' : '<div class="icinga-icon disabled"></div>';
	},
	detailEllipsis: function(v) {
		v = Ext.util.Format.ellipsis(v,25);
		return v;
	},

	flagsToIcons : function(v) {
		console.log(arguments);
		v = parseInt(v,2);

	}
}

Ext.ns("Icinga.Mobile.View.Templates");

Icinga.Mobile.View.Templates.Host = {
	target: 'host',
	title : 'Hosts',
	fields : [
		"HOST_ID",
		"HOST_NAME",
		"HOST_CURRENT_STATE",
		{
			name: "HOST_CURRENT_STATE_NAME",
			convert: Icinga.Mobile.Model.IcingaFieldConverter.hostStateName,
			mapping: 'HOST_CURRENT_STATE'
		}
	],
	XTemplateConf: {
		'STATEFIELD': '{HOST_CURRENT_STATE}',
		'ID' : '{HOST_ID}',
		'CONTENT' : 'Host: {HOST_NAME}',
		'TARGET' : 'host'
	},

	filters: [{
		label: 'UP',
		filter: [{
			field: 'HOST_CURRENT_STATE',
			val: '0',
			op: '!='
		}]
	},{
		label: 'DOWN',
		filter: [{
			field: 'HOST_CURRENT_STATE',
			val: '1',
			op: '!='
		}],
		isActive: true

	},{
		label: 'UNREACHABLE',
		filter: [{
			field: 'HOST_CURRENT_STATE',
			val: '2',
			op: '!='
		}],
		isActive: true
	}],

	sort: [{
		label:'host name',
		field: 'HOST_NAME'
	},{
		label:'host status',
		field: 'HOST_CURRENT_STATE',
		isDefault:true
	}],

	detail: {
		title: '{HOST_NAME}',
		fields: [{
			'label' : 'Host id',
			'field' : 'HOST_ID'
		},{
			'label' : 'Host name',
			'field' : 'HOST_NAME'
		},{
			'label' : 'Adress',
			'field' : 'HOST_ADDRESS'
		},{
			'label' : 'State',
			'field' : 'HOST_CURRENT_STATE',
			'valueTpl' : '<div class="status_host_{HOST_CURRENT_STATE}">{HOST_STATE_NAME}</div>'
		},{
			'field' : 'HOST_STATE_NAME',
			'mapping' : 'HOST_CURRENT_STATE',
			'convert' : 'hostStateName',
			'hidden' : true
		},{
			'label': 'Last check',
			'field' : 'HOST_LAST_CHECK'
		},{
			'label' : 'Next Check',
			'field' : 'HOST_NEXT_CHECK'
		},{
			'label' : 'Check attempt/max',
			'field' : ['HOST_CURRENT_CHECK_ATTEMPT','HOST_MAX_CHECK_ATTEMPTS'],
			'valueTpl' : '{HOST_CURRENT_CHECK_ATTEMPT}/{HOST_MAX_CHECK_ATTEMPTS}'
		},{
			'label' : 'Output',
			'field' : 'HOST_OUTPUT',
			'convert' : 'detailEllipsis'
		}, {
			'label' : 'Perfdata',
			'field' : 'HOST_PERFDATA',
			'convert' : 'detailEllipsis'
		}, {
			'label' : 'Acknowledged?',
			'field' : 'HOST_PROBLEM_HAS_BEEN_ACKNOWLEDGED',
			'convert' : 'booleanIcon'
		},{
			'label' : 'Flags',
			'field' : [
				"HOST_ACTIVE_CHECKS_ENABLED",
				"HOST_PASSIVE_CHECKS_ENABLED",
				"HOST_NOTIFICATIONS_ENABLED"
			],
			'valueTpl': '<div class="icinga-iconField activeChecks"> '+
							'<tpl if="HOST_ACTIVE_CHECKS_ENABLED == 1">'+
								'<div class="icinga-icon enabled">:</div>'+
							'</tpl>'+
							'<tpl if="HOST_ACTIVE_CHECKS_ENABLED == 0">'+
								'<div class="icinga-icon disabled">:</div>'+
							'</tpl>'+
						'</div>'+
						'<div class="icinga-iconField passiveChecks"> '+
							'<tpl if="HOST_PASSIVE_CHECKS_ENABLED == 1">'+
								'<div class="icinga-icon enabled">:</div>'+
							'</tpl>'+
							'<tpl if="HOST_PASSIVE_CHECKS_ENABLED == 0">'+
								'<div class="icinga-icon disabled"></div>'+
							'</tpl>'+
						'</div>'+
						'<div class="icinga-iconField notifications"> '+
							'<tpl if="HOST_NOTIFICATIONS_ENABLED == 1">'+
								'<div class="icinga-icon enabled">:</div>'+
							'</tpl>'+
							'<tpl if="HOST_NOTIFICATIONS_ENABLED == 0">'+
								'<div class="icinga-icon disabled">:</div>'+
							'</tpl>'+
						'</div>'

		}]
	},

	idProperty : "HOST_ID"
}

Ext.ns("Icinga.Mobile.View.Templates");

Icinga.Mobile.View.Templates.Service = {
	target: 'service',
	title : 'Services',
	fields : [
		"SERVICE_ID",
		"SERVICE_NAME",
		"HOST_NAME",
		"SERVICE_CURRENT_STATE",
		{
			name: "SERVICE_CURRENT_STATE_NAME",
			convert: Icinga.Mobile.Model.IcingaFieldConverter.serviceStateName,
			mapping: 'SERVICE_CURRENT_STATE'
		}
	],
	XTemplateConf: {
		'STATEFIELD': '{SERVICE_CURRENT_STATE}',
		'ID' : '{SERVICE_OBJECT_ID}',
		'CONTENT' : 'Service: {SERVICE_NAME}<br/>'+
					'Host: {HOST_NAME}',
		'TARGET' : 'service'
	},

	filters: [{
		label: 'OK',
		filter: [{
			field: 'SERVICE_CURRENT_STATE',
			val: '0',
			op: '!='
		}]
	},{
		label: 'WARNING',
		filter: [{
			field: 'SERVICE_CURRENT_STATE',
			val: '1',
			op: '!='
		}],
		isActive: true
	},{
		label: 'CRITICAL',
		filter: [{
			field: 'SERVICE_CURRENT_STATE',
			val: '2',
			op: '!='
		}],
		isActive: true
	},{
		label: 'UNKNOWN',
		filter: [{
			field: 'SERVICE_CURRENT_STATE',
			val: '3',
			op: '!='
		}],
		isActive: true
	}],

	sort: [{
		label:'service name',
		field: 'SERVICE_NAME'
	},{
		label:'service status',
		field: 'SERVICE_CURRENT_STATE',
		isDefault:true
	},{
		label: 'host name',
		field: 'HOST_NAME'
	}],

	detail: {

		title: '{SERVICE_NAME}',
		fields: [{
			'label' : 'Service id',
			'field' : 'SERVICE_ID'
		},{
			'label' : 'Service name',
			'field' : 'SERVICE_NAME'
		},{
			'label' : 'Host',
			'field' : 'HOST_NAME'
		},{
			'label' : 'Service status',
			'field' : 'SERVICE_CURRENT_STATE',
			'valueTpl' : '<div class="status_service_{SERVICE_CURRENT_STATE}">{SERVICE_STATE_NAME}</div>'
		},{
			'label' : 'Host status',
			'field' : 'HOST_CURRENT_STATE',
			'valueTpl' : '<div class="status_host_{HOST_CURRENT_STATE}">{HOST_STATE_NAME}</div>'
		},{
			'field' : 'HOST_STATE_NAME',
			'mapping' : 'HOST_CURRENT_STATE',
			'convert' : 'hostStateName',
			'hidden' : true
		},{
			'field' : 'SERVICE_STATE_NAME',
			'mapping' : 'SERVICE_CURRENT_STATE',
			'convert' : 'serviceStateName',
			'hidden' : true
		},{
			'label': 'Last check',
			'field' : 'SERVICE_LAST_CHECK'
		},{
			'label' : 'Next Check',
			'field' : 'SERVICE_NEXT_CHECK'
		},{
			'label' : 'Check attempt/max',
			'field' : ['SERVICE_CURRENT_CHECK_ATTEMPT','SERVICE_MAX_CHECK_ATTEMPTS'],
			'valueTpl' : '{SERVICE_CURRENT_CHECK_ATTEMPT}/{SERVICE_MAX_CHECK_ATTEMPTS}'
		},{
			'label' : 'Output',
			'field' : 'SERVICE_OUTPUT',
			'convert' : 'detailEllipsis'
		}, {
			'label' : 'Perfdata',
			'field' : 'SERVICE_PERFDATA',
			'convert' : 'detailEllipsis'
		}, {
			'label' : 'Acknowledged?',
			'field' : 'SERVICE_PROBLEM_HAS_BEEN_ACKNOWLEDGED',
			'convert' : 'booleanIcon'
		},{
			'label' : 'Flags',
			'field' : [
				"SERVICE_ACTIVE_CHECKS_ENABLED",
				"SERVICE_PASSIVE_CHECKS_ENABLED",
				"SERVICE_NOTIFICATIONS_ENABLED"
			],
			'valueTpl': '<div class="icinga-iconField activeChecks"> '+
							'<tpl if="SERVICE_ACTIVE_CHECKS_ENABLED == 1">'+
								'<div class="icinga-icon enabled">:</div>'+
							'</tpl>'+
							'<tpl if="SERVICE_ACTIVE_CHECKS_ENABLED == 0">'+
								'<div class="icinga-icon disabled">:</div>'+
							'</tpl>'+
						'</div>'+
						'<div class="icinga-iconField passiveChecks"> '+
							'<tpl if="SERVICE_PASSIVE_CHECKS_ENABLED == 1">'+
								'<div class="icinga-icon enabled">:</div>'+
							'</tpl>'+
							'<tpl if="SERVICE_PASSIVE_CHECKS_ENABLED == 0">'+
								'<div class="icinga-icon disabled"></div>'+
							'</tpl>'+
						'</div>'+
						'<div class="icinga-iconField notifications"> '+
							'<tpl if="SERVICE_NOTIFICATIONS_ENABLED == 1">'+
								'<div class="icinga-icon enabled">:</div>'+
							'</tpl>'+
							'<tpl if="SERVICE_NOTIFICATIONS_ENABLED == 0">'+
								'<div class="icinga-icon disabled">:</div>'+
							'</tpl>'+
						'</div>'

		}]
	},

	idProperty : "SERVICE_ID"
}

Ext.onReady(function() {
	Ext.ns("Icinga.Mobile.Model")
	Icinga.Mobile.Model.IcingaApiStore = Ext.extend(Ext.data.JsonStore,{
		constructor: function(cfg) {
			Ext.data.JsonStore.prototype.constructor.call(this,cfg);
			this.getProxy().on("filterchanged",
				function() {
					this.load();
				},this,{buffer:true}
			);
		},
		enableFilter : function(_filter) {
			this.getProxy().enableFilter(_filter);
		},
		disableFilter : function(_filter) {
			this.getProxy().disableFilter(_filter);
		},
		nextPage: function() {
			this.setCurrentPage(this.getCurrentPage()+1);
		},
		previousPage: function() {
			if(this.getCurrentPage()>0)
				this.setCurrentPage(this.getCurrentPage()-1);
		},
		getTotal: function() {
			return this.getProxy().totalCount;
		},
		getCurrentCount: function() {
			return this.getProxy().currentCount;
		},
		getMaxPages: function() {
			return Math.ceil(this.getTotal()/this.getPageSize());
		},
		getCurrentPage: function() {
			return this.getProxy().currentPage;
		},
		setCurrentPage: function(page) {
			page = page >= 0 ? page :0;
			if(page < this.getMaxPages()) {
				this.getProxy().currentPage = page;
				this.load();
			}

		},
		getPageSize: function() {
			return this.getProxy().pageSize;
		},
		setPageSize: function(size) {
			this.getProxy().pageSize = size;
		},
		setSortField: function(field) {
			this.getProxy().sortField = field;
		},
		setSortDir: function(dir) {
			this.getProxy().sortDir = dir;
		},
		load: function(options) {
			if(!this.isActive)
				return false;

			Ext.data.JsonStore.prototype.load.call(this,options);
		}
	});

	Icinga.Mobile.Model.IcingaApiStoreProxy = Ext.extend(Ext.data.AjaxProxy,{
		noCache:false,
		currentPage:0,
		pageSize:25,
		currentCount: 0,
		totalCount: 0,
		sortField: null,
		sortDir: 'DESC',

		constructor: function(cfg) {
			this.testId = Ext.id(),
			this.filters = {}
			Ext.apply(this.events,{filterchanged:true});
			Ext.data.AjaxProxy.prototype.constructor.call(this,cfg);
		},
		enableFilter : function(filter) {
			if(!this.filters[filter.label])
				this.filters[filter.label] = filter.filter[0];
			this.fireEvent("filterchanged");
		},
		disableFilter : function(filter) {
			if(this.filters[filter.label])
				delete this.filters[filter.label];
			this.fireEvent("filterchanged");
		},
		doRequest: function(operation, callback, scope) {

			var writer  = this.getWriter(),
		        request = this.buildRequest(operation, callback, scope);

		    if(operation.allowWrite()){
		        request = writer.write(request);
		    }

		    Ext.apply(request, {
		        headers : this.headers,
		        timeout : this.timeout,
		        scope   : this,
				success: function(response) {
					var json = Ext.decode(response.responseText);
					this.totalCount = json["total"];
					this.currentCount = json["result"].length;
					IBus.fireCustomEvent("paginatorvalueschanged",this);
				},
		        callback: this.createRequestCallback(request, operation, callback, scope),
		        method  : this.getMethod(request)
		    });
			var limit = "/limit["+(this.currentPage*this.pageSize || 0)+";"+this.pageSize+"]";
			var filter = this.buildFilter();
			if(filter)
				filter = "/filter[AND("+filter+")]";
			var sort = "";
			if(this.sortField)
				sort = "/order["+this.sortField+";"+this.sortDir+"]";
			request.url += filter+limit+sort+"/json";
		    Ext.Ajax.request(request);
		    return request;
	    },

		buildFilter: function() {
			var filterStr = "";
			var first = true;
			for(var i in this.filters) {
				if(!first)
					filterStr+= ";";
				filterStr+= this.filters[i]["field"]+"|"+this.filters[i]["op"]+"|"+this.filters[i]["val"];
				first = false;
			}
			return filterStr;
		}

	})
});

/**
 * Base class for implementing custom DataViews for IcingaMobile
 *
 * @params: Object cfg
 *		- preset:		String that contains the name of a preset (service, host)
 *		- viewConfigDescriptor: (excludes preset) a manual config
 *		- viewTpl:		Name of the template to use for the preset
 */
Ext.onReady(function() {
	Ext.ns("Icinga.Mobile.Model")
	Icinga.Mobile.Model.IcingaApiDataView = Ext.extend(Ext.DataView,{
		/**
		 * @TODO: This could be outsourced to a separate file
		 */
		presetDefinitions : Icinga.Mobile.View.Templates,


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

			this.on("itemtap", function(_this,idx,item,e) {
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
				Ext.Msg.alert("Template error","Invalid template "+templateName+" specified!");
				return false;
			}
			this.filterDef = this.viewConfigDescriptor.filters;
			this.sortDef = this.viewConfigDescriptor.sort;
			var templateToUse = this.templates[templateName];
			// build final template from intermediate template
			Ext.apply(this.viewConfigDescriptor.XTemplateConf,{TPL: '<tpl for=".">',TPL_END:'</tpl>'});
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

});

Ext.onReady(function() {
	Ext.ns("Icinga.Mobile.Model");
	Ext.regModel('IcingaMobileConfigEntry',{
		fields: [
			{name: 'cfg', type:'string'},
			{name: 'value', type: 'string'}
		]
	});

	Icinga.Mobile.Model.IcingaConfiguration = new function() {
		var configStore = new Ext.data.Store({
			model: 'IcingaMobileConfigEntry',
			proxy: new Ext.data.LocalStorageProxy({
				model: 'IcingaMobileConfigEntry',
				'id': 'icingaMobileConfigurationData'
			}),
			autoLoad:true,
			autoSace:true,
			batch:true
		});
		configStore.on("datachanged",function() {

			if(!configStore.findRecord('cfg',"hasSetup")) {
				initSetup();
			} else {

			}

		},this,{single:true});

		var cfg_defaults = [{
			'cfg': 'hasSetup',
			'value' : 'true'
		},{
			'cfg' : 'defaultViewTpl',
			'value' : 'pregnancyTest'
		},{
			'cfg' : 'icinga_apikey',
			'value' : 'API123456'
		},{
			'cfg' : 'icinga_url',
			'value' : 'http://10.0.10.4/icinga-web'
		}]
		var pub = {
			setConfigVar : function(key,_var) {
				var elem = configStore.findRecord('cfg',key);
				if(elem)
					elem.set('value',_var);
				else
					configStore.add({'cfg':key,'value':_var});
				configStore.save();
			},
			getConfigVar : function(key) {
				var elem = configStore.findRecord('cfg',key);
				if(!elem)
					return null;
				return elem.get('value');
			},
			clear: function() {
				configStore.each(function(rec) {
					configStore.remove(rec);

				})
				configStore.save();
			}
		}

		var initSetup = function() {
			for(var i =0;i<cfg_defaults.length;i++) {
				configStore.add(cfg_defaults[i]);
			}
			configStore.save();
			IBus.fireCustomEvent("displayConfigDialog");
		}


		configStore.load();
		return pub;
	}
// shorthand
	IConf = Icinga.Mobile.Model.IcingaConfiguration;
});

/**
 * Global message bus to receive or send broadcast messages beyond object scope
 *
 */
Ext.ns("Icinga.Mobile.Model")
Icinga.Mobile.Model.IcingaMessageBus = new (Ext.extend(Ext.util.Observable, {
	customEvents : {},
	constructor : function(config) {
		this.listeners = config;
		this.superclass.constructor.call(this,config);
	},
	addCustomListener : function(eventName, handler, scope,options) {
		this.addEvents(eventName);
		this.customEvents[eventName] = true;
		this.addListener(eventName,handler,scope,options);
	},
	fireCustomEvent : function() {
		var eventName = (Ext.toArray(arguments))[0];

		if(!this.customEvents[eventName])
			return false;
		this.fireEvent.apply(this,arguments);
	}
}))();

//shorthand
Ext.ns('IBus');
IBus = Icinga.Mobile.Model.IcingaMessageBus;

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
				LABEL: field.labelTpl || field.label,
				VALUE: field.valueTpl || "{"+field.field+"}"
			});
		},this);

		this.tpl.push(this.gridTpl.apply({TITLE: dataField.title,rows:rows}));
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
});


Ext.ns("Icinga.Mobile.View");

Icinga.Mobile.View.GenericView = function(template,isActive) {
	var viewContainer = new  Icinga.Mobile.Model.IcingaApiDataView({
		preset: template,
		autoHeight:true
	});
	if(isActive)
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
	var pagerBar = new Icinga.Mobile.View.Dock.PagerBottomBar({
		dView:viewContainer
	});
	viewContainer.addDocked(filterBar);
	viewContainer.addDocked(pagerBar);
	return viewContainer;
}

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

Ext.onReady(function() {
	Ext.ns("Icinga.Mobile.View.Sheets");

	Icinga.Mobile.View.Sheets.DetailSheet = new (Ext.extend(Ext.Sheet,{
		arrive:'left',
		depart:'left',
		animation: 'slide',
		modal:true,
		fullscreen:true,
		centered:true,
		dataContainer : new Ext.Container({
			autoDestroy:true,
			height: Ext.getBody().getHeight()-75,
			width: Ext.getBody().getWidth()*0.95,
			scroll:'vertical'
		}),
		constructor: function(cfg) {
			cfg = cfg || {}
			cfg.items = [
				this.dataContainer, {
					xtype: 'spacer',
					height: 20
				},{
					xtype: 'button',
					text: 'Close',
					ui: 'action',
					handler: function() {
						this.hide();

					},
					scope: this
				}
			];
			Ext.Sheet.prototype.constructor.call(this,cfg);
		},

		updateContainer: function(data) {
			this.dataContainer.update(data);

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
		}

	}));

});

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
					text: filter.label,
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
				current_page: store.getCurrentPage()+1,
				total_pages:store.getMaxPages(),
				displayed_items: store.getCurrentCount(),
				total_items: store.getTotal()
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

Ext.setup({
	tabletStartupScreen: 'ajax/icinga-throbber.gif',
	phoneStartupScreen: 'ajax/icinga-throbber.gif',
	icon: 'icons/idot-icon.png',
	glossOnIcon:true,
	onReady: function() {
		var views = [];

		for(var target in Icinga.Mobile.View.Templates) {
			views.push(Icinga.Mobile.View.GenericView(target,views.length == 0));
		}
		Ext.ns("Icinga.Mobile");
		Icinga.Mobile.MainPanel = new Ext.TabPanel({
            fullscreen: true,
            animation: 'slide',
            items:views
        });

		Icinga.Mobile.MainPanel.doLayout();

	}
});

