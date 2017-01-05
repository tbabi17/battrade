fields['CRM_PRODUCT_FIELDS'] = [
   {name: 'product_id', text: 'ID', width: 50, hidden:true}, 
   {name: 'product_code', text: 'Код', width: 80, align:'center', primary: true}, 
   {name: 'product_barcode', text: 'Баркод', align:'center', width: 90, primary: true}, 
   {name: 'product_name', text: 'Нэр', width: 250, primary: true},   
   {name: 'product_type', text: 'Төрөл', width: 200},
   {name: 'product_brand', text: 'Бренд', width: 100},
   {name: 'product_vendor', text: 'Үйлдвэрлэгч', width: 250, hidden: true},
   {name: 'discount', text: 'Хөнгө%', type: 'float', width: 80, renderer: renderPrecent, align: 'right', hidden: true},
   {name: 'price', text: 'Үнэ', type: 'float', width: 80, renderer: renderMoney, align: 'right'},
   {name: 'price1', text: price_text[1], type: 'float', width: 80, renderer: renderMoney, align: 'right'},
   {name: 'price2', text: price_text[2], type: 'float', width: 80, renderer: renderMoney, align: 'right', hidden: true},
   {name: 'price3', text: price_text[3], type: 'float', width: 80, renderer: renderMoney, align: 'right', hidden: true},
   {name: 'price4', text: price_text[4], type: 'float', width: 80, renderer: renderMoney, align: 'right', hidden: true},
   {name: 'price5', text: price_text[5], type: 'float', width: 80, renderer: renderMoney, align: 'right', hidden: true},
   {name: 'price6', text: price_text[6], type: 'float', width: 80, renderer: renderMoney, align: 'right', hidden: true},
   {name: 'price7', text: price_text[7], type: 'float', width: 80, renderer: renderMoney, align: 'right', hidden: true},
   {name: 'price8', text: price_text[8], type: 'float', width: 80, renderer: renderMoney, align: 'right', hidden: true},
   {name: 'price9', text: price_text[9], type: 'float', width: 80, renderer: renderMoney, align: 'right', hidden: true},
   {name: 'price10', text: price_text[10], type: 'float', width: 80, renderer: renderMoney, align: 'right', hidden: true},
   {name: 'warehouse_id', text: 'Агуулах', type: 'int', width: 70, align: 'center'},
   {name: 'unit_type', text: 'Нэгж', width: 40},
   {name: 'userCode', text: 'Хэрэглэгч', width: 100},
   {name: 'unit_size', text: 'Хэмжээ', type: 'float', width: 40},
   {name: 'unit_metric', text: 'КГ', type: 'float', width: 40},
   {name: 'company', text: 'Тайлбар', width: 120}  
];

Ext.define('CRM_PRODUCT', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_PRODUCT_FIELDS']
});

fields['CRM_SERVICE_FIELDS'] = [
   {name: 'service_id', text: 'ID', width: 50, hidden:true}, 
   {name: 'service_stage', text: 'Үе шат', width: 85, align: 'center', renderer: renderServiceLevel},
   {name: '_date', text: 'Огноо', width: 120, renderer: renderCreatedDate},
   {name: 'subject', text: 'Гүйлгээний дугаар', width: 120, primary: true, renderer: renderTopicName},   
   {name: 'crm_id', text: 'CRM ID', hidden: true, width: 80},
   {name: 'crm_name', text: 'Харилцагч', width: 250, renderer: renderCRMName},
   {name: 'phone', text: 'Утас', width: 80, hidden: true, primary: true},
   {name: 'service_revenue', text: 'Дүн', type:'float', width: 100, align: 'right', summaryType:'sum', summaryRenderer: renderTMoney, renderer: renderMoney},
   {name: 'service_debt', text: 'Авлага', type:'float', width: 100, align: 'right', summaryType:'sum', summaryRenderer: renderTMoney, renderer: renderMoney},
   {name: 'service_precent', text: '%', type:'float', width: 50, align: 'right', summaryType:'sum', summaryRenderer: renderTPrecent, renderer: renderPrecent},
   {name: 'userCode', text: 'Бүртгэсэн', width: 140},
   {name: 'owner', text: 'Хариуцагч', width: 130, renderer: renderOwner},
   {name: 'closing_date', text: 'Хаагдах огноо', dateFormat: 'Y-m-d', width: 120, align: 'center'},   
   {name: 'remind_date', text: 'Олгосон огноо', dateFormat: 'Y-m-d', width: 120, align: 'center', renderer: renderDate}, 
   {name: 'descr', text: 'Тайлбар', width: 200, hidden: true},
   {name: 'campaign', text: 'Campaign', width: 200},
   {name: 'partner', text: 'Жолооч', width: 0},
   {name: 'warehouse_id', text: 'Агуулах', width: 0, hidden: true},
   {name: 'pricetag', text: 'Үнэ', width: 0, hidden: true},
   {name: 'right', text: 'Төлөв', width: 80}
];

Ext.define('CRM_SERVICE', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_SERVICE_FIELDS']
});

Ext.define('CRM_REPORT_ANY', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_REPORT_ANY_FIELDS']
});

fields['CRM_REPORT_FIELDS'] = [
   {name: 'crm_name', text: 'Potientail customer', width: 250, summaryType: 'count', summaryRenderer: renderTReportNumber}, 
   {name: 'product_name', text: 'Product name', width: 250}, 
   {name: 'stage', text: 'Stage', width: 85, align: 'center', renderer: renderDealLevel},
   {name: 'expected_revenue', align: 'right', type:'float', text: 'Expected revenue', width: 150, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney}, 
   {name: 'probablity', text: 'Probablity', type:'int',  width: 80, align: 'center', renderer: renderPrecent, summaryType: 'average', summaryRenderer: renderTPrecent},
   {name: 'descr', text: 'Description', width: 250},
   {name: 'owner', text: 'Owner', width: 160}
];

Ext.define('CRM_REPORT', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_REPORT_FIELDS']
});


fields['CRM_REPORT_PRODUCT_FIELDS'] = [
   {name: 'product_id', text: 'ID', width: 50, hidden: true}, 
   {name: 'product_code', text: 'Код', width: 50, align: 'center'}, 
   {name: 'product_barcode', text: 'Баркод', width: 90, align: 'center'}, 
   {name: 'product_brand', text: 'Бренд', width: 150}, 
   {name: 'product_name', text: 'Нэр', width: 250}, 
   {name: 'unit_size', text: 'Нэгж', width: 50, align: 'center'}, 
   {name: 'qty', text: 'Ширхэг', type: 'float', width: 85, align: 'right', renderer: renderNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
   {name: 'pty', text: 'Хайрцаг', type: 'float', width: 85, align: 'right', renderer: renderNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
   {name: 'amount', align: 'right', type:'float', text: 'Дүн', width: 150, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney}, 
   {name: 'avg_price', text: 'Дундаж үнэ', type:'float',  width: 90, align: 'right', renderer: renderMoney, summaryType: 'average', summaryRenderer: renderTMoney}
];

Ext.define('CRM_REPORT_PRODUCT', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_REPORT_PRODUCT_FIELDS']
});

fields['CRM_REPORT_CUSTOMER_PRODUCT_FIELDS'] = [
   {name: 'crm_id', text: 'ID', width: 50, hidden: true}, 
   {name: 'crm_name', text: 'Харилцагч', width: 250}, 
   {name: 'product_id', text: 'ID', width: 50, hidden: true}, 
   {name: 'product_code', text: 'Код', width: 50, align: 'center'}, 
   {name: 'product_brand', text: 'Бренд', width: 150}, 
   {name: 'product_name', text: 'Нэр', width: 250}, 
   {name: 'unit_size', text: 'Нэгж', width: 50, align: 'center'}, 
   {name: 'qty', text: 'Ширхэг', type: 'float', width: 85, align: 'right', renderer: renderNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
   {name: 'pty', text: 'Хайрцаг', type: 'float', width: 85, align: 'right', renderer: renderNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
   {name: 'amount', align: 'right', type:'float', text: 'Борлуулалт', width: 100, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney}
];

Ext.define('CRM_REPORT_CUSTOMER_PRODUCT', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_REPORT_CUSTOMER_PRODUCT_FIELDS']
});

fields['CRM_REPORT_USER_FIELDS'] = [
   {name: 'owner', text: 'Борлуулагч', width: 150}, 
   {name: 'entry', text: 'Орох ёстой', width: 120, align: 'right', summaryType: 'sum', summaryRenderer: renderTNumber}, 
   {name: 'orson', text: 'Орсон', width: 130, align: 'right', summaryType: 'sum', summaryRenderer: renderTNumber}, 
   {name: 'hiisen', text: 'Борлуулалт хийсэн', width: 130, align: 'right', summaryType: 'sum', summaryRenderer: renderTNumber}, 
//   {name: 'cash', text: 'Бэлэн', width: 150, align: 'right', renderer: renderMoney},
   {name: 'lease', text: 'Борлуулалт', width: 150, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
//   {name: 'payment', text: 'Зээл төлөлт', width: 150, align: 'right', renderer: renderMoney},
   {name: 'total', text: 'Нийт', width: 150, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney}
];

Ext.define('CRM_REPORT_USER', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_REPORT_USER_FIELDS']
});


fields['CRM_REPORT_CUSTOMER_FIELDS'] = [
   {name: 'crm_id', text: 'ID', width: 50, hidden: true}, 
   {name: 'crm_name', text: 'Харилцагч', width: 250}, 
   {name: 'first', text: 'Эхний үлдэгдэл', type:'float',  width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'amount1', align: 'right', type:'float', text: ware_text[0], width: 100, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'amount2', align: 'right', type:'float', text: ware_text[1], width: 100, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'amount', align: 'right', type:'float', text: 'Нийт', width: 100, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'paid', text: 'Төлсөн', type:'float',  width: 100, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'ret', text: 'Буцаалт', type:'float',  width: 100, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'changeprice', text: 'Үнэ өөрчлөлт', type:'float',  width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'discount', text: 'Хөнгөлөлт', type:'float',  width: 100, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'last', text: 'Эцсийн үлдэгдэл', type:'float',  width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
];

Ext.define('CRM_REPORT_CUSTOMER', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_REPORT_CUSTOMER_FIELDS']
});

fields['CRM_REPORT_STORAGE_FIELDS'] = [
   {name: 'product_id', text: 'ID', width: 50, hidden: true}, 
   {name: 'product_code', text: 'Код', width: 50, align: 'center'}, 
   {name: 'product_barcode', text: 'Баркод', width: 90, align: 'center'}, 
   {name: 'product_brand', text: 'Бренд', width: 150}, 
   {name: 'product_name', text: 'Нэр', width: 250}, 
   {name: 'unit_size', text: 'Нэгж', width: 50, align: 'center'}, 
   {name: 'first', type: 'float', width: 85, text: 'Эхний үлдэгдэл', width: 110, align: 'right', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
   {name: 'incoming', type: 'float', width: 85, text: 'Нэмэгдсэн', width: 100, align: 'right', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
   {name: 'ret', type: 'float', width: 85, text: 'Буцаалт', width: 100, align: 'right', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
   {name: 'sales', type: 'float', width: 85, text: 'Борлуулалт', width: 100, align: 'right', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
   {name: 'promo', type: 'float', width: 85, text: 'Урамшуулал', width: 100, align: 'right', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
   {name: 'last', type: 'float', width: 85, text: 'Эцсийн үлдэгдэл', width: 110, align: 'right', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber}
];

Ext.define('CRM_REPORT_STORAGE', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_REPORT_STORAGE_FIELDS']
});

fields['CRM_REPORT_STORAGE_DAILY_FIELDS'] = [
   {name: 'product_id', text: 'ID', width: 50, hidden: true}, 
   {name: 'product_code', text: 'Код', width: 50, align: 'center'}, 
   {name: 'product_barcode', text: 'Баркод', width: 90, align: 'center'}, 
   {name: 'product_brand', text: 'Бренд', width: 150}, 
   {name: 'product_name', text: 'Нэр', width: 250}, 
   {name: 'unit_size', text: 'Нэгж', width: 50, align: 'center'}, 
   {name: 'first', type: 'float', width: 85, text: 'Эхний үлдэгдэл', width: 110, align: 'right', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
   {name: 'incoming', type: 'float', width: 85, text: 'Нэмэгдсэн', width: 100, align: 'right', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber, hidden: true},
   {name: 'ret', type: 'float', width: 85, text: 'Буцаалт', width: 100, align: 'right', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
   {name: 'sales', type: 'float', width: 85, text: 'Борлуулалт', width: 100, align: 'right', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
   {name: 'promo', type: 'float', width: 85, text: 'Урамшуулал', width: 100, align: 'right', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
   {name: 'sku', type: 'float', width: 85, text: 'SKU', width: 50, align: 'right', renderer: renderPrecent, summaryRenderer: renderTPrecent},
   {name: 'bm1', type: 'float', width: 85, text: ware_text[2], width: 100, align: 'right', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber, hidden: true},
   {name: 'bm3', type: 'float', width: 85, text: ware_text[3], width: 100, align: 'right', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber, hidden: true},
   {name: 'shop', type: 'float', width: 85, text: ware_text[4], width: 100, align: 'right', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber, hidden: true},
   {name: 'last', type: 'float', width: 85, text: 'Эцсийн үлдэгдэл', width: 120, align: 'right', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
   {name: 'total', type: 'float', width: 85, text: 'Нийт үлдэгдэл', width: 110, align: 'right', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber}
];

Ext.define('CRM_REPORT_STORAGE_DAILY', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_REPORT_STORAGE_DAILY_FIELDS']
});


columns['CRM_REPORT_STORAGE_TRANSFER_COLUMNS'] = [
   {dataIndex: 'product_id', text: 'ID', width: 50, hidden: true}, 
   {dataIndex: 'product_code', text: 'Код', width: 50, align: 'center'}, 
   {dataIndex: 'product_brand', text: 'Бренд', width: 150}, 
   {dataIndex: 'product_name', text: 'Нэр', width: 250}, 
   {dataIndex: 'unit_size', text: 'Нэгж', width: 50, align: 'center'}, 
   {
	   text: 'Хүнс',
	   columns: [{dataIndex:'w11', text: 'Ширхэг', width: 90, align: 'right', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'w12', text: 'Хайрцаг', width: 90, align: 'right', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber}
				]
   },
   {
	   text: 'Гоо сайхан',
	   columns: [{dataIndex:'w21', text: 'Ширхэг', width: 90, align: 'right', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'w22', text: 'Хайрцаг', width: 90, align: 'right', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber}
				]
   }
];

fields['CRM_GPS_FIELDS'] = [
   {name: 'id', text: 'ID', width: 50, hidden:true}, 
   {name: '_date', type: 'datetime', dateFormat: 'Y-m-d', text: 'Created on', width: 160},
   {name: 'owner', text: 'Мэдээлэл', width: 150, renderer: renderGPSName},
   {name: 'must', text: 'Орох ёстой', width: 70, align: 'right', renderer: renderENumber},
   {name: 'enter', text: 'Орсон', width: 80, align: 'right', renderer: renderENumber},
   {name: 'lat', text: 'Lng', width: 80, hidden: true},
   {name: 'lng', text: 'Lng', width: 80, hidden: true}
];

Ext.define('CRM_GPS', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_GPS_FIELDS']
});

fields['CRM_CAMPAIGN_RESULT_FIELDS'] = [
   {name: 'owner', text: 'Owner', width: 120}, 
   {name: 'team', text: 'Team', width: 120, hidden: true}, 
   {name: 'pending', text: 'Pending', type:'int', width: 60, align: 'center', renderer: renderENumber, summaryType: 'sum', summaryRenderer: renderTNumber}, 
   {name: 'remind', text: 'Remind', type:'int', width: 60, align: 'center', renderer: renderENumber, summaryType: 'sum', summaryRenderer: renderTNumber},
   {name: 'success', text: 'Success', type:'int', width: 60, align: 'center', renderer: renderENumber, summaryType: 'sum', summaryRenderer: renderTNumber},
   {name: 'total', text: 'Total', type:'int', width: 70, align: 'center', renderer: renderENumber, summaryType: 'sum', summaryRenderer: renderTNumber},
   {name: 'performance', text: 'Performance', type:'float', width: 70, align: 'center', renderer: renderPrecent, summaryType: 'average', summaryRenderer: renderTPrecent}  
];

Ext.define('CRM_CAMPAIGN_RESULT', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_CAMPAIGN_RESULT_FIELDS']
});

fields['CRM_STORAGE_FIELDS'] = [
   {name: 'id', text: 'ID', width: 50, hidden:true}, 
   {name: 'warehouse_id', text: 'Агуулах', width: 50, hidden:true}, 
   {name: 'product_id', text: 'ID', width: 50, primary: true, hidden:true}, 
   {name: 'product_code', text: 'Код', width: 50, primary: true, align: 'center'}, 
   {name: 'product_name', text: 'Нэр', width: 250, summaryType: 'count', summaryRenderer: renderTNumber},
   {name: 'product_brand', text: 'Бренд', width: 100}, 
   {name: 'aty', text: 'Боломжит үлдэгдэл', type: 'float', width: 100,  renderer: renderNumber, align: 'right', summaryType: 'sum', summaryRenderer: renderTNumber},
   {name: 'qty', text: 'Бодит үлдэгдэл', type: 'float', width: 100, renderer: renderNumber, align: 'right', summaryType: 'sum', summaryRenderer: renderTNumber},
   {name: 'pty', text: 'Хайрцаг', hidden: true, type: 'float', width: 90, renderer: renderNumber, align: 'right', summaryType: 'sum', summaryRenderer: renderTNumber},
   {name: 'price', text: 'Үнэ', width: 120, renderer:renderMoney, hidden: true},
   {name: 'unit_type', text: 'Х.Нэгж', width: 120, align: 'center'},
   {name: 'amount', text: 'Дүн', width: 110, renderer:renderMoney, hidden: true}, 
   {name: 'warehouse_name', text: 'Агуулах', width: 120}, 
   {name: 'descr', text: 'Тайлбар', width: 120, hidden: true},
   {name: '_date', type: 'datetime', dateFormat: 'Y-m-d', text: 'Огноо', width: 120, renderer: renderCreatedDate}
];

Ext.define('CRM_STORAGE', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_STORAGE_FIELDS']
});

fields['CRM_REPORT_REVENUE_FIELDS'] = [
   {name: 'owner', text: 'Owner', width: 250}, 
   {name: 'team', text: 'Team', width: 250}, 
   {name: 'actual_revenue', text: 'Actual revenue', type:'float', width: 150, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney}, 
   {name: 'expected_revenue', text: 'Expected revenue', type:'float', width: 150, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'target_revenue', text: 'Target revenue', type:'float', width: 150, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'perform', text: 'Performance', type:'float', width: 100, align: 'right', renderer: renderPrecent, summaryType: 'average', summaryRenderer: renderTPrecent}  
];

Ext.define('CRM_REPORT_REVENUE', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_REPORT_REVENUE_FIELDS']
});

fields['CRM_REPORT_COMPARE_FIELDS'] = [
   {name: 'product_id', text: 'ID', width: 50, hidden: true}, 
   {name: 'product_code', text: 'Код', width: 50, align: 'center'}, 
   {name: 'product_barcode', text: 'Баркод', width: 90, align: 'center'}, 
   {name: 'product_brand', text: 'Бренд', width: 150}, 
   {name: 'product_name', text: 'Нэр', width: 250}, 
   {name: 'unit_size', text: 'Нэгж', width: 50, align: 'center'}, 
   {name: 'qty', text: 'Ширхэг', type: 'float', width: 85, align: 'right', renderer: renderNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
   {name: 'pty', text: 'Хайрцаг', type: 'float', width: 85, align: 'right', renderer: renderNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
   {name: 'amount', align: 'right', type:'float', text: 'Дүн', width: 130, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney}, 
   {name: 'owner1', text: 'Борлуулагч 1', type:'float',  width: 110, align: 'right', renderer: renderMoney, summaryType: 'average', summaryRenderer: renderTMoney},
   {name: 'owner2', text: 'Борлуулагч 2', type:'float',  width: 110, align: 'right', renderer: renderMoney, summaryType: 'average', summaryRenderer: renderTMoney},
   {name: 'owner3', text: 'Борлуулагч 3', type:'float',  width: 110, align: 'right', renderer: renderMoney, summaryType: 'average', summaryRenderer: renderTMoney},
   {name: 'owner4', text: 'Борлуулагч 4', type:'float',  width: 110, align: 'right', renderer: renderMoney, summaryType: 'average', summaryRenderer: renderTMoney},
   {name: 'owner5', text: 'Борлуулагч 5', type:'float',  width: 110, align: 'right', renderer: renderMoney, summaryType: 'average', summaryRenderer: renderTMoney},
   {name: 'owner6', text: 'Борлуулагч 6', type:'float',  width: 110, align: 'right', renderer: renderMoney, summaryType: 'average', summaryRenderer: renderTMoney},
   {name: 'owner7', text: 'Борлуулагч 7', type:'float',  width: 110, align: 'right', renderer: renderMoney, summaryType: 'average', summaryRenderer: renderTMoney},
   {name: 'owner8', text: 'Борлуулагч 8', type:'float',  width: 110, align: 'right', renderer: renderMoney, summaryType: 'average', summaryRenderer: renderTMoney},
   {name: 'owner9', text: 'Борлуулагч 9', type:'float',  width: 110, align: 'right', renderer: renderMoney, summaryType: 'average', summaryRenderer: renderTMoney}
];

Ext.define('CRM_REPORT_COMPARE', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_REPORT_COMPARE_FIELDS']
});

fields['CRM_REPORT_COMPARE_PRODUCT_FIELDS'] = [
   {name: 'product_id', text: 'ID', width: 180, hidden: true}, 
   {name: 'product_code', text: 'Код', width: 60}, 
   {name: 'product_name', text: 'Барааны нэр', width: 250}, 
   {name: 'product_barcode', text: 'Бар код', width: 90}, 
   {name: 'product_brand', text: 'Бренд', width: 180}, 
   {name: 'month1', text: '1 сар', type:'float', width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'month2', text: '2 сар', type:'float', width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'month3', text: '3 сар', type:'float', width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'month4', text: '4 сар', type:'float', width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},    
   {name: 'month5', text: '5 сар', type:'float', width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'month6', text: '6 сар', type:'float', width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'month7', text: '7 сар', type:'float', width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'month8', text: '8 сар', type:'float', width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'month9', text: '9 сар', type:'float', width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'month10', text: '10 сар', type:'float', width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'month11', text: '11 сар', type:'float', width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'month12', text: '12 сар', type:'float', width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney}
];

Ext.define('CRM_REPORT_COMPARE_PRODUCT', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_REPORT_COMPARE_PRODUCT_FIELDS']
});

fields['CRM_REPORT_COMPARE_CUSTOMER_FIELDS'] = [
   {name: 'crm_id', text: 'ID', width: 180, hidden: true}, 
   {name: 'crm_name', text: 'Харилцагчийн нэр', width: 250}, 
   {name: 'month1', text: '1 сар', type:'float', width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'month2', text: '2 сар', type:'float', width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'month3', text: '3 сар', type:'float', width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'month4', text: '4 сар', type:'float', width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},    
   {name: 'month5', text: '5 сар', type:'float', width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'month6', text: '6 сар', type:'float', width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'month7', text: '7 сар', type:'float', width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'month8', text: '8 сар', type:'float', width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'month9', text: '9 сар', type:'float', width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'month10', text: '10 сар', type:'float', width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'month11', text: '11 сар', type:'float', width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'month12', text: '12 сар', type:'float', width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney}
];

Ext.define('CRM_REPORT_COMPARE_CUSTOMER', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_REPORT_COMPARE_CUSTOMER_FIELDS']
});

fields['CRM_REPORT_COMPARE_USER_FIELDS'] = [
   {name: 'owner', text: 'Борлуулагчийн нэр', width: 250}, 
   {name: 'month1', text: '1 сар', type:'float', width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'month2', text: '2 сар', type:'float', width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'month3', text: '3 сар', type:'float', width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'month4', text: '4 сар', type:'float', width: 130, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},    
   {name: 'month5', text: '5 сар', type:'float', width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'month6', text: '6 сар', type:'float', width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'month7', text: '7 сар', type:'float', width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'month8', text: '8 сар', type:'float', width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'month9', text: '9 сар', type:'float', width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'month10', text: '10 сар', type:'float', width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'month11', text: '11 сар', type:'float', width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'month12', text: '12 сар', type:'float', width: 110, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'precent', text: 'Эзлэх хувь', type:'float', width: 110, align: 'right', renderer: renderPrecent, summaryType: 'average', summaryRenderer: renderTPrecent}
];

Ext.define('CRM_REPORT_COMPARE_USER', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_REPORT_COMPARE_USER_FIELDS']
});

fields['CRM_REPORT_CASE_FIELDS'] = [
   {name: 'owner', text: 'Owner', width: 250}, 
   {name: 'section', text: 'Section', width: 150}, 
   {name: 'c1', type:'int', text: 'Pending', align: 'center', width: 60}, 
   {name: 'c2', type:'int', text: 'Remind', align: 'center', width: 60}, 
   {name: 'c3', type:'int', text: 'Success', align: 'center', width: 90}, 
   {name: 'c4', type:'int', text: 'Success', align: 'center', width: 90}, 
   {name: 'c5', type:'int', text: 'Success', align: 'center', width: 90}, 
   {name: 'p1', type:'int', text: 'Meeting', align: 'center', width: 90}, 
   {name: 'p2', type:'int', text: 'Phone call', align: 'center', width: 90}, 
   {name: 'p3', type:'int', text: 'Email', align: 'center', width: 90}, 
   {name: 's1', type:'int', text: 'Qty', align: 'center', width: 90}, 
   {name: 's2', type:'int', text: 'Amount', align: 'center', width: 90},
   {name: 's3', type:'int', text: 'Amount', align: 'center', width: 90},
   {name: 'd1', type:'int', text: 'Amount', align: 'center', width: 90},
   {name: 'd2', type:'int', text: 'Amount', align: 'center', width: 90},
   {name: 'e1', type:'int', text: 'Amount', align: 'center', width: 90},
   {name: 'e2', type:'int', text: 'Amount', align: 'center', width: 90},
   {name: 't1', type:'int', text: 'Amount', align: 'center', width: 90},
   {name: 't2', type:'int', text: 'Amount', align: 'center', width: 90}
];

Ext.define('CRM_REPORT_CASE', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_REPORT_CASE_FIELDS']
});

columns['CRM_REPORT_CASE_COLUMNS'] = [
   {dataIndex: 'owner', text: 'Owner', width: 150}, 
   {dataIndex: 'section', text: 'Team', width: 150}, 
   {
	   text: 'Дуудлагын төрөл',
	   columns: [{dataIndex:'c1', text: 'Дуудлагын бүртгэл', width: 120, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'c2', text: 'Мэдээлэл хүссэн хүмүүсийн бүртгэл', width: 120, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'c3', text: 'Санал гомдлын бүртгэл', width: 120, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'c4', text: 'Мэдээлэл хүргүүлсэн бүртгэл', width: 120, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'c5', text: 'Бусад', width: 60, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber}
				]
   },
   {
	   text: 'Priority',
	   columns: [{dataIndex:'p1', text: 'Low', width: 50, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'p2', text: 'Medium', width: 60, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'p3', text: 'High', width: 50, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber}]
   },
   {
	   text: 'Stage',
	   columns: [{dataIndex:'s1', text: 'Identify', width: 70, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'s2', text: 'Research', width: 70, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'s3', text: 'Resolve', width: 70, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber}]
   },
   {
	   text: 'Direction',
	   columns: [{dataIndex:'d1', text: 'Inbound', width: 70, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'d2', text: 'Outbound', width: 70, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber}]
   },
   {
	   text: 'Call center',
	   columns: [{dataIndex:'e1', text: '94097007', width: 70, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'e2', text: '70107007', width: 70, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber}]
   },
   {
	   text: 'Transfer',
	   columns: [{dataIndex:'t1', text: 'sukh@mandal', width: 80, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'t2', text: 'myagmartseren@madal', width: 80, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber}]
   }
];


fields['CRM_REPORT_ACTIVITY_FIELDS'] = [
   {name: 'owner', text: 'Owner', width: 250}, 
   {name: 'section', text: 'Section', width: 150}, 
   {name: 'call_p', text: 'Phone call', align: 'center', width: 60}, 
   {name: 'email_p', text: 'Email', align: 'center', width: 60}, 
   {name: 'meeting_p', text: 'Plan', align: 'center', width: 90}, 
   {name: 'meeting_q', text: 'Success', align: 'center', width: 90}, 
   {name: 'meeting_t', text: '%', align: 'center', width: 90}, 
   {name: 'quote_p', text: 'Plan', align: 'center', width: 90}, 
   {name: 'quote_q', text: 'Success', align: 'center', width: 90}, 
   {name: 'quote_t', text: '%', align: 'center', width: 90}, 
   {name: 'newcus_p', text: 'Plan', align: 'center', width: 90}, 
   {name: 'newcus_q', text: 'Success', align: 'center', width: 90}, 
   {name: 'newcus_t', text: '%', align: 'center', width: 90}, 
   {name: 'expat_p', text: 'Plan', align: 'center', width: 90}, 
   {name: 'expat_q', text: 'Success', align: 'center', width: 90}, 
   {name: 'expat_t', text: '%', align: 'center', width: 90}, 
   {name: 'vip_p', text: 'Plan', align: 'center', width: 90}, 
   {name: 'vip_q', text: 'Success', align: 'center', width: 90},
   {name: 'vip_t', text: '%', align: 'center', width: 90},
   {name: 'ext_p', text: 'Plan', align: 'center', width: 90}, 
   {name: 'ext_q', text: 'Success', align: 'center', width: 90},
   {name: 'ext_t', text: '%', align: 'center', width: 90}   
];

Ext.define('CRM_REPORT_ACTIVITY', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_REPORT_ACTIVITY_FIELDS']
});

columns['CRM_REPORT_ACTIVITY_COLUMNS'] = [
   {dataIndex: 'owner', text: 'Owner', width: 150}, 
   {dataIndex: 'section', text: 'Team', width: 150}, 
   {dataIndex: 'call_p', text: 'Phone call', type:'int', align: 'center', width: 60, renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber}, 
   {dataIndex: 'email_p', text: 'Email', type:'int', align: 'center', width: 60, renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber}, 
   {
	   text: 'Meeting',
	   columns: [{dataIndex:'meeting_p', text: 'Plan', width: 60, align: 'center', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'meeting_q', text: 'Perform', width: 60, align: 'center', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'meeting_t', text: '%', width: 50, align: 'center', renderer: renderPrecent}]
   },
   {
	   text: 'Quote',
	   columns: [{dataIndex:'quote_p', text: 'Plan', width: 60, align: 'center', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'quote_q', text: 'Perform', width: 60, align: 'center', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'quote_t', text: '%', width: 50, align: 'center', renderer: renderPrecent}]
   },
   {
	   text: 'New Customer',
	   columns: [{dataIndex:'newcus_p', text: 'Plan', width: 60, align: 'center', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'newcus_q', text: 'Perform', width: 60, align: 'center', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'newcus_t', text: '%', width: 50, align: 'center', renderer: renderPrecent}]
   },
   {
	   text: 'Expat Customer',
	   columns: [{dataIndex:'expat_p', text: 'Plan', width: 60, align: 'center', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'expat_q', text: 'Perform', width: 60, align: 'center', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'expat_t', text: '%', width: 50, align: 'center', renderer: renderPrecent}]
   },
   {
	   text: 'VIP Customer',
	   columns: [{dataIndex:'vip_p', text: 'Plan', width: 60, align: 'center', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'vip_q', text: 'Perform', width: 60, align: 'center', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'vip_t', text: '%', width: 50, align: 'center', renderer: renderPrecent}]
   },
   {
	   text: 'Extended contracts',
	   columns: [{dataIndex:'ext_p', text: 'Plan', width: 60, align: 'center', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'ext_q', text: 'Perform', width: 60, align: 'center', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'ext_t', text: '%', width: 50, align: 'center', renderer: renderPrecent}]
   },
   {dataIndex:'term_p', text: 'Termination', width: 90, align: 'center', renderer: renderReportNumber}
];


columns['CRM_REPORT_RESELLER_COLUMNS'] = [
   {dataIndex: 'crm_name', text: 'Reseller name', width: 250}, 
   {dataIndex: 'owner', text: 'Owner', width: 150}, 
   {
	   text: 'Activity',
	   columns: [{dataIndex:'meeting', text: 'Meeting', width: 70, align: 'center', summaryType: 'sum', renderer: renderReportNumber},
				 {dataIndex:'phonecall', text: 'Phone call', width: 70, align: 'center', summaryType: 'sum', renderer: renderReportNumber},
				 {dataIndex:'email', text: 'Email', width: 70, align: 'center', summaryType: 'sum', renderer: renderReportNumber}]
   },
   {
	   text: 'Total',
	   columns: [{dataIndex:'total_qty', text: 'Qty', width: 70, align: 'right', summaryType: 'sum', renderer: renderReportNumber, summaryRenderer: renderTNumber},
				 {dataIndex:'total_amount', text: 'Amount', width: 130, align: 'right', summaryType: 'sum', renderer: renderMoney, summaryRenderer: renderTMoney}]
   },
   {
	   text: 'АВТОТЭЭВРИЙН ХЭРЭГСЛИЙН',
	   columns: [{dataIndex:'p1_qty', text: 'Qty', width: 60, align: 'right', summaryType: 'sum', renderer: renderReportNumber, summaryRenderer: renderTNumber},
				 {dataIndex:'p1_amount', text: 'Amount', width: 110, align: 'right', summaryType: 'sum', renderer: renderMoney, summaryRenderer: renderTMoney}]
   },
   {
	   text: 'АЛБАН ЖУРМЫН ЖОЛООЧИЙН',
	   columns: [{dataIndex:'p2_qty', text: 'Qty', width: 60, align: 'right', summaryType: 'sum', renderer: renderReportNumber, summaryRenderer: renderTNumber},
				 {dataIndex:'p2_amount', text: 'Amount', width: 110, align: 'right', summaryType: 'sum', renderer: renderMoney, summaryRenderer: renderTMoney}]
   },
   {
	   text: 'ЭД ХӨРӨНГИЙН',
	   columns: [{dataIndex:'p3_qty', text: 'Qty', width: 60, align: 'right', summaryType: 'sum', renderer: renderReportNumber, summaryRenderer: renderTNumber},
				 {dataIndex:'p3_amount', text: 'Amount', width: 110, align: 'right', summaryType: 'sum', renderer: renderMoney, summaryRenderer: renderTMoney}]
   },
   {
	   text: 'ЗЭЭЛДЭГЧИЙН ГЭНЭТИЙН ОСЛЫН',
	   columns: [{dataIndex:'p4_qty', text: 'Qty', width: 60, align: 'right', summaryType: 'sum', renderer: renderReportNumber, summaryRenderer: renderTNumber},
				 {dataIndex:'p4_amount', text: 'Amount', width: 110, align: 'right', summaryType: 'sum', renderer: renderMoney, summaryRenderer: renderTMoney}]
   },
   {
	   text: 'ГАДААД ЗОРЧИГЧИЙН',
	   columns: [{dataIndex:'p5_qty', text: 'Qty', width: 60, align: 'right', summaryType: 'sum', renderer: renderReportNumber},
				 {dataIndex:'p5_amount', text: 'Amount', width: 110, align: 'right', summaryType: 'sum', renderer: renderMoney, summaryRenderer: renderTMoney}]
   }   
];
