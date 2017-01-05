Ext.define('OCS.Reports', {
	extend: 'OCS.Module',	
	modelName: 'CRM_REPORT',
	func: 'crm_report_deal_list',

	createActions: function() {
		var me = this;
		me.actions = [		
			Ext.create('Ext.Action', {
				iconCls: 'list',
				id: 'report_title',
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
								window.open('http://103.48.116.112/mrep');
							}
						}),								
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Борлуулагчийн нэгдсэн тайлан',
							handler: function(widget, event) {
								me.where = '';
								me.values = '';
								me.panelW.setVisible(false);
								Ext.getCmp('report_owner').setVisible(false);
								Ext.getCmp('report_title').setText('Борлуулагчийн нэгдсэн тайлан');
								me.reconfigure('CRM_REPORT_USER', 'crm_report_user_list');
							}
						}),										
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Бүтээгдэхүүний нэгдсэн тайлан',
							handler: function(widget, event) {
								me.where = '';
								me.values = '';
								me.panelW.setVisible(false);
								Ext.getCmp('report_stage_type').setVisible(true);
								Ext.getCmp('report_owner').setVisible(false);
								Ext.getCmp('report_title').setText('Бүтээгдэхүүний нэгдсэн тайлан');
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
								Ext.getCmp('report_owner').setVisible(true);
								Ext.getCmp('report_title').setText('Харилцагчийн нэгдсэн тайлан');
								me.reconfigure('CRM_REPORT_CUSTOMER', 'crm_report_customer_list');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',   
							hidden: false,
							text: 'Борлуулалтын тайлан /хувьтай/',
							handler: function(widget, event) {
								me.where = '';
								me.values = '';
								me.panelW.setVisible(false);
								Ext.getCmp('report_owner').setVisible(true);
								Ext.getCmp('report_title').setText('Борлуулалтын тайлан /хувьтай/');
								me.reconfigure('CRM_REPORT_SALES_PRECENT', 'crm_report_sales_precent_list');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Борлуулагчийн идэвхи',
							handler: function(widget, event) {
								me.where = '';
								me.values = '';
								me.panelW.setVisible(false);
								window.open('http://103.48.116.112/opg');
							}
						}),
						'-',
							Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Барааны харьцуулалтын тайлан',
							handler: function(widget, event) {
								me.where = '';
								me.values = '';
								me.panelW.setVisible(false);
								Ext.getCmp('report_owner').setVisible(false);
								Ext.getCmp('report_unit_type').setVisible(true);
								Ext.getCmp('report_start').setVisible(false);
								Ext.getCmp('report_end').setVisible(false);
								Ext.getCmp('report_title').setText('Барааны харьцуулалтын тайлан');
								me.reconfigure('CRM_REPORT_COMPARE_PRODUCT', 'crm_report_compare_product_list');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Харилцагчийн харьцуулалтын тайлан',
							handler: function(widget, event) {
								me.where = '';
								me.values = '';
								me.panelW.setVisible(false);
								Ext.getCmp('report_owner').setVisible(true);
								Ext.getCmp('report_start').setVisible(false);
								Ext.getCmp('report_end').setVisible(false);
								Ext.getCmp('report_title').setText('Харилцагчийн харьцуулалтын тайлан');
								me.reconfigure('CRM_REPORT_COMPARE_CUSTOMER', 'crm_report_compare_customer_list');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Борлуулагчийн харьцуулалтын тайлан',
							handler: function(widget, event) {
								me.where = '';
								me.values = '';
								me.panelW.setVisible(false);
								Ext.getCmp('report_owner').setVisible(false);
								Ext.getCmp('report_start').setVisible(false);
								Ext.getCmp('report_end').setVisible(false);
								Ext.getCmp('report_title').setText('Борлуулагчийн харьцуулалтын тайлан');
								me.reconfigure('CRM_REPORT_COMPARE_USER', 'crm_report_compare_user_list');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Борлуулагч болон Барааны харьцуулалтын тайлан',
							handler: function(widget, event) {
								me.where = '';
								me.values = '';
								me.panelW.setVisible(false);
								Ext.getCmp('report_owner').setVisible(false);
								Ext.getCmp('report_unit_type').setVisible(true);
								Ext.getCmp('report_start').setVisible(true);
								Ext.getCmp('report_end').setVisible(true);
								Ext.getCmp('report_title').setText('Борлуулагч болон Барааны харьцуулалтын тайлан');
								me.reconfigure('CRM_REPORT_COMPARE', 'crm_report_compare_product_user_list');
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
								Ext.getCmp('report_owner').setVisible(false);
								Ext.getCmp('report_title').setText('Агуулахын тайлан');
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
								Ext.getCmp('report_owner').setVisible(true);
								Ext.getCmp('report_title').setText('Агуулахын тайлан өдрөөр');
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
								Ext.getCmp('report_owner').setVisible(false);
								Ext.getCmp('report_title').setText('Орлогын тайлан (хэлцэлээр)');
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
								Ext.getCmp('report_owner').setVisible(false);
								Ext.getCmp('report_title').setText('Хэлцэлийн тайлан');
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
								Ext.getCmp('report_owner').setVisible(false);
								Ext.getCmp('report_title').setText('Үйл ажиллагааны тайлан');
								me.reconfigureStatic('CRM_REPORT_ACTIVITY', 'crm_report_activity_list');
							}
						}),
						Ext.create('Ext.Action', {
							icon   : '',  
							text: 'Гомдол саналын тайлан',
							handler: function(widget, event) {
								me.panelW.setVisible(false);
								Ext.getCmp('report_owner').setVisible(false);
								Ext.getCmp('report_title').setText('Гомдол саналын тайлан');
								me.reconfigureStatic('CRM_REPORT_CASE', 'crm_report_case_list');
							}
						})
					]
				}		
			}),
			'-',
			{
				id: 'report_owner',
				hidden: true,
				xtype: 'searchcombo',
				fieldLabel: 'Борлуулагч',
				labelWidth: 60,
				width: 250,
				listWidth: 250,
				table: 'crm_users',				
				name: 'owner',
				listeners: {
					'change': function() {
						me.rangeData();
					}
				}
			},
			'-',
			{
			    id : 'report_stage_type',
			    xtype: 'combo',
			    store: Ext.create('Ext.data.Store', {
				    model: 'CRM_ITEM',
				    data: [{value: 'ирсэн'},{value: 'зөвшөөрсөн'},{value: 'бүгд'}]
			    }),
			    name: 'report_unit_type',
			    queryMode: 'local',
  			    displayField: 'value',
			    value: 'ирсэн',					 
			    valueField: 'value',
			    editable: false,
			    listeners: {
				  	  'change': function() {
					  	  me.rangeData();
					  }
				}
			},
			{
			  id : 'report_unit_type',
			  xtype: 'combo',
			  store: Ext.create('Ext.data.Store', {
  				  model: 'CRM_ITEM',
 				  data: [{value: 'тоогоор'},{value: 'мөнгөн дүнгээр'}]
              }),
			  name: 'report_unit_type',
			  queryMode: 'local',
		      displayField: 'value',
			  value: 'мөнгөн дүнгээр',					 
			  valueField: 'value',
			  triggerAction: 'all',
			  hidden: true,
			  editable: false,
			  listeners: {
					'change': function() {
						me.rangeData();
					}
			  }
			},
			{
				id: 'report_start',
				text: me.today(),
				iconCls: 'calendar',
				menu: Ext.create('Ext.menu.DatePicker', {
					handler: function(dp, date){
						me.start = Ext.Date.format(date, 'Y-m-d');
						me.report.start = Ext.Date.format(date, 'Y-m-d');
						Ext.getCmp('report_start').setText(me.start);
						me.rangeData();
					}
				})
			},
			{
				id: 'report_end',
				text: me.tommorow(),
				iconCls: 'calendar',				
				menu: Ext.create('Ext.menu.DatePicker', {
					handler: function(dp, date){
						me.end = Ext.Date.format(date, 'Y-m-d');
						me.report.end = Ext.Date.format(date, 'Y-m-d');
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
					me.report.start = me.month();
					me.report.end = me.nextmonth();
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
		me.start = me.today();
		me.end = me.tommorow();
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
		
		Ext.getCmp('report_title').setText('Бүтээгдэхүүний нэгдсэн тайлан');
		me.reconfigure('CRM_REPORT_PRODUCT', 'crm_report_product_list');

		return me.panel;
	},

	rangeData: function() {
		var me = this;
		me.where = Ext.getCmp('report_owner').getValue()+','+Ext.getCmp('report_unit_type').getValue()+','+Ext.getCmp('report_stage_type').getValue();
		me.report.where = Ext.getCmp('report_owner').getValue()+','+Ext.getCmp('report_unit_type').getValue()+','+Ext.getCmp('report_stage_type').getValue();
		me.store.getProxy().extraParams = {handle: 'web', action: 'select', func: me.func, start_date: me.start, end_date: me.end, values: me.values, where: me.where};
		me.store.loadPage(1);
	}
});