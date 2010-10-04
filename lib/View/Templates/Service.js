Ext.ns("Icinga.Mobile.View.Templates");
/**
 * Template for services
 * @TODO: Document this stuff
 * @author Jannis Moßhammer <jannis.mosshammer@netways.de>
 */
Icinga.Mobile.View.Templates.Service = {
	target: 'service',
	title : 'Services',
	fields : [
		"SERVICE_ID",
		"SERVICE_NAME",
		"HOST_NAME",
		"INSTANCE_NAME",
		"SERVICE_CURRENT_STATE",
		{
			name: "SERVICE_CURRENT_STATE_NAME",
			convert: Icinga.Mobile.Model.IcingaFieldConverter.serviceStateName,
			mapping: 'SERVICE_CURRENT_STATE'
		}
	],
	XTemplateConf: {
		'STATEFIELD': '<tpl if="!SERVICE_CURRENT_STATE">0</tpl>{SERVICE_CURRENT_STATE}',
		'ID' : '{SERVICE_OBJECT_ID}',
		'CONTENT' : 'Service: {SERVICE_NAME}<br/>'+
					'Host: {HOST_NAME}',
		'TARGET' : 'service'
	},

	filters: [{		
		label: "<div class='icinga-btn-ok'> </div>",
		filter: [{
			field: 'SERVICE_CURRENT_STATE',
			val: '0',
			op: '!='
		}]
	},{
		label: "<div class='icinga-btn-warning'> </div>",
		filter: [{
			field: 'SERVICE_CURRENT_STATE',
			val: '1',
			op: '!='
		}],
		isActive: true
	},{
		label: "<div class='icinga-btn-critical'> </div>",
		filter: [{
			field: 'SERVICE_CURRENT_STATE',
			val: '2',
			op: '!='
		}],
		isActive: true
	},{
		label: "<div class='icinga-btn-unknown'> </div>",
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

	searchFields: ["HOST_NAME","SERVICE_NAME"],

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
			'valueTpl': '<div class="icinga-iconField-wrap">'+
							'<div class="icinga-iconField activeChecks"> '+
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
						'</div>'+
					'<div>'

		}]
	},

	idProperty : "SERVICE_ID"
}
