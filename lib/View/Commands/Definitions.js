/**
* Definitions of the commands
* @author Jannis Moßhammer <jannis.mosshammer@netways.de>
*/
Ext.ns("Icinga.Mobile.View.Commands");

Icinga.Mobile.View.Commands.Definitions = {
	"Service": [{
		"command":'SCHEDULE_SVC_CHECK',
		'title': 'Schedule service check',
		"icon": 'icon-reschedule',
		"fields" : {
			checktime: {
				"text" :"Checktime",
				"type" : "date"
			}
		}
	},{	
		"command":'ACKNOWLEDGE_SVC_PROBLEM',
		"title": 'Acknowledge service problem',
		"icon": 'icon-acknowledged',
		"fields": {
			"sticky": {
				"type": 'toggle',
				"text": 'Sticky'
			},
			"notify": {
				"type": 'toggle',
				"text": 'Notify'
			},
			"persistent": {
				"type": 'toggle',
				"text": 'Persistent'
			},
			"author": {
				"type": 'textfield',
				"text": 'Author'
			},
			"comment": {
				"type": 'textarea',
				"text": 'Comment'
			}
		}
	},{
		"command":'SCHEDULE_SVC_DOWNTIME',
		"title": 'Schedule a downtime on this service',
		"icon": 'icon-downtime',
		"fields": {
			"starttime": {
				"type": 'date',
				"text": 'Start'
			},
			"endtime": {
				"type": 'date',
				"text": 'End'
			},
			"fixed": {
				"type": 'toggle',
				"text": 'fixed'
			},
			"duration": {
				"type": 'textfield',
				"text": 'Duration'
			},
			"author": {
				"type": 'textfield',
				"text": 'Author'
			},
			"comment": {
				"type": 'textarea',
				"text": 'Comment'
			}
		}
	},{
		"command":'PROCESS_SERVICE_CHECK_RESULT',
		"title": 'Process service check result',
		"icon": 'icon-checkresult',
		"fields": {
			"status": {
				"type": 'select',
				"options": [
					{"text":'OK',"value":0},
					{"text":'WARNING',"value":1},
					{"text":'CRITICAL',"value":2},
					{"text":'UNKNOWN',"value":3}
				],
				"text": 'Status'
			},
			"output": {
				"type": 'textfield',
				"text": 'Output'
			},
			"author": {
				"type": 'textfield',
				"text": 'Perfdata'
			}
		}
	},{	
		"command":'ADD_SVC_COMMENT',
		"title": 'Add service comment',
		"icon": 'icon-comment',
		"fields": {
			"data" : {
				"type" : "hidden",
				"value" : " "
			},
			"author": {
				"type": "textfield",
				"text": "Author"
			},
			"comment" : {
				"type": "textfield",
				"text": "Comment"
			}
		}
	},{	
		"command":'DISABLE_PASSIVE_SVC_CHECKS',
		"title": "Disable passive checks for these services",
		"icon": 'icon-disable-generic',
		"fields"  : {}
	},{
		"command" :'ENABLE_PASSIVE_SVC_CHECKS',
		"title" : "Enable passive checks for these services",
		"icon": 'icon-passive',
		"fields" : {}
	},{	
		"command":'DISABLE_SVC_CHECK',
		"title": "Disable checks for these services",
		"icon": 'icon-disable-generic',
		"fields": {}
	},{	
		"command":'ENABLE_SVC_CHECK',
		"title": "Enable checks for these services",
		"icon": 'icon-active-checks',
		"fields": {}
	},{	
		"command":'STOP_OBSESSING_OVER_SVC',
		"title": "Stop obsessing over these services",
		"icon": 'icon-stop',
		"fields": {}
	},{	
		"command":'DISABLE_SVC_NOTIFICATIONS',
		"title": "Disable service notifications",
		"icon": 'icon-notify-disable',
		"fields": {}
	},{	
		"command":'ENABLE_SVC_NOTIFICATIONS',
		"title": "Enable service notifications",
		"icon": 'icon-notify-enable',
		"fields": {}
	},{	
		"command":'SEND_CUSTOM_SVC_NOTIFICATION',
		"title": "Send service notifications",
		"icon": 'icon-notify',
		"fields": {
			"options" : {
				"type" : "select",
				"options" : [
					{"text":"no option (default)", "value":"0"},
					{"text":"Broadcast", "value":"1"},
					{"text":"Forced", "value":"2"},
					{"text":"Increment current notification", "value":"3"}
				]
			},
			"author": {
				"type" : "textfield",
				"text" : "Author"
			},
			"comment": {
				"type" : "textarea",
				"text" : "Comment"
			}
		}
	},{	
		"command":'ENABLE_SVC_EVENT_HANDLER',
		"title": "Enable service event handler",
		"icon" : "icon-generic",
		"fields": {}
	},{	
		"command":'DISABLE_SVC_EVENT_HANDLER',
		"title": "Disable service event handler",
		"icon" : "icon-disable-generic",
		"fields": {}
	},{
		"command":'ENABLE_SVC_FLAP_DETECTION',
		"title": "Enable service flap detection",
		"icon" : "icon-flap",
		"fields": {}
	},{	
		"command":'DISABLE_SVC_FLAP_DETECTION',
		"title": "Disable service flap detection",
		"icon" : "icon-disable-generic",
		"fields": {}
	}],

	"Host": [{
		"command" : 'SCHEDULE_HOST_CHECK',
		"title" : "Schedule check for this host",
		"icon": 'icon-reschedule',
		"fields" : {
			"checktime" : {
				"type" : "date",
				"text" : "Check time"
			}
		}
	},{
		"command": 'SCHEDULE_HOST_DOWNTIME',
		"title": 'Schedule a downtime on this host',
		"icon": 'icon-downtime',
		"fields": {
			"starttime": {
				"type": 'date',
				"text": 'Start'
			},
			"endtime": {
				"type": 'date',
				"text": 'End'
			},
			"fixed": {
				"type": 'toggle',
				"text": 'fixed'
			},
			"duration": {
				"type": 'textfield',
				"text": 'Duration'
			},
			"author": {
				"type": 'textfield',
				"text": 'Author'
			},
			"comment": {
				"type": 'textarea',
				"text": 'Comment'
			}
		}
	},{
		"command": 'SCHEDULE_HOST_SVC_DOWNTIME',
		"title": 'Schedule a downtime on all services of this host',
		"icon": 'icon-downtime',
		"fields": {
			"starttime": {
				"type": 'date',
				"text": 'Start'
			},
			"endtime": {
				"type": 'date',
				"text": 'End'
			},
			"fixed": {
				"type": 'toggle',
				"text": 'fixed'
			},
			"duration": {
				"type": 'textfield',
				"text": 'Duration'
			},
			"author": {
				"type": 'textfield',
				"text": 'Author'
			},
			"comment": {
				"type": 'textarea',
				"text": 'Comment'
			}
		}
	},{
		"command": 'PROCESS_HOST_CHECK_RESULT',
		"title": 'Process host check result',
		"icon": 'icon-checkresult',
		"fields": {
			"status": {
				"type": 'select',
				"options": [
					{"text":'OK',"value":0},
					{"text":'WARNING',"value":1},
					{"text":'CRITICAL',"value":2},
					{"text":'UNKNOWN',"value":3}
				],
				"text": 'Status'
			},
			"output": {
				"type": 'textfield',
				"text": 'Output'
			},
			"author": {
				"type": 'textfield',
				"text": 'Perfdata'
			}
		}
	},{
		"command": 'ACKNOWLEDGE_HOST_PROBLEM',
		"title": 'Acknowledge host problem',
		"icon": 'icon-acknowledged',
		"fields": {
			"sticky": {
				"type": 'toggle',
				"text": 'Sticky'
			},
			"notify": {
				"type": 'toggle',
				"text": 'Notify'
			},
			"persistent": {
				"type": 'toggle',
				"text": 'Persistent'
			},
			"author": {
				"type": 'textfield',
				"text": 'Author'
			},
			"comment": {
				"type": 'textarea',
				"text": 'Comment'
			}
		}
	},{
		"command":'ADD_HOST_COMMENT',
		"title": 'Add host comment',
		"icon": 'icon-comment',
		"fields": {
			"data" : {
				"type" : "hidden",
				"value" : " "
			},
			"author": {
				"type": "textfield",
				"text": "Author"
			},
			"comment": {
				"type": "textfield",
				"text": "Comment"
			}
		}
	},{
		"command":'DISABLE_HOST_CHECK',
		"title": "Disable checks for these hosts",
		"icon" : "icon-disable-generic",
		"fields": {}
	},{
		"command":'ENABLE_HOST_CHECK',
		"title": "Enable checks for these hosts",
		"icon": 'icon-active-checks',
		"fields": {}
	},{
		"command":'STOP_OBSESSING_OVER_HOST',
		"title": "Stop obsessing over these hosts",
		"icon" : "icon-stop",
		"fields": {}
	},{
		"command":'DISABLE_HOST_NOTIFICATIONS',
		"title": "Disable host notifications",
		"icon": 'icon-notify-disable',
		"fields": {}
	},{
		"command":'ENABLE_HOST_NOTIFICATIONS',
		"title": "Enable host notifications",
		"icon": 'icon-notify-enable',
		"fields": {}
	},{
		"command":'SEND_CUSTOM_HOST_NOTIFICATION',
		"title": "Send host notifications",
		"icon": 'icon-notify',
		"fields": {
			"options" : {
				"type" : "select",
				"options" : [
					{"text":"no option (default)", "value":"0"},
					{"text":"Broadcast", "value":"1"},
					{"text":"Forced", "value":"2"},
					{"text":"Increment current notification", "value":"3"}
				]
			},
			"author": {
				"type" : "textfield",
				"text" : "Author"
			},
			"comment": {
				"type" : "textarea",
				"text" : "Comment"
			}
		}
	},{
		"command":'ENABLE_HOST_EVENT_HANDLER',
		"title": "Enable host event handler",
		"icon": 'icon-generic',
		"fields": {}
	},{
		"command":'DISABLE_HOST_EVENT_HANDLER',
		"title": "Disable host event handler",
		"icon" : "icon-disable-generic",
		"fields": {}
	},{
		"command":'ENABLE_HOST_FLAP_DETECTION',
		"title": "Enable host flap detection",
		"icon" : "icon-flap",
		"fields": {}
	},{
		"command":'DISABLE_HOST_FLAP_DETECTION',
		"title": "Disable host flap detection",
		"icon" : "icon-disable-generic",
		"fields": {}
	}]

}


