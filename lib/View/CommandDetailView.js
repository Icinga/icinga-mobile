/**
 * Displays additional forms for commands.
 * @TODO: The forms look like bullshit.
 *
 * @author jannis.mosshammer <jannis.mosshammer@netways.de>
 */

Ext.ns("Icinga.Mobile.View");
(function() {
	Icinga.Mobile.View.CommandDetailView = new (Ext.extend(Ext.Panel,{
		fullscreen:true,
		layout:'fit',
		items: [],
		updateForm: function(cfg,targets) {
			
			this.doLayout();
			var fields = cfg.get("fields");
			var formCfg = {
				autoDestroy:true,
				cls: 'commandField',
				scroll:'vertical',
				items: []
			}
			for(var fieldDef in fields) {
				this.parseFieldFromCfg(fieldDef,fields[fieldDef],formCfg);
			}
			if(this.panel) {
				this.panel.removeAll(true);
				this.panel.cmd = cfg.get("command");
				this.panel.target = targets;
				Ext.each(formCfg.items,function(item) {
					this.panel.add(item);
				},this);
				this.panel.doLayout();
			}
			else {
				
				
				this.panel = this.add(new Ext.form.FormPanel(formCfg));
				this.panel.cmd = cfg.get("command");
				this.panel.target = targets;
				this.panel.isValid = function() {
					var valid = true;
					Ext.each(this.items.items, function(item) {
						if(item.required && (item.getValue() === false || item.getValue() === "")) {
							alert(item.label+" is required!");
							valid = false;
							return true;
						}
						if(item.isDate) {
							if(!item.getValue().match(/\d{4}-[01]\d-[0-3]\d [0-2]\d:[0-6]\d:[0-6]\d/)) {
								alert("Dates must be in the format YYYY-MM-DD hh:mm:ss");
								valid = false;
								return true;
							}
						}
						return true;
					},this);
					return valid;
				}
			}
			if(!formCfg.items.length) {
				Icinga.Mobile.Model.IcingaCommandSender.submitCommand(
					this.panel.cmd,
					this.panel.target,
					{},
					function() {
						Icinga.Mobile.MainPanel.setCard(0,'slide');
					}
				);
			}
			this.doLayout();
		},
		parseFieldFromCfg: function(name,field,config) {
			var d = new Date();

			switch(field.type) {
				case 'toggle':
					config.items.push(
						new (Ext.extend(Ext.form.Checkbox,{
							name: name,
							label: field.text,
							getValue: function() {
								if (this.rendered) {
									return this.fieldEl.dom.checked ? '1' : '2';
								}
								return this.fieldEl.checked ? '1' : '2';

							}
						
						}))
					);
					break;
				case 'textfield':
					config.items.push(
						new Ext.form.TextField({
							label: field.text,
							name: name,
							labelAlign:'top',
							required: true
						})
					);
					break;

				case 'textarea':
					config.items.push(
						new Ext.form.TextField({
							label: field.text,
							name: name,
							labelAlign:'top',
							required: true
						})
					);
					break;

				case 'select':
					config.items.push(
						new Ext.form.Select({
							label: field.text,
							name: name,
							labelAlign:'top',
							options: field.options,
							required: true
						})
					);
					break;
				case 'hidden':
					config.items.push(
						new Ext.form.HiddenField({
							label: field.text,
							name: name,
							labelAlign:'top',
							value: field.value,
							required: true
						})
					);
					break;

				case 'date':
					config.items.push(
						new Ext.form.TextField({
							label: field.text,
							isDate: true,
							name: name,
							labelAlign:'top',
							value: "YYYY-MM-DD hh:mm:ss",
							required: true
						})
					);
					break;
			}

		}
	}));
	Icinga.Mobile.View.CommandDetailView.addDocked(new Ext.Toolbar({
		dock: 'top',
		items: [{
			text: 'Send',
			ui: 'action',
			handler: function() {
				if(!this.panel.isValid()) {
					return false;
				}
				Icinga.Mobile.Model.IcingaCommandSender.submitCommand(
					this.panel.cmd,
					this.panel.target,
					this.panel.getValues(),
					function() {
						Icinga.Mobile.MainPanel.setCard(0,'slide');
					}
				);
			},
			scope:Icinga.Mobile.View.CommandDetailView
		}]
	}));
	Icinga.Mobile.View.CommandDetailView.addDocked(new Ext.Toolbar({
		dock: 'bottom',
		items: [{
			text: 'Cancel',
			handler: function() {
				Icinga.Mobile.MainPanel.setCard(0,'slide');
			}
		}]
	}));
})();