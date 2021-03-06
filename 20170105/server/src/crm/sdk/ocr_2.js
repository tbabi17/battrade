var allowSelection=true;

function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function permit(id) {
	if (typeof permissions != undefined) {
		id = id.toLowerCase();
		return (permissions.indexOf(id+',') != -1);
	}

	return false;
}

function googleEventDynamic1(rec) {	
	_location = '';		
		
	subject = rec.get('subject');
	if (typeof subject == 'undefined') {
		subject = rec.get('subject')+' - Task';
	}

	subject = subject + ' [from CRM]';

	start_date = rec.get("start_date");
	start_date = replaceAll('-', '', start_date);

	end_date = rec.get("start_date");
	end_date = replaceAll('-', '', end_date);

	htmlContent= rec.get('descr');

	descr = rec.get('work_type')+':'+htmlContent+', '+rec.get('descr');
	window.open("https://www.google.com/calendar/render?action=TEMPLATE&trp=false&text="+subject+"&dates="+start_date+"T020000Z/"+end_date+"T030000Z&location="+_location+"&details="+descr+"&sprop&sf=true&output=xml","_blank","toolbar=no, scrollbars=yes, resizable=yes, top=100, left=100, width=850, height=500");	
}

function googleEventDynamic(rec) {	
	_location = '';		
		
	subject = rec.get('subject');
	if (typeof subject == 'undefined') {
		subject = rec.get('work_type');
	}

	subject = subject + ' [from CRM]';

	start_date = rec.get("days");
	start_date = replaceAll('-', '', start_date);
	htmlContent= rec.get('crm_name').substring(rec.get('crm_name').indexOf('<b>')+3, rec.get('crm_name').indexOf('</b>'));

	descr = rec.get('work_type')+':'+htmlContent+', '+rec.get('descr');
	window.open("https://www.google.com/calendar/render?action=TEMPLATE&trp=false&text="+subject+"&dates="+start_date+"T020000Z/"+start_date+"T030000Z&location="+_location+"&details="+descr+"&sprop&sf=true&output=xml","_blank","toolbar=no, scrollbars=yes, resizable=yes, top=100, left=100, width=850, height=500");	
}

function googleEvent(rec, func) {
	if (func == 'crm_event_list') {
		_location = rec.get('venue');
		if (typeof _location == 'undefined')
			_location = '';
			
		subject = rec.get('subject');
		if (typeof subject == 'undefined')
			subject = '';

		subject = subject + ' [from CRM]';

		start_date = rec.get("start_date");
		start_date = replaceAll('-', '', start_date);
		name = rec.get('crm_name');
		name = name.substring(name.indexOf('<g>')+3, name.indexOf('</g'));
		descr = rec.get('descr');
		if (descr == '')
			descr = name+' : уулзалт хийх';
		window.open("https://www.google.com/calendar/render?action=TEMPLATE&trp=false&text="+subject+"&dates="+start_date+"T020000Z/"+start_date+"T030000Z&location="+_location+"&details="+descr+"&sprop&sf=true&output=xml","_blank","toolbar=no, scrollbars=yes, resizable=yes, top=100, left=100, width=850, height=500");
	} else
	if (func == 'crm_task_list') {
		_location = '';		
			
		subject = rec.get('task_type');
		if (typeof subject == 'undefined')
			subject = '';

		subject = subject + ' [from CRM]';

		start_date = rec.get("duedate");
		start_date = replaceAll('-', '', start_date);
		name = rec.get('crm_name');
		name = name.substring(name.indexOf('<g>')+3, name.indexOf('</g'));
		descr = rec.get('descr');
		if (descr == '')
			descr = name+' : төлөвлөсөн ажил';
		window.open("https://www.google.com/calendar/render?action=TEMPLATE&trp=false&text="+subject+"&dates="+start_date+"T020000Z/"+start_date+"T030000Z&location="+_location+"&details="+descr+"&sprop&sf=true&output=xml","_blank","toolbar=no, scrollbars=yes, resizable=yes, top=100, left=100, width=850, height=500");
	} else
	if (func == 'crm_calllog_list') {	
		_location = '';		
			
		subject = rec.get('task_type');
		if (typeof subject == 'undefined')
			subject = '';

		subject = subject + ' [from CRM]';

		start_date = rec.get("days");
		start_date = replaceAll('-', '', start_date);
		
		name = rec.get('crm_name');
		name = name.substring(name.indexOf('<g>')+3, name.indexOf('</g'));

		descr = rec.get('descr');
		if (descr == '')
			descr = name+' : харилцагчтай ярих';
		window.open("https://www.google.com/calendar/render?action=TEMPLATE&trp=false&text="+subject+"&dates="+start_date+"T020000Z/"+start_date+"T030000Z&location="+_location+"&details="+descr+"&sprop&sf=true&output=xml","_blank","toolbar=no, scrollbars=yes, resizable=yes, top=100, left=100, width=850, height=500");
	} else
	if (func == 'crm_complain_list') {	
		_location = '';		
			
		subject = rec.get('complain_reason');
		if (typeof subject == 'undefined')
			subject = '';
		name = rec.get('crm_name');
		name = name.substring(name.indexOf('<g>')+3, name.indexOf('</g'));
		subject = subject + ' [from CRM]';

		start_date = rec.get("closing_date");
		start_date = replaceAll('-', '', start_date);

		descr = rec.get('descr');
		if (descr == '')
			descr = name+' : асуудал шийдвэрлэх';
		window.open("https://www.google.com/calendar/render?action=TEMPLATE&trp=false&text="+subject+"&dates="+start_date+"T020000Z/"+start_date+"T030000Z&location="+_location+"&details="+descr+"&sprop&sf=true&output=xml","_blank","toolbar=no, scrollbars=yes, resizable=yes, top=100, left=100, width=850, height=500");
	}
}

Ext.define('OCS.AnimateView', {
	extend: 'OCS.Module',
	remoteSort : false,
	func: 'crm_alarm_list',

	createView: function() {
		var me = this;
		me.modelName = 'CRM_ALARM';
		me.createStore();

		me.dataview = Ext.create('Ext.view.View', {
			deferInitialRefresh: false,
			store: me.store,
			tpl  : Ext.create('Ext.XTemplate',
				'<tpl for=".">',
					'<div class="phone">',
						'<div class="content">',
						'<strong>{subject}</strong>',
						'<span class="text">{crm_name}</span></br></br>',
						'<span class="tag Demo">{status}</span>',
						'</div>',
						'</br>',
						'<div class="tag-wrapper"><span class="tag Code Snippet">{type}</span></div>',
					'</div>',
				'</tpl>'
			),

			plugins : [
				Ext.create('Ext.ux.DataView.Animated', {
					duration  : 450,
					idProperty: 'title'
				})
			],
			id: 'phones',
			itemSelector: 'div.phone',
			overItemCls : 'phone-hover',
			multiSelect : true,
			autoScroll  : true,
			listeners: {
				selectionchange : function(item, selections){
					me.selectCustomer(selections[0]);					
				}
			}
		});
				
		me.panel = Ext.create('Ext.panel.Panel', {
			layout: 'fit',
			border: false,
			items : me.dataview,		
			region: 'center'
		});			

		return me.panel;
	}
});

Ext.define('OCS.OwnerView', {
	extend: 'OCS.Module',
	func: 'crm_users_list',
	modelName : 'CRM_USERS',
	cls : 'leads',

	createTmpl: function() {
		return Ext.create('Ext.XTemplate',
				'<tpl for=".">',
					'<div class="phone">',
						'<div class="content">',
						'<strong>{owner}</strong>',
						'<span class="text">{gmailAccount}</span></br></br>',
						'</div>',	
					'</div>',
				'</tpl>'
			);
	},

	createView: function() {
		var me = this;		
		me.createStore();

		me.dataview = Ext.create('Ext.view.View', {
			deferInitialRefresh: false,
			store: me.store,
			tpl  : me.createTmpl(),
			id: me.cls,
			itemSelector: 'div.phone',
			overItemCls : 'phone-hover',
			multiSelect : true,
			autoScroll  : true,
			listeners: {
				selectionchange : function(item, selections){
					me.selectAction(selections);
				}
			}
		});
		me.store.groupField = 'team';
		me.grid = Ext.create('Ext.grid.Panel', {
			border: false,
			columns: [{
					text: "Owner",
					dataIndex: 'owner',
					flex: 1,
					renderer: renderOwner,
					sortable: true
				},{
					text: "Gmail",
					dataIndex: 'gmailAccount',
					width: 140,
					sortable: true
				},{
					text: "Section",
					dataIndex: 'section',
					width: 60,
					sortable: true
				},{
					text: "Team",
					dataIndex: 'team',
					width: 100,
					sortable: true
				}
			],
			store: me.store,
			listeners: {
				selectionchange : function(item, selections){
					me.selectAction(selections);
				}
			},
			features : [{
				ftype: 'grouping',
				groupHeaderTpl: '{columnName}: {name} ({rows.length} бичлэг)'
			}]
		});
				
		me.panel = Ext.create('Ext.panel.Panel', {
			layout: 'fit',
			border: false,
			items : me.grid,		
			region: 'center'
		});			
		return me.panel;
	},

	loadStore: function() {
		var me = this;
		me.store.reload();
	},

	selectAction: function(selections) {
		var me = this;
		selectedOwner = selections[0].get('owner');
		views['workflow'].defaultRec = {
			data: {
				id: '0',
				start_date: Ext.Date.format(new Date(),'Y-m-d'),
				end_date: Ext.Date.format(new Date(),'Y-m-d'),
				precent: '0',
				_date: Ext.Date.format(new Date(),'Y-m-d h:m:s'),
				workflow_status: 'processing',
				priority: 'medium',
				owner: selectedOwner,
				userCode: logged
			}
		};
		views['workflow'].updateSource(selectedOwner);
		views['mylog'].reloadOwner(selectedOwner);
		views['calendar'].loadPanel(selections[0].get('gmailAccount'));
	}
});

Ext.define('OCS.CompetitorView', {
	extend: 'OCS.OwnerView',
	func: 'crm_competitor_list',
	modelName : 'CRM_COMPETITOR',
	cls: 'competitor',

	createTmpl: function() {
		return Ext.create('Ext.XTemplate',
				'<tpl for=".">',
					'<div class="phone">',
						'<div class="content">',
						'<strong>{competitor_name}</strong>',
						'<span class="text">{www}</span></br></br>',
						'</div>',	
					'</div>',
				'</tpl>'
			);
	},

	selectAction: function(selections) {
		var me = this;
		if (selections[0].get('competitor_name')=='Бусад')
			views['competitor_deals'].updateSource('');
		else
			views['competitor_deals'].updateSource(selections[0].get('competitor_name'));
	},
	
	createView: function() {
		var me = this;		
		me.createStore();

		me.dataview = Ext.create('Ext.view.View', {
			deferInitialRefresh: false,
			store: me.store,
			tpl  : me.createTmpl(),
			id: me.cls,
			itemSelector: 'div.phone',
			overItemCls : 'phone-hover',
			multiSelect : true,
			autoScroll  : true,
			listeners: {
				selectionchange : function(item, selections){
					me.selectAction(selections);
				}
			}
		});
				
		me.panel = Ext.create('Ext.panel.Panel', {
			layout: 'fit',
			border: false,
			items : me.dataview,		
			region: 'center'
		});			
		return me.panel;
	}
});

Ext.define('OCS.RetailPanel', {	
	extend: 'OCS.Module',			
	firstName: '',
	table: 'crm_customer',
	primary: 'crm_id',
	lastName: '',
	tab: 'tab_contact_list',
	title: 'Contact List',
	modelName: 'CRM_RETAIL',
	func: 'crm_retail_list',
	autoSelect: true,
	xlsName: 'Contact',

	filterData: function(views) {
		var me = this;		
		me.title = views;
		me.store.getProxy().extraParams = {handle: 'web', action: 'select', func: me.func, values: me.values, where: me.where, views: views};
		me.store.loadPage(1);
	},
	
	createSubActions: function() {
		var me = this;
		me.subViews = [
			Ext.create('Ext.Action', {
				text: 'Create personal view...',
				handler: function(widget, event) {								
					new OCS.PersonalViewWindow({
						selected: me.grid.getView().getSelectionModel().getSelection()[0]
					}).createWindow();
				}
			}),
		'-'];

		me.per = personals.split(",");
		for (i = 0; i < me.per.length; i++) {
			if (me.per[i] && me.per[i].length > 0)				
				me.subViews.push(
					Ext.create('Ext.Action', {
						icon   : '',  
						text: me.per[i],
						handler: function(widget, event) {					
							me.filterData(widget.text);
						}
					})
				);
		}

		me.camViews = [];
		me.cam = campaigns_static.split(":");
		for (i = 0; i < me.cam.length; i++) {
			if (me.cam[i] && me.cam[i].length > 0)				
				me.camViews.push(
					Ext.create('Ext.Action', {
						icon   : '',  
						text: me.cam[i],
						handler: function(widget, event) {					
							me.filterData(widget.text);
						}
					})
				);
		}

		me.customViews = [
			Ext.create('Ext.Action', {
				icon   : '',  
				text: 'Харилцагч болоогүй',
				handler: function(widget, event) {
					me.filterData('Suspect List');
				}
			}),
			Ext.create('Ext.Action', {
				icon   : '',  
				text: 'Харилцагч болохоор төлөвлөгдөж байгаа',
				handler: function(widget, event) {
					me.filterData('Prospect List');
				}
			}),
			Ext.create('Ext.Action', {
				icon   : '',  
				text: 'Харилцагчийн жагсаалт',
				handler: function(widget, event) {
					me.filterData('Customer List');
				}
			}),
			'-',
			Ext.create('Ext.Action', {
				icon   : '',  
				text: 'VIP жагсаалт',
				handler: function(widget, event) {
					me.filterData('VIP List');
				}
			}),
			Ext.create('Ext.Action', {
				icon   : '',  
				text: 'Гадаад харилцагчийн жагсаалт',
				handler: function(widget, event) {
					me.filterData('EXPAT List');
				}
			}),
			'-',
			Ext.create('Ext.Action', {
				icon   : '',  
				text: 'Компаний харилцагчид',
				handler: function(widget, event) {
					me.filterData('My Company List');
				}
			}),
			Ext.create('Ext.Action', {
				icon   : '',  
				text: 'Бүх харилцагчид',
				handler: function(widget, event) {
					me.filterData('All '+me.xlsName+' List');
				}
			}),
			Ext.create('Ext.Action', {
				icon   : '',  
				text: 'Хариуцагч байхгүй харилцагчийн жагсаалт',
				handler: function(widget, event) {
					me.filterData('Without Owner List');
				}
			}),
			Ext.create('Ext.Action', {
				icon   : '',  
				text: 'Миний хариуцдаг харилцагчид',
				handler: function(widget, event) {
					me.filterData('My '+me.xlsName+' List');
				}
			}),
			Ext.create('Ext.Action', {
				icon   : '',  
				text: 'Миний бүртгэсэн харилцагчид',
				handler: function(widget, event) {
					me.filterData('My Created '+me.xlsName+' List');
				}
			}),
			Ext.create('Ext.Action', {
				icon   : '',  
				text: 'Сүүлийн үед үүссэн харилцагчид',
				handler: function(widget, event) {
					me.filterData('Recently Added List');
				}
			}),
			'-',			
			Ext.create('Ext.Action', {
				icon   : '',  
				text: 'Standard Views',
				menu: {
					xtype: 'menu',
					items: me.camViews
				}					
			}),
			Ext.create('Ext.Action', {
				icon   : '',  
				text: 'Personal Views',
				menu: {
					xtype: 'menu',
					items: me.subViews
				}					
			})
		];

		return me.customViews;
	},

	createActions: function() {
		var me = this;
		

		me.actions = [			
			Ext.create('Ext.Action', {
				iconCls: 'list',
				text: 'Харагдац',
				menu: {
					xtype: 'menu',
					items: me.createSubActions()
				}		
			}),		
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'add',
				text: 'Шинэ харилцагч...',
				disabled: permit(me.xlsName+'-new'),
				handler: function(widget, event) {
					if (me.modelName == 'CRM_RETAIL')					
						new OCS.RetailNewWindow({							
						}).show();
					else
						new OCS.CorporateNewWindow({
						}).show();
				}
			}),	
			Ext.create('Ext.Action', {
				iconCls   : 'edit',
				text: 'Засах...',
				disabled: permit(me.xlsName+'-expand'),
				handler: function(widget, event) {					
					if (me.recordSelected()) {					
						if (me.modelName == 'CRM_RETAIL')					
							new OCS.RetailNewWindow({
								title: 'Edit Contact',
								selected: me.grid.getView().getSelectionModel().getSelection()[0]
							}).show();
						else
							new OCS.CorporateNewWindow({
								title: 'Edit Account',
								selected: me.grid.getView().getSelectionModel().getSelection()[0]
							}).show();
					}
				}
			}),	
			Ext.create('Ext.Action', {
				iconCls  : 'delete',
				text: 'Устгах',
				menu: {
					xtype: 'menu',
					items: [
						Ext.create('Ext.Action', {
							iconCls   : 'delete',  
							text: 'Сонгосонг устгах',
							disabled: permit(me.xlsName+'-delete'),	
							handler: function(widget, event) {
								me.deleteRecord();
							}
						}),
						Ext.create('Ext.Action', {
							iconCls   : 'delete',  
							text: 'Бүгдийг устгах',
							disabled: permit(me.xlsName+'-delete'),	
							handler: function(widget, event) {
								me.deleteRecord();
							}
						})

					]
				}
			}),
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'deal_assign',
				text: 'Оноох...',
				disabled: permit(me.xlsName+'-assign'),
				handler: function(widget, event) {
					if (user_level > 0 ) {												
						if (me.recordSelected())						
							new OCS.CustomerAssignWindow({
								selected: me.grid.getView().getSelectionModel().getSelection()[0],
								ids: me.selectedIds(),
								direction: me.xlsName
							}).show();
					} else
						Ext.MessageBox.alert('Error', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
				}
			}),
			Ext.create('Ext.Action', {
				iconCls   : 'merge',
				text: 'Нэгтгэх...',
				disabled: permit(me.xlsName+'-merge'),
				handler: function(widget, event) {
					if (user_level > 0) {					
						if (me.grid.getView().getSelectionModel().getSelection().length == 2){					
							new OCS.MergeRecordsWindow({
								name: me.xlsName,
								master: me.grid.getView().getSelectionModel().getSelection()[0],
								slave: me.grid.getView().getSelectionModel().getSelection()[1]
							}).show();
						} else
							Ext.MessageBox.alert('Status', '2 бичлэг сонгох ёстой !', function() {});
					} else
						Ext.MessageBox.alert('Error', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
				}
			}),				
			Ext.create('Ext.Action', {
				iconCls   : 'import',
				text: 'Импорт...',
				handler: function(widget, event) {
					new OCS.UploadWindow({
						name: me.xlsName
					}).show();
				}
			}),	
			Ext.create('Ext.Action', {
				iconCls   : 'export',
				text: 'Экспорт...',
				disabled: (user_level == '0'),
				handler: function(widget, event) {
					if (!Ext.fly('frmDummy')) {
						var frm = document.createElement('form');
						frm.id = 'frmDummy';
						frm.name = 'url-post';
						frm.className = 'x-hidden';
						document.body.appendChild(frm);
					}

					Ext.Ajax.request({
					   url: 'avia.php',
					   isUpload: true,
					   form: Ext.fly('frmDummy'),
					   params: {handle: 'file', action:'export', where: me.xlsName},					
					   success: function(response, opts) {					
						  Ext.MessageBox.alert('Status', 'Success !', function() {});
					   },
					   failure: function(response, opts) {
						  Ext.MessageBox.alert('Status', 'Error !', function() {});
					   }
					});	
				}
			}),				
			'-',				
			Ext.create('Ext.Action', {
				iconCls: 'activity',
				text: 'Үйл ажиллагаа',
				menu: {
					xtype: 'menu',
					items: [
						Ext.create('Ext.Action', {
							iconCls   : 'notes',  
							text: 'Тэмдэглэл ...',
							handler: function(widget, event) {															
								if (me.recordSelected())
									new OCS.NotesWindow({
										selected: me.grid.getView().getSelectionModel().getSelection()[0]
									}).createWindow();
							}
						}),
						Ext.create('Ext.Action', {
							iconCls   : 'task',  
							text: 'Ажил ...',
							handler: function(widget, event) {
								if (me.recordSelected())
									new OCS.TaskWindow({
										selected: me.grid.getView().getSelectionModel().getSelection()[0]
									}).createWindow();
							}
						}),
						Ext.create('Ext.Action', {
							iconCls   : 'event',  
							text: 'Уулзалт ...',
							handler: function(widget, event) {
								if (me.recordSelected())
									new OCS.EventWindow({
										selected: me.grid.getView().getSelectionModel().getSelection()[0]
									}).createWindow();
							}
						}),
						Ext.create('Ext.Action', {
							iconCls   : 'call', 
							text: 'Утсаар ярьсан ...',
							handler: function(widget, event) {
								if (me.recordSelected())							
									new OCS.CallLogWindow({
										selected: me.grid.getView().getSelectionModel().getSelection()[0]
									}).createWindow();							
							}
						}),
						Ext.create('Ext.Action', {
							iconCls   : 'email',  
							text: 'И-майл илгээсэн ...',
							handler: function(widget, event) {
								if (me.recordSelected())
									new OCS.EmailWindow({
										selected: me.grid.getView().getSelectionModel().getSelection()[0]
									}).createWindow();
							}
						})
					]
				}		
			}),			
			Ext.create('Ext.Action', {
				iconCls   : 'complain', 
				text: 'Үйлчилгээ ...',
				handler: function(widget, event) {
					if (me.recordSelected() && me.isCustomer())
						new OCS.ComplainWindow({
							selected: me.grid.getView().getSelectionModel().getSelection()[0]
						}).createWindow();
					else
						Ext.MessageBox.alert('Status', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй ! Only for customer level', function() {});
				}
			}),	
			Ext.create('Ext.Action', {
				iconCls   : 'deal', 
				text: 'Хэлцэл ...',
				handler: function(widget, event) {		
					if (me.recordSelected())
						new OCS.NewDealWindow({
							selected: me.grid.getView().getSelectionModel().getSelection()[0]
						}).createWindow();
				}
			}),
			Ext.create('Ext.Action', {
				iconCls   : 'campaign', 
				text: 'Маркетинг ...',
				menu: {
					xtype: 'menu',
					items: [{
						text: 'For selected records',
						handler: function(widget, event) {		
							if (me.recordSelected())
								new OCS.CampaignWindow({
									direction: me.xlsName,
									title: 'Campaigns ('+me.grid.getView().getSelectionModel().getSelection().length+' '+me.xlsName+')',
									ids: me.selectedIds()
								}).createWindow();
						}
					},{
						text: 'For all records',
						handler: function(widget, event) {		
							new OCS.CampaignWindow({
								direction: me.xlsName,
								title: 'Campaigns ('+me.store.getTotalCount()+' '+me.xlsName+')',
								ids: me.xlsName
							}).createWindow();
						}
					},'-',{
						text: 'Add to campaign for selected',
						handler: function(widget, event) {		
							if (me.recordSelected())
								new OCS.AddToCampaignWindow({
									direction: me.xlsName,
									title: 'Campaigns ('+me.grid.getView().getSelectionModel().getSelection().length+' '+me.xlsName+')',
									ids: me.selectedIds()
								}).show();
						}
					}]
				}				
			}),
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'service', 
				text: 'Борлуулалт',
				menu: {
					xtype: 'menu',
					items: [{
						text: 'Захиалга авах',
						iconCls: 'order',
						handler: function(widget, event) {		
							if (me.recordSelected())
								new OCS.NewServiceWindow({
									selected: me.grid.getView().getSelectionModel().getSelection()[0]
								}).createWindow();
						}
					},{
						text: 'Төлөлт оруулах',
						iconCls: 'bankir',
						handler: function(widget, event) {		
							if (me.recordSelected())
								new OCS.ServicePayRollWindow({
									selected: me.grid.getView().getSelectionModel().getSelection()[0],
									values: 'crm_id'
								}).createWindow();
						}
					},{
						text: 'Буцаалт бүртгэх',
						iconCls: 'return',
						handler: function(widget, event) {		
							if (me.recordSelected())
								new OCS.NewServiceWindow({
									selected: me.grid.getView().getSelectionModel().getSelection()[0],
									service_stage : 'return'
								}).createWindow();
						}
					},
					'-',{
						text: 'Үнийн өөрчлөлт оруулах',
						iconCls: 'change',
						handler: function(widget, event) {		
							if (me.recordSelected())
								new OCS.ChangePriceWindow({
									selected: me.grid.getView().getSelectionModel().getSelection()[0]
								}).createWindow();
						}
					}]
				}				
			}),
			Ext.create('Ext.Action', {
				iconCls   : 'tools', 
				text: 'Хэрэгслүүд ...',
				menu: {
					xtype: 'menu',
					items: [{
						iconCls: 'marker',
						text: 'Газрын зураг...',
						handler: function(widget, event) {
							if (me.recordSelected())
								new OCS.GMapWindow({
									ids: me.selectedIds(),
									markers: [{
										lat: 47.919078,
										lng: 106.91754,
										draggable: true,
										title: 'Sukhbaatar Square',
										listeners: {
											'dragend': function(marker) {
												var latLng = marker.latLng;
												var lat = latLng.lat();
												var lng = latLng.lng();
												console.log(marker);
											}
										}
									}]
								}).show();
						}
					},{
						text: 'Эрсдлийн үнэлгээ...',
						iconCls: 'chart',
						handler: function(widget, event) {		
							new OCS.RiskResultWindow({
								selected: me.grid.getView().getSelectionModel().getSelection()[0]
							}).createWindow();
						}
					},{
						text: 'Ложистик...',
						iconCls: 'container',
						handler: function(widget, event) {		
							if (me.recordSelected())
								new OCS.LogisticWindow({
									selected: me.grid.getView().getSelectionModel().getSelection()[0]
								}).show();
						}
					}]
				}				
			}),					
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'help', 
				text: 'Тусламж',
				handler: function(widget, event) {		
					new OCS.HelpWindow({
						id: me.func
					}).show();
				}
			})
		];
			
		return me.actions;
	},
	
	selectedRecord: function() {
		var me = this;
		var recs = me.grid.getView().getSelectionModel().getSelection();
		if (recs && recs.length > 0)
			return recs[0];
		
		return 0;
	},

	recordSelected: function() {
		var me = this;
		var recs = me.grid.getView().getSelectionModel().getSelection();
		if (recs && recs.length > 0)
			return true;
		
		Ext.MessageBox.alert('Status', 'No Selection !', function() {});
		return false;
	},

	selectedIds: function(all) {
		var me = this;
		var recs = me.grid.getView().getSelectionModel().getSelection();
		var result = '';
		for (i = 0; i < recs.length; i++) {
			result += recs[i].get('crm_id')+':';
		}

		return result;
	},

	isCustomer: function() {
		var me = this;
		var recs = me.grid.getView().getSelectionModel().getSelection();
		if (recs && recs.length > 0)
			return recs[0].data['level'] == 'customer';

		return false;
	},

	createPanel: function() {
		var me = this;
		me.createStore();		

		me.grid = Ext.create('OCS.GridView', {
			store: me.store,
			columns: me.createColumns(),
			actions: me.createActions(),
			func: me.func
		});										

		me.panel = Ext.create('Ext.panel.Panel', {
			title: me.title,
			id: me.tab,
			layout: 'border',
			border: false,
			region: 'center',
			items : [me.grid]			
		});
		
		me.filterData('');
		return me.panel;
	}
});

Ext.define('OCS.CorporatePanel', {	
	extend: 'OCS.RetailPanel',			
	firstName: '',
	lastName: '',
	modelName: 'CRM_CORPORATE',
	func: 'crm_corporate_list',
	autoSelect: true,
	xlsName: 'Account',
	title: 'Account List',
		
	createSubActions: function() {
		var me = this;
		me.subViews = [
			Ext.create('Ext.Action', {
				text: 'Create personal view...',
				handler: function(widget, event) {								
					new OCS.PersonalViewWindow({
						selected: me.grid.getView().getSelectionModel().getSelection()[0]
					}).createWindow();
				}
			}),
		'-'];

		me.per = personals.split(",");
		for (i = 0; i < me.per.length; i++) {
			if (me.per[i] && me.per[i].length > 0)				
				me.subViews.push(
					Ext.create('Ext.Action', {
						icon   : '',  
						text: me.per[i],
						handler: function(widget, event) {					
							me.filterData(widget.text);
						}
					})
				);
		}
		
		me.camViews = [];
		me.cam = campaigns_static.split(":");
		for (i = 0; i < me.cam.length; i++) {
			if (me.cam[i] && me.cam[i].length > 0)				
				me.camViews.push(
					Ext.create('Ext.Action', {
						icon   : '',  
						text: me.cam[i],
						handler: function(widget, event) {					
							me.filterData(widget.text);
						}
					})
				);
		}
		
		me.customViews = [
			Ext.create('Ext.Action', {
				icon   : '',  
				text: 'Харилцагч болоогүй',
				handler: function(widget, event) {
					me.filterData('Suspect List');
				}
			}),
			Ext.create('Ext.Action', {
				icon   : '',  
				text: 'Харилцагч болохоор төлөвлөгдөж байгаа',
				handler: function(widget, event) {
					me.filterData('Prospect List');
				}
			}),
			Ext.create('Ext.Action', {
				icon   : '',  
				text: 'Харилцагчийн жагсаалт',
				handler: function(widget, event) {
					me.filterData('Customer List');
				}
			}),
			'-',
			Ext.create('Ext.Action', {
				icon   : '',  
				text: 'TOP 100 харилцагчид',
				handler: function(widget, event) {
					me.filterData('TOP 100 List');
				}
			}),
			Ext.create('Ext.Action', {
				icon   : '',  
				text: 'Томоохон байгууллага',
				handler: function(widget, event) {
					me.filterData('Corporate List');
				}
			}),
			Ext.create('Ext.Action', {
				icon   : '',  
				text: 'Жижиг дунд байгууллага',
				handler: function(widget, event) {
					me.filterData('SME List');
				}
			}),
			Ext.create('Ext.Action', {
				icon   : '',  
				text: 'Гэрээт харилцагчид',
				handler: function(widget, event) {
					me.filterData('Reseller List');
				}
			}),
			Ext.create('Ext.Action', {
				icon   : '',  
				text: 'Гадаада харилцагчид',
				handler: function(widget, event) {
					me.filterData('External List');
				}
			}),
			'-',
			Ext.create('Ext.Action', {
				icon   : '',  
				text: 'Компаний харилцагчид',
				handler: function(widget, event) {
					me.filterData('My Company List');
				}
			}),
			Ext.create('Ext.Action', {
				icon   : '',  
				text: 'Бүх харилцагчид',
				handler: function(widget, event) {
					me.filterData('');
				}
			}),
			Ext.create('Ext.Action', {
				icon   : '',  
				text: 'Хариуцагчгүй харилцагчид',
				handler: function(widget, event) {
					me.filterData('Without Owner List');
				}
			}),
			Ext.create('Ext.Action', {
				icon   : '',  
				text: 'Миний хариуцдаг харилцагчид',
				handler: function(widget, event) {
					me.filterData('My '+me.xlsName+' List');
				}
			}),
			Ext.create('Ext.Action', {
				icon   : '',  
				text: 'Миний бүртгэсэн харилцагчид',
				handler: function(widget, event) {
					me.filterData('My Created '+me.xlsName+' List');
				}
			}),
			Ext.create('Ext.Action', {
				icon   : '',  
				text: 'Сүүлийн үед нэмэгдсэн харилцагчид',
				handler: function(widget, event) {
					me.filterData('Recently Added List');
				}
			}),
			'-',			
			Ext.create('Ext.Action', {
				icon   : '',  
				text: 'Standard Views',
				menu: {
					xtype: 'menu',
					items: me.camViews
				}					
			}),
			Ext.create('Ext.Action', {
				icon   : '',  
				text: 'Personal Views',
				menu: {
					xtype: 'menu',
					items: me.subViews
				}					
			})
		];

		return me.customViews;
	},

	createGrid: function() {
		var me = this;
		me.createStore();	
		
		me.filters = {
			ftype: 'filters',
			encode: true, 
			local: false, 
			filters: [{
				type: 'string',
				dataIndex: 'level'
			}]
		};

		me.grid = Ext.create('OCS.GridView', {	
			store: me.store,
			columns: me.createColumns(),
			features: [me.filters],
			actions: me.createActions(),
			func: me.func			
		});				
								
		me.panel = Ext.create('Ext.panel.Panel', {
			title: me.title,
			id: me.tab,
			layout: 'border',
			border: false,
			region: 'center',
			items : [me.grid]			
		});

		return me.panel;
	}
});

Ext.define('OCS.ActivityGrid', {
	extend: 'OCS.Module',
	func: 'crm_customer_activity_list',
	sortField: '_date',
	tab : 'activity_property',
	dateField: '_date',
	sortDirection: 'desc',
	title: 'Activities',
	icon: 'task',
	values: 'id',
	where: '0',
	modelName: 'CRM_CALENDAR',
	collapsed : false,
	action: true,
	ownerList: '',
	
	teamOn: function(ownerList) {
		var me = this;
		me.ownerList = ownerList;
		if (!me.action)		
			me.action = (me.ownerList.indexOf(logged) != -1);
	},

	filterData: function(views) {
		var me = this;		
		me.title = views;
		me.views = views;
		me.store.getProxy().extraParams = {handle: 'web', action: 'select', func: me.func, values: me.values, where: me.where, views: views};
		me.store.loadPage(1);
	},

	openActivityCount: function() {
		var me = this;
		var count = 0;
		me.store.each(function(record) {
			if (record.get('status') == 'open' || record.get('status') == 'pending' || record.get('status') == 'remind' || record.get('status') == 'draft')				
				count++;
		});

		return count;
	},
	
	selectedRecord: function() {
		var me = this;
		var recs = me.grid.getView().getSelectionModel().getSelection();
		if (recs && recs.length > 0)
			return recs[0];
		
		return 0;
	},

	completeActivity: function() {
		var me = this;
		var records = me.grid.getView().getSelectionModel().getSelection();
		if (records.length == 0) {
			 Ext.MessageBox.alert('Status', 'Сонгогдсон мөр байхгүй байна !', function() {});
			 return;
		}

		me.selected = me.grid.getView().getSelectionModel().getSelection()[0];
		if (!(me.selected.get('owner') == logged || me.selected.get('userCode') == logged)) {
			Ext.MessageBox.alert('Error', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
			return;
		}
		
		var id = me.selected.get('id');
		if (id.indexOf('_') != -1) {
			var sp = id.split('_');
			id = sp[0];
		}
		
		var form = me.form.getForm();
		descr = form.findField('descr').getValue();

		if (me.selected.get('work_type') == 'phone call') {
			if (me.selected.get('status') == 'success') {
				Ext.MessageBox.alert('Error', 'Already completed !', function() {});
				return;
			}
			
			if (me.selected.get('source') == 'campaign') {
//				
				Ext.Msg.confirm('Warning ','Are you sure you want to create deal?',function(btn){
					if(btn === 'yes'){
						new OCS.CreateDealWindow({
							selected: me.selected
						}).show();
					}
				});
			}

			Ext.Ajax.request({
			   url: 'avia.php',
			   params: {handle: 'web', table: 'crm_calllog', action: 'update', values: "callresult='success',descr='"+descr+"'", where: "id="+id},
			   success: function(response, opts) {
				   me.store.reload();
			   },
			   failure: function(response, opts) {										   
				  Ext.MessageBox.alert('Status', 'Error !', function() {});
			   }
			});
		} else
		if (me.selected.get('work_type') == 'email') {
			if (me.selected.get('status') == 'sent') {
				Ext.MessageBox.alert('Error', 'Already completed !', function() {});
				return;
			}
			Ext.Ajax.request({
			   url: 'avia.php',
			   params: {handle: 'web', table: 'crm_emails', action: 'update', values: "email_status='sent',descr='"+descr+"'", where: "id="+id},
			   success: function(response, opts) {
				   me.store.reload();
			   },
			   failure: function(response, opts) {										   
				  Ext.MessageBox.alert('Status', 'Error !', function() {});
			   }
			});
		} else
		if (me.selected.get('work_type') == 'appointment') {
			if (me.selected.get('status') == 'completed') {
				Ext.MessageBox.alert('Error', 'Already completed !', function() {});
				return;
			}
			Ext.Ajax.request({
			   url: 'avia.php',
			   params: {handle: 'web', table: 'crm_events', action: 'update', values: "event_status='completed',descr='"+descr+"'", where: "id="+id},
			   success: function(response, opts) {
				   me.store.reload();
			   },
			   failure: function(response, opts) {										   
				  Ext.MessageBox.alert('Status', 'Error !', function() {});
			   }
			});
		}  else
		if (me.selected.get('work_type') == 'task') {
			if (me.selected.get('status') == 'completed') {
				Ext.MessageBox.alert('Error', 'Already completed !', function() {});
				return;
			}
			Ext.Ajax.request({
			   url: 'avia.php',
			   params: {handle: 'web', table: 'crm_tasks', action: 'update', values: "task_status='completed',descr='"+descr+"'", where: "id="+id},
			   success: function(response, opts) {
				   me.store.reload();
			   },
			   failure: function(response, opts) {										   
				  Ext.MessageBox.alert('Status', 'Error !', function() {});
			   }
			});
		}

		me.grid.getView().getSelectionModel().clearSelections();
	},

	createActions: function() {
		var me = this;
		me.actions = [		
			Ext.create('Ext.Action', {
				iconCls: 'list',
				text: 'Views',
				menu: {
					xtype: 'menu',
					items: [
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Note List',
							handler: function(widget, event) {
								me.filterData('Note List');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Task List',
							handler: function(widget, event) {
								me.filterData('Task List');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Appointment List',
							handler: function(widget, event) {
								me.filterData('Appointment List');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Phone Call List',
							handler: function(widget, event) {
								me.filterData('Phone Call List');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Email List',
							handler: function(widget, event) {
								me.filterData('Email List');
							}
						}),
						'-',
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'All Activity List',
							handler: function(widget, event) {
								me.filterData('All Activity List');
							}
						})
					]
				}		
			}),'-',
			Ext.create('Ext.Action', {
				iconCls : 'save',
				text: 'Complete',
				handler: function(widget, event) {
					var records = me.grid.getView().getSelectionModel().getSelection();
					var record = records[0];
					if (record.get('owner')) {
						new OCS.ActivityDetailWindow({
							title: 'Activity detail',
							record: record,
							backgrid: me
						}).show();							
					}

					//me.completeActivity();
				}
			}),
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'notes',  
				text: 'Notes ...',
				handler: function(widget, event) {
					if (me.action)
						new OCS.NotesWindow({
							selected: me.selected,
							backgrid: me.grid
						}).createWindow();
					else
						Ext.MessageBox.alert('Status', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
				}
			}),
			Ext.create('Ext.Action', {
				iconCls   : 'task',  
				text: 'Task ...',
				handler: function(widget, event) {
					if (me.action)
						new OCS.TaskWindow({
							selected: me.selected,
							backgrid: me.grid
						}).createWindow();
					else
						Ext.MessageBox.alert('Status', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
				}
			}),
			Ext.create('Ext.Action', {
				iconCls   : 'event',  
				text: 'Appointment ...',
				handler: function(widget, event) {
					if (me.action)
						new OCS.EventWindow({
							selected: me.selected,
							backgrid: me.grid
						}).createWindow();
					else
						Ext.MessageBox.alert('Status', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
				}
			}),
			Ext.create('Ext.Action', {
				iconCls   : 'call', 
				text: 'Phone call ...',
				handler: function(widget, event) {
					if (me.action)
						new OCS.CallLogWindow({
							selected: me.selected,
							backgrid: me.grid
						}).createWindow();
					else
						Ext.MessageBox.alert('Status', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
				}
			}),
			Ext.create('Ext.Action', {
				iconCls   : 'email',  
				text: 'Email ...',
				handler: function(widget, event) {
					if (me.action)
						new OCS.EmailWindow({
							selected: me.selected,
							backgrid: me.grid
						}).createWindow();
					else
						Ext.MessageBox.alert('Status', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
				}
			})
		];
			
		return me.actions;
	},

	renderTitle: function(value, p, record) {
		if (record.data.work_type == 'task')
		{		
	        return Ext.String.format(
				'<table class="{2}"><tr><td width="50px"><div class="c-task" title="Phone Call"></div></td><td><b><span class="title">{5}</span></b></br><span class="lightgray">{1}</span></br><span class="gray">{2}&nbsp;by&nbsp;</span><span class="purple">{3}</span>&nbsp;<span class="gray">{4}</span>&nbsp;<img src="images/{6}.png" title="{6}" style="height:12px"/></td></tr></table>',
			    value,
				record.data.descr.substring(0, Math.min(record.data.descr.length, 80)),
	            record.data.status,
				record.data.owner,
				record.data.days,
				record.data.crm_name.split(',')[0],
				record.data.source
		    );
		} else
		if (record.data.work_type == 'phone call')	
		{
			return Ext.String.format(
		        '<table class="{2}"><tr><td width="50px"><div class="c-call" title="Task"></div></td><td><b><span class="title">{5}</span></b></br><span class="lightgray">{7}&nbsp;{1}</span></br><span class="gray">{2}&nbsp;by&nbsp;</span><span class="purple">{3}</span>&nbsp;<span class="gray">{4}</span>&nbsp;<img src="images/{6}.png" title="{6}" style="height:12px"/></td></tr></table>',
			    value,
				record.data.descr.substring(0, Math.min(record.data.descr.length, 80)),
	            record.data.status,
				record.data.owner,
				record.data.days,
				record.data.crm_name.split(',')[0],
				record.data.source,
				record.data.phone
		    );
		} else
		if (record.data.work_type == 'appointment')	
		{
			return Ext.String.format(
				'<table class="{2}"><tr><td width="50px"><div class="c-event" title="Appointment"></div></td><td><b><span class="title">{0}</span></b>&nbsp;&nbsp;{5}</br><span class="lightgray">{1}</span></br><span class="gray">{2}&nbsp;by&nbsp;</span><span class="purple">{3}</span>&nbsp;<span class="gray">{4}</span>&nbsp;<img src="images/{6}.png" title="{6}" style="height:12px"/></td></tr></table>',
			    value,
				record.data.descr.substring(0, Math.min(record.data.descr.length, 80)),
	            record.data.status,
				record.data.owner,
				record.data.days,
				record.data.crm_name.split(',')[0],
				record.data.source
		    );
		} else
		if (record.data.work_type == 'note')	
		{
			return Ext.String.format(
				'<table class="{2}"><tr><td width="50px"><div class="c-note" title="Note"></div></td><td><b><span class="title">{0}</span></b>&nbsp;&nbsp;{5}</br><span class="lightgray">{1}</span></br><span class="gray">{2}&nbsp;by&nbsp;</span><span class="purple">{3}</span>&nbsp;<span class="gray">{4}</span>&nbsp;<img src="images/{6}.png" title="{6}" style="height:12px"/></td></tr></table>',
			    value,
				record.data.descr.substring(0, Math.min(record.data.descr.length, 80)),
	            record.data.status,
				record.data.owner,
				record.data.days,
				record.data.crm_name.split(',')[0],
				record.data.source
		    );
		} else
		if (record.data.work_type == 'email')	
		{
			return Ext.String.format(
				'<table class="{2}"><tr><td width="50px"><div class="c-email" title="Email"></div></td><td><b><span class="title">{0}</span></b>&nbsp;&nbsp;{5}</br><span class="lightgray">{1}</span></br><span class="gray">{2}&nbsp;by&nbsp;</span><span class="purple">{3}</span>&nbsp;<span class="gray">{4}</span>&nbsp;<img src="images/{6}.png" title="{6}" style="height:12px"/></td></tr></table>',
			    value,
				record.data.descr.substring(0, Math.min(record.data.descr.length, 80)),
	            record.data.status,
				record.data.owner,
				record.data.days,
				record.data.crm_name.split(',')[0],
				record.data.source
		    );
		}
    },
	
	updateSource: function(rec) {
		var me = this;
		me.selected = rec;
		if (rec.data['crm_id'])
			me.where = rec.data['crm_id'];
		else
			me.where = rec.get('crm_id');
		me.values = 'crm_id';
		me.grid.where = me.where;
		me.grid.values = me.values;
		me.loadStore();
	},
	
	createColumns: function() {
		var me = this;
		return [{
			text: "Activity",
			dataIndex: 'subject',
			flex: 1,
			renderer: me.renderTitle,
			sortable: true
		},{
			text: "Priority",
			dataIndex: 'priority',
			width: 60,
			hidden: true,
			align: 'right',
			renderer: renderPriority,
			sortable: true
		},{
			text: "Status",
			dataIndex: 'status',
			width: 100,
			hidden: true,
			sortable: true
		},{
			text: "Created on",
			dataIndex: '_date',
			width: 100,
			hidden: true,
			sortable: true
		}];
	},

	createGrid: function() {
		var me = this;			
		me.createStore();
		
		me.grid = Ext.create('OCS.GridView', {
			store: me.store,
			columns: me.createColumns(),
			actions: me.createActions(),
			flex: 1,
			animCollapse: true,
			collapsed: me.collapsed,
			func: me.func,
			tbarable: false,
			feature: true,
			search: true,
			viewConfig: {
				trackOver: false,
				stripeRows: true,
				plugins: [{
					ptype: 'preview',
					bodyField: 'descr',
					expanded: true,
					pluginId: 'preview'
				}],
			    emptyText: 'No records'				
			}				
		});
	},

	createPanel: function() {
		var me = this;
		me.createGrid();

		me.panel = Ext.create('Ext.Panel', {
			id: me.tab,	
			title: me.title,
			border: false,
			layout: 'border',
			items: [me.grid]
		});

		return me.panel;
	}
});

Ext.define('OCS.DetailActivityGrid', {
	extend: 'OCS.ActivityGrid',
	
	createActions: function() {
		var me = this;
		me.actions = [		
			
		];
			
		return me.actions;
	}
});

Ext.define('OCS.MyActivityGrid', {
	extend: 'OCS.ActivityGrid',
	func: 'crm_my_activity_list',
	sortField: '_date',
	sortDirection: 'desc',
	tab : 'my_activity_property',
	dateField: '_date',
	title: 'Recent Activities',
	icon: 'task',
	modelName: 'CRM_CALENDAR',
	collapsed : false,	
	values: '',
	
	createActions: function() {
		var me = this;
		me.actions = [Ext.create('Ext.Action', {
				iconCls: 'list',
				text: 'Views',
				menu: {
					xtype: 'menu',
					items: [						
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Task List',
							handler: function(widget, event) {
								me.filterData('Task List');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Appointment List',
							handler: function(widget, event) {
								me.filterData('Appointment List');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Phone Call List',
							handler: function(widget, event) {
								me.filterData('Phone Call List');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Email List',
							handler: function(widget, event) {
								me.filterData('Email List');
							}
						}),
						'-',						
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'All Activity List (Case)',
							handler: function(widget, event) {
								me.filterData('All Activity List (Case)');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'All Activity List (Remind)',
							handler: function(widget, event) {
								me.filterData('All Activity List (Remind)');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'All Activity List',
							handler: function(widget, event) {
								me.where = '';
								me.values = '';
								me.filterData('All Activity List');
							}
						})
					]
				}		
			}),
			'-',
			Ext.create('Ext.Action', {
				iconCls : 'edit',
				text: 'Expand',
				handler: function(widget, event) {
//					new OCS.ActivityUpdateWindow({
//						selected: me.grid.getView().getSelectionModel().getSelection()[0];
//					}).show();
					var records = me.grid.getView().getSelectionModel().getSelection();
					if (records.length == 0) {
						 Ext.MessageBox.alert('Status', 'Сонгогдсон мөр байхгүй байна !', function() {});
						 return;
					}
					if (records[0].get('owner') != logged) {
						Ext.MessageBox.alert('Error', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
						return;
					}

					me.selected = records[0];
					if (me.selected.get('work_type') == 'task')										
						new OCS.TaskWindow({
							selected: me.selected
						}).createWindow();
					else if (me.selected.get('work_type') == 'appointment')											
						new OCS.EventWindow({
							selected: me.selected
						}).createWindow();
					else if (me.selected.get('work_type') == 'phone call')											
						new OCS.CallLogWindow({
							selected: me.selected
						}).createWindow();
					else if (me.selected.get('work_type') == 'email')											
						new OCS.EmailWindow({
							selected: me.selected
						}).createWindow();
					else if (me.selected.get('work_type') == 'note')											
						new OCS.NotesWindow({
							selected: me.selected
						}).createWindow();
					else if (me.selected.get('work_type') == 'case')											
						new OCS.ComplainWindow({
							selected: me.selected
						}).createWindow();
				}
			}),	
			'-',
			Ext.create('Ext.Action', {
				iconCls : 'save',
				text: 'Complete',
				handler: function(widget, event) {
					var records = me.grid.getView().getSelectionModel().getSelection();
					var record = records[0];
					if (record.get('owner')) {
						new OCS.ActivityDetailWindow({
							title: 'Activity detail',
							record: record,
							backgrid: me
						}).show();							
					}
					//me.completeActivity();
				}
			}),
			Ext.create('Ext.Action', {
				iconCls : 'calendar',
				text: 'Календар',
				handler: function(widget, event) {
					var records = me.grid.getView().getSelectionModel().getSelection();
					if (records.length == 0) {
						 Ext.MessageBox.alert('Status', 'Сонгогдсон мөр байхгүй байна !', function() {});
						 return;
					}
					googleEventDynamic(records[0]);
				}
			}),
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'help',
				text: 'Тусламж',
				handler: function(widget, event) {
					new OCS.HelpWindow({
						id: me.func
					}).show();
				}
			})			
		];

		return me.actions;
	},

	createColumns: function() {
		var me = this;
		return [{
			text: "Activity",
			dataIndex: 'subject',
			flex: 1,
			renderer: me.renderTitle,
			sortable: true
		},{
			text: "Priority",
			dataIndex: 'priority',
			width: 50,
			align: 'right',
			hidden: true,
			renderer: renderPriority,
			sortable: true
		},{
			text: "Status",
			dataIndex: 'status',
			width: 100,
			hidden: true,
			sortable: true
		},{
			text: "Created on",
			dataIndex: '_date',
			width: 100,
			hidden: true,
			sortable: true
		}];
	},

	updateSource: function(rec) {
		var me = this;
		me.selected = rec;
		me.where = rec.get('crm_id');
		me.values = 'crm_id';
		me.loadStore();
	},	
		
	reloadOwner: function(owner) {
		var me = this;
		me.where = owner;
		me.values = 'owner';
		me.loadStore();
		/*
		me.store.filter(function(r) {
			var value = r.get('owner');
			alert(value+' '+owner);
			return (owner == value);
		});*/
	},	

	reload: function() {
		var me = this;
		me.loadStore();
	},

	createPanel: function() {
		var me = this;
		me.createGrid();

		me.panel = Ext.create('Ext.Panel', {
			id: me.tab,
			title: me.title,
			width: 220,
			split: true,
			border: true,
			layout: 'border',
			region: 'south',
			flex: 1.5,
			items: [me.grid]
		});

		return me.panel;
	}
});

Ext.define('OCS.CaseGrid', {
	extend: 'OCS.ActivityGrid',
	func: 'crm_complain_list',
	tab : 'case_property',
	title: 'Recent cases',
	icon: 'cases',
	dateField: '_date',
	sortField: 'complain_status',
	modelName: 'CRM_COMPLAIN',
	region: 'north',
	
	createActions: function() {
		var me = this;
		me.actions = [
		/*	Ext.create('Ext.Action', {
				iconCls : 'add',  
				text: 'Нэмэх ...',
				handler: function(widget, event) {
					new OCS.ComplainWindow({
						selected: me.selected
					}).createWindow();
				}
			})*/
		];
			
		return me.actions;
	},

	createColumns: function() {
		var me = this;
		return [{
			text: 'Case title',
			dataIndex: 'complain_reason',
			width: 180,
			sortable: true
		},{
			text: "Priority",
			dataIndex: 'priority',
			width: 60,
			renderer: renderPriority,
			sortable: true
		},{
			text: "Status",
			dataIndex: 'complain_status',
			width: 70,
			sortable: true
		},{
			text: 'Created On',
			dataIndex: '_date',
			width:110,
			sortable: true
		}];
	}
});

Ext.define('OCS.OpportunityGrid', {
	extend: 'OCS.CaseGrid',
	func: 'crm_customer_opportunity_list',
	sortField: 'stage',
	tab : 'opportunity_property',
	dateField: 'closing_date',
	title: 'Recent Deals',
	icon: 'sales',
	modelName: 'CRM_DEAL',
	collapsed : false,
	region: 'center',
	
	createActions: function() {
		var me = this;
		me.actions = [
			/*Ext.create('Ext.Action', {
				iconCls  : 'add',  
				text: 'Нэмэх ...',
				handler: function(widget, event) {
					new OCS.NewDealWindow({
						selected: me.selected
					}).createWindow();
				}
			})*/
		];
			
		return me.actions;
	},

	createColumns: function() {
		var me = this;
		return [{
			text: "Topic",
			dataIndex: 'deal',
			width: 200,
			sortable: true
		},{
			text: "Status",
			dataIndex: 'stage',
			width: 80,		
			renderer: renderDealLevel,
			sortable: true
		},{
			text: "Close Date",
			dataIndex: 'closing_date',
			width: 70,
			sortable: true
		},{
			text: "Expected Revenue",
			dataIndex: 'expected_revenue',
			renderer: renderMoney,
			align: 'right',
			width: 100,
			sortable: true
		},{
			text: "Owner",
			dataIndex: 'owner',
			renderer: renderOwner,
			width: 100,
			sortable: true
		}];
	},

	createGrid: function() {
		var me = this;			
		me.createStore();

		me.grid = Ext.create('OCS.GridView', {
			store: me.store,
			columns: me.createColumns(),
			actions: me.createActions(),
			region: me.region,
			animCollapse: true,
			collapsed: me.collapsed,
			func: me.func,
			tbarable: false,
			feature: false,
			emptyText: 'No Opportunity records found.'
		});	
	}
});

Ext.define('OCS.CustomerCompany', {
	extend: 'OCS.CaseGrid',
	func: 'crm_customer_company_list',
	sortField: 'company',
	tab : 'customer_company_property',
	dateField: '_date',
	title: 'Company list',
	icon: 'sales',
	modelName: 'CRM_CUSTOMER_COMPANY',
	collapsed : false,
	region: 'center',
	table: 'crm_customer_company',
	primary: 'crm_id',	
	
	createActions: function() {
		var me = this;
		me.actions = [
			Ext.create('Ext.Action', {
				iconCls  : 'add',  
				text: 'Нэмэх ...',
				handler: function(widget, event) {
					if (campaigns_static.length > 0)
						new OCS.CustomerCompanyWindowCheckList({
							crm_id: me.selected.get('crm_id'),
							backgrid: me.grid
						}).show();
					else
						Ext.MessageBox.alert('Status', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
				}
			}),
			Ext.create('Ext.Action', {
				iconCls  : 'delete',  
				text: 'Устгах',
				handler: function(widget, event) {
					me.deleteRecord();
				}
			})
		];
			
		return me.actions;
	},

	createColumns: function() {
		var me = this;
		return [{
			text: "Company",
			dataIndex: 'company',
			width: 200,
			sortable: true
		},{
			text: "Created by",
			dataIndex: 'userCode',
			renderer: renderOwner,
			width: 100,
			sortable: true
		},{
			text: "Created on",
			dataIndex: '_date',
			width: 100,
			sortable: true
		}];
	},

	createGrid: function() {
		var me = this;			
		me.createStore();

		me.grid = Ext.create('OCS.GridView', {
			store: me.store,
			columns: me.createColumns(),
			actions: me.createActions(),
			region: me.region,
			animCollapse: true,
			collapsed: me.collapsed,
			func: me.func,
			tbarable: false,
			feature: false,
			emptyText: 'No Company records found.'
		});	
	}
});

Ext.define('OCS.CustomerCampaigns', {
	extend: 'OCS.CaseGrid',
	func: 'crm_customer_campaign_list',
	sortField: 'campaign',
	tab : 'customer_campaigns_property',
	dateField: '_date',
	title: 'Campaigns',
	icon: 'sales',
	modelName: 'CRM_CUSTOMER_CAMPAIGN',
	collapsed : false,
	region: 'center',
	table: 'crm_customer_campaings',
	primary: 'crm_id',	
	
	createActions: function() {
		var me = this;
		me.actions = [
			Ext.create('Ext.Action', {
				iconCls  : 'add',  
				text: 'Нэмэх ...',
				handler: function(widget, event) {
					if (campaigns_static.length > 0)
						new OCS.CustomerCampaignWindowCheckList({
							crm_id: me.selected.get('crm_id'),
							backgrid: me.grid
						}).show();
					else
						Ext.MessageBox.alert('Status', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
				}
			}),
			Ext.create('Ext.Action', {
				iconCls  : 'delete',  
				text: 'Устгах',
				handler: function(widget, event) {
					me.deleteRecord();
				}
			})
		];
			
		return me.actions;
	},

	createColumns: function() {
		var me = this;
		return [{
			text: "Campaign",
			dataIndex: 'campaign',
			width: 200,
			sortable: true
		},{
			text: "Created by",
			dataIndex: 'userCode',
			renderer: renderOwner,
			width: 100,
			sortable: true
		},{
			text: "Created on",
			dataIndex: '_date',
			width: 100,
			sortable: true
		}];
	},

	createGrid: function() {
		var me = this;			
		me.createStore();

		me.grid = Ext.create('OCS.GridView', {
			store: me.store,
			columns: me.createColumns(),
			actions: me.createActions(),
			region: me.region,
			animCollapse: true,
			collapsed: me.collapsed,
			func: me.func,
			tbarable: false,
			feature: false,
			emptyText: 'No Campaign records found.'
		});	
	}
});

Ext.define('OCS.CustomerSalesPanel', {
	extend: 'OCS.CaseGrid',
	func: 'crm_customer_sales_list',
	sortField: 'end_date',
	tab : 'customer_sales_property',
	dateField: '_date',
	title: 'Sales',
	icon: 'sales',
	modelName: 'CRM_SALES',
	collapsed : false,
	region: 'center',
	
	createActions: function() {
		var me = this;
		me.actions = [
			
		];
			
		return me.actions;
	},

	createColumns: function() {
		var me = this;
		return [{
			text: "Product",
			dataIndex: 'product_name',
			width: 200,
			sortable: true
		},{
			text: "Start Date",
			dataIndex: 'start_date',
			width: 80,		
			sortable: true
		},{
			text: "End date",
			dataIndex: 'end_date',
			width: 100,
			sortable: true
		},{
			text: "Amount",
			dataIndex: 'amount',
			renderer: renderMoney,
			align: 'right',
			summaryType: 'sum',
			summaryRenderer: renderTMoney,
			width: 100,
			sortable: true
		}];
	},

	createGrid: function() {
		var me = this;			
		me.createStore();

		me.grid = Ext.create('OCS.GridView', {
			store: me.store,
			columns: me.createColumns(),
			actions: me.createActions(),
			region: me.region,
			animCollapse: true,
			collapsed: me.collapsed,
			func: me.func,
			tbarable: false,
			feature: true,
			emptyText: 'No records found.'
		});	
	}
});

Ext.define('OCS.DetailGrid', {
	extend: 'OCS.ActivityGrid',
	func: 'crm_contact_list',
	tab : 'detail_property',
	title: 'Contacts',
	icon: 'call',
	table: 'crm_customer',
	dateField: '_date',
	sortField: 'crm_id',
	primary: 'crm_id',
	where: '-1',
	values: 'parent_crm_id',
	modelName: 'CRM_RETAIL',
	collapsed: false,
	
	createActions: function() {
		var me = this;

		me.actions = [
			Ext.create('Ext.Action', {
				iconCls   : 'add',
				text: 'Нэмэх ...',
				handler: function(widget, event) {
//					if (me.selected.get('type') == 'БАЙГУУЛЛАГА') {
						new OCS.ContactNewWindow({
							record: me.selected,							
							backgrid: me.grid
						}).show();
//					} else
//						Ext.MessageBox.alert('Status', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
				}
			}),
			Ext.create('Ext.Action', {
				iconCls   : 'delete',
				text: 'Устгах ...',
				handler: function(widget, event) {
					var sel = me.grid.getView().getSelectionModel().getSelection();
					if (sel.length > 0) {
						Ext.Msg.confirm('Warning ','Remove from list ?',function(btn){
							if(btn === 'yes'){
								Ext.Ajax.request({
								   url: 'avia.php',
								   params: {handle: 'web', table: 'crm_customer', action: 'update', values: 'parent_crm_id=0', where: "crm_id="+sel[0].get('crm_id')},
								   success: function(response, opts) {
									  me.loadStore();
								   },
								   failure: function(response, opts) {										   
									  Ext.MessageBox.alert('Status', 'Error !', function() {});
								   }
								});	
							}else{
								
							}	
						});		
					} else 
						Ext.MessageBox.alert('Status', 'Сонгогдсон мөр байхгүй байна !', function() {});
				}
			})
		];

		return me.actions;
	},

	updateSource: function(rec) {
		var me = this;
		me.selected = rec;
		me.where = rec.data['crm_id'];
		me.values = 'parent_crm_id';
		me.loadStore();
	},

	renderTitle: function(value, p, record) {
        return Ext.String.format(
            '<table><tr><td><div class="c-contact"></div></td><td><b><span class="title">{0}</span></b></br><span class="gray">{1}&nbsp;*{3}</br><a href="mailto:{2}">{2}</a></span></td></tr></table>',
            value,
            record.data.job_title,
            record.data.email,
			record.data.decision_maker
        );
    },	

	createColumns: function() {
		var me = this;
		return [{
			text: 'Contact name',
			dataIndex: 'crm_name',
			renderer: me.renderTitle,
			flex: 1,
			sortable: true
		},{
			text: 'Хариуцагч',
			dataIndex: 'userCode',
			width: 100,
			hidden: true,
			sortable: true
		},{
			text: 'Phone',
			dataIndex: 'phone',
			width: 80,
			align: 'right',
			sortable: true,
			renderer: renderPhone
		}];
	},

	createPanel: function() {
		var me = this;
		me.createGrid();
		
		me.panel = Ext.create('Ext.Panel', {
			id: me.tab,
			title: me.title,			
			border: false,
			layout: 'border',
			items: [me.grid]
		});

		return me.panel;
	}
});

Ext.define('OCS.DealView', {
	extend: 'OCS.GridWithFormPanel',
	func: 'crm_deal_list',	
	sortField: '_date',
	table: 'crm_deals',
	tab: 'my_deal_list',
	title: 'All Deals',
	sub: 'my_open_leads',
	primary: 'deal_id',
	xlsName: 'Deal',
	
	filterData: function(views) {
		var me = this;		
		me.title = views;
		me.grid.views = views;
		me.store.getProxy().extraParams = {handle: 'web', action: 'select', func: me.func, values: me.values, where: me.where, views: views};
		me.store.loadPage(1);
	},

	createActions: function() {
		var me = this;
		me.actions = [
			Ext.create('Ext.Action', {
				iconCls: 'list',
				text: 'Views',
				menu: {
					xtype: 'menu',
					items: [
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Open Deals',
							handler: function(widget, event) {
								me.filterData('Open Deals');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Closed Deals',
							handler: function(widget, event) {
								me.filterData('Closed Deals');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Closed Deals (Lost)',
							handler: function(widget, event) {
								me.filterData('Closed Deals (Lost)');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Opportunity List',
							handler: function(widget, event) {
								me.filterData('Opportunity List');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Quote List',
							handler: function(widget, event) {
								me.filterData('Quote List');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'All Deals',
							handler: function(widget, event) {
								me.filterData('All Deals');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Recent Opened Deals',
							handler: function(widget, event) {
								me.filterData('Recent Opened Deals');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Campaign Deals',
							handler: function(widget, event) {
								me.filterData('Campaign Deals');
							}
						}),
						'-',
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'My Owned Deals',
							handler: function(widget, event) {
								me.filterData('My Owned Deals');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'My Created Deals',
							handler: function(widget, event) {
								me.filterData('My Created Deals');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'All deals in current fiscal year',
							handler: function(widget, event) {
								me.filterData('All deals in current fiscal year');
							}
						})
					]
				}		
			}),
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'edit',
				text: 'Засах...',
				handler: function(widget, event) {
					if (me.grid.getView().getSelectionModel().getSelection().length > 0) {
						new OCS.NewDealWindow({
							selected: me.grid.getView().getSelectionModel().getSelection()[0]
						}).createWindow();
					} else 
						Ext.MessageBox.alert('Status', 'Сонгогдсон мөр байхгүй байна !', function() {});
				}
			}),			
			Ext.create('Ext.Action', {
				iconCls   : 'delete',
				text: 'Устгах',
				handler: function(widget, event) {
					me.deleteRecord();
				}
			}),
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'import',
				text: 'Импорт...',
				handler: function(widget, event) {
					new OCS.UploadWindow({
						name: me.xlsName						
					}).show();
				}
			}),	
			Ext.create('Ext.Action', {
				iconCls  : 'export',
				text: 'Экспорт...',
				disabled: (user_level == '0'),
				handler: function(widget, event) {
					if (!Ext.fly('frmDummy')) {
						var frm = document.createElement('form');
						frm.id = 'frmDummy';
						frm.name = 'url-post';
						frm.className = 'x-hidden';
						document.body.appendChild(frm);
					}

					Ext.Ajax.request({
					   url: 'avia.php',
					   isUpload: true,
					   form: Ext.fly('frmDummy'),
					   params: {handle: 'file', action:'export', where: me.xlsName},					
					   success: function(response, opts) {					
						  Ext.MessageBox.alert('Status', 'Success !', function() {});
					   },
					   failure: function(response, opts) {
						  Ext.MessageBox.alert('Status', 'Error !', function() {});
					   }
					});	
				}
			}),
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'deal_assign',
				text: 'Assign ...',
				handler: function(widget, event) {
					if (user_level > 0 ) {												
						if (me.recordSelected())						
							new OCS.DealAssignWindow({
								selected: me.grid.getView().getSelectionModel().getSelection()[0],
								ids: me.selectedIds('deal_id'),
								direction: me.xlsName
							}).show();
					} else
						Ext.MessageBox.alert('Error', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
				}
			}),
			Ext.create('Ext.Action', {
				iconCls   : 'deal_undo',
				text: 'Undo ...',
				handler: function(widget, event) {
					if (user_level > 0 ) {												
						if (me.recordSelected())						
							new OCS.DealUndoWindow({
								ids: me.selectedIds('deal_id'),
								direction: me.xlsName
							}).show();
					} else
						Ext.MessageBox.alert('Error', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
				}
			}),
			Ext.create('Ext.Action', {
				iconCls   : 'deal_move',
				text: 'Move to ...',
				handler: function(widget, event) {
					if (user_level > 0 ) {												
						if (me.recordSelected())						
							new OCS.DealMoveWindow({
								ids: me.selectedIds('deal_id'),
								direction: me.xlsName
							}).show();
					} else
						Ext.MessageBox.alert('Error', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
				}
			}),
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'help',
				text: 'Тусламж',
				handler: function(widget, event) {
					new OCS.HelpWindow({
						id: 'crm_deal_process'
					}).show();
				}
			})
		];

		return me.actions;
	},

	createView: function() {
		var me = this;
		me.modelName = 'CRM_DEAL';
		me.createStore();
		me.storeExtend();

		me.grid = Ext.create('OCS.GridView', {	
			id: me.tab,
			title: me.title,
			store: me.store,
			flex: 1,
			func: me.func,
			feature: true,
			actions: me.createActions(),
			columns: me.createColumns(),
			viewConfig: {
				itemclick: function(dv, record, item, index, e) {
					views['deals'].action.select(record);
				}
			}
		});

		me.grid.on('itemclick', function(dv, record, item, index, e) {
				views['deals'].action.select(record);				
			}
		);

		me.filterData('Open Deals');	

		return me.grid;
	},
		
	storeExtend: function() {
		var me = this;
		me.store.on('reload', function() {
			alert('reloaded');
		});
	},

	reload: function() {
		var me = this;
		me.store.reload();
	}
});

Ext.define('OCS.ServiceView', {
	extend: 'OCS.DealView',
	func: 'crm_service_list',	
	sortField: '_date',
	groupField: 'userCode',
	table: 'crm_services',
	tab: 'my_service_list',
	title: 'All Services',
	sub: 'my_open_receipts',
	primary: 'service_id',
	xlsName: 'Service',

	createActions: function() {
		var me = this;
		me.actions = [
			Ext.create('Ext.Action', {
				iconCls: 'list',
				text: 'Харагдац',
				menu: {
					xtype: 'menu',
					items: [
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Нээлттэй',
							handler: function(widget, event) {
								me.filterData('Open Services');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Шинээр ирсэн',
							handler: function(widget, event) {
								me.filterData('Incoming Services');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Олгосон',
							handler: function(widget, event) {
								me.filterData('Outgoing Services');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Хаагдсан',
							handler: function(widget, event) {
								me.filterData('Closed Services');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Хойшлогдсон',
							handler: function(widget, event) {
								me.filterData('Reminded Services');
							}
						}),						
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Урамшуулалттай',
							handler: function(widget, event) {
								me.filterData('Campaign Services');
							}
						}),
						'-',
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Буцаалтанд ирсэн',
							handler: function(widget, event) {
								me.filterData('Returned Services');
							}
						}),	
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Хүлээн авсан буцаалтууд',
							handler: function(widget, event) {
								me.filterData('Accepted Returned Services');
							}
						}),	
						'-',
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Миний',
							handler: function(widget, event) {
								me.filterData('My Owned Services');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Миний үүсгэсэн',
							handler: function(widget, event) {
								me.filterData('My Created Services');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Бүтэн жилийн',
							handler: function(widget, event) {
								me.filterData('All services in current fiscal year');
							}
						}),
						'-',
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Замд яваа',
							handler: function(widget, event) {
								me.filterData('Transit services');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Хүлээн авсан',
							handler: function(widget, event) {
								me.filterData('Stocked services');
							}
						})
					]
				}		
			}),
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'edit',
				text: 'Дэлгэрэнгүй...',
				handler: function(widget, event) {
					if (me.grid.getView().getSelectionModel().getSelection().length > 0) {
						new OCS.NewServiceWindow({
							selected: me.grid.getView().getSelectionModel().getSelection()[0]
						}).createWindow();
					} else 
						Ext.MessageBox.alert('Status', 'Сонгогдсон мөр байхгүй байна !', function() {});
				}
			}),			
			Ext.create('Ext.Action', {
				iconCls   : 'delete',
				text: 'Устгах',
				handler: function(widget, event) {
					var record = me.grid.getView().getSelectionModel().getSelection()[0];
					if (record.get('service_stage') == 'receipt' || record.get('service_stage') == 'return' || record.get('service_stage') == 'transit')										
						me.deleteRecord();
					else
						Ext.MessageBox.alert('Error', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
				}
			}),
			Ext.create('Ext.Action', {
				iconCls   : 'merge',
				text: 'Нэгтгэх...',
				handler: function(widget, event) {
					if (user_level > 0) {					
						if (me.grid.getView().getSelectionModel().getSelection().length == 2){	
							var rec1 = me.grid.getView().getSelectionModel().getSelection()[0];
							var rec2 = me.grid.getView().getSelectionModel().getSelection()[1];
							if (rec1.get('service_stage') == 'receipt' && rec2.get('service_stage') == 'receipt') {							
								new OCS.MergeRecordsWindow({
									name: me.xlsName,
									master: me.grid.getView().getSelectionModel().getSelection()[0],
									slave: me.grid.getView().getSelectionModel().getSelection()[1]
								}).show();
							} else
								Ext.MessageBox.alert('Error', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
						} else
							Ext.MessageBox.alert('Status', '2 бичлэг сонгох ёстой !', function() {});
					} else
						Ext.MessageBox.alert('Error', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
				}
			}),
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'import',
				text: 'Импорт...',
				handler: function(widget, event) {
					new OCS.UploadWindow({
						name: me.xlsName						
					}).show();
				}
			}),	
			Ext.create('Ext.Action', {
				iconCls  : 'export',
				text: 'Экспорт...',
				disabled: (user_level == '0'),
				handler: function(widget, event) {
					if (!Ext.fly('frmDummy')) {
						var frm = document.createElement('form');
						frm.id = 'frmDummy';
						frm.name = 'url-post';
						frm.className = 'x-hidden';
						document.body.appendChild(frm);
					}

					Ext.Ajax.request({
					   url: 'avia.php',
					   isUpload: true,
					   form: Ext.fly('frmDummy'),
					   params: {handle: 'file', action:'export', where: me.xlsName},					
					   success: function(response, opts) {					
						  Ext.MessageBox.alert('Status', 'Success !', function() {});
					   },
					   failure: function(response, opts) {
						  Ext.MessageBox.alert('Status', 'Error !', function() {});
					   }
					});	
				}
			}),
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'deal_assign',
				text: 'Оноох ...',
				handler: function(widget, event) {
					if (user_level > 0 ) {												
						if (me.recordSelected())						
							new OCS.ServiceMultiAssignWindow({
								selected: me.grid.getView().getSelectionModel().getSelection()[0],
								ids: me.selectedIds('service_id'),
								direction: me.xlsName
							}).show();
					} else
						Ext.MessageBox.alert('Error', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
				}
			}),
			Ext.create('Ext.Action', {
				iconCls   : 'deal_won',
				text: 'Зөвшөөрөх ...',
				handler: function(widget, event) {
					if (user_level > 0 ) {												
						if (me.recordSelected())						
							new OCS.ServiceMultiAgreeWindow({
								selected: me.grid.getView().getSelectionModel().getSelection()[0],
								ids: me.selectedIds('service_id'),
								direction: me.xlsName
							}).show();
					} else
						Ext.MessageBox.alert('Error', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
				}
			}),
			Ext.create('Ext.Action', {
				iconCls   : 'deal_print',
				text: 'Хэвлэх ...',
				handler: function(widget, event) {
					crm_id = me.grid.getView().getSelectionModel().getSelection()[0].get('crm_id');
					owner = me.grid.getView().getSelectionModel().getSelection()[0].get('owner');
					userCode = me.grid.getView().getSelectionModel().getSelection()[0].get('userCode');
					service_stage = me.grid.getView().getSelectionModel().getSelection()[0].get('service_stage');
					subject = me.grid.getView().getSelectionModel().getSelection()[0].get('subject');
					pricetag = me.grid.getView().getSelectionModel().getSelection()[0].get('pricetag');
					date = me.grid.getView().getSelectionModel().getSelection()[0].get('_date').split(' ')[0]; 

					if (service_stage == 'service') {
						if (userCode == 'amarjargal@cosmo')												
							window.open('http://'+ip+'/invzahon/?values='+owner+';'+crm_id+';'+date+';1;1;'+logged+';'+subject,'');
						else {
							if (logged.indexOf('cosmo') != -1)
								window.open('http://'+ip+'/invms/?values='+owner+';'+crm_id+';'+date+';1;1;'+logged+';'+subject,'');
							else
								window.open('http://'+ip+'/invms/?values='+userCode+';'+crm_id+';'+date+';1;1;'+logged+';'+subject,'');
						}
					}
					else
					if (service_stage == 'inret') {
						window.open('http://'+ip+'/invbs/?values='+owner+';'+crm_id+';'+date+';1;1;'+logged+';'+subject,''); 
					}
				}
			}),
			Ext.create('Ext.Action', {
				iconCls   : 'deal_undo',
				text: 'Буцаах ...',
				handler: function(widget, event) {
					if (user_level > 0 ) {												
						if (me.recordSelected())						
							new OCS.ServiceUndoWindow({
								ids: me.selectedIds('service_id'),
								direction: me.xlsName
							}).show();
					} else
						Ext.MessageBox.alert('Error', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
				}
			}),			
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'help',
				text: 'Тусламж',
				handler: function(widget, event) {
					new OCS.HelpWindow({
						id: 'crm_deal_process'
					}).show();
				}
			})
		];

		return me.actions;
	},

	createView: function() {
		var me = this;
		me.modelName = 'CRM_SERVICE';
		me.createStore();
		me.storeExtend();

		me.grid = Ext.create('OCS.GridView', {	
			id: me.tab,
			title: me.title,
			store: me.store,
			flex: 1,
			func: me.func,
			feature: true,
			actions: me.createActions(),
			columns: me.createColumns(),
			viewConfig: {
				itemclick: function(dv, record, item, index, e) {
					views['services'].action.select(record);
				}
			}
		});

		me.grid.on('itemclick', function(dv, record, item, index, e) {
				views['services'].action.select(record);				
			}
		);
				
		me.grid.start = me.today();
		me.grid.end = me.tommorow();

		me.filterData('Incoming Services');	

		return me.grid;
	},

	filterData: function(views) {
		var me = this;		
		me.title = views;
		me.grid.views = views;
		me.store.getProxy().extraParams = {handle: 'web', action: 'select', func: me.func, values: me.values, start_date: me.grid.start, end_date: me.grid.end, where: me.where, views: views};
		me.store.loadPage(1);
	},

	today: function() {
		var now = new Date();
		return Ext.Date.format(now, 'Y-m-d');
	},

	tommorow: function() {
		 var today = new Date();
		 var d = today.getDate();
		 var m = today.getMonth();
		 var y = today.getFullYear();
		 var nextDate= new Date(y, m, d+1);
		 var ndate=Ext.Date.format(nextDate, 'Y-m-d');
		 return ndate;
	}
});


Ext.define('OCS.Services', {
	extend: 'OCS.Module',
	
	reload: function(rec) {
		var me = this;
		me.services.reload();
		me.action.select(rec);
	},
	
	selectedRecord: function() {
		var me = this;
		var recs = me.services.grid.getView().getSelectionModel().getSelection();
		if (recs && recs.length > 0)
			return recs[0];
		
		return 0;
	},

	createPanel: function() {
		var me = this;
		
		me.services = new OCS.ServiceView();
		me.action = new OCS.ServiceAction();

		me.panel = Ext.create('Ext.Panel', {	
			layout: 'border',
			region: 'center',
			border: false,
			bodyPadding: 2,
			defaults: {
				collapsible: true,
				split: true,
				border: false
			},
			items: [{	
				region: 'center',
				layout: 'border',				
				title: '',
				border: false,
				collapsible: false,
				items: [
					{
						region: 'center',	
						flex: 0.6,
						layout: 'border',						
						items: [me.services.createView()]
					}, me.action.createPanel()
				]
			}]
		});
		

		return me.panel;
	}
});


Ext.define('OCS.Deals', {
	extend: 'OCS.Module',
	
	reload: function(rec) {
		var me = this;
		me.deals.reload();
		me.action.select(rec);
	},
	
	selectedRecord: function() {
		var me = this;
		var recs = me.deals.grid.getView().getSelectionModel().getSelection();
		if (recs && recs.length > 0)
			return recs[0];
		
		return 0;
	},

	createPanel: function() {
		var me = this;
		
		me.deals = new OCS.DealView();
		me.action = new OCS.DealAction();

		me.panel = Ext.create('Ext.Panel', {	
			layout: 'border',
			region: 'center',
			border: false,
			bodyPadding: 2,
			defaults: {
				collapsible: true,
				split: true,
				border: false
			},
			items: [{	
				region: 'center',
				layout: 'border',				
				title: '',
				border: false,
				collapsible: false,
				items: [
					{
						region: 'center',	
						flex: 0.6,
						layout: 'border',						
						items: [me.deals.createView()]
					}, me.action.createPanel()
				]
			}]
		});
		

		return me.panel;
	}
});

Ext.define('OCS.DealAction', {
	extend: 'OCS.Module',
	
	update: function(rec) {
		var me = this;
		me.detail.update(me.tmplMarkup[rec.get('stage')].apply(rec.data));
	},
	
	teamOn: function(ownerList) {
		var me = this;
		me.dealActivity.teamOn(ownerList);
	},

	select: function(rec) {
		var me = this;
		if (rec) {		
			me.selected = rec;
			me.detail.update(me.tmplMarkup[rec.get('stage')].apply(rec.data));
			
			me.dealContact.updateSource(rec);
			me.dealPosts.updateSource(rec);
			me.dealActivity.updateSource(rec);
			me.dealProduct.updateSource(rec);
			me.dealCompotetor.updateSource(rec);
			me.dealTeams.updateSource(rec);
			me.dealCommission.updateSource(rec);
			me.dealHistory.updateSource(rec);
			me.dealPayroll.updateSource(rec);

			me.panel.expand();
			Ext.getCmp('deal_next_stage').setText('Next Stage');
			if (rec.get('stage') == 'lead')
			{
				Ext.getCmp('deal_delete').setText('Disqualify');
				Ext.getCmp('deal_delete').setDisabled(false);
				Ext.getCmp('deal_closewon').setDisabled(true);
				Ext.getCmp('deal_closelost').setDisabled(true);
				Ext.getCmp('deal_assign').setDisabled(false);
			} else
			if (rec.get('stage') == 'opportunity')
			{
				Ext.getCmp('deal_delete').setText('Postponed');
				Ext.getCmp('deal_delete').setDisabled(false);
				Ext.getCmp('deal_assign').setDisabled(false);
				Ext.getCmp('deal_closewon').setDisabled(false);
				Ext.getCmp('deal_closelost').setDisabled(false)
			} else
			if (rec.get('stage') == 'quote')
			{
				Ext.getCmp('deal_delete').setText('Postponed');
				Ext.getCmp('deal_delete').setDisabled(false);
				Ext.getCmp('deal_assign').setDisabled(false);
				Ext.getCmp('deal_closewon').setDisabled(false);
				Ext.getCmp('deal_closelost').setDisabled(false)
			} else
			if (rec.get('stage') == 'disqualified')
			{
				Ext.getCmp('deal_delete').setText('Qualify');
				Ext.getCmp('deal_delete').setDisabled(true);
				Ext.getCmp('deal_assign').setDisabled(true);
				Ext.getCmp('deal_closewon').setDisabled(true);
				Ext.getCmp('deal_closelost').setDisabled(true);
			} else
			if (rec.get('stage') == 'close as won')
			{
				Ext.getCmp('deal_delete').setDisabled(true);
				Ext.getCmp('deal_assign').setDisabled(true);
				Ext.getCmp('deal_closewon').setDisabled(true);
				Ext.getCmp('deal_closelost').setDisabled(true);

				Ext.getCmp('deal_next_stage').setText('Detail');
			}
		} else
			me.panel.collapse();
	},

	createTmpl: function() {
		var me = this;
		me.tmplMarkup = [];

		me.tmplMarkup['lead'] = new Ext.XTemplate(
			'<table class="level"><tr><td class="active">LEAD</td><td>OPPORTUNITY</td><td>QUOTE</td><td>CLOSE</td></tr></table>',
			'<table class="deals"><tr><td width="120px">Topic:</td><td><b>{deal}</b></td></tr>',
			'<tr><td>Account:</td><td><b>{[this.renderCRMName(values.crm_name)]}</b></td></tr>',
			'<tr><td>Phone:</td><td><b>{phone}</b></td></tr>',
			'<tr><td>Description:</td><td><b>{descr}</b></td></tr>',
			'<tr><td>Expected revenue:</td><td><b>{[this.renderMoney(values.expected_revenue)]}</b></td></tr>',
			'<tr><td>Identify competitor:</td><td><b>{[this.renderIsEmpty(values.competitor_name)]}</b></td></tr>',
			'<tr><td>Current Situation:</td><td><b>{[this.renderIsEmpty(values.current_situation)]}</b></td></tr>',
			'<tr><td>Customer Need:</td><td><b>{[this.renderIsEmpty(values.customer_need)]}</b></td></tr>',
			'<tr><td>Proposed solution:</td><td><b>{[this.renderIsEmpty(values.proposed_solution)]}</b></td></tr>',
			'<tr><td>Cross selling:</td><td><b>{[this.renderIsEmpty(values.userCode)]}</b></td></tr>',
			'</table>',
			{
				renderCRMName: function(v) {
					if (v.indexOf(',') != -1)
					{	
						d = v.split(',');
						return d[0];
					}

					return v;
				},
				
				renderMoney: function(v) {
					return Ext.util.Format.number(v, '00,00,000.00')+'₮';
				},

				renderIsEmpty: function(v) {
					if (!v)
						return '<i>not complete</i>';

					return v;
				}
			}
		);

		me.tmplMarkup['opportunity'] = new Ext.XTemplate(
			'<table class="level"><tr><td>LEAD</td><td class="active">OPPORTUNITY</td><td>QUOTE</td><td>CLOSE</td></tr></table>',
			'<table class="deals"><tr><td width="120px">Topic:</td><td><b>{deal}</b></td></tr>',
			'<tr><td>Account:</td><td><b>{[this.renderCRMName(values.crm_name)]}</b></td></tr>',
			'<tr><td>Probablity %:</td><td><b>{probablity} %</b></td></tr>',
			'<tr><td>Expected revenue:</td><td><b>{[this.renderMoney(values.expected_revenue)]}</b></td></tr>',
			'<tr><td>Identify competitor:</td><td><b>{[this.renderIsEmpty(values.competitor_name)]}</b></td></tr>',
			'<tr><td>Current Situation:</td><td><b>{[this.renderIsEmpty(values.current_situation)]}</b></td></tr>',
			'<tr><td>Customer Need:</td><td><b>{[this.renderIsEmpty(values.customer_need)]}</b></td></tr>',
			'<tr><td>Proposed solution:</td><td><b>{[this.renderIsEmpty(values.proposed_solution)]}</b></td></tr>',
			'<tr><td>Cross selling:</td><td><b>{[this.renderIsEmpty(values.userCode)]}</b></td></tr>',
			'</table>',
			{
				renderCRMName: function(v) {
					if (v.indexOf(',') != -1)
					{	
						d = v.split(',');
						return d[0];
					}

					return v;
				},
				
				renderMoney: function(v) {
					return Ext.util.Format.number(v, '00,00,000.00')+'₮';
				},

				renderIsEmpty: function(v) {
					if (!v)
						return '<i>not complete</i>';

					return v;
				}
			}
		);

		me.tmplMarkup['quote'] = new Ext.XTemplate(
			'<table class="level"><tr><td>LEAD</td><td>OPPORTUNITY</td><td class="active">QUOTE</td><td>CLOSE</td></tr></table>',
			'<table class="deals"><tr><td width="120px">Topic:</td><td><b>{deal}</b></td></tr>',
			'<tr><td>Account:</td><td><b>{[this.renderCRMName(values.crm_name)]}</b></td></tr>',
			'<tr><td>Probablity %:</td><td><b>{probablity} %</b></td></tr>',
			'<tr><td>Expected revenue:</td><td><b>{[this.renderMoney(values.expected_revenue)]}</b></td></tr>',
			'<tr><td>Identify competitor:</td><td><b>{[this.renderIsEmpty(values.competitor_name)]}</b></td></tr>',
			'<tr><td>Current Situation:</td><td><b>{[this.renderIsEmpty(values.current_situation)]}</b></td></tr>',
			'<tr><td>Customer Need:</td><td><b>{[this.renderIsEmpty(values.customer_need)]}</b></td></tr>',
			'<tr><td>Proposed solution:</td><td><b>{[this.renderIsEmpty(values.proposed_solution)]}</b></td></tr>',
			'<tr><td>Cross selling:</td><td><b>{[this.renderIsEmpty(values.userCode)]}</b></td></tr>',
			'</table>',
			{
				renderCRMName: function(v) {
					if (v.indexOf(',') != -1)
					{	
						d = v.split(',');
						return d[0];
					}

					return v;
				},
				
				renderMoney: function(v) {
					return Ext.util.Format.number(v, '00,00,000.00')+'₮';
				},

				renderIsEmpty: function(v) {
					if (!v)
						return '<i>not complete</i>';

					return v;
				}
			}
		);

		me.tmplMarkup['close as won'] = new Ext.XTemplate(
			'<table class="level"><tr><td>LEAD</td><td>OPPORTUNITY</td><td>QUOTE</td><td class="active">CLOSE</td></tr></table>',
			'<table class="deals"><tr><td width="120px">Topic:</td><td><b>{deal}</b></td></tr>',
			'<tr><td>Account:</td><td><b>{[this.renderCRMName(values.crm_name)]}</b></td></tr>',
			'<tr><td>Probablity %:</td><td><b>{probablity} %</b></td></tr>',
			'<tr><td>Expected revenue:</td><td><b>{[this.renderMoney(values.expected_revenue)]}</b></td></tr>',
			'<tr><td>Current Situation:</td><td><b>{[this.renderIsEmpty(values.current_situation)]}</b></td></tr>',
			'<tr><td>Customer Need:</td><td><b>{[this.renderIsEmpty(values.customer_need)]}</b></td></tr>',
			'<tr><td>Proposed solution:</td><td><b>{[this.renderIsEmpty(values.proposed_solution)]}</b></td></tr>',
			'<tr><td>Cross selling:</td><td><b>{[this.renderIsEmpty(values.userCode)]}</b></td></tr>',
			'</table>',
			{
				renderCRMName: function(v) {
					if (v.indexOf(',') != -1)
					{	
						d = v.split(',');
						return d[0];
					}

					return v;
				},
				
				renderMoney: function(v) {
					return Ext.util.Format.number(v, '00,00,000.00')+'₮';
				},

				renderIsEmpty: function(v) {
					if (!v)
						return '<i>not complete</i>';

					return v;
				}
			}
		);

		me.tmplMarkup['disqualified'] = new Ext.XTemplate(
			'<table class="disqualifed"><tr><td>DISQUALIFED</td></tr></table>',
			'<table class="deals"><tr><td width="120px">Topic:</td><td><b>{deal}</b></td></tr>',
			'<tr><td>Account:</td><td><b>{[this.renderCRMName(values.crm_name)]}</b></td></tr>',
			'<tr><td>Disqualified date:</td><td><b>{closing_date}</b></td></tr>',
			'<tr><td>Description:</td><td><b>{descr}</b></td></tr></table>',
			'<tr><td>Cross selling:</td><td><b>{[this.renderIsEmpty(values.userCode)]}</b></td></tr>',
			{
				renderCRMName: function(v) {
					if (v.indexOf(',') != -1)
					{	
						d = v.split(',');
						return d[0];
					}

					return v;
				}
			}
		);

		me.tmplMarkup['close as lost'] = new Ext.XTemplate(
			'<table class="disqualifed"><tr><td>DISQUALIFED</td></tr></table>',
			'<table class="deals"><tr><td width="120px">Deal name:</td><td><b>{deal}</b></td></tr>',
			'<tr><td>Account:</td><td><b>{crm_name}</b></td></tr>',
			'<tr><td>Disqualified date:</td><td><b>{closing_date}</b></td></tr>',
			'<tr><td>Description:</td><td><b>{descr}</b></td></tr></table>',
			'<tr><td>Cross selling:</td><td><b>{[this.renderIsEmpty(values.userCode)]}</b></td></tr>',
			{
				renderCRMName: function(v) {
					if (v.indexOf(',') != -1)
					{	
						d = v.split(',');
						return d[0];
					}

					return v;
				}
			}
		);
	},	

	createPanel: function() {
		var me = this;
		me.createTmpl();
				
		me.dealPosts = new OCS.DealPostGrid();
		me.dealContact = new OCS.DealContactGrid();
		me.dealActivity = new OCS.DealActivityGrid();
		me.dealProduct = new OCS.DealProductGrid();
		me.dealCompotetor = new OCS.DealCompetitorGrid();
		me.dealCommission = new OCS.DealCommissionGrid();
		me.dealTeams = new OCS.DealSalesTeamGrid();
		me.dealHistory = new OCS.DealHistoryGrid();
		me.dealPayroll = new OCS.DealPayrollGrid();

		me.tabs = Ext.widget('tabpanel', {
			activeTab: 0,
			flex: 1,			
			region: 'center',
			tabPosition: 'top',	
			items: [
				me.dealPosts.createPanel(),			
				me.dealContact.createPanel(),			
				me.dealActivity.createPanel(),
				me.dealHistory.createPanel(),
				me.dealProduct.createPanel(),
				me.dealPayroll.createPanel(),
				me.dealCompotetor.createPanel(),
				me.dealCommission.createPanel(),
				me.dealTeams.createPanel()
			]
		});
		
		me.detail = Ext.create('Ext.Panel', {
				border: false,
				region: 'north',
				height: 280,
				border: true,
				autoScroll: true,
				split: true,
				bodyPadding: 5,
				dockedItems:[{
					xtype: 'toolbar',
					dock: 'bottom',
					items: [{
						iconCls: 'deal_qualify',
						text: 'Disqualify',
						id: 'deal_delete',
						scope: this,
						handler: function() {
							if (me.selected.get('owner') == logged) {			
								new OCS.DealDescrWindow({
									selected: me.selected,
									title: Ext.getCmp('deal_delete').getText()+' detail'
								}).show();
							}
							else
								Ext.MessageBox.alert('Error', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
						}
					},'-', {
						iconCls: 'deal_next_stage',
						text: 'Next stage...',
						id: 'deal_next_stage',
						scope: this,
						handler: function() {
							if (me.selected.get('owner') == logged) {							
								new OCS.StageWindow({
									selected: me.selected,
									openActivity: me.dealActivity.openActivityCount(),
									productCount: me.dealProduct.productCount()
								}).show();
							} else 
								Ext.MessageBox.alert('Error', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
						}
					}, {
						iconCls: 'deal_assign',
						text: 'Assign...',
						id: 'deal_assign',
						scope: this,
						handler: function() {
							if (me.selected.get('owner') == logged || user_level > 0)
								new OCS.AssignWindow({
									selected: me.selected
								}).show();
							else
								Ext.MessageBox.alert('Error', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
						}
					},'-',
					{
						iconCls: 'deal_won',
						text: 'Close as won',
						id: 'deal_closewon',
						scope: this,
						handler: function() {
							if (me.dealActivity.openActivityCount() > 0) {
								Ext.MessageBox.alert('Error', 'This deal cannot be closed because there are open activities associated with it !', function() {});
								return;
							}
							if (me.dealProduct.productCount() == 0) {
								Ext.MessageBox.alert('Error', 'This deal cannot be closed because there are no products !', function() {});
								return;
							}

							if (me.selected.get('owner') == logged) {				
								new OCS.DealDescrWindow({
									selected: me.selected,
									stage: 'close as won',
									title: 'Close as won'
								}).show();
							} else 
								Ext.MessageBox.alert('Error', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
						}
					},
					{
						iconCls: 'deal_lost',
						text: 'Close as lost',
						id: 'deal_closelost',
						scope: this,
						handler: function() {
							if (me.selected.get('owner') == logged) {		
								new OCS.DealDescrWindow({
									selected: me.selected,
									stage: 'close as lost',
									title: 'Close as lost'
								}).show();
							} else 
								Ext.MessageBox.alert('Error', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
						}
					}]
				}],
				bodyStyle: "background: #ffffff;",
				html: 'Please select a deal to see additional details.'
		});

		me.panel = Ext.create('Ext.Panel', {	
			layout: 'border',
			border: true,
			flex: 0.45,
			region: 'east',
			title: 'Stage',
			collapsible: true,
			collapsed: true,
			split: true,
			bodyPadding: 4,
			items: [me.detail, me.tabs]
		});		

		return me.panel;
	}
});

Ext.define('OCS.ServiceAction', {
	extend: 'OCS.DealAction',

	select: function(rec) {
		var me = this;
		if (rec) {		
			me.selected = rec;	
			me.panel.setTitle(me.selected.get('crm_name').split(',')[0]+' ('+me.selected.get('userCode')+')');

			me.serviceContact.updateSource(rec);
			me.servicePosts.updateSource(rec);
			me.serviceActivity.updateSource(rec);
			me.serviceProduct.updateSource(rec);
			me.serviceCommission.updateSource(rec);
			me.servicePayroll.updateSource(rec);
			
			Ext.getCmp('service_closewon').setText('Зөвшөөрөх');
			if (me.selected.get('service_stage') == 'closed' || me.selected.get('service_stage') == 'instock' || me.selected.get('service_stage') == 'inret')
			{
				Ext.getCmp('service_closewon').setDisabled(true);
				Ext.getCmp('service_assign').setDisabled(true);
			} else 
			if (me.selected.get('service_stage') == 'receipt')
			{
				Ext.getCmp('service_closewon').setDisabled(false);
			} else
			if (me.selected.get('service_stage') == 'service')
			{
				Ext.getCmp('service_closewon').setDisabled(true);
			} else
			if (me.selected.get('service_stage') == 'transit')
			{
				Ext.getCmp('service_closewon').setText('Хүлээн авах');
			} else
			if (me.selected.get('service_stage') == 'return')
			{
				Ext.getCmp('service_closewon').setText('Хүлээн авах');
			}

			me.panel.expand();			
		} else
			me.panel.collapse();
	},

	createPanel: function() {
		var me = this;
		me.createTmpl();
				
		me.servicePosts = new OCS.ServicePostGrid();
		me.serviceContact = new OCS.ServiceContactGrid();
		me.serviceActivity = new OCS.ServiceActivityGrid();
		me.serviceProduct = new OCS.ServiceProductGrid();
		me.serviceCommission = new OCS.ServiceCommissionGrid();
		me.servicePayroll = new OCS.ServicePayrollGrid();

		me.tabs = Ext.widget('tabpanel', {
			activeTab: 3,
			flex: 1,			
			region: 'center',
			tabPosition: 'top',	
			items: [
				me.servicePosts.createPanel(),
				me.serviceContact.createPanel(),			
				me.serviceActivity.createPanel(),
				me.serviceProduct.createPanel(),
				me.servicePayroll.createPanel(),
				me.serviceCommission.createPanel()
			]			
		});				

		me.panel = Ext.create('Ext.Panel', {	
			layout: 'border',
			border: true,
			flex: 0.45,
			region: 'east',
			title: 'Сонгосон захиалга',
			collapsible: true,
			collapsed: true,
			split: true,
			bodyPadding: 4,
			items: [me.tabs],
			dockedItems:[{
				xtype: 'toolbar',
				dock: 'top',
				items: [{
					iconCls: 'deal_assign',
					text: 'Оноох...',
					id: 'service_assign',
					scope: this,
					handler: function() {
						if (me.selected.get('owner') == logged || user_level > 0)
							new OCS.ServiceAssignWindow({
								selected: me.selected
							}).show();
						else
							Ext.MessageBox.alert('Error', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
					}
				},'-',
				{
					iconCls: 'deal_won',
					text: 'Зөвшөөрөх',
					id: 'service_closewon',
					disabled: (me.selected && (me.selected.get('service_stage') == 'closed' || me.selected.get('service_stage') == 'service')),
					scope: this,
					handler: function() {
						if (me.serviceActivity.openActivityCount() > 0) {
							Ext.MessageBox.alert('Error', 'This deal cannot be closed because there are open activities associated with it !', function() {});
							return;
						}

						if (user_level > 0) {							
							new OCS.ServiceDescrWindow({
								selected: me.selected,								
								title: 'Зөвшөөрөх'
							}).show();
						} else 
							Ext.MessageBox.alert('Error', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
					}
				}]
			}]
		});		

		return me.panel;
	}
});


Ext.define('OCS.ResellerAction', {
	extend: 'OCS.DealAction',

	select: function(rec) {
		var me = this;
		if (rec) {		
			me.selected = rec;
			
			me.resellerContact.updateSource(rec);
			me.resellerPosts.updateSource(rec);
			me.resellerActivity.updateSource(rec);
			me.resellerProduct.updateSource(rec);
			me.resellerCommission.updateSource(rec);

			me.panel.expand();			
		} else
			me.panel.collapse();
	},

	createPanel: function() {
		var me = this;
		me.createTmpl();
				
		me.resellerPosts = new OCS.DealPostGrid();
		me.resellerContact = new OCS.DealContactGrid();
		me.resellerActivity = new OCS.DealActivityGrid();
		me.resellerProduct = new OCS.DealProductGrid();
		me.resellerCommission = new OCS.DealCommissionGrid();

		me.tabs = Ext.widget('tabpanel', {
			activeTab: 0,
			flex: 1,			
			region: 'center',
			tabPosition: 'top',	
			items: [
				me.resellerPosts.createPanel(),
				me.resellerContact.createPanel(),			
				me.resellerActivity.createPanel(),
				me.resellerProduct.createPanel(),
				me.resellerCommission.createPanel()
			]			
		});				

		me.panel = Ext.create('Ext.Panel', {	
			layout: 'border',
			border: true,
			flex: 0.45,
			region: 'east',
			title: 'Selected connection',
			collapsible: true,
			collapsed: true,
			split: true,
			bodyPadding: 4,
			items: [me.tabs],
			dockedItems:[{
				xtype: 'toolbar',
				dock: 'top',
				items: [{
					iconCls: 'deal_assign',
					text: 'Assign...',
					id: 'deal_assign',
					scope: this,
					handler: function() {
						if (me.selected.get('owner') == logged || user_level > 0)
							new OCS.AssignWindow({
								selected: me.selected
							}).show();
						else
							Ext.MessageBox.alert('Error', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
					}
				},'-',
				{
					iconCls: 'deal_won',
					text: 'Close',
					id: 'reseller_closewon',
					scope: this,
					handler: function() {
						if (me.resellerActivity.openActivityCount() > 0) {
							Ext.MessageBox.alert('Error', 'This deal cannot be closed because there are open activities associated with it !', function() {});
							return;
						}

						if (me.selected.get('owner') == logged) {				
							new OCS.DealDescrWindow({
								selected: me.selected,
								stage: 'close as won',
								title: 'Close as won'
							}).show();
						} else 
							Ext.MessageBox.alert('Error', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
					}
				}]
			}]
		});		

		return me.panel;
	}
});

Ext.define('OCS.ResellerView', {
	extend: 'OCS.DealView',
	func: 'crm_deal_list',	
	sortField: '_date',
	table: 'crm_deals',
	tab: 'my_deal_list',
	title: 'All Connections',
	sub: 'my_open_leads',
	primary: 'deal_id',
	xlsName: 'Reseller',

	createActions: function() {
		var me = this;
		me.actions = [
			Ext.create('Ext.Action', {
				iconCls: 'list',
				text: 'Views',
				menu: {
					xtype: 'menu',
					items: [
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Open Connections',
							handler: function(widget, event) {
								me.filterData('Open Connections');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Closed Connections',
							handler: function(widget, event) {
								me.filterData('Closed Connections');
							}
						}),						
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'All Connections',
							handler: function(widget, event) {
								me.filterData('All Connections');
							}
						}),
						'-',
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'My Connections',
							handler: function(widget, event) {
								me.filterData('My Connections');
							}
						})
					]
				}		
			}),
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'add',
				text: 'Create...',
				handler: function(widget, event) {
					new OCS.ResellerCreateWindow({
						
					}).show();
				}
			}),
			Ext.create('Ext.Action', {
				iconCls   : 'edit',
				text: 'Засах...',
				handler: function(widget, event) {
					if (me.grid.getView().getSelectionModel().getSelection().length > 0) {
						new OCS.NewDealWindow({
							selected: me.grid.getView().getSelectionModel().getSelection()[0]
						}).createWindow();
					} else 
						Ext.MessageBox.alert('Status', 'Сонгогдсон мөр байхгүй байна !', function() {});
				}
			}),			
			Ext.create('Ext.Action', {
				iconCls   : 'delete',
				text: 'Устгах',
				handler: function(widget, event) {
					me.deleteRecord();
				}
			}),
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'import',
				text: 'Импорт...',
				handler: function(widget, event) {
					new OCS.UploadWindow({
						name: me.xlsName						
					}).show();
				}
			}),	
			Ext.create('Ext.Action', {
				iconCls  : 'export',
				text: 'Экспорт...',
				disabled: (user_level == '0'),
				handler: function(widget, event) {
					if (!Ext.fly('frmDummy')) {
						var frm = document.createElement('form');
						frm.id = 'frmDummy';
						frm.name = 'url-post';
						frm.className = 'x-hidden';
						document.body.appendChild(frm);
					}

					Ext.Ajax.request({
					   url: 'avia.php',
					   isUpload: true,
					   form: Ext.fly('frmDummy'),
					   params: {handle: 'file', action:'export', where: me.xlsName},					
					   success: function(response, opts) {					
						  Ext.MessageBox.alert('Status', 'Success !', function() {});
					   },
					   failure: function(response, opts) {
						  Ext.MessageBox.alert('Status', 'Error !', function() {});
					   }
					});	
				}
			}),
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'deal_assign',
				text: 'Assign ...',
				handler: function(widget, event) {
					if (user_level > 0) {												
						if (me.recordSelected())						
							new OCS.DealAssignWindow({
								selected: me.grid.getView().getSelectionModel().getSelection()[0],
								ids: me.selectedIds('deal_id'),
								direction: me.xlsName
							}).show();
					} else
						Ext.MessageBox.alert('Error', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
				}
			}),
			Ext.create('Ext.Action', {
				iconCls   : 'deal_undo',
				text: 'Undo ...',
				handler: function(widget, event) {
					if (user_level > 0 ) {												
						if (me.recordSelected())						
							new OCS.ResellerUndoWindow({
								ids: me.selectedIds('deal_id'),
								direction: me.xlsName
							}).show();
					} else
						Ext.MessageBox.alert('Error', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
				}
			}),			
			Ext.create('Ext.Action', {
				iconCls   : 'deal_move',
				text: 'Move to ...',
				handler: function(widget, event) {
					if (user_level > 0 ) {												
						if (me.recordSelected())						
							new OCS.DealMoveWindow({
								ids: me.selectedIds('deal_id'),
								direction: me.xlsName								
							}).show();
					} else
						Ext.MessageBox.alert('Error', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
				}
			})
			,'-',
			Ext.create('Ext.Action', {
				iconCls   : 'help',
				text: 'Тусламж',
				handler: function(widget, event) {
					new OCS.HelpWindow({
						id: 'crm_reseller_process'
					}).show();
				}
			})
		];

		return me.actions;
	},

	createView: function() {
		var me = this;
		me.modelName = 'CRM_RESELLER';
		me.createStore();

		me.grid = Ext.create('OCS.GridView', {	
			id: me.tab,
			title: me.title,
			store: me.store,
			flex: 1,
			func: me.func,
			feature: true,
			actions: me.createActions(),
			columns: me.createColumns(),
			viewConfig: {
				itemclick: function(dv, record, item, index, e) {
					views['reseller'].action.select(record);
				}
			}
		});

		me.grid.on('itemclick', function(dv, record, item, index, e) {
				views['reseller'].action.select(record);				
			}
		);

		me.filterData('Open Connections');
		return me.grid;
	}
});

Ext.define('OCS.Reseller', {
	extend: 'OCS.Module',
	
	reload: function(rec) {
		var me = this;
		me.reseller.reload();
		me.action.select(rec);
	},

	createPanel: function() {
		var me = this;
		
		me.reseller = new OCS.ResellerView();
		me.action = new OCS.ResellerAction();

		me.panel = Ext.create('Ext.Panel', {	
			layout: 'border',
			region: 'center',
			border: false,
			bodyPadding: 2,
			defaults: {
				collapsible: true,
				split: true,
				border: false
			},
			items: [{	
				region: 'center',
				layout: 'border',				
				title: '',
				border: false,
				collapsible: false,
				items: [
					{
						region: 'center',	
						flex: 0.6,
						layout: 'border',						
						items: [me.reseller.createView()]
					}, me.action.createPanel()
				]
			}]
		});
		

		return me.panel;
	}
});


Ext.define('OCS.Cases', {
	extend: 'OCS.Module',
		
	selectedRecord: function() {
		var me = this;
		var recs = me.cases.grid.getView().getSelectionModel().getSelection();
		if (recs && recs.length > 0)
			return recs[0];
		
		return 0;
	},

	reload: function() {
		var me = this;
		me.cases.reload();
	},

	reload: function(rec) {
		var me = this;
		me.cases.reload();
		me.action.select(rec);
	},

	createPanel: function() {
		var me = this;
		
		me.cases = new OCS.CaseView();
		me.action = new OCS.CaseAction();

		me.panel = Ext.create('Ext.Panel', {	
			layout: 'border',
			region: 'center',
			border: false,
			bodyPadding: 2,
			defaults: {
				collapsible: true,
				split: true,
				border: false
			},
			items: [{	
				region: 'center',
				layout: 'border',				
				title: '',
				border: false,
				collapsible: false,
				items: [
					{
						region: 'center',	
						flex: 0.5,
						layout: 'border',						
						items: [me.cases.createView()]
					}, me.action.createPanel()
				]
			}]
		});
		

		return me.panel;
	}
});

Ext.define('OCS.CaseActivityGrid', {
	extend: 'OCS.ActivityGrid',
	func: 'crm_customer_activity_list',
	sortField: '_date',
	tab : 'case_activity_property',
	dateField: '_date',
	title: 'Activities',
	values : 'crm_id,case_id',
	icon: 'task',
	modelName: 'CRM_CALENDAR',
	collapsed : false,		
	
	updateSource: function(rec) {
		var me = this;
		me.selected = rec;
		me.action = (rec.get('owner') == logged || rec.get('userCode') == logged);
		me.where = rec.get('crm_id')+','+rec.get('case_id');
		me.values = 'crm_id,case_id';
		me.loadStore();
	}	
});


Ext.define('OCS.CaseView', {
	extend: 'OCS.GridWithFormPanel',
	func: 'crm_complain_list',	
	sortField: '_date',
	table: 'crm_complain',
	tab: 'my_case_list',
	title: 'All Cases',
	sub: 'my_open_cases',
	primary: 'case_id',
	

	filterData: function(views) {
		var me = this;		
		me.title = views;
		me.views = views;

		me.store.getProxy().extraParams = {handle: 'web', action: 'select', func: me.func, values: me.values, where: me.where, views: views};
		me.store.loadPage(1);
	},

	createActions: function() {
		var me = this;
		me.actions = [			
			Ext.create('Ext.Action', {
				iconCls: 'list',
				text: 'Views',
				menu: {
					xtype: 'menu',
					items: [
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Open Cases',
							handler: function(widget, event) {
								me.filterData('Open Cases');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Solved Cases',
							handler: function(widget, event) {
								me.filterData('Solved Cases');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'All Cases',
							handler: function(widget, event) {
								me.filterData('All Cases');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Recent Opened Cases',
							handler: function(widget, event) {
								me.filterData('Recent Opened Cases');
							}
						}),
						'-',											
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'My Cases',
							handler: function(widget, event) {
								me.filterData('My Cases');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'My Linked Cases',
							handler: function(widget, event) {
								me.filterData('My Linked Cases');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'My Resolved Cases',
							handler: function(widget, event) {
								me.filterData('My Resolved Cases');
							}
						})	
					]
				}		
			}),
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'add',
				text: 'New...',
				handler: function(widget, event) {
					new OCS.NewCaseWindow({						
					}).show();			
				}
			}),	
			Ext.create('Ext.Action', {
				iconCls   : 'edit',
				text: 'Засах...',
				handler: function(widget, event) {
					if (me.grid.getView().getSelectionModel().getSelection().length > 0) {
						new OCS.ComplainWindow({
							selected: me.grid.getView().getSelectionModel().getSelection()[0]
						}).createWindow();
					} else 
						Ext.MessageBox.alert('Status', 'Сонгогдсон мөр байхгүй байна !', function() {});					
				}
			}),			
			Ext.create('Ext.Action', {
				iconCls   : 'delete',
				text: 'Устгах',
				handler: function(widget, event) {
					var records = me.grid.getView().getSelectionModel().getSelection();
					if (records.length > 0) {
						var rec = records[0];
						if (rec.get('case_stage') == 'resolve')
							Ext.MessageBox.alert('Error', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
						else
							me.deleteRecord();
					}
				}
			}),
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'help',
				text: 'Тусламж',
				handler: function(widget, event) {
					new OCS.HelpWindow({
						id: 'crm_case_process'
					}).show();
				}
			})
		];

		return me.actions;
	},

	createView: function() {
		var me = this;
		me.modelName = 'CRM_COMPLAIN';
		me.createStore();

		me.grid = Ext.create('OCS.GridView', {	
			id: me.tab,
			title: me.title,
			store: me.store,
			flex: 1,
			func: me.func,
			feature: true,
			actions: me.createActions(),
			columns: me.createColumns(),			
			viewConfig: {
				itemclick: function(dv, record, item, index, e) {
					views['cases'].action.select(record);
				}
			}
		});

		me.grid.on('itemclick', function(dv, record, item, index, e) {
				views['cases'].action.select(record);				
			}
		);

		me.filterData('Open Cases');
		return me.grid;
	},
		
	reload: function() {
		var me = this;
		me.store.reload();
		views['cases'].action.panel.collapse();			
	}
});


Ext.define('OCS.CaseAction', {
	extend: 'OCS.Module',

	select: function(rec) {
		var me = this;
		if (rec) {		
			me.selected = rec;
			me.detail.update(me.tmplMarkup[rec.get('case_stage')].apply(rec.data));
			
			me.casePosts.updateSource(rec);
			me.caseActivity.updateSource(rec);
			me.caseProduct.updateSource(rec);
			me.caseHistory.updateSource(rec);

			me.panel.expand();
			Ext.getCmp('case_next_stage').setText('Next Stage');

			Ext.getCmp('case_next_stage').setDisabled(false);
			Ext.getCmp('case_resolve').setDisabled(false);
			Ext.getCmp('case_cancel').setDisabled(false);
			Ext.getCmp('case_assign').setDisabled(false);			

			if (rec.get('case_stage') == 'resolve') {
				Ext.getCmp('case_next_stage').setDisabled(true);
				Ext.getCmp('case_resolve').setDisabled(true);
				Ext.getCmp('case_cancel').setDisabled(true);
				Ext.getCmp('case_assign').setDisabled(true);			
			}

			if (rec.get('complain_status') == 'inactive') {
				Ext.getCmp('case_next_stage').setText('Reactive case');		
				Ext.getCmp('case_resolve').setDisabled(true);
				Ext.getCmp('case_cancel').setDisabled(true);
				Ext.getCmp('case_assign').setDisabled(true);			
			}
		} else
			me.panel.collapse();
	},

	createTmpl: function() {
		var me = this;
		me.tmplMarkup = [];

		me.tmplMarkup['identify'] = new Ext.XTemplate(
			'<table class="level"><tr><td class="active">IDENTIFY</td><td>RESEARCH</td><td>RESOLVE</td></tr></table>',
			'<table class="deals"><tr><td width="120px">Case Title:</td><td><b>{complain_reason}</b></td></tr>',
			'<tr><td>Account:</td><td><b>{[this.renderCRMName(values.crm_name)]}</b></td></tr>',
			'<tr><td>Phone:</td><td><b>{phone}</b></td></tr>',
			'<tr><td>Owner:</td><td><b>{owner}</b></td></tr>',
			'<tr><td>Description:</td><td><b>{descr}</b></td></tr></table>',
			{
				renderCRMName: function(v) {
					if (v.indexOf(',') != -1)
					{	
						d = v.split(',');
						return d[0];
					}

					return v;
				}
			}
		);

		me.tmplMarkup['research'] = new Ext.XTemplate(
			'<table class="level"><tr><td>IDENTIFY</td><td class="active">RESEARCH</td><td>RESOLVE</td></tr></table>',
			'<table class="deals"><tr><td width="120px">Case Title:</td><td><b>{complain_reason}</b></td></tr>',
			'<tr><td>Account:</td><td><b>{[this.renderCRMName(values.crm_name)]}</b></td></tr>',
			'<tr><td>Resolution type:</td><td><b>{resolution_type}</b></td></tr>',
			'<tr><td>Resolution:</td><td><b>{resolution}</b></td></tr>',
			'<tr><td>Owner:</td><td><b>{owner}</b></td></tr>',
			'<tr><td>Close date:</td><td><b>{closing_date}</b></td></tr>',
			'</table>',
			{
				renderCRMName: function(v) {
					if (v.indexOf(',') != -1)
					{	
						d = v.split(',');
						return d[0];
					}

					return v;
				}
			}
		);

		me.tmplMarkup['resolve'] = new Ext.XTemplate(
			'<table class="level"><tr><td>IDENTIFY</td><td>RESEARCH</td><td class="active">RESOLVE</td></tr></table>',
			'<table class="deals"><tr><td width="120px">Case Title:</td><td><b>{complain_reason}</b></td></tr>',
			'<tr><td>Account:</td><td><b>{[this.renderCRMName(values.crm_name)]}</b></td></tr>',
			'<tr><td>Resolution type:</td><td><b>{resolution_type}</b></td></tr>',
			'<tr><td>Resolution:</td><td><b>{resolution}</b></td></tr>',
			'<tr><td>Owner:</td><td><b>{owner}</b></td></tr>',
			'<tr><td>Close date:</td><td><b>{closing_date}</b></td></tr>',
			'</table>',
			{
				renderCRMName: function(v) {
					if (v.indexOf(',') != -1)
					{	
						d = v.split(',');
						return d[0];
					}

					return v;
				}
			}
		);
	},	

	createPanel: function() {
		var me = this;
		me.createTmpl();

		me.casePosts = new OCS.CasePostGrid();
		me.caseActivity = new OCS.CaseActivityGrid();
		me.caseProduct = new OCS.CaseProductGrid();
		me.caseHistory = new OCS.CaseHistoryGrid();

		me.tabs = Ext.widget('tabpanel', {
			activeTab: 0,
			flex: 1,			
			region: 'center',
			tabPosition: 'top',	
			items: [			
				me.casePosts.createPanel(),
				me.caseActivity.createPanel(),
				me.caseProduct.createPanel(),
				me.caseHistory.createPanel()
			]
		});
		
		me.detail = Ext.create('Ext.Panel', {
				border: false,
				region: 'north',
				height: 250,
				border: true,
				autoScroll: true,
				split: true,
				bodyPadding: 5,
				dockedItems:[{
					xtype: 'toolbar',
					dock: 'bottom',
					items: [{
						iconCls: 'deal_next_stage',
						text: 'Next stage...',
						id: 'case_next_stage',
						scope: this,
						handler: function() {
							if (me.selected.get('owner') == logged) {
								if (me.selected.get('complain_status') == 'inactive') {
									Ext.Msg.confirm('Warning ','Reactive case ?',function(btn){
										if(btn === 'yes'){
											Ext.Ajax.request({
											   url: 'avia.php',
											   params: {handle: 'web', table: 'crm_complain', action: 'update', values: "complain_status='open'", where: "case_id="+me.selected.get('case_id')},
											   success: function(response, opts) {
												  views['cases'].reload(me.selected);
											   },
											   failure: function(response, opts) {										   
												  Ext.MessageBox.alert('Status', 'Error !', function() {});
											   }
											});		
										}else{
											
										}	
									});	
								} else {
									new OCS.CaseStageWindow({
										selected: me.selected,
										openActivity : me.caseActivity.openActivityCount()
									}).show();
								}
							} else
								Ext.MessageBox.alert('Error', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
						}
					}, {
						iconCls: 'deal_assign',
						text: 'Assign...',
						id: 'case_assign',
						scope: this,
						handler: function() {
							if (me.selected.get('owner') == logged)
								new OCS.CaseAssignWindow({
									selected: me.selected
								}).show();
							else
								Ext.MessageBox.alert('Error', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
						}
					},'-',
					{
						iconCls: 'deal_won',
						text: 'Resolve case',
						id: 'case_resolve',
						scope: this,//99110436
						handler: function() {
							if (me.caseActivity.openActivityCount() > 0) {
								Ext.MessageBox.alert('Error', 'This case cannot be closed because there are open activities associated with it !', function() {});
								return;
							}

							if (me.selected.get('owner') == logged)
								new OCS.CaseResolveWindow({
									selected: me.selected
								}).show();
							else
								Ext.MessageBox.alert('Error', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
						}
					},
					{
						iconCls: 'deal_lost',
						text: 'Cancel case',
						id: 'case_cancel',
						scope: this,
						handler: function() {
							if (me.selected.get('owner') == logged) {
								Ext.Msg.confirm('Warning ','Cancel case ?',function(btn){
									if(btn === 'yes'){
										Ext.Ajax.request({
										   url: 'avia.php',
										   params: {handle: 'web', table: 'crm_complain', action: 'update', values: "complain_status='inactive'", where: "case_id="+me.selected.get('case_id')},
										   success: function(response, opts) {
											  views['cases'].reload(me.selected);
										   },
										   failure: function(response, opts) {										   
											  Ext.MessageBox.alert('Status', 'Error !', function() {});
										   }
										});		
									}else{
										
									}	
								});		
							}
							else
								Ext.MessageBox.alert('Error', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
						}
					}]
				}],
				bodyStyle: "background: #ffffff;",
				html: 'Please select a deal to see additional details.'
		});

		me.panel = Ext.create('Ext.Panel', {	
			layout: 'border',
			border: true,
			flex: 0.35,
			region: 'east',
			title: 'Stage',
			collapsible: true,
			collapsed: true,
			split: true,
			bodyPadding: 4,
			items: [me.detail, me.tabs]
		});		

		return me.panel;
	}
});

Ext.define('OCS.SettingsPanel', {
	extend: 'OCS.Module',

	createPanel: function() {
		var me = this;

		me.userList = new Ext.create('OCS.UserGridWithFormPanel', {
							modelName:'CRM_USERS',
							func:'crm_users_list',
							table: 'crm_users',
							title: 'Users',
							insert: (user_level==0),
							remove: (user_level==0),
							buttons: true,
							defaultRec: {
								data: {
									id: '0',
									user_level: 0,
									company: company
								}
							},
							tab: 'my_crm_users_list'
						});

		me.userGroup = new Ext.create('OCS.GridWithFormPanel', {
							modelName:'CRM_USERS_GROUP',
							func:'crm_user_group_list',
							title: 'Group members',
							table: 'crm_user_groups',
							insert: (user_level==0),
							remove: (user_level==0),
							tab: 'my_crm_user_group_list',
							values: 'groupName',
							defaultRec: {
								data: {
									id: '0'										
								}
							}
						});

		me.panel = Ext.create('Ext.Panel', {				
			layout: 'border',
			region: 'center',
			border: false,
			bodyPadding: 2,
			defaults: {
				collapsible: true,
				split: true,
				border: false
			},
			items: [{					
				layout: 'border',
				region: 'center',
				title: '',
				border: false,
				collapsible: false,
				items: [
					{
						region: 'center',
						split: true,			
						border: false,
						flex: 1,
						layout: 'border',
						items: [
							{
								id : 'users_list',
								region: 'center',
								flex: 1.5,
								split: true,
								closable: false,
								layout: 'border',
								items: [
									me.userList.createGrid()
								]
							}, {
								id : 'user_group_list',
								hidden: !(user_level > 0),
								region: 'east',
								flex: 1,
								split: true,
								closable: false,
								layout: 'border',
								items: [
									me.userGroup.createGrid()
								]
							}							
						]
					}								
				]
			}]
		});
		
		me.userList.selectionModel().on({
			selectionchange: function(sm, selections) {
				if (selections.length) {
					me.userGroup.setDefaultRec({
						data: {
							id: '0',
							groupName: selections[0].get('owner'),
							_date: Ext.Date.format(new Date(),'Y-m-d h:m:s')
						}
					});
					me.userGroup.loadStore(selections[0].get('owner'));
				}			
			}
		});

		return me.panel;
	}
});

Ext.define('OCS.ProductPanel', {
	extend: 'OCS.Module',
	
	storageReload: function(rec) {
		var me = this;
		me.storagePanel.loadStore(rec);
	},

	createPanel: function() {
		var me = this;
		
		me.storagePanel = new Ext.create('OCS.StorageGridWithFormPanel', {
			
		});

		me.panel = Ext.create('Ext.Panel', {				
			layout: 'border',
			region: 'center',
			border: false,
			bodyPadding: 2,
			defaults: {
				collapsible: true,
				split: true,
				border: false
			},
			items: [{					
				layout: 'border',
				region: 'center',
				title: '',
				border: false,
				collapsible: false,
				items: [					
					{
						region: 'center',
						split: true,			
						border: false,
						flex: 1,
						layout: 'border',
						items: [
							{
								xtype: 'panel',
								region: 'center',
								flex: 1,
								split: true,
								border: false,
								title: '',
								layout: 'border',
								items: [{
										id : 'product_list',
										title: 'Бараа бүтээгдэхүүний жагсаалт',
										flex: 1,
										region: 'west',
										split: true,
										closable: false,		
										collapsible: true,
										layout: 'border',
										items: [
											new Ext.create('OCS.ProductGridWithFormPanel', {
												
											}).createGrid()
										]
									},
									{
										id : 'warehouse_list',
										title: '',
										flex: 1,
										region: 'center',
										split: true,
										closable: false,
										layout: 'border',
										border: false,
										items: [{
											xtype: 'panel',
											region: 'north',
											flex: 0.5,
											layout: 'border',
											border: true,
											title: 'Агуулахын жагсаалт',
											collapsible: true,
											split: true,											
											items: [
												new Ext.create('OCS.WareHouseGridWithFormPanel', {
													
												}).createGrid()
											]
										}, {
											xtype: 'panel',
											region: 'center',
											flex: 1,
											border: true,			
											title: 'Агуулахын үлдэгдэл',
											layout: 'border',
											items: [
												me.storagePanel.createGrid()
											]
										}]
									}
								]
							}								
						]
					}								
				]
			}]
		});

		return me.panel;
	}
});

Ext.define('OCS.GoalsPanel', {
	extend: 'OCS.Module',

	createPanel: function() {
		var me = this;

		me.panel = Ext.create('Ext.Panel', {				
			layout: 'border',
			region: 'center',
			border: false,
			bodyPadding: 2,
			defaults: {
				collapsible: true,
				split: true,
				border: false
			},
			items: [{					
				layout: 'border',
				region: 'center',
				title: '',
				border: false,
				collapsible: false,
				items: [					
					{
						region: 'center',
						split: true,			
						border: false,
						flex: 1,
						layout: 'border',
						items: [
							{
								id : 'owner_plan_list',
								flex: 1,
								region: 'east',
								split: true,
								closable: false,
								layout: 'border',
								//hidden: !(user_level == 0),
								items: [
									new Ext.create('OCS.MyPlanningWithFormPanel', {
										modelName:'CRM_STAT',
										func:'crm_stat_list',
										title: 'Planning',
										table: 'crm_user_stat',
										tab: 'my_crm_tat_list',
										buttons: true,
//										insert: (user_level==0),
//										remove: (user_level==0),	
										defaultRec: {
											data: {
												id: '0',
												owner: logged,
												userCode: logged,
												_year: new Date().getFullYear(),
												_month: new Date().getMonth() + 1,
												_date : Ext.Date.format(new Date(),'Y-m-d')
											}
										}
									}).createGrid()
								]
							}, {
								id : 'user_planning_list',
								region: 'center',
								flex: 1,
								split: true,
								closable: false,
								layout: 'border',
							//	hidden: !(user_level > 0),
								items: [
									new Ext.create('OCS.MyGoalWithFormPanel', {
										modelName:'CRM_USER_PLANNING',
										func:'crm_user_planning_list',
										title: 'Goals',
										table: 'crm_user_planning',
										tab: 'my_crm_user_planning_list',
										buttons: true,
										insert: (user_level==0),
										remove: (user_level==0),
										defaultRec: {
											data: {
												id: '0',
												target: '0',
												start_date: Ext.Date.format(new Date(),'Y-m-d'),
												end_date: Ext.Date.format(new Date(),'Y-m-d')
											}
										}
									}).createGrid()
								]
							}								
						]
					}								
				]
			}]
		});

		return me.panel;
	}
});


Ext.define('OCS.Workspace', {
	extend: 'OCS.Module',		
	
	reload: function() {
		var me = this;
		me.workspace.reload();
	},
	
	selectedRecord: function() {
		var me = this;
		return me.workspace.selectedRecord();
	},

	createPanel: function() {
		var me = this;
		
		me.workspace = new Ext.create('OCS.MyProfile', {
			modelName: 'CRM_CALENDAR',
			func: 'crm_calendar_list'
		});

		me.panel = Ext.create('Ext.Panel', {	
			layout: 'border',
			region: 'center',
			border: false,
			items: [
				me.workspace.createPanel()
			]
		});

		return me.panel;
	}
});

Ext.define('OCS.Competitors', {
	extend: 'OCS.Module',		
	
	reload: function() {
		var me = this;
		me.competitor.reload();
	},

	createPanel: function() {
		var me = this;
		
		me.competitor = new Ext.create('OCS.CompetitorProfile', {
			modelName: 'CRM_CALENDAR',
			func: 'crm_calendar_list'
		});

		me.panel = Ext.create('Ext.Panel', {	
			layout: 'border',
			region: 'center',
			border: false,
			items: [
				me.competitor.createPanel()
			]
		});

		return me.panel;
	}
});


Ext.define('OCS.Reports', {
	extend: 'OCS.Module',	
	modelName: 'CRM_REPORT',
	func: 'crm_report_deal_list',

	createActions: function() {
		var me = this;
		me.actions = [		
			Ext.create('Ext.Action', {
				iconCls: 'list',
				text: 'Тайлангийн жагсаалт',
				menu: {
					xtype: 'menu',
					items: [						
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Нэгдсэн тайлан',
							handler: function(widget, event) {
								me.where = '';
								me.values = '';
								me.panelW.setVisible(false);
								window.open('http://183.177.103.19/mrep');
							}
						}),										
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Бүтээгдэхүүний нэгдсэн тайлан',
							handler: function(widget, event) {
								me.where = '';
								me.values = '';
								me.panelW.setVisible(false);
								me.reconfigure('CRM_REPORT_PRODUCT', 'crm_report_product_list');
							}
						}),										
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Харилцагчийн нэгдсэн тайлан',
							handler: function(widget, event) {
								me.where = '';
								me.values = '';
								me.panelW.setVisible(false);
								me.reconfigure('CRM_REPORT_CUSTOMER', 'crm_report_customer_list');
							}
						}),
						'-',
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Агуулахын тайлан',
							handler: function(widget, event) {
								me.where = '';
								me.values = '';
								me.panelW.setVisible(false);
								me.reconfigure('CRM_REPORT_STORAGE', 'crm_report_storage_list');
							}
						}),	
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Агуулахын тайлан өдрөөр',
							handler: function(widget, event) {
								me.where = '';
								me.values = '';
								me.panelW.setVisible(false);
								me.reconfigure('CRM_REPORT_STORAGE_DAILY', 'crm_report_storage_daily_list');
							}
						}),
						'-',
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Орлогын тайлан (хэлцэлээр)',
							handler: function(widget, event) {
								me.where = '';
								me.values = '';
								me.panelW.setVisible(false);
								me.reconfigure('CRM_REPORT_REVENUE', 'crm_opportunity_by_revenue_list');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Хэлцэлийн тайлан',
							handler: function(widget, event) {
								me.where = '';
								me.values = '';
								me.panelW.setVisible(false);
								me.reconfigure('CRM_REPORT', 'crm_report_deal_list');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Үйл ажиллагааны тайлан',
							handler: function(widget, event) {
								me.where = '';
								me.values = '';
								me.panelW.setVisible(false);
								me.reconfigureStatic('CRM_REPORT_ACTIVITY', 'crm_report_activity_list');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Гомдол саналын тайлан',
							handler: function(widget, event) {
								me.panelW.setVisible(false);
								me.reconfigureStatic('CRM_REPORT_CASE', 'crm_report_case_list');
							}
						})
					]
				}		
			}),
			'-',
			{
				id: 'report_start',
				text: me.month(),
				iconCls: 'calendar',
				menu: Ext.create('Ext.menu.DatePicker', {
					handler: function(dp, date){
						me.start = Ext.Date.format(date, 'Y-m-d');
						Ext.getCmp('report_start').setText(me.start);
						me.rangeData();
					}
				})
			},
			{
				id: 'report_end',
				text: me.nextmonth(),
				iconCls: 'calendar',				
				menu: Ext.create('Ext.menu.DatePicker', {
					handler: function(dp, date){
						me.end = Ext.Date.format(date, 'Y-m-d');
						Ext.getCmp('report_end').setText(me.end);
						me.rangeData();
					}
				})
			},
			{
				text: 'Арилгах',
				iconCls: 'reset',
				handler: function() {
					me.report.getView().getFeature('group').disable();
					Ext.getCmp('report_start').setText(me.month());
					Ext.getCmp('report_end').setText(me.nextmonth());
					me.start = me.month(); me.end = me.nextmonth();
					me.rangeData();
				}
			},			
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'export',
				text: 'Экспорт...',
				disabled: (user_level == '0'),
				handler: function(widget, event) {
					if (!Ext.fly('frmDummy')) {
						var frm = document.createElement('form');
						frm.id = 'frmDummy';
						frm.name = 'url-post';
						frm.className = 'x-hidden';
						document.body.appendChild(frm);
					}

					Ext.Ajax.request({
					   url: 'avia.php',
					   isUpload: true,
					   form: Ext.fly('frmDummy'),
					   params: {handle: 'file', action:'export', where: me.xlsName},					
					   success: function(response, opts) {					
						  Ext.MessageBox.alert('Status', 'Success !', function() {});
					   },
					   failure: function(response, opts) {
						  Ext.MessageBox.alert('Status', 'Error !', function() {});
					   }
					});	
				}
			})
		];
			
		return me.actions;
	},

	reconfigure: function(modelName, func) {
		var me = this;
		me.xlsName = modelName;
		me.modelName = modelName;
		me.func = func;
		me.report.func = func;
		me.report.start = me.start;
		me.report.end = me.end;
		me.createStore();
		me.report.reconfigure(me.store, me.createColumns());
		me.rangeData();
	},

	reconfigureStatic: function(modelName, func) {
		var me = this;
		me.xlsName = modelName;
		me.modelName = modelName;
		me.func = func;
		me.report.func = func;
		me.report.start = me.start;
		me.report.end = me.end;
		me.createStore();
		me.report.reconfigure(me.store, columns[modelName+'_COLUMNS']);
		me.rangeData();
	},

	createPanel: function() {
		var me = this;
		me.start = me.month();
		me.end = me.nextmonth();
		me.report = new OCS.BGridView({
			store: me.store,
			columns: me.createColumns(),
			flex: 0.75,
			animCollapse: true,
			collapsed: me.collapsed,
			func: me.func,
			feature: true,
			actions: me.createActions(),
		});

		me.chart = new OCS.ProductChart();
		
		me.panelW = Ext.create('Ext.Panel', {			
			layout: 'fit',
			region: 'east',
			height: 1200,
			flex: 0.75,
			hidden: true,
			split: true,
			items: me.chart
		});

		me.panel = Ext.create('Ext.Panel', {	
			title: 'Тайлан',
			tab: 'report_tab_list',
			layout: 'border',
			region: 'center',
			border: false,
			items: [
				me.report, me.panelW
			]
		});

		me.reconfigure('CRM_REPORT_PRODUCT', 'crm_report_product_list');

		return me.panel;
	},

	rangeData: function() {
		var me = this;
		me.store.getProxy().extraParams = {handle: 'web', action: 'select', func: me.func, start_date: me.start, end_date: me.end, values: me.values, where: me.where};
		me.store.load({callback: function() {

		}});
	}
});

Ext.define('OCS.SalesOrders', {
	extend: 'OCS.Module',		

	createPanel: function() {
		var me = this;

		me.panel = Ext.create('Ext.Panel', {	
			layout: 'border',
			region: 'center',
			border: false,
			bodyPadding: 2,
			items: [{
				xtype: 'panel',
				layout: 'border',
				region: 'west',
				split: true,
				flex: 1,
				items: [new OCS.QuotePanel().createGrid()]
			},{			
				xtype: 'panel',
				layout: 'border',
				region: 'center',
				flex: 1,
				items: [new OCS.SalesPanel().createGrid()]
			}]
		});

		return me.panel;
	}
});

Ext.define('OCS.Dashboard', {
	extend: 'OCS.Module',
	
	initCharts: function() {
		var me = this;
		me.charts = [];
		me.charts[0] = new OCS.CampaignChartRevenue();
		me.charts[7] = new OCS.OpportunityRevenueChart();
		me.charts[1] = new OCS.CampaignChartSuccess();
		me.charts[2] = new OCS.CasesByStatus();
		me.charts[3] = new OCS.LeadBySource();
		me.charts[4] = new OCS.MapOnline();
		me.charts[5] = new OCS.SalesStagePipeLine();
		me.charts[6] = new OCS.AccountByIndustry();	
		me.charts[8] = new OCS.SalesServiceFunnel();
		me.charts[9] = new OCS.ProductChart();
	},

	reloadCharts: function() {
		var me = this;
		for (i = 0; i < me.charts.length; i++)
			me.charts[i].reloadData();
	},

	createPanel: function() {
		var me = this;			
		me.initCharts();

		me.panel = Ext.create('Ext.Panel', {	
			layout: 'column',
			id:'main-panel',
			region: 'center',
			bodyBorder: false,
			frame: false,
			autoScroll: true,
			baseCls:'x-plain',
			bodyPadding: 5,
			bodyStyle: 'background: white;',
			border: false,		
			items: [{
				columnWidth: 1/2,
				padding: '5 5 5 5',
				border: false,
				items:[{
					title:'Борлуулалтын үе шат',		
					layout: 'fit',
					height: 400,
					margin: '0 0 10 0',
					columnWidth: 1/2,
					collapsible: true,
					tbar: [{
						text: 'Харагдац',
						iconCls: 'list',
						menu: {
							xtype: 'menu',
							items: [{
								text: 'Өнөөдөр',
								handler: function() {
									me.charts[8].rangeData(me.today(), me.tommorow());
								}
							},{
								text: 'Энэ долоо хоног',
								handler: function() {
									me.charts[8].rangeData(me.monday(), me.tommorow());
								}
							},{
								text: 'Энэ сар',
								handler: function() {
									me.charts[8].rangeData(me.month(), me.nextmonth());
								}
							},{
								text: 'Энэ жил',
								handler: function() {
									me.charts[8].rangeData(me.year(), me.nextyear());
								}
							}]
						}
					},'->',
					{
						id: 'start_8',
						text: me.month(),
						iconCls: 'calendar',
						menu: Ext.create('Ext.menu.DatePicker', {
							handler: function(dp, date){
								me.charts[8].start = Ext.Date.format(date, 'Y-m-d');
								Ext.getCmp('start_8').setText(Ext.Date.format(date, 'Y-m-d'));
								me.charts[8].rangeData(me.charts[8].start, me.charts[8].end);
							}
						})
					},
					{
						id: 'end_8',
						text: me.nextmonth(),
						iconCls: 'calendar',
						menu: Ext.create('Ext.menu.DatePicker', {
							handler: function(dp, date){
								me.charts[8].end = Ext.Date.format(date, 'Y-m-d');
								Ext.getCmp('end_8').setText(Ext.Date.format(date, 'Y-m-d'));
								me.charts[8].rangeData(me.charts[8].start, me.charts[8].end);
							}
						})
					},{
						text: 'Арилгах',
						iconCls: 'reset',
						handler: function() {
							Ext.getCmp('start_8').setText(me.month());
							Ext.getCmp('end_8').setText(me.nextmonth());
							me.charts[8].rangeData(me.charts[8].month(), me.charts[8].nextmonth());
						}
					}],
					items: /*{
						xtype: 'panel',
						bodyPadding: 30,
						border: false,
						autoLoad: {
							url: 'funnel.php',
							scripts: true
						}
					}*/me.charts[8]
				}]
			},{
				columnWidth: 1/2,
				padding: '5 5 5 5',
				margin: '0 0 10 0',
				border: false,
				items:[{
					title:'Харилцагчдын эх сурвалж',		
					layout: 'fit',
					collapsible: true,
					height: 400,
					tbar: [{
						text: 'Харагдац',
						iconCls: 'list',
						menu: {
							xtype: 'menu',
							items: [{
								text: 'Өнөөдөр',
								handler: function() {
									me.charts[3].rangeData(me.today(), me.tommorow());
								}
							},{
								text: 'Энэ долоо хоног',
								handler: function() {
									me.charts[3].rangeData(me.monday(), me.tommorow());
								}
							},{
								text: 'Энэ сар',
								handler: function() {
									me.charts[3].rangeData(me.month(), me.nextmonth());
								}
							},{
								text: 'Энэ жил',
								handler: function() {
									me.charts[3].rangeData(me.year(), me.nextyear());
								}
							}]
						}
					},'->',
					{
						id: 'start_3',
						text: me.month(),
						iconCls: 'calendar',
						menu: Ext.create('Ext.menu.DatePicker', {
							handler: function(dp, date){
								me.charts[3].start = Ext.Date.format(date, 'Y-m-d');
								Ext.getCmp('start_3').setText(Ext.Date.format(date, 'Y-m-d'));
								me.charts[3].rangeData(me.charts[3].start, me.charts[3].end);
							}
						})
					},
					{
						id: 'end_3',
						text: me.nextmonth(),
						iconCls: 'calendar',
						menu: Ext.create('Ext.menu.DatePicker', {
							handler: function(dp, date){
								me.charts[3].end = Ext.Date.format(date, 'Y-m-d');
								Ext.getCmp('end_3').setText(Ext.Date.format(date, 'Y-m-d'));
								me.charts[3].rangeData(me.charts[3].start, me.charts[3].end);
							}
						})
					},{
						text: 'Арилгах',
						iconCls: 'reset',
						handler: function() {
							Ext.getCmp('start_3').setText(me.month());
							Ext.getCmp('end_3').setText(me.nextmonth());
							me.charts[3].rangeData(me.charts[3].month(), me.charts[3].nextmonth());
						}
					}],
					items: me.charts[3]
				}]
			},{
				columnWidth: 1,
				padding: '5 5 5 5',
				border: false,
				items: [{
					layout: 'fit',
					title:'Борлуулалт борлуулагчаар',
					collapsible: true,						
					columnWidth: 1/2,
					autoScroll: true,
					height: 500,
					tbar: [{
						text: 'Харагдац',
						iconCls: 'list',
						menu: {
							xtype: 'menu',
							items: [{
								text: 'Өнөөдөр',
								handler: function() {
									Ext.getCmp('start_7').setText(me.today());
									Ext.getCmp('end_7').setText( me.tommorow());
									me.charts[7].rangeData(me.today(), me.tommorow());
								}
							},{
								text: 'Энэ долоо хоног',
								handler: function() {
									Ext.getCmp('start_7').setText(me.monday());
									Ext.getCmp('end_7').setText( me.tommorow());
									me.charts[7].rangeData(me.monday(), me.tommorow());
								}
							},{
								text: 'Энэ сар',
								handler: function() {
									Ext.getCmp('start_7').setText(me.month());
									Ext.getCmp('end_7').setText( me.nextmonth());
									me.charts[7].rangeData(me.month(), me.nextmonth());
								}
							},{
								text: 'Энэ жил',
								handler: function() {
									Ext.getCmp('start_7').setText(me.year());
									Ext.getCmp('end_7').setText( me.nextyear());
									me.charts[7].rangeData(me.year(), me.nextyear());
								}
							}
							,'-',
							{
								text: 'Filter ...',
								handler: function() {
									me.charts[7].createWindow();
								}
							}]
						}
					},'->',
					{
						id: 'start_7',
						text: me.month(),
						iconCls: 'calendar',
						menu: Ext.create('Ext.menu.DatePicker', {
							handler: function(dp, date){
								me.charts[7].start = Ext.Date.format(date, 'Y-m-d');
								Ext.getCmp('start_7').setText(Ext.Date.format(date, 'Y-m-d'));
								me.charts[7].rangeData(me.charts[7].start, me.charts[7].end);
							}
						})
					},
					{
						id: 'end_7',
						text: me.nextmonth(),
						iconCls: 'calendar',
						menu: Ext.create('Ext.menu.DatePicker', {
							handler: function(dp, date){
								me.charts[7].end = Ext.Date.format(date, 'Y-m-d');
								Ext.getCmp('end_7').setText(Ext.Date.format(date, 'Y-m-d'));
								me.charts[7].rangeData(me.charts[7].start, me.charts[7].end);
							}
						})
					},{
						text: 'Арилгах',
						iconCls: 'reset',
						handler: function() {
							Ext.getCmp('start_7').setText(me.month());
							Ext.getCmp('end_7').setText(me.nextmonth());
							me.charts[7].rangeData(me.charts[7].month(), me.charts[7].nextmonth());
						}
					}],
					items: [me.charts[7]]
				}]
			},{
				columnWidth: 1,
				padding: '5 5 5 5',
				border: false,
				items:[{
					title:'Борлуулалт бүтээгдэхүүнээр',		
					layout: 'fit',
					height: 700,
					tbar: [{
						text: 'Харагдац',
						iconCls: 'list',
						menu: {
							xtype: 'menu',
							items: [{
								text: 'Өнөөдөр',
								handler: function() {
									Ext.getCmp('start_9').setText(me.today());
									Ext.getCmp('end_9').setText( me.tommorow());
									me.charts[9].rangeData(me.today(), me.tommorow());
								}
							},{
								text: 'Энэ долоо хоног',
								handler: function() {
									Ext.getCmp('start_9').setText(me.monday());
									Ext.getCmp('end_9').setText( me.tommorow());
									me.charts[9].rangeData(me.monday(), me.tommorow());
								}
							},{
								text: 'Энэ сар',
								handler: function() {
									Ext.getCmp('start_9').setText(me.month());
									Ext.getCmp('end_9').setText( me.nextmonth());
									me.charts[9].rangeData(me.month(), me.nextmonth());
								}
							},{
								text: 'Энэ жил',
								handler: function() {
									Ext.getCmp('start_9').setText(me.year());
									Ext.getCmp('end_9').setText( me.nextyear());
									me.charts[9].rangeData(me.year(), me.nextyear());
								}
							},{
								text: 'Last year',
								handler: function() {
									Ext.getCmp('start_9').setText(me.prevyear());
									Ext.getCmp('end_9').setText( me.year());
									me.charts[9].rangeData(me.prevyear(), me.year());
								}
							}]
						}
					},'->',
					{
						id: 'start_9',
						text: me.month(),
						iconCls: 'calendar',
						menu: Ext.create('Ext.menu.DatePicker', {
							handler: function(dp, date){
								me.charts[9].start = Ext.Date.format(date, 'Y-m-d');
								Ext.getCmp('start_9').setText(Ext.Date.format(date, 'Y-m-d'));
								me.charts[9].rangeData(me.charts[9].start, me.charts[9].end);
							}
						})
					},
					{
						id: 'end_9',
						text: me.nextmonth(),
						iconCls: 'calendar',
						menu: Ext.create('Ext.menu.DatePicker', {
							handler: function(dp, date){
								me.charts[9].end = Ext.Date.format(date, 'Y-m-d');
								Ext.getCmp('end_9').setText(Ext.Date.format(date, 'Y-m-d'));
								me.charts[9].rangeData(me.charts[9].start, me.charts[9].end);
							}
						})
					},{
						text: 'Арилгах',
						iconCls: 'reset',
						handler: function() {
							Ext.getCmp('start_9').setText(me.month());
							Ext.getCmp('end_9').setText(me.nextmonth());
							me.charts[9].rangeData(me.charts[9].month(), me.charts[9].nextmonth());
						}
					}],
					items: me.charts[9]
				}]
			},{
				columnWidth: 1,
				padding: '5 5 5 5',
				border: false,				
				items:[{
					title:'Борлуулалгчдын байршил',
					layout: 'border',
					collapsible: true,
					height: 700,					
					items: me.charts[4],
					tbar: [{
						text: 'Харагдац',
						iconCls: 'list',
						menu: {
							xtype: 'menu',
							items: [{
								text: 'Одоогийн мэдээ',
								handler: function() {
									me.charts[4].initload(me.today());
								}
							},{
								text: 'Шүүлтүүр',
								handler: function() {
									me.charts[4].createWindow();
								}
							}]
						}
					},'->',
					{
						id: 'start_4',
						text: me.today(),
						iconCls: 'calendar',
						menu: Ext.create('Ext.menu.DatePicker', {
							handler: function(dp, date){
								me.charts[4].start = Ext.Date.format(date, 'Y-m-d');
								Ext.getCmp('start_4').setText(Ext.Date.format(date, 'Y-m-d'));
								me.charts[4].reload(me.charts[4].start);
							}
						})
					},
					{
						text: 'Арилгах',
						iconCls: 'reset',
						handler: function() {
							me.charts[4].start = me.today();
							Ext.getCmp('start_4').setText(me.today());
							me.charts[4].reload(me.charts[4].start);
						}
					}]
				}]
			}]
		});

		return me.panel;
	},

	yearValue: function() {
		return new Date().getFullYear();
	},

	monthValue: function() {
		return new Date().getMonth()+1;
	},

	prevmonthValue: function() {
		month =  new Date().getMonth();
		if (month < 0) month = 12;		
		return month;
	},

	today: function() {
		var now = new Date();
		return Ext.Date.format(now, 'Y-m-d');
	},

	tommorow: function() {
		 var today = new Date();
		 var d = today.getDate();
		 var m = today.getMonth();
		 var y = today.getFullYear();
		 var nextDate= new Date(y, m, d+1);
		 var ndate=Ext.Date.format(nextDate, 'Y-m-d');
		 return ndate;
	},

	month: function() {
		 var today = new Date();
		 var m = today.getMonth();
		 var y = today.getFullYear();
		 var nextDate= new Date(y, m, 1);
		 var ndate=Ext.Date.format(nextDate, 'Y-m-d');
		 return ndate;
	},
	
	prevmonth: function() {
		 var today = new Date();
		 var m = today.getMonth();
		 var y = today.getFullYear();
		 var nextDate= new Date(y, m-1, 1);
		 var ndate=Ext.Date.format(nextDate, 'Y-m-d');
		 return ndate;
	},

	nextmonth: function() {
		 var today = new Date();
		 var m = today.getMonth();
		 var y = today.getFullYear();
		 var nextDate= new Date(y, m+1, 1);
		 var ndate=Ext.Date.format(nextDate, 'Y-m-d');
		 return ndate;
	},

	monday: function() {
		var today = new Date();
		var day = today.getDay() || 7;
		if( day !== 1 )
		    today.setHours(-24 * (day - 1)); 
		var ndate=Ext.Date.format(today, 'Y-m-d');
		return ndate;
	},

	year: function() {
		 var today = new Date();
		 var m = today.getMonth();
		 var y = today.getFullYear();
		 var nextDate= new Date(y, 0, 1);
		 var ndate=Ext.Date.format(nextDate, 'Y-m-d');
		 return ndate;
	},

	nextyear: function() {
		 var today = new Date();
		 var m = today.getMonth();
		 var y = today.getFullYear();
		 var nextDate= new Date(y+1, 0, 1);
		 var ndate=Ext.Date.format(nextDate, 'Y-m-d');
		 return ndate;
	},

	prevyear: function() {
		 var today = new Date();
		 var m = today.getMonth();
		 var y = today.getFullYear();
		 var nextDate= new Date(y-1, 0, 1);
		 var ndate=Ext.Date.format(nextDate, 'Y-m-d');
		 return ndate;
	}
});


Ext.define('OCS.CampaignActivityGrid', {
	extend: 'OCS.ActivityGrid',
	func: 'crm_campaign_activity_list',
	sortField: 'remind_at',
	tab : 'campaign_activity_property',
	dateField: '_date',
	title: 'Campaign Activities',
	icon: 'task',
	modelName: 'CRM_CALENDAR',
	collapsed : false,	

	createActions: function() {
		var me = this;
		me.actions = [
			Ext.create('Ext.Action', {
				iconCls: 'list',
				text: 'Views',
				menu: {
					xtype: 'menu',
					items: [						
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Appointment List',
							handler: function(widget, event) {
								me.filterData('Appointment List');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Phone Call List',
							handler: function(widget, event) {
								me.filterData('Phone Call List');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Email List',
							handler: function(widget, event) {
								me.filterData('Email List');
							}
						}),
						'-',
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Without Owner List',
							handler: function(widget, event) {
								me.filterData('Without Owner Activity List');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'My Activity List',
							handler: function(widget, event) {
								me.filterData('My Activity List');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'My Activity List (Pending)',
							handler: function(widget, event) {
								me.filterData('My Activity List (Pending)');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'My Activity List (Remind)',
							handler: function(widget, event) {
								me.filterData('My Activity List (Remind)');
							}
						}),
						'-',
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'All Activity List',
							handler: function(widget, event) {
								me.filterData('All Activity List');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'All Activity List (Pending)',
							handler: function(widget, event) {
								me.filterData('All Activity List (Pending)');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'All Activity List (Remind)',
							handler: function(widget, event) {
								me.filterData('All Activity List (Remind)');
							}
						}),
					]
				}		
			}),'-',
			Ext.create('Ext.Action', {
				iconCls   : 'deal_assign',
				text: 'Assign...',
				menu: {
					xtype: 'menu',
					items: [{
						text: 'For selected records',
						handler: function(widget, event) {		
							if (user_level > 0 ) {
								if (me.recordSelected())
									new OCS.CampaignActivityAssignWindow({
										direction: me.selected.get('campaign'),
										ids: me.selectedIds('id')
									}).show();
							} else
								Ext.MessageBox.alert('Error', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
						}
					},{
						text: 'For all records',
						handler: function(widget, event) {		
							if (user_level > 0 ) {
								new OCS.CampaignActivityAssignWindow({
									direction: me.selected.get('campaign'),
									ids: 'all'
								}).show();
							} else
								Ext.MessageBox.alert('Error', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
						}
					}]
				}	
			}),
			Ext.create('Ext.Action', {
				iconCls : 'save',
				text: 'Complete',
				handler: function(widget, event) {
//					me.completeActivity();
					var records = me.grid.getView().getSelectionModel().getSelection();
					var record = records[0];
					if (record.get('owner')) {
						new OCS.ActivityDetailWindow({
							title: 'Activity detail',
							record: record,
							backgrid: me
						}).show();							
					}
				}
			}),			
			Ext.create('Ext.Action', {
				iconCls  : 'edit',  
				text: 'Засах...',
				handler: function(widget, event) {
					var records = me.grid.getView().getSelectionModel().getSelection();
					if (records.length == 0) {
						 Ext.MessageBox.alert('Status', 'Сонгогдсон мөр байхгүй байна !', function() {});
						 return;
					}

					if (records[0].get('owner') != logged) {
						Ext.MessageBox.alert('Error', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
						return;
					}

					me.selected = records[0];
					if (me.selected.get('work_type') == 'task')										
						new OCS.TaskWindow({
							selected: me.selected
						}).createWindow();
					else if (me.selected.get('work_type') == 'appointment')											
						new OCS.EventWindow({
							selected: me.selected
						}).createWindow();
					else if (me.selected.get('work_type') == 'phone call')											
						new OCS.CallLogWindow({
							selected: me.selected
						}).createWindow();
					else if (me.selected.get('work_type') == 'email')											
						new OCS.EmailWindow({
							selected: me.selected
						}).createWindow();
					else if (me.selected.get('work_type') == 'note')											
						new OCS.NotesWindow({
							selected: me.selected
						}).createWindow();
					else if (me.selected.get('work_type') == 'case')											
						new OCS.ComplainWindow({
							selected: me.selected
						}).createWindow();
				}
			})
		];

		return me.actions;
	},
	
	createColumns: function() {
		var me = this;
		return [{
			text: "Activity",
			dataIndex: 'subject',
			flex: 1,
			renderer: me.renderTitle,
			sortable: true
		},{
			text: "Priority",
			dataIndex: 'priority',
			width: 50,
			align: 'right',
			hidden: true,
			renderer: renderPriority,
			sortable: true
		},{
			text: "Status",
			dataIndex: 'status',
			width: 100,
			hidden: true,
			sortable: true
		},{
			text: "Remind at",
			dataIndex: 'remind_at',
			width: 100,
			hidden: true,
			sortable: true
		},{
			text: "Created on",
			dataIndex: '_date',
			width: 100,
			hidden: true,
			sortable: true
		}];
	},

	recordSelected: function() {
		var me = this;
		var recs = me.grid.getView().getSelectionModel().getSelection();
		if (recs && recs.length > 0)
			return true;
		
		Ext.MessageBox.alert('Status', 'No Selection !', function() {});
		return false;
	},

	selectedIds: function(id) {
		var me = this;
		var recs = me.grid.getView().getSelectionModel().getSelection();
		var result = '';
		for (i = 0; i < recs.length; i++) {
			result += recs[i].get(id)+':';
		}

		return result;
	},

	updateSource: function(rec) {
		var me = this;
		me.selected = rec;
		me.where = rec.get('campaign');
		me.owner = rec.get('owner');
		me.type = rec.get('campaign_type');
		me.values = 'campaign';
		me.grid.where = me.where;
		me.grid.values = me.values;
		me.loadStore();
	},		

	startSource: function() {
		var me = this;
		me.where = 'null';
		me.owner = 'null';
		me.values = 'campaign';
		me.loadStore();
	},		

	createPanel: function() {
		var me = this;
		me.createGrid();

		me.panel = Ext.create('Ext.Panel', {
			id: me.tab,
			title: me.title,
			split: true,
			border: true,
			layout: 'border',
			region: 'center',
			items: [me.grid]
		});
		
		me.filterData('My Activity List');
		me.startSource();
		return me.panel;
	}
});

Ext.define('OCS.Campaigns', {
	extend: 'OCS.Module',
	
	reload: function(rec) {
		var me = this;
		me.selected = rec;
		me.perform.updateSource(rec);
		me.campaignActivity.updateSource(rec);
	},
	
	refresh: function() {
		var me = this;
		me.campaignActivity.updateSource(me.selected);
	},
	
	selectedRecord: function() {
		var me = this;
		return me.campaignActivity.selectedRecord();
	},

	createPanel: function() {
		var me = this;
		
		me.campaigns = new OCS.CampaignPanel();
		me.campaignActivity = new OCS.CampaignActivityGrid();
		
		me.perform = new Ext.create('OCS.CampaignResultGridWithFormPanel');

		views['campaign_contacts'] = Ext.create('OCS.CampaignContactView', {
			flex: 1,
			title: 'Campaign members',
			region: 'center'
		});

		me.panel = Ext.create('Ext.Panel', {	
			layout: 'border',
			region: 'center',
			border: false,
			bodyPadding: 2,
			defaults: {
				collapsible: true,
				split: true,
				border: false
			},
			items: [{	
				region: 'center',
				layout: 'border',				
				title: '',
				border: false,
				collapsible: false,
				items: [
					{
						region: 'center',	
						flex: 0.7,
						layout: 'border',						
						items: [me.campaigns.createGrid(), {
							xtype: 'panel',
							layout:'border',
							region: 'south',
							split: true,
							border: false,
							flex: 1.5,
							items: [views['campaign_contacts'].createView()]
						}]
					},
					{
						region: 'west',	
						flex: 0.3,
						layout: 'border',						
						split: true,
						border: false,
						items: [me.campaignActivity.createPanel(), {
							xtype: 'panel',
							layout: 'border',
							region: 'south',
							flex: 0.3,
							split: true,
							items: [me.perform.createGrid()]
						}]
					}
				]
			}]
		});
		

		return me.panel;
	}
});

Ext.define('OCS.CampaignPanel', {	
	extend: 'OCS.GridWithFormPanel',			
	modelName: 'CRM_CAMPAIGN',
	func: 'crm_campaign_list',
	autoSelect: true,
	buttons: true,
	title: 'Campaign',
	table: 'crm_campaign',
	tab: 'my_crm_campaign_list',
	primary: 'id',
	
	createActions: function() {
		var me = this;
		me.actions = [			
			Ext.create('Ext.Action', {
				iconCls : 'edit',
				text: 'Засах...',
				handler: function(widget, event) {
					me.form.setVisible(true);
				}
			}),
			Ext.create('Ext.Action', {
				iconCls   : 'delete',
				text: 'Устгах',
				handler: function(widget, event) {
					me.deleteRecord();
				}
			}),
			'-',
			Ext.create('Ext.Action', {
				iconCls  : 'cmem',
				text: 'Create activities',
				handler: function(widget, event) {
					var record = me.grid.getView().getSelectionModel().getSelection()[0];
					if (record.lenght == 0) {
						Ext.MessageBox.alert('Status', 'Not selection !', function() {});
						return;
					}

					if (record.get('owner') != logged) {
						Ext.MessageBox.alert('Status', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
						return;
					}
					
					if (record.get('campaign_type') == '') {
						Ext.MessageBox.alert('Status', 'Campaign type is not set !', function() {});
						return;
					}

					var box = Ext.MessageBox.wait('Please wait while I do something or other', 'Performing Actions');
					Ext.Ajax.request({
					   url: 'avia.php',					   
					   params : {handle: 'web', action: 'select', func: 'crm_campaign_create_crm_list', where: record.get('id')},
					   success: function(response, opts) {						  
						  box.hide();
						  Ext.MessageBox.alert('Status', 'Success !', function() {
							 me.reload();
							 views['campaigns'].refresh();
						  });
					   },
					   failure: function(response, opts) {										   
						  Ext.MessageBox.alert('Status', 'Error !', function() {});
					   }
					});		
				}
			}),
			Ext.create('Ext.Action', {
				iconCls  : 'dmem',
				text: 'Remove activities',
				handler: function(widget, event) {
					var record = me.grid.getView().getSelectionModel().getSelection()[0];
					if (record.lenght == 0) {
						Ext.MessageBox.alert('Status', 'Not selection !', function() {});
						return;
					}

					if (record.get('owner') != logged) {
						Ext.MessageBox.alert('Status', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
						return;
					}
					
					var box = Ext.MessageBox.wait('Please wait while I do something or other', 'Performing Actions');
					Ext.Ajax.request({
					   url: 'avia.php',					   
					   params : {handle: 'web', action: 'select', func: 'crm_campaign_remove_crm_list', where: record.get('id')},
					   success: function(response, opts) {						  
						  box.hide();
						  Ext.MessageBox.alert('Status', 'Success !', function() {
							 me.reload();
							 views['campaigns'].refresh();
						  });
					   },
					   failure: function(response, opts) {										   
						  Ext.MessageBox.alert('Status', 'Error !', function() {});
					   }
					});		
				}
			}),						
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'help',
				text: 'Тусламж',
				handler: function(widget, event) {
					new OCS.HelpWindow({
						id: me.func
					}).show();
				}
			})
		];

		return me.actions;
	},	

	initSource: function() {
		var me = this;
		me.defaultRec = {
			data: {
				id: '0',
				_date : Ext.Date.format(new Date(),'Y-m-d'),
				userCode : logged,
				total_members: '0',
				owner: logged,
				budgeted_cost: '0',
				actual_cost: '0',
				campaign_live: 'dynamic',
				expected_revenue: '0',
				start_date: Ext.Date.format(new Date(),'Y-m-d'),
				end_date: Ext.Date.format(new Date(),'Y-m-d'),
				campaign_status: 'active'
			}			
		};
		
		me.form.updateSource(me.defaultRec);
		
		me.grid.on('itemclick', function(dv, record, item, index, e) {
				me.form.updateSource(record);
				views['campaigns'].reload(record);
				views['campaign_contacts'].loadStore(record.get('id'));
			}
		);
	}
});

Ext.define('OCS.QuotePanel', {	
	extend: 'OCS.GridWithFormPanel',			
	modelName: 'CRM_QUOTE',
	func: 'crm_quote_list',
	tab: 'my_crm_quote_list',
	autoSelect: true,
	table: 'crm_quotes',
	title: 'Quote',
	startAction: 'Closed Quotes',
	quoteList: false,

	filterData: function(views) {
		var me = this;		
		me.title = views;
		me.store.getProxy().extraParams = {handle: 'web', action: 'select', func: me.func, values: me.values, where: me.where, views: views};
		me.store.loadPage(1);
	},
		
	createActions: function() {
		var me = this;
		me.actions = [
			Ext.create('Ext.Action', {
				iconCls: 'list',
				text: 'Views',
				menu: {
					xtype: 'menu',
					items: [					
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Waiting Invoices',
							handler: function(widget, event) {
								me.filterData('Waiting Quotes');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Closed Invoices',
							handler: function(widget, event) {
								me.filterData('Closed Quotes');
							}
						}),						
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Recent Invoices',
							handler: function(widget, event) {
								me.filterData('Recent Quotes');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Campaign Invoices',
							handler: function(widget, event) {
								me.filterData('Campaign Quotes');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'All Invoices',
							handler: function(widget, event) {
								me.filterData('All Quotes');
							}
						}),
						'-',
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'All Invoices in current fiscal year',
							handler: function(widget, event) {
								me.filterData('All quotes in current fiscal year');
							}
						})
					]
				}		
			}),
			'-',
			Ext.create('Ext.Action', {
				iconCls: 'add',
				text: 'New...',
				disabled: true,
				handler: function(widget, event) {
					if (selected) {					
						me.initSource();
						me.subpanel.setVisible(true);
						me.gridQuoteList.loadStore('nowhere');
						me.grid.getSelectionModel().clearSelections();
						Ext.getCmp('customerComponent').collapse();
					} else
					  Ext.MessageBox.alert('Status', 'Харилцагч сонгоно уу ! Харилцагч сонгохын тулд Accounts хэсэгт тухайн харилцагч дээр дарна уу !', function() {});
				}
			}),	
			Ext.create('Ext.Action', {
				iconCls : 'edit',
				text: 'Засах...',
				handler: function(widget, event) {
					var selection = me.grid.getSelectionModel().getSelection();
					if (selection && selection.length == 1) {
						record = selection[0];
						selectedQuote = record;
						me.form.updateSource(record);
						me.invoiceActivity.updateSource(record);
						
						if (!me.quoteList)
							me.gridQuoteList.loadStore(selectedQuote.get('id'));				

						me.subpanel.setVisible(true);
					} else {
						me.subpanel.setVisible(false);					
					}
				}
			}),	
			Ext.create('Ext.Action', {
				iconCls : 'delete',
				text: 'Устгах',
				handler: function(widget, event) {
					me.deleteRecord();
				}
			}),			
			'-',
			Ext.create('Ext.Action', {
				iconCls : 'contract',
				text: 'Create contract',
				handler: function(widget, event) {
					var selection = me.grid.getSelectionModel().getSelection();
					if (selection.length > 0) {
						if (selection[0].get('owner') == logged) {
							Ext.Msg.confirm('Warning ','Create contract ?',function(btn){
								if(btn === 'yes'){
									Ext.Ajax.request({
									   url: 'avia.php',
									   params: {handle: 'web', action: 'create_sales', where: selection[0].get('id')},
									   success: function(response, opts) {
										  Ext.MessageBox.alert('Status', 'Success !', function() {});
									   },
									   failure: function(response, opts) {										   
										  Ext.MessageBox.alert('Status', 'Error !', function() {});
									   }
									});	
								}
							});
						} else
						  Ext.MessageBox.alert('Status', 'Уг үйлдлийг хийхэд таны эрх хүрэлцэхгүй !', function() {});
					} else
					  Ext.MessageBox.alert('Status', 'Сонгогдсон мөр байхгүй байна !', function() {});
				}
			}),
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'help',
				text: 'Тусламж',
				handler: function(widget, event) {
					new OCS.HelpWindow({
						id: me.func
					}).show();
				}
			})
		];

		return me.actions;
	},
	
	initSource: function() {
		var me = this;
		me.defaultRec = {
			data: {
				id: '0',
				userCode : logged,
				owner: logged,
				qty: '0',
				amount: '0',
				crm_id: crm_id,
				quote_code: 'P'+new Date().getTime(),
				_date: Ext.Date.format(new Date(),'Y-m-d H:m:s'),
				quote_status: 'draft' //negotiation,delivered,on hold,confirmed,closed won,closed lost
			}			
		};
				
		me.form.updateSource(me.defaultRec);
	},

	createPanel: function() {
		var me = this;
		me.createStore();

		me.grid = Ext.create('OCS.GridView', {				
			store: me.store,
			flex: 1,
			actions: me.createActions(),
			columns: me.createColumns(),
			func: me.func	
		});				
		
		me.grid.on('itemclick', function(dv, record, item, index, e) {			
			if (record) {
				selectedQuote = record;
				me.form.updateSource(record);
				me.invoiceActivity.updateSource(record);
				
				if (!me.quoteList)
					me.gridQuoteList.loadStore(selectedQuote.get('id'));				

			//	me.subpanel.setVisible(true);
			} else {
			//	me.subpanel.setVisible(false);					
			}	
		});
								
		me.form = new OCS.PropertyGrid({
			modelName: me.modelName,
			title: '',
			iconCls: '',
			region: 'center',
			split: true,
			closable: false,
			flex: 1,
			sealedColumns: true,
			buttons: [{
				text : 'Арилгах',
				iconCls: 'reset',
				handler: function() {
					me.initSource();
					me.gridQuoteList.loadStore('nowhere');
				}
			},'->',{
				text: 'Илгээх',
				iconCls: 'commit',
				handler: function() {
					me.commitRecord();
				}
			}]
		});						

		me.initSource();
		
		me.gridQuoteList = new Ext.create('OCS.DropGridPanel', {
			modelName:'CRM_QUOTE_DETAIL',
			func:'crm_quote_detail_list',
			title: 'Products',
			tab: 'crm_quote_detail_list',
			region: 'center',
			table: 'crm_quote_details',			
			values: 'quote_id',
			flex: 0.75
		});

		me.invoiceActivity = new Ext.create('OCS.InvoiceActivityGrid', {
		});		
		
		if (me.quoteList) {
			me.tabs = Ext.widget('tabpanel', {
				activeTab: 0,
				flex: 1,			
				region: 'south',
				tabPosition: 'top',	
				items: [
					me.invoiceActivity.createPanel()
				]
			});
		} else {
			me.tabs = Ext.widget('tabpanel', {
				activeTab: 0,
				flex: 1,			
				region: 'south',
				tabPosition: 'top',	
				items: [
					me.gridQuoteList.createGrid(),
					me.invoiceActivity.createPanel()
				]
			});
		}

		me.subpanel = Ext.create('Ext.panel.Panel', {			
			xtype: 'panel',
			layout: 'border',
			flex: 0.5,
			region: 'east',
			title: 'Detail',
			split: true,
			hidden: true,
			closable: true,
			closeAction: 'hide',
			items: [
				me.form, me.tabs
			]
		});

		me.panel = Ext.create('Ext.panel.Panel', {
			title: me.title,
			layout: 'border',
			id: me.tab,
			border: false,
			region: 'center',
			items : [me.grid, me.subpanel]
		});				
		
		me.filterData(me.startAction);
		return me.panel;
	}
});

Ext.define('OCS.SalesPanel', {	
	extend: 'OCS.QuotePanel',			
	modelName: 'CRM_SALES',
	func: 'crm_sales_list',
	table: 'crm_sales',
	tab: 'my_crm_sales_list',
	title: 'Sales',
	quoteList: true,
	startAction: 'Service is expiring',
	
	filterData: function(views) {
		var me = this;		
		me.title = views;
		me.store.getProxy().extraParams = {handle: 'web', action: 'select', func: me.func, values: me.values, where: me.where, views: views};
		me.store.loadPage(1);
	},
		
	createActions: function() {
		var me = this;
		me.actions = [
			Ext.create('Ext.Action', {
				iconCls: 'list',
				text: 'Views',
				menu: {
					xtype: 'menu',
					items: [						
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Service is expiring',
							handler: function(widget, event) {
								me.filterData('Service is expiring');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Active Contracts',
							handler: function(widget, event) {
								me.filterData('Active Sales');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Recent Contracts',
							handler: function(widget, event) {
								me.filterData('Recent Sales');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Campaign Contracts',
							handler: function(widget, event) {
								me.filterData('Campaign Sales');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'All Contracts',
							handler: function(widget, event) {
								me.filterData('All Sales');
							}
						}),
						'-',
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'All Contract in current fiscal year',
							handler: function(widget, event) {
								me.filterData('All Sales in current fiscal year');
							}
						})
					]
				}		
			}),
			'-',
			Ext.create('Ext.Action', {
				iconCls: 'add',
				text: 'New...',
				disabled: true,
				handler: function(widget, event) {
					if (selected) {					
						me.initSource();
						me.subpanel.setVisible(true);
						me.gridQuoteList.loadStore('nowhere');
						me.grid.getSelectionModel().clearSelections();
						Ext.getCmp('customerComponent').collapse();
					} else
					  Ext.MessageBox.alert('Status', 'Харилцагч сонгоно уу !', function() {});
				}
			}),			
			Ext.create('Ext.Action', {
				iconCls: 'delete',
				text: 'Устгах',
				handler: function(widget, event) {
					me.deleteRecord();
				}
			}),
			'-',			
			Ext.create('Ext.Action', {
				iconCls : 'deal_lost',
				text: 'Terminate...',
				handler: function(widget, event) {
					var selection = me.grid.getSelectionModel().getSelection();
					if (selection.length > 0) {

					} else
					  Ext.MessageBox.alert('Status', 'Сонгогдсон мөр байхгүй байна !', function() {});
				}
			}),
			Ext.create('Ext.Action', {
				iconCls : 'deal',
				text: 'Deal...',
				handler: function(widget, event) {
					var selection = me.grid.getSelectionModel().getSelection();
					if (selection.length > 0) {
						new OCS.NewDealWindow({
							selected: selection[0]
						}).createWindow();
					} else
					  Ext.MessageBox.alert('Status', 'Сонгогдсон мөр байхгүй байна !', function() {});
				}
			}),			
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'help',
				text: 'Тусламж',
				handler: function(widget, event) {
					new OCS.HelpWindow({
						id: me.func
					}).show();
				}
			})
		];

		return me.actions;
	}
});


Ext.define('OCS.MyGridWithFormPanel', {	
	extend: 'OCS.GridWithFormPanel',
	filter: false,	
	
	filterData: function(views) {
		var me = this;		
		me.title = views;
		me.store.getProxy().extraParams = {handle: 'web', action: 'select', func: me.func, values: me.values, where: me.where, views: views};
		me.store.loadPage(1);
	},

	reload: function() {
		var me = this;
		me.store.reload();
	},

	updateSource: function(owner) {
		var me = this;
		me.where = owner;
		me.values = 'owner';
		me.loadStore(owner);
	},
	
	createActions: function(actions) {
		var me = this;
		me.actions = [
			Ext.create('Ext.Action', {
				iconCls: 'list',
				text: 'Views',
				menu: {
					xtype: 'menu',
					items: [
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Open Task List',
							handler: function(widget, event) {
								me.filterData('Open Task List');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Closed Task List',
							handler: function(widget, event) {
								me.filterData('Closed Task List');
							}
						}),
						'-',
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'All Task List',
							handler: function(widget, event) {
								me.filterData('All Task List');
							}
						})
					]
				}		
			}),
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'add',
				text: 'New...',
				disabled: me.insert,
				handler: function(widget, event) {
					me.form.updateSource(me.defaultRec);
					me.form.setVisible(true);
				}
			}),
			Ext.create('Ext.Action', {
				iconCls   : 'edit',
				text: 'Засах...',
				handler: function(widget, event) {
					me.showForm();
				}
			}),
			Ext.create('Ext.Action', {
				iconCls   : 'delete',
				text: 'Устгах',
				disabled: me.remove,
				handler: function(widget, event) {
					me.deleteRecord();
				}
			}),
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'calendar',
				text: 'Календар',
				handler: function(widget, event) {
					var records = me.grid.getView().getSelectionModel().getSelection();
					if (records.length == 0) {
						 Ext.MessageBox.alert('Status', 'Сонгогдсон мөр байхгүй байна !', function() {});
						 return;
					}
					googleEventDynamic1(records[0]);
				}
			}),	
			Ext.create('Ext.Action', {
				iconCls: 'chart',
				text: 'Chart',
				handler: function(widget, event) {
					new OCS.UrgencyWindow().show();
				}
			}),
			Ext.create('Ext.Action', {
				iconCls   : 'save',
				text: 'Mark complete',
				handler: function(widget, event) {
					var selection = me.grid.getSelectionModel().getSelection();
					if (selection.length > 0)									
						new OCS.MarkCompleteWindow({
							selected: selection[0]
						}).show();
					else
						Ext.MessageBox.alert('Status', 'No Selection !', function() {});
				}
			}),	
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'export',
				text: 'Экспорт',
				handler: function(widget, event) {
					if (!Ext.fly('frmDummy')) {
						var frm = document.createElement('form');
						frm.id = 'frmDummy';
						frm.name = 'url-post';
						frm.className = 'x-hidden';
						document.body.appendChild(frm);
					}

					Ext.Ajax.request({
					   url: 'avia.php',
					   isUpload: true,
					   form: Ext.fly('frmDummy'),
					   params: {handle: 'file', action:'export', where: me.title},					
					   success: function(response, opts) {					
						  Ext.MessageBox.alert('Status', 'Success !', function() {});
					   },
					   failure: function(response, opts) {
						  Ext.MessageBox.alert('Status', 'Error !', function() {});
					   }
					});	
				}
			}),
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'help',
				text: 'Тусламж',
				handler: function(widget, event) {
					new OCS.HelpWindow({
						id: me.func
					}).show();
				}
			})			
		];
		

		me.filterData('Open Task List');
		return me.actions;
	}
});

Ext.define('OCS.MyGoalWithFormPanel', {	
	extend: 'OCS.MyGridWithFormPanel',
	
	createActions: function(actions) {
		var me = this;
		me.actions = [
			Ext.create('Ext.Action', {
				iconCls: 'list',
				text: 'Views',
				menu: {
					xtype: 'menu',
					items: [
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Active Goals',
							handler: function(widget, event) {
								me.filterData('Active Goals');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Closed Goals',
							handler: function(widget, event) {
								me.filterData('Closed Goals');
							}
						}),
						'-',
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'All Goals',
							handler: function(widget, event) {
								me.filterData('All Goals');
							}
						})
					]
				}		
			}),
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'add',
				text: 'New...',
				disabled: me.insert,
				handler: function(widget, event) {
					me.form.updateSource(me.defaultRec);
					me.form.setVisible(true);
				}
			}),
			Ext.create('Ext.Action', {
				iconCls   : 'edit',
				text: 'Засах...',
				handler: function(widget, event) {
					me.showForm();
				}
			}),
			Ext.create('Ext.Action', {
				iconCls   : 'delete',
				text: 'Устгах',
				disabled: me.remove,
				handler: function(widget, event) {
					me.deleteRecord();
				}
			}),			
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'help',
				text: 'Тусламж',
				handler: function(widget, event) {
					new OCS.HelpWindow({
						id: me.func
					}).show();
				}
			})			
		];
		

		me.filterData('Active Goals');
		return me.actions;
	}
});

Ext.define('OCS.MyPlanningWithFormPanel', {	
	extend: 'OCS.MyGridWithFormPanel',
	
	createActions: function(actions) {
		var me = this;
		me.actions = [
			Ext.create('Ext.Action', {
				iconCls: 'list',
				text: 'Views',
				menu: {
					xtype: 'menu',
					items: [
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Active Plan',
							handler: function(widget, event) {
								me.filterData('Active Plan');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Closed Plan',
							handler: function(widget, event) {
								me.filterData('Closed Plan');
							}
						}),
						'-',
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'All Plan',
							handler: function(widget, event) {
								me.filterData('All Plan');
							}
						})
					]
				}		
			}),
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'add',
				text: 'New...',
				disabled: me.insert,
				handler: function(widget, event) {
					me.form.updateSource(me.defaultRec);
					me.form.setVisible(true);
				}
			}),
			Ext.create('Ext.Action', {
				iconCls   : 'edit',
				text: 'Засах...',
				handler: function(widget, event) {
					me.showForm();
				}
			}),
			Ext.create('Ext.Action', {
				iconCls   : 'delete',
				text: 'Устгах',
				disabled: me.remove,
				handler: function(widget, event) {
					me.deleteRecord();
				}
			}),			
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'help',
				text: 'Тусламж',
				handler: function(widget, event) {
					new OCS.HelpWindow({
						id: me.func
					}).show();
				}
			})			
		];
		

		me.filterData('Active Plan');
		return me.actions;
	}
});

Ext.define('OCS.CompetitorGridWithFormPanel', {	
	extend: 'OCS.MyGridWithFormPanel',
	filter: false,	
	
	reload: function() {
		var me = this;
		me.store.reload();
	},

	updateSource: function(competitor_name) {
		var me = this;
		me.where = competitor_name;
		me.values = 'competitor_name';
		me.loadStore(competitor_name);
	},
	
	createActions: function(actions) {
		var me = this;
		me.actions = [			
			Ext.create('Ext.Action', {
				iconCls   : 'deal',
				text: 'Deal ...',
				handler: function(widget, event) {
					if (me.recordSelected())
						new OCS.NewDealWindow({
							selected: me.grid.getView().getSelectionModel().getSelection()[0]
						}).createWindow();
				}
			}),
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'export',
				text: 'Экспорт',
				handler: function(widget, event) {
					if (!Ext.fly('frmDummy')) {
						var frm = document.createElement('form');
						frm.id = 'frmDummy';
						frm.name = 'url-post';
						frm.className = 'x-hidden';
						document.body.appendChild(frm);
					}

					Ext.Ajax.request({
					   url: 'avia.php',
					   isUpload: true,
					   form: Ext.fly('frmDummy'),
					   params: {handle: 'file', action:'export', where: me.title},					
					   success: function(response, opts) {					
						  Ext.MessageBox.alert('Status', 'Success !', function() {});
					   },
					   failure: function(response, opts) {
						  Ext.MessageBox.alert('Status', 'Error !', function() {});
					   }
					});	
				}
			}),
			'-',
			Ext.create('Ext.Action', {
				iconCls   : 'help',
				text: 'Тусламж',
				handler: function(widget, event) {
					new OCS.HelpWindow({
						id: me.func
					}).show();
				}
			})			
		];

		return me.actions;
	}
});

Ext.define('OCS.DealGridWithFormPanel', {	
	extend: 'OCS.MyGridWithFormPanel'
});


Ext.define('OCS.MyProfile', {	
	extend: 'OCS.Module',	

	createBars: function() {
		var me = this;	
	},
	
	reload: function() {
		var me = this;
		views['mylog'].loadStore();
		me.owners.loadStore();
	},

	selectedRecord: function() {
		var me = this;
		return views['mylog'].selectedRecord();
	},

	createPanel: function() {
		var me = this;
		
		me.calendar = Ext.create('Ext.picker.Date', {
			id: 'my_calendar',
			xtype: 'datepicker',
			region: 'south',			
			border: true,
			split: true,
			width: 220,
			handler: function(picker, date) {					
				me.grid.loadStore(Ext.Date.format(date, 'Y-m-d'));				
			}				
		});
		
		views['mylog'] = new OCS.MyActivityGrid();

		views['workflow'] = new Ext.create('OCS.MyGridWithFormPanel', {
			modelName: 'CRM_WORKFLOW',
			func: 'crm_workflow_list',
			table: 'crm_workflow',
			sortField: '_date',			
			dateField: '_date',
			sortDirection: 'desc',
			filter: false,
			searchBar : false,
			buttons: true,
			border: false,
			defaultRec: {
				data: {
					id: '0',
					start_date: Ext.Date.format(new Date(),'Y-m-d'),
					start_time: '09:00',
					end_date: Ext.Date.format(new Date(),'Y-m-d'),
					end_time: '18:00',
					_date: Ext.Date.format(new Date(),'Y-m-d h:m:s'),
					workflow_status: 'processing',
					precent: '0',
					priority: 'medium',
					owner: selectedOwner,
					userCode: logged
				}
			}
		});
		
		me.owners = new OCS.OwnerView();
		views['calendar'] = new Ext.create('OCS.MyCalendar');

		me.panel = Ext.create('Ext.panel.Panel', {
			layout: 'border',
			border: false,
			bodyPadding: 2,
			region: 'center',
			items : [{
				xtype: 'panel',
				layout: 'border',
				width: 480,				
				border: false,
				split: true,
				minWidth: 300,
				region: 'west',
				items: [{
					xtype: 'panel',
					region: 'center',
					flex: 0.5,
					title: 'Members',
					width: 380,
					autoScroll: true,
					collapsible: true,
					collapsed: false,
					items: [me.owners.createView()]
				},views['mylog'].createPanel()]	
			}, {
				xtype: 'panel',
				layout: 'border',
				region: 'center',
				flex: 1,
				border: false,
				items: [
					views['calendar'].createPanel(),
					{
						xtype: 'panel',
						layout: 'border',
						split: true,						
						region: 'south',
						flex: 0.7,
						items: [views['workflow'].createGrid()]	
					}					
				]
			}]
		});

		return me.panel;
	}
});

Ext.define('OCS.CompetitorProfile', {	
	extend: 'OCS.Module',	

	createBars: function() {
		var me = this;	
	},
	
	reload: function() {
		var me = this;

	},

	createPanel: function() {
		var me = this;
			
		views['competitor_deals'] = new Ext.create('OCS.CompetitorGridWithFormPanel', {
			modelName: 'CRM_DEAL',
			func: 'crm_competitor_deal_list',
			table: 'crm_deals',
			sortField: '_date',			
			dateField: '_date',
			values: 'competitor_name',
			sortDirection: 'desc',
			filter: false,
			searchBar : false,
			buttons: true,
			border: false,
			defaultRec: {
				data: {
					id: '0'
				}
			}
		});
			

		me.complist = new OCS.CompetitorView();
		
		me.cdealPosts = new OCS.CompetitorDealPostGrid();
		me.cdealContact = new OCS.CompetitorDealContactGrid();
		me.cdealActivity = new OCS.CompetitorDealActivityGrid();
		me.cdealProduct = new OCS.CompetitorDealProductGrid();
		me.cdealCompotetor = new OCS.CompetitorDealCompetitorGrid();
		me.cdealTeams = new OCS.CompetitorDealSalesTeamGrid();

		me.tabs = Ext.widget('tabpanel', {
			activeTab: 0,
			flex: 1,			
			border: false,
			region: 'south',
			split: true,
			tabPosition: 'top',	
			items: [
				me.cdealPosts.createPanel(),
				me.cdealContact.createPanel(),			
				me.cdealActivity.createPanel(),
				me.cdealProduct.createPanel(),
				me.cdealCompotetor.createPanel(),
				me.cdealTeams.createPanel()
			]
		});

		me.panel = Ext.create('Ext.panel.Panel', {
			layout: 'border',
			border: false,
			bodyPadding: 2,
			region: 'center',
			items : [{
				xtype: 'panel',
				layout: 'border',
				width: 380,				
				border: true,
				split: true,
				minWidth: 300,
				region: 'west',
				items: [me.complist.createView()]	
			}, {
				xtype: 'panel',
				layout: 'border',
				region: 'center',
				flex: 1,
				border: true,
				items: [views['competitor_deals'].createGrid(), me.tabs]
			}]
		});

		views['competitor_deals'].selectionModel().on({
			selectionchange: function(sm, selections) {
				if (selections.length) {
					var rec = selections[0];
					me.reload(rec);
				}			
			}
		});		

		return me.panel;
	},

	reload: function(rec) {
		var me = this;
		me.cdealContact.updateSource(rec);
		me.cdealPosts.updateSource(rec);
		me.cdealActivity.updateSource(rec);
		me.cdealProduct.updateSource(rec);
		me.cdealCompotetor.updateSource(rec);
		me.cdealTeams.updateSource(rec);
	}
});



Ext.define('OCS.MyCalendar', {	
	extend: 'OCS.Module',	

	createPanel: function() {
		var me = this;				
		
		me.frame = Ext.create('Ext.panel.Panel', {
			xtype: 'panel',
			region: 'center',
			bodyPadding: 0,
			frame: false,
			border: false,
			height: 600,
			autoLoad: {
				url: 'calenar.php?account='+gmailAccount
			}
		});

		me.panel = Ext.create('Ext.panel.Panel', {
			layout: 'border',
			border: true,
			title: 'Календар',
			collapsible: true,
			region: 'center',
			autoScroll: true,
			items : [me.frame]
		});

		return me.panel;
	},

	loadPanel: function(account) {
		var me = this;
		Ext.Ajax.request({
			url: 'calenar.php?account='+account,
			success: function (response) {
				me.frame.update(response.responseText);
			}
		});
	}
});

Ext.define('OCS.UploadWindow', {
	extend: 'OCS.Window',
	title: 'Upload from xls',
	maximizable: true,
	width: 470,
	height: 160,

	initComponent: function() {
		var me = this;

		me.form = Ext.create('OCS.UploadForm', {
			id : 'upload_form',
			region: 'center',
			name: this.name,
			win: this
		});

		me.items = [me.form];
		me.callParent(arguments);
	}
});

Ext.define('OCS.MergeRecordsWindow', {
	extend: 'OCS.Window',
	title: 'Нэгтгэх...',
	table: 'crm_customer',
	maximizable: true,
	width: 950,
	height: 450,
	modal: true,

	initComponent: function() {
		var me = this;

		me.form = Ext.create('OCS.MergeRecordForm', {
			id : 'merge_form',
			region: 'center',
			win: this,
			name: me.name,
			table: me.table,
			master: me.master,
			slave: me.slave
		});

		me.items = [me.form];
		me.callParent(arguments);
	}
});

Ext.define('OCS.RetailNewWindow', {
	extend: 'OCS.Window',
	title: 'New contact',
	table: 'crm_customer',
	maximizable: true,
	modal: true,
	width: 650,
	height: 555,
	
	initComponent: function() {
		var me = this;

		me.form = Ext.create('OCS.RetailForm', {
			id : 'retail_form',
			region: 'center',
			win : this,
			selected: me.selected
		});

		me.items = [me.form];
		me.callParent(arguments);
	}
});

Ext.define('OCS.ContactNewWindow', {
	extend: 'OCS.Window',
	title: 'New contact',
	table: 'crm_customer',
	maximizable: true,
	modal: true,
	width: 750,
	height: 450,
	layout: 'border',

	initComponent: function() {
		var me = this;
		
		if (me.selected) {
			if (me.selected.get('crm_name'))
				me.title = 'Add contact to - '+me.selected.get('crm_name').split(',')[0];
			else
				me.title = 'Add contact to - '+me.selected.get('firstName');
		}

		me.form = Ext.create('OCS.ContactForm', {
			id: 'contact_form',
			region: 'center',
			record: me.record,
			win: this
		});

		me.listeners = {
			'close': function() {
				if (me.backgrid)
					me.backgrid.getStore().reload();
			}
		}
		
		me.views = Ext.create('OCS.ContactView', {
			flex: 1,
			region: 'center'
		});

		me.items = [{
			region: 'center',
			flex: 1,
			border: false,
			layout: 'border',
			items: [me.views.createView()]
		}, {
			flex: 1,
			split: true,
			border: false,
			region: 'north',
			layout: 'border',
			items:[me.form]
		}];

		me.callParent(arguments);
	}
});

Ext.define('OCS.CorporateNewWindow', {
	extend: 'OCS.Window',
	title: 'New account',
	table: 'crm_customer',
	maximizable: true,
	modal : true,
	width: 700,
	height: 560,

	initComponent: function() {
		var me = this;

		me.form = Ext.create('OCS.CorporateForm', {
			id : 'corporate_form',
			region: 'center',
			win : this,
			selected: me.selected
		});

		me.items = [me.form];
		me.callParent(arguments);
	}
});

Ext.define('OCS.CustomerCampaignWindowCheckList', {
	extend: 'OCS.Window',
	title: 'Campaign list',
	table: 'crm_campaign',
	maximizable: true,
	modal : true,
	width: 300,
	height: 350,

	initComponent: function() {
		var me = this;

		me.form = Ext.create('OCS.CustomerCampaignForm', {
			id : 'customer_campaign_form',
			region: 'center',
			crm_id: this.crm_id,
			win : this
		});
		
		me.listeners = {
			'close': function() {
				if (me.backgrid)
					me.backgrid.getStore().reload();
			}
		}

		me.items = [me.form];
		me.callParent(arguments);
	}
});


Ext.define('OCS.CustomerCompanyWindowCheckList', {
	extend: 'OCS.Window',
	title: 'Company list',
	table: 'crm_customer_company',
	maximizable: true,
	modal : true,
	width: 300,
	height: 350,

	initComponent: function() {
		var me = this;

		me.form = Ext.create('OCS.CustomerCompanyForm', {
			id : 'customer_company_form',
			region: 'center',
			crm_id: this.crm_id,
			win : this
		});
		
		me.listeners = {
			'close': function() {
				if (me.backgrid)
					me.backgrid.getStore().reload();
			}
		}

		me.items = [me.form];
		me.callParent(arguments);
	}
});


Ext.define('OCS.LeadWindow', {
	extend: 'OCS.Window',
	title: 'New Lead',
	table: 'crm_customer',
	maximizable: true,
	width: 350,
	height: 400,

	initComponent: function() {
		var me = this;

		me.form = Ext.create('OCS.FormPanel', {
			id : 'lead_form',				
			title:'Lead detail',	
			region: 'center',
			hidden: false,
			closable: false,
			title: '',
			items: [{
				xtype: 'searchcombo',
				fieldLabel: 'Нэр',
				table: 'crm_customer',
				name: 'firstName',
				allowBlank: false,
				typeAhead: true
			},{
				xtype: 'searchcombo',
				fieldLabel: 'Утас',
				allowBlank: false,
				table: 'crm_customer',
				name: 'phone',
				typeAhead: true
			},
			{
				xtype: 'combo',
				fieldLabel: 'Төрөл',
				valueField: 'id',
				displayField: 'value',
				name: 'customer_type',
				value: (userType == 'retail' ?0:1),				
				queryMode: 'local',				
				store: Ext.create('Ext.data.Store', {
				  model: 'CRM_OBJECT',
				  data: [{id: 0, value: 'retail'},{id: 1, value: 'corporate'}]
			    })
			},
			{
				name: 'source',
				fieldLabel: 'Lead source',
				xtype: 'combo',
				value: 'employee referral',
				store: Ext.create('Ext.data.Store', {
				  model: 'CRM_ITEM',
				  data: [{value: 'partner'},{value: 'employee referral'},{value: 'external referral'},{value: 'public relations'},{value: 'party'},{value: 'advertisement'},{value: 'cold call'},{value: 'web research'}]
				}),							  
				queryMode: 'local',
				displayField: 'value',
				valueField: 'value',
				triggerAction: 'all',
				editable: false
			},{
				xtype: 'searchcombo',
				fieldLabel: 'Campaign',
				allowBlank: true,
				table: 'crm_campaign',
				name: 'campaign',
				typeAhead: true
			},{
				xtype: 'textfield',
				fieldLabel: 'Owner',				
				name: 'owner',
				value: logged,
				readOnly: true
			},{
				xtype: 'textfield',
				fieldLabel: 'Created by',				
				name: 'userCode',
				value: logged,
				readOnly: true
			},{
				xtype: 'datefield',
				fieldLabel: 'Created on',
				value: new Date(),
				format: 'Y-m-d',
				name: '_date'
			},{
				xtype: 'textarea',
				fieldLabel: 'Note',
				hideLabel: true,
				name: 'descr',
				emptyText: 'Note ...',
				style: 'margin:0', 
				flex: 1 
			}],
			buttons: [{
				text: 'Илгээх',
				iconCls: 'commit',
				handler: function() {
					var form = this.up('form').getForm();
					if (form.isValid())	{
						var values = form.getValues(true);
						me.commitRecord(values);
					}
					else
					  Ext.MessageBox.alert('Status', 'Invalid data !', function() {});
				}
			}]
		});				

		me.items = [me.form];
		me.callParent(arguments);
	}
});

Ext.define('OCS.LeadИмпортWindow', {
	extend: 'OCS.Window',
	
	title:  'Импорт leads',
	id: 'lead_import_window',
	maximizable: true,
	width: 750,
	minWidth: 650,
	height: 450,

	initComponent: function() {
		var me = this;	

		me.store = Ext.create('Ext.data.ArrayStore', {
			fields: [
			   {name: 'firstName'},
			   {name: 'lastName'},
			   {name: 'phone'},
			   {name: 'email'},
			   {name: 'source'},
			   {name: 'campaign'},
			   {name: 'owner'}
			],
			data: []			
		});

		me.pbar = Ext.create('Ext.Toolbar', {
			items: [{
					text: 'Create leads ...',
					iconCls: 'add',
					handler: function() {
						var selectedRecords = me.grid.getSelectionModel().getSelection();
						if (selectedRecords.length == 0)
						{
							Ext.MessageBox.alert('Status', 'Сонгогдсон мөр байхгүй байна !', function() {});
							return;
						}
						Ext.MessageBox.show({
						   title: 'Please wait',
						   msg: 'Loading items...',
						   progressText: 'Initializing...',
						   width:300,
						   progress:true,
						   closable:false,
						   animateTarget: 'mb6'
					   });

					   var values = '';
					   var f = function(v){
							return function(){
								if (v == 3) {
									var selectedRecords = me.grid.getSelectionModel().getSelection();
									
									for (i = 0; i <  selectedRecords.length; i++){			
										data = selectedRecords[i];
										values += 'firstName='+data.get('firstName')+'&'+
												  'phone='+data.get('phone')+'&'+
												  'email='+data.get('email')+'&'+
												  'source='+data.get('source')+'&'+
												  'campaign='+data.get('campaign')+'&'+
												  'owner='+data.get('owner')+'&'+
												  'userCode='+logged+'$';
									}
								} else 
								if (v == 9)
								{ 
									Ext.Ajax.request({
									   url: 'avia.php',
									   params: {handle: 'web', action: 'insert', table: 'crm_customer', func: '', values: values, fields: '', where: ''},
									   success: function(response, opts) {
										  me.store.removeAll();
										  me.setTitle('Импорт leads');
									   },
									   failure: function(response, opts) {										   
										  Ext.MessageBox.alert('Status', 'Error !', function() {});
									   }
									});
								} else
								if(v == 12){
									Ext.MessageBox.hide();																		
								}else{
									var i = v/11;
									Ext.MessageBox.updateProgress(i, Math.round(100*i)+'% completed');
								}
						   };
					   };
					   for(var i = 1; i < 13; i++){
						   setTimeout(f(i), i*500);
					   }						
					}
				},'-',{
					text: 'Clear all',
					iconCls: 'delete',
					handler: function() {
						me.store.removeAll();
						me.win.setTitle('Lead import');
					}
				},'->',{
					text: 'Хайлт : '				
				},{
					xtype: 'textfield',
					width: 150,
					listeners: {
						 change: {
							 fn: function(e) {
								 me.store.clearFilter(true);
								 me.store.filter('phone', e.getValue());
							 },
							 scope: this,
							 buffer: 200
						 }
					}
				}
			]
		});

		me.grid = Ext.create('Ext.grid.Panel', {	
			id: 'lead_import_grid',
			tbar: me.pbar,
			store: me.store,
			border: false,
			region: 'center',
			columnLines: true,
			selType: 'checkboxmodel',			
			plugins: [{
				ptype: 'datadrop',
				addBulk : true,
				id: 'lead_import_window'
			}],
			columns: [				
				{
					text     : 'Нэр',
					width    : 150,
					sortable : true,
					dataIndex: 'firstName'
				},
				{
					text     : 'Утас',
					width    : 70,
					sortable : true,
					align	 : 'center',
					dataIndex: 'phone',
					renderer : renderWarningByPhone
				},
				{
					text     : 'Email',
					width    : 110,
					sortable : true,
					dataIndex: 'email'
				},
				{
					text     : 'Эх сурвалж',
					width    : 125,
					sortable : true,
					dataIndex: 'source'
				},				
				{
					text     : 'Campaign',
					width    : 150,
					sortable : true,
					dataIndex: 'campaign'
				},
				{
					text     : 'Owner',
					width    : 100,
					sortable : true,
					dataIndex: 'owner',
					renderer : renderOwner
				}
			],
			viewConfig: {
				stripeRows: true,
				deferEmptyText: false,
				emptyText: 'drop here !'
			}
		});	
	
		me.items = [me.grid];		
		me.callParent(arguments);	
	}
});

Ext.define('OCS.ContactView', {
	extend: 'OCS.Module',
	func: 'crm_contact_list',	
	table: 'crm_customer',
	tab: 'none',
	title: 'Search contact',

	createActions: function() {
		var me = this;
		me.actions = [

		];

		return me.actions;
	},
	
	callStore: function(rec) {
		var me = this;		

	},	

	createView: function() {
		var me = this;
		me.modelName = 'CRM_CONTACT';
		me.createStore();

		me.grid = Ext.create('OCS.GridView', {	
			title: me.title,
			store: me.store,
			columns: me.createColumns(),
			actions: me.createActions(),
			func: me.func,
			tab: me.tab,
			search: true,
			tbarable: true
		});						

		return me.grid;
	}
});

Ext.define('OCS.ResellerContactView', { 
	extend: 'OCS.ContactView',
	func: 'crm_reseller_list',	
	table: 'crm_customer',
	tab: 'none',
	title: '',
	
	createActions: function() {
		var me = this;
		me.actions = [{
			iconCls: 'select-node',
			text: 'For selected records',
			handler: function(widget, event) {		
				if (me.grid.recordSelected()) {				
					Ext.getCmp('connection_form').getForm().findField('selected').setValue(me.grid.selectedIds('crm_id'));
					Ext.getCmp('connection_form').show();
				}
			}
		},{
			iconCls: 'select-node-all',
			text: 'For all records',
			handler: function(widget, event) {		
				Ext.getCmp('connection_form').getForm().findField('selected').setValue('all');
				Ext.getCmp('connection_form').show();
			}
		}];

		return me.actions;
	},

	createView: function() {
		var me = this;
		me.modelName = 'CRM_CONTACT';
		me.createStore();

		me.grid = Ext.create('OCS.GridView', {	
			title: me.title,
			store: me.store,
			columns: me.createColumns(),
			actions: me.createActions(),
			func: me.func,
			tab: me.tab,
			search: true,
			tbarable: true
		});						

		return me.grid;
	}
});


Ext.define('OCS.CampaignContactView', {
	extend: 'OCS.ContactView',
	func: 'crm_campaign_customer_list',
	title: 'Campaign members',
	tab: 'campaign_members_tab',
	border: false,
	
	createActions: function() {
		var me = this;
		me.actions = [
			Ext.create('Ext.Action', {
				iconCls  : 'delete',
				text: 'Remove selected members',
				handler: function(widget, event) {
					if (me.grid.recordSelected()) {	
						Ext.Msg.confirm('Warning ','Are you sure you want to remove selected records?',function(btn){
							var ids = me.grid.selectedIds('crm_id');
							Ext.Ajax.request({
							   url: 'avia.php',
							   params: {handle: 'web', table: 'crm_campaign', action: 'remove_from_campaign_customer', values: ids, where: me.where},
							   success: function(response, opts) {							  
								   Ext.MessageBox.alert('Status', response.responseText, function() {
									   me.loadStore(me.campaign);
								   });								
							   },
							   failure: function(response, opts) {										   
								  Ext.MessageBox.alert('Status', 'Error !', function() {});
							   }
							});							
						});
					}
				}
			})
		];

		return me.actions;
	},

	loadStore: function(where) {
		var me = this;	
		me.where = where;
		me.store.getProxy().extraParams = {handle: 'web', action: 'select', func: me.func, values: me.values, where: me.where};
		me.store.loadPage(1);
	},

	createView: function() {
		var me = this;
		me.modelName = 'CRM_CONTACT';
		me.createStore();

		me.grid = Ext.create('OCS.GridView', {	
			title: me.title,
			store: me.store,
			columns: me.createColumns(),
			actions: me.createActions(),
			func: me.func,
			tab: me.tab,
			feature: false,
			search: true,
			tbarable: true,
			border: me.border
		});						

		return me.grid;
	}
});

Ext.define('OCS.PotentialWindow', {
	extend: 'OCS.Window',
	
	title: 'New Potential',
	maximizable: true,
	height: 500,
	width: 400,

	initComponent: function() {
		var me = this;

		me.form = Ext.create('OCS.FormPanel', {
			id : 'potential_form',				
			title: 'Potentail detail',	
			region: 'center',
			hidden: false,
			closable: false,
			title: '',
			items: [{
				xtype: 'textfield',
				fieldLabel: 'CRM ID',
				name: 'crm_id',
				value: me.selected.get('crm_id'),
				readOnly: true
			},
			{
				xtype: 'datefield',
				fieldLabel: 'Closing date',				
				name: 'closing_date',
				value: new Date(),
				format: 'Y-m-d'
			},
			{
				xtype: 'combo',
				fieldLabel: 'Stage',
				valueField: 'value',
				displayField: 'value',
				name: 'stage',
				allowBlank: false,
				forceSelection: true,
				queryMode: 'local',
				store: Ext.create('Ext.data.Store', {
				  model: 'CRM_ITEM',
				  data: [{value: 'qualification'},{value: 'need analysis'},{value: 'value proposition'},{value: 'decision makers'},{value: 'proposal/price quote'},{value: 'negotiation review'},{value: 'renew contract'}, {value: 'closed won'}, {value: 'closed lost'}, {value: 'closed lost to competition'}]
			    })
			},{
				xtype: 'textfield',
				fieldLabel: 'Next step',
				name: 'next_step'				
			},{
				xtype: 'numberfield',
				fieldLabel: 'Probablity %',
				maxValue: 100,
				minValue: 0,
				value: 50,
				name: 'probablity'				
			},{
				xtype: 'searchcombo',
				fieldLabel: 'Product',
				table: 'crm_products',
				name: 'product_name'
			},{
				xtype: 'currencyfield',
				fieldLabel: 'Actual cost',
				value: 0,
				name: 'amount'			
			},{
				xtype: 'currencyfield',
				fieldLabel: 'Expected revenue',
				value: 0,
				name: 'expected_revenue'			
			},{
				xtype: 'searchcombo',
				fieldLabel: 'Campaign',
				table: 'crm_campaign',
				value: me.selected.get('campaign'),
				name: 'campaign'
			},{
				xtype: 'textfield',
				fieldLabel: 'Owner',				
				name: 'owner',
				value: logged,
				readOnly: true
			},{
				xtype: 'textfield',
				fieldLabel: 'Created by',				
				name: 'userCode',
				value: logged,
				readOnly: true
			},{
				xtype: 'textarea',
				fieldLabel: 'Note',
				hideLabel: true,
				name: 'descr',
				emptyText: 'Note ...',
				style: 'margin:0', 
				flex: 1 
			}],
			buttons: [{
				text: 'Илгээх',
				iconCls: 'commit',
				handler: function() {
					var form = this.up('form').getForm();					
					if (form.isValid())	{
						var values = form.getValues(true);

						Ext.Ajax.request({
						   url: 'avia.php',
						   params: {handle: 'web', table: 'crm_potentials', action: 'insert', values: values, where: ''},
						   success: function(response, opts) {
							    views['leadopportunity'].reload();
								me.close();
						   },
						   failure: function(response, opts) {										   
							  Ext.MessageBox.alert('Status', 'Error !', function() {});
						   }
						});	

						if (form.findField('stage').getValue() == 'closed won') {
							Ext.Ajax.request({
							   url: 'avia.php',
							   params: {handle: 'web', table: 'crm_customer', action: 'update', values: "level='prospect'", where: "crm_id="+me.selected.get('crm_id')},
							   success: function(response, opts) {
									Ext.MessageBox.alert('Status', 'Prospect төлөвт шилжлээ !', function() {});
							   },
							   failure: function(response, opts) {										   
								  Ext.MessageBox.alert('Status', 'Error !', function() {});
							   }
							});
						}
					}
					else
					  Ext.MessageBox.alert('Status', 'Invalid data !', function() {});
				}
			}]
		});
		
		me.items = [me.form];		
		me.callParent(arguments);
	}
});


Ext.define('OCS.GoogleCalendarWindow', {
	extend: 'OCS.Window',
	title: 'Google Calendar',
	maximizable: true,
	width: 550,
	height: 550,

	initComponent: function() {
		var me = this;		
		me.items = [{
			xtype:'panel',
			region: 'center',
			autoLoad: {
				url: 'https://www.google.com/calendar/embed?bgcolor=%23ccccff&output=embed&src='+logged+'&ctz=Asia/Ulaanbaatar'
				//url: 'calendar.php'
			}
		}];
		me.callParent(arguments);
	}
});
