Ext.ns("Icinga.Mobile.View.Templates");
/**
 * Template for hosts
 * @TODO: Document this stuff
 * @author Jannis Moßhammer <jannis.mosshammer@netways.de>
 */
Icinga.Mobile.View.Templates.Host = {
	target: 'host',
	title : 'Hosts',
	fields : [
		"HOST_ID",
		"HOST_NAME",
		"HOST_CURRENT_STATE",
		"INSTANCE_NAME",
		{
			name: "HOST_CURRENT_STATE_NAME",
			convert: Icinga.Mobile.Model.IcingaFieldConverter.hostStateName,
			mapping: 'HOST_CURRENT_STATE'
		}
	],
	XTemplateConf: {
		'STATEFIELD': '<tpl if="!HOST_CURRENT_STATE">0</tpl>{HOST_CURRENT_STATE}',
		'ID' : '{HOST_ID}',
		'CONTENT' : 'Host: {HOST_NAME}',
		'TARGET' : 'host'
	},

	filters: [{
		label: "<div class='icinga-btn-ok'> </div>",
		filter: [{
			field: 'HOST_CURRENT_STATE',
			val: '0',
			op: '!='
		}]
	},{
		label: "<div class='icinga-btn-critical'> </div>",
		filter: [{
			field: 'HOST_CURRENT_STATE',
			val: '1',
			op: '!='
		}],
		isActive: true

	},{
		label: "<div class='icinga-btn-unknown'> </div>",
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

	searchFields: ["HOST_NAME"],

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
			'valueTpl': 
					'<div class="icinga-iconField-wrap">'+
						'<div class="icinga-iconField activeChecks"> '+
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
						'</div>'+
					'</div>'
			
		}]
	},

	idProperty : "HOST_ID"
}