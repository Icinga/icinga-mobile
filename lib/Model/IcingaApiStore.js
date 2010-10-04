/**
 * An own store and DataProxy implementation that allows sorting (unfortunately, it ended up a
 * little bit dirty, so @TODO: cleanup this mess!)
 * 
 * @author Jannis Moßhammer <jannis.mosshammer@netways.de>
 */

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
			return this.getProxy()["totalCount"];
		},
		getCurrentCount: function() {
			return this.getProxy()["currentCount"];
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

		setSearchText: function(txt) {
			this.getProxy().searchText = txt;
		},

		getSearchText: function() {
			return this.getProxy().searchText;
		},

		load: function(options) {
			if(!this.isActive)
				return false;
			
			Ext.data.JsonStore.prototype.load.call(this,options);
		}
	});

	Icinga.Mobile.Model.IcingaApiStoreProxy = Ext.extend(Ext.data.AjaxProxy,{
		noCache:false,
		"currentPage":0,
		"pageSize":25,
		"currentCount": 0,
		"totalCount": 0,
		"sortField": null,
		"sortDir": 'DESC',
		"searchText" : "",
		
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
					if(json["error"]) {
						alert(json["error"]["0"]["message"]);
						return false;
					}

					this["totalCount"] = json["total"];
					this["currentCount"] = json["result"].length;
					IBus.fireCustomEvent("paginatorvalueschanged",this);
					IBus.fireCustomEvent("loaded",this,{single:true});
				},
				failure: function(response) {
					alert("Request failed");
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
			if(this.searchText) {
				filterStr = "OR(";
				Ext.each(this.searchFields,function(field) {
					filterStr += field+"|like|"+this.searchText+"*;";
				},this);
				filterStr +=");";
			}
			var first = true;
			for(var i in this.filters) {
				if(!first)
					filterStr+= ";";
				filterStr+= this.filters[i].field+"|"+this.filters[i].op+"|"+this.filters[i].val;
				first = false;
			}
			return filterStr;
		}

	})
});