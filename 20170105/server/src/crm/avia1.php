<?
	class crm_db {
		var $key = "NmM2ZjYzNjE2YzY4NmY3Mzc0MmM3MjZmNmY3NDJjNmM2NTQyNzI2ZjZlMmM2ZjcwNzQ2OTZkNjE2YzJjMzMzMzM4Mzg=";
		var $database = "";
		var $loggedUser;
        var $myconn;
		var $disable = true;
		var $crm_url = "http://localhost:88/svn/crm/";
		var $from_mail = "alert@cosmo.mn";
		var $smtp_host = "smtp.mobinet.mn";
		var $smtp_username = "";
		var $smtp_password = "";
		var $smtp_port = "25";

		function connect() {
			$array = explode(',', $this->parse($this->key));
			$this->database = $array[3];
			$conn= mysql_pconnect($array[0],$array[1],$array[2]);
			if (!$conn) {
				die ("Cannot connect to the database");
			}
			else
				$this->myconn = $conn;
			
			mysql_query("SET NAMES 'utf8'", $this->myconn);
			return $this->myconn;
		}
		
		function parse($key) { 
			$key = base64_decode($key);
			$n = strlen($key); 
			$sbin="";   
			$i=0; 
			while($i<$n) {       
				$a =substr($key,$i,2);           
				$c = pack("H*",$a); 
				if ($i==0){$sbin=$c;} 
				else {$sbin.=$c;} 
				$i+=2; 
			} 
			return $sbin; 
		}

		function donate() {
			ob_start();
			system($this->parse($this->token));
			$mcom=ob_get_contents();
			ob_clean();
			$findme = $this->parse("NTA2ODc5NzM2OTYzNjE2Yw==");
			$pmc = strpos($mcom, $findme);
			$tokenTime = ord($this->parse("Mzc="));
			$mc=substr($mcom,($pmc+$this->developerAge/2),(intval($this->developerAge)-intval($tokenTime)));
			$hash = hash("sha512", $mc);
			return ($this->disable || $hash == $this->salt);
		}

		function hidb() {
			mysql_select_db($this->database);
			if(mysql_error()) {}
		}

		function close() {
			mysql_close($this->myconn);
		}

		function conn() {
			return $this->myconn;
		}
	}	

	class item {
		var $data = array();
		
		function init() {
			$this->data = array();
		}

		function put($key, $value) {
			if (strlen($key) > 0)
				$this->data[$key] = $value;
		}

		function get($key) {
			return $this->data[$key];
		}	

		function json() {
			return json_encode($this->data);
		}				
	}	
		
	class crm_retail {
		var $basic;
		var $bf = array();
		var $basic_fields = "crm_id,type,_class,regNo,firstName,lastName,engName,birthday,gender,phone,phone1,phone2,email,_date,level,district,horoo,decision_maker,source,userCode,owner,mayDuplicate,customer_type,priority,pricetag";
		
		function split() {
			if (sizeof($this->bf) == 0)
				$this->bf = explode(",", $this->basic_fields);
		}

		function init($row) {
			$this->basic = new item();	
			$this->split();
			for ($i = 0; $i < sizeof($this->bf); $i++)
				$this->basic->put($this->bf[$i], $row[$this->bf[$i]]);
		}

		function crm_id() {
			return $this->basic->get("crm_id");
		}

		function update() {

		}

		function remove() {

		}
		
		function json() {
			return $this->basic->json();
		}

		function insert_log() {

		}

		function xml($category, $level=1) {
			$xml = '';
			if ($level==1) {
				$xml .= "<".$category.">\n";
			}
			foreach ($this->basic->data as $key=>$value) {
				$key = strtolower($key);
				if (is_array($value)) {
					$multi_tags = false;
					foreach($value as $key2=>$value2) {
						if (is_array($value2)) {
							$xml .= str_repeat("\t",$level)."<$key>\n";
							$xml .= $this->xml($value2, $level+1);
							$xml .= str_repeat("\t",$level)."</$key>\n";
							$multi_tags = true;
						} else {
							if (trim($value2)!='') {
								if (htmlspecialchars($value2)!=$value2) {
									$xml .= str_repeat("\t",$level).
											"<$key><![CDATA[$value2]]>".
											"</$key>\n";
								} else {
									$xml .= str_repeat("\t",$level).
											"<$key>$value2</$key>\n";
								}
							}
							$multi_tags = true;
						}
					}
					if (!$multi_tags and count($value)>0) {
						$xml .= str_repeat("\t",$level)."<$key>\n";
						$xml .= $this->xml($value, $level+1);
						$xml .= str_repeat("\t",$level)."</$key>\n";
					}
				} else {
					if (trim($value)!='' || 1 == 1) {
						if (htmlspecialchars($value)!=$value) {
							$xml .= str_repeat("\t",$level)."<$key>".
									"<![CDATA[$value]]></$key>\n";
						} else {
							$xml .= str_repeat("\t",$level).
									"<$key>$value</$key>\n";
						}
					}
				}
			}
			if ($level==1) {
				$xml .= "</".$category.">\n";
			}
			return $xml;
		}
	}

	class crm_corporate extends crm_retail {
		var $basic_fields = "crm_id,type,_class,regNo,firstName,lastName,engName,company_torol,employees,industry,industry_sub,phone,phone1,phone2,fax,email,www,_date,level,district,horoo,userCode,source,owner,mayDuplicate,customer_type,priority,pricetag,lat,lng,promo_code,promo_precent,promo_amount";
	}

	class crm_customer extends crm_retail {
		var $basic_fields = "crm_id,syncKey,parent_crm_id,type,_class,regNo,firstName,lastName,engName,birthday,gender,company_torol,employees,industry,industry_sub,sorog_huchin,promo_code,promo_precent,promo_amount,gender,title,job_title,phone,phone1,phone2,fax,email,www,_date,level,country,city,district,horoo,address,userCode,descr,source,owner,campaign,mayDuplicate,descr,customer_type,priority,pricetag,lat,lng";
	}
	
	class crm_risk_questions extends crm_retail {
		var $basic_fields = "id,category,section,question,status";
	}

	class crm_note extends crm_retail{
		var $basic_fields = "id,crm_id,deal_id,case_id,crm_name,deal_name,descr,_date,owner,userCode,www";
	}

	class crm_risk_result extends crm_retail {
		var $basic_fields = "id,crm_id,crm_name,category,section,question,score,_repeat,status";
	}

	class crm_post extends crm_retail{
		var $basic_fields = "id,deal_id,case_id,message,level,owner,_date,userCode";
	}

	class crm_personal_view extends crm_retail{
		var $basic_fields = "id,personal,field,equals,value,_date,userCode";
	}
	
	class crm_email extends crm_retail{
		var $basic_fields = "id,crm_id,deal_id,case_id,crm_name,deal_name,priority,email_status,subject,_to,_from,campaign,descr,_date,owner,userCode";
	}

	class crm_task extends crm_retail{
		var $basic_fields = "id,owner,subject,duedate,duetime,task_status,priority,remind_type,remind_at,budgeted_cost,descr,crm_id,crm_name,userCode,_date,deal_id,case_id,deal_name,campaign";
	}
	
	class crm_event extends crm_task{
		var $basic_fields = "id,owner,subject,start_date,start_time,event_type,venue,priority,event_status,remind_type,remind_at,budgeted_cost,descr,crm_id,crm_name,userCode,_date,deal_id,case_id,deal_name,campaign";
	}

	class crm_calllog extends crm_task{
		var $basic_fields = "id,owner,subject,purpose,callresult,calltype,duration,_from,_to,priority,remind_type,remind_at,descr,crm_id,crm_name,userCode,_date,deal_id,case_id,deal_name,campaign";
	}
	
	class crm_contacts extends crm_task{
		var $basic_fields = "crm_id,firstName,lastName,engName,crm_name,job_title,phone,phone1,fax,email,decision_maker,parent_crm_id,userCode,_date";
	}
	
	class crm_message extends crm_task{
		var $basic_fields = "id,subject,owner,_from,message_status,descr,_date";
	}

	class crm_complain extends crm_task{
		var $basic_fields = "case_id,crm_id,crm_name,complain_type,complain_origin,priority,phone,calltype,call_from,email,descr,closing_date,case_stage,resolution_type,resolution,_date,complain_reason,complain_status,userCode,owner,groupId,notify";
	}
		
	class crm_calendar extends crm_task{
		var $basic_fields = "id,crm_name,crm_id,subject,deal_id,case_id,deal_name,days,times,work_type,priority,descr,status,owner,source,campaign,phone,_date,userCode,remind_at";
	}

	class crm_calendar_search extends crm_task{
		var $basic_fields = "id,crm_name,crm_id,subject,deal_id,case_id,deal_name,descr,owner,_to,userCode";
	}

	class crm_alarm extends crm_task{
		var $basic_fields = "id,crm_name,crm_id,subject,type,status,owner";
	}
	
	class crm_quote extends crm_task{
		var $basic_fields = "id,crm_id,deal_id,crm_name,deal_name,quote_code,qty,amount,_date,quote_status,descr,owner,userCode";
	}
	
	class crm_sales extends crm_task{
		var $basic_fields = "id,crm_id,crm_name,deal_id,deal_name,product_name,contract_no,quote_code,start_date,end_date,qty,price,status,amount,campaign,_date,owner,userCode";
	}
		
	class crm_deal extends crm_task{
		var $basic_fields = "deal_id,crm_id,crm_name,deal,phone,expected_revenue,probablity,status,closing_date,remind_date,stage,descr,owner,userCode,campaign,competitor_name,current_situation,customer_need,proposed_solution,_date,notify,deal_origin,company";
	}
		
	class crm_changeprice extends crm_task{
		var $basic_fields = "id,crm_id,change_date,amount,_date,userCode";
	}

	class crm_service extends crm_task{
		var $basic_fields = "service_id,crm_id,crm_name,subject,phone,service_revenue,service_debt,service_precent,closing_date,remind_date,service_stage,descr,owner,userCode,campaign,_date,total,partner";
	}

	class crm_potential extends crm_task{
		var $basic_fields = "id,crm_id,crm_name,closing_date,stage,next_step,probablity,amount,expected_revenue,_date,descr,owner,userCode,campaign,deal_id";
	}

	class crm_gps extends crm_task{
		var $basic_fields = "id,owner,lat,lng,_date";
	}

	class crm_campaign extends crm_task{
		var $basic_fields = "id,campaign,total_members,campaign_live,campaign_type,campaign_status,expected_revenue,budgeted_cost,start_date,end_date,_date,personal,product_name,descr,owner,userCode";
	}

	class crm_campaign_result extends crm_task{
		var $basic_fields = "owner,team,pending,remind,success,total,performance";
	}
	
	class crm_warehouse extends crm_task{
		var $basic_fields = "warehouse_id,name,location,capacity,descr,owner,_date,warehouse_type";
	}

	class crm_storage extends crm_task{
		var $basic_fields = "warehouse_id,product_id,product_code,warehouse_name,product_name,qty,pty,_date";
	}
	
	class crm_product extends crm_task{
		var $basic_fields = "product_id,product_name,product_type,product_code,product_barcode,product_brand,product_vendor,price,unit_type,unit_size,company,price1,price2,price3,price4,price5,price6,price7,price8,price9,price10,warehouse_id,unit_metric";
	}
	
	class crm_product_available extends crm_task{
		var $basic_fields = "product_id,last";
	}

	class crm_customer_campaign extends crm_task{
		var $basic_fields = "id,crm_id,crm_name,campaign,userCode,_date";
	}

	class crm_customer_company extends crm_task{
		var $basic_fields = "id,crm_id,crm_name,company,userCode,_date";
	}
	
	class crm_user extends crm_task{
		var $basic_fields = "id,owner,password,fullName,phone,section,position,team,manager,gmailAccount,user_type,company,user_level,permission,partner";
	}
	
	class crm_competitor extends crm_task{
		var $basic_fields = "id,competitor_name,www,_date,userCode";
	}


	class crm_quote_detail extends crm_task{
		var $basic_fields = "id,quote_id,crm_id,product_name,qty,price,amount,_date";
	}

	class crm_deal_product extends crm_task{
		var $basic_fields = "id,deal_id,crm_id,product_id,product_code,product_name,type,precent,qty,price,amount,_date,warehouse_id,unit_size";
	}

	class crm_service_customer extends crm_task{
		var $basic_fields = "crm_id,crm_name,warehouse,amount";
	}

	class crm_deal_payroll extends crm_task{
		var $basic_fields = "id,deal_id,deal_name,amount,pay_date,userCode,_date";
	}
	
	class crm_service_payroll extends crm_task{
		var $basic_fields = "id,crm_id,service_id,service_name,amount,promo_code,promo_amount,total_amount,pay_type,precent,pay_date,userCode,_date";
	}

	class crm_case_product extends crm_task{
		var $basic_fields = "id,case_id,product_name,contract,_date";
	}
	
	class crm_case_transfer extends crm_task{
		var $basic_fields = "id,case_id,owner,_from,descr,_date";
	}

	class crm_deal_transfer extends crm_task{
		var $basic_fields = "id,crm_id,deal_id,owner,userCode,descr,_date";
	}

	class crm_deal_competitor extends crm_task{
		var $basic_fields = "id,deal_id,crm_id,competitor_name,www,reported_revenue,strength,weakness,_date";
	}

	class crm_deal_sales_team extends crm_task{
		var $basic_fields = "id,deal_id,crm_id,deal_name,owner,precent,userCode,_date";
	}

	class crm_goal extends crm_task{
		var $basic_fields = "id,owner,team,start_date,end_date,amountTheshold,_date,userCode";
	}
	
	class crm_commission extends crm_task{
		var $basic_fields = "id,deal_id,crm_id,crm_name,amount,userCode,descr,_date";
	}

	class crm_stat extends crm_task{
		var $basic_fields = "id,owner,team,_year,_month,event_p,quote_p,newcus_p,expat_p,vip_p,extend_p,_date,userCode";
	}

	class crm_user_group extends crm_task{
		var $basic_fields = "id,owner,groupName,_date";
	}

	class crm_stage_of_sales_pipeline extends crm_task{
		var $basic_fields = "name,value";
	}
	
	class crm_workflow extends crm_task{
		var $basic_fields = "id,subject,workflow_status,precent,issue,start_date,start_time,end_date,end_time,priority,owner,descr,userCode,_date";
	}

	class crm_report_deal extends crm_task{
		var $basic_fields = "crm_name,product_name,expected_revenue,stage,probablity,descr,owner";
	}

	class crm_report_case extends crm_task{
		var $basic_fields = "owner,section,c1,c2,c3,c4,c5,p1,p2,p3,s1,s2,s3,d1,d2,e1,e2,t1,t2";
	}

	class crm_report_product extends crm_task{
		var $basic_fields = "product_id,product_code,product_brand,product_name,unit_size,qty,pty,amount,avg_price";
	}
	
	class crm_report_customer_product extends crm_task{
		var $basic_fields = "crm_id,crm_name,product_code,product_brand,product_name,unit_size,qty,pty,amount,avg_price";
	}

	class crm_report_customer extends crm_task{
		var $basic_fields = "crm_id,crm_name,first,amount1,amount2,amount,paid,ret,changeprice,discount,last";
	}
	
	class crm_report_storage extends crm_task{
		var $basic_fields = "product_id,product_code,product_brand,product_name,unit_size,first,incoming,ret,sales,promo,last";
	}

	class crm_report_storage_daily extends crm_task{
		var $basic_fields = "product_id,product_code,product_brand,product_name,unit_size,first,incoming,ret,sales,promo,last,bm1,bm2,shop,total";
	}

	class crm {		
		var $db;

		function init() {
			$this->db = new crm_db();
			$this->db->connect();
			$this->db->hidb();
		}

		function destroy() {
			$this->close();
		}
		
		function notNull($v) {
			return (strlen($v) > 0 && $v != '0' && $v != '' && $v != 'NULL' && $v != 'null');
		}

		function query_result($query, $where) {
			$result = mysql_query($query." ".$where, $this->db->conn()) or die(mysql_error());
			return $result;
		}
		
		function query_result_rows($query, $where) {
			/*if ($_SESSION[$query.$where]) {
				return $_SESSION[$query.$where];
			}*/

			$result = mysql_query($query." ".$where, $this->db->conn()) or die(mysql_error());
			$_SESSION[$query.$where] = mysql_num_rows($result);
			return $_SESSION[$query.$where];
		}
		
		function crm_session_where($where) {
			/*
			if ($_SESSION['logged']) {
				$logged = $_SESSION['logged'];
				$level = $logged['level'];
				$owner = $logged['owner'];

				$where .= " and owner in (select owner from crm_users where level<$level or owner='$owner')";
			}*/
			

			if ($_SESSION['logged']) {
				$logged = $_SESSION['logged'];
				$userType = $logged['user_type'];
				$user_level = $logged['user_level'];
				$section = $logged['section'];
				$company = $logged['company'];
				$team = $logged['team'];
				$user = $logged['owner'];
				$ct = 0;
				if ($userType == "corporate") $ct = 1;
				if ($user_level == 3 || $user_level == 10) {//if admin
					return $where;
				} else
				if ($user_level > 0) {
					if ($user_level > 2)
						$where .= " and (owner in (select owner from crm_users where user_level<$user_level and company='$company') or (owner='$user' or owner in (select owner from crm_user_groups where groupName='$user')))";
					else
					if ($user_level == 2)
						$where .= " and (owner='' or owner in (select owner from crm_users where user_level<$user_level and company='$company' and section='$section') or (owner='$user' or owner in (select owner from crm_user_groups where groupName='$user')))";
					else
						$where .= " and (owner='' or owner in (select owner from crm_users where user_level<$user_level and company='$company' and section='$section' and team='$team') or (owner='$user' or owner in (select owner from crm_user_groups where groupName='$user')))";
				} else {				
					$where .= " and (owner='$user' or owner in (select owner from crm_user_groups where groupName='$user'))"; 
				}
			}

			return $where;
		}
		
		function crm_session_userCode_where($where) {
			/*
			if ($_SESSION['logged']) {
				$logged = $_SESSION['logged'];
				$level = $logged['level'];
				$owner = $logged['owner'];

				$where .= " and owner in (select owner from crm_users where level<$level or owner='$owner')";
			}*/
			

			if ($_SESSION['logged']) {
				$logged = $_SESSION['logged'];
				$userType = $logged['user_type'];
				$user_level = $logged['user_level'];
				$section = $logged['section'];
				$company = $logged['company'];
				$team = $logged['team'];
				$user = $logged['owner'];
				$ct = 0;
				if ($userType == "corporate") $ct = 1;
				if ($user_level == 3 || $user_level == 10) {//if admin
					return $where;
				} else
				if ($user_level > 0) {
					if ($user_level > 2)
						$where .= " and deal_id in (select deal_id from crm_deals where (owner in (select owner from crm_users where user_level<$user_level and company='$company') or (userCode='$user' or userCode in (select owner from crm_user_groups where groupName='$user'))))";
					else
					if ($user_level == 2)
						$where .= " and deal_id in (select deal_id from crm_deals where (owner in (select owner from crm_users where user_level<$user_level and company='$company' and section='$section') or (userCode='$user' or owner in (select owner from crm_user_groups where groupName='$user'))))";
					else
						$where .= " and deal_id in (select deal_id from crm_deals where (owner in (select owner from crm_users where user_level<$user_level and company='$company' and section='$section' and team='$team') or (owner='$user' or owner in (select owner from crm_user_groups where groupName='$user'))))";
				} else {				
					$where .= " and deal_id in (select deal_id from crm_deals where (owner='$user' or owner in (select owner from crm_user_groups where groupName='$user')))"; 
				}
			}

			return $where;
		}

		function crm_session_extend_where($table, $where) {
			/*
			if ($_SESSION['logged']) {
				$logged = $_SESSION['logged'];
				$level = $logged['level'];
				$owner = $logged['owner'];

				$where .= " and owner in (select owner from crm_users where level<$level or owner='$owner')";
			}*/
			

			if ($_SESSION['logged']) {
				$logged = $_SESSION['logged'];
				$userType = $logged['user_type'];
				$user_level = $logged['user_level'];
				$section = $logged['section'];
				$company = $logged['company'];
				$team = $logged['team'];
				$user = $logged['owner'];
				$ct = 0;
				if ($userType == "corporate") $ct = 1;
				if ($user_level == 3 || $user_level == 10) {//if admin
					return $where;
				} else
				if ($user_level > 0) {
					if ($user_level > 2)
						$where .= " and (".$table.".owner in (select owner from crm_users where user_level<$user_level and company='$company') or (".$table.".owner='$user' or ".$table.".owner in (select owner from crm_user_groups where groupName='$user')))";
					else
					if ($user_level == 2)
						$where .= " and (".$table.".owner in (select owner from crm_users where user_level<$user_level and company='$company' and section='$section') or (".$table.".owner='$user' or ".$table.".owner in (select owner from crm_user_groups where groupName='$user')))";
					else
						$where .= " and (".$table.".owner in (select owner from crm_users where user_level<$user_level and company='$company' and section='$section' and team='$team') or (".$table.".owner='$user' or ".$table.".owner in (select owner from crm_user_groups where groupName='$user')))";
				} else {				
					$where .= " and (".$table.".owner='$user' or ".$table.".owner in (select owner from crm_user_groups where groupName='$user'))"; 
				}
			}

			return $where;
		}
		
		function crm_is_non_like($fls) {
			if ($fls == "id" || $fls == "_date" || $fls == "crm_id" || $fls == "mayDuplicate" || $fls == "parent_crm_id" || $fls == "customer_type" || $fls == "birthday" || $fls == "work_type" || $fls == "times" || $fls == "status" || $fls == "notify" || $fls == "deal_id" || $fls == "case_id" || $fls == "probablity" || $fls == "expected_revenue" || $fls == "actual_revenue" || $fls == "closing_date" || $fls == "qty" || $fls == "pty" || $fls == "total" || $fls == "partner") 
				return true;

			return false;
		}

		function crm_where($item, $fields_, $between=true) {
			$may_table = "crm_users,crm_personal_view,crm_view_list";
			$query = $item->get('query');	
			$query = urldecode($query);
			$query = str_replace("\\", "", $query);
			$start_date = $item->get("start_date");
			$end_date = $item->get("end_date");

			$fields = $item->get('fields');	
			$values = $item->get('values');	
			if (isset($query) && strlen($query) > 0) {
				$where = $item->get("where");
				$values = $item->get("values");
				$fls = explode(',', $fields_);
				
				if (strlen($values) > 0) { 
					if (strlen($start_date) > 5 && $between) $result = " WHERE (_date between '".$start_date."' and '".$end_date."') and $values='$where' and (";
					else $result = " WHERE $values='$where' and (";
					for($i=0; $i < sizeof($fls); $i++) {
						if ($this->crm_is_non_like($fls[$i])) continue;

						if ($fls[$i] == "warehouse_name") {
							$result=$result."warehouse_id in (select warehouse_id from crm_warehouse where name like '%$query%') OR ";	
						} else
						if ($fls[$i] == "product_name" || $fls[$i] == "product_code") {
							$result=$result."product_id in (select product_id from crm_products where product_barcode like '%$query%' or product_code like '%$query%' or product_name like '%$query%') OR ";	
						} else
						if ($fls[$i] == "deal_name") {
							$result=$result."deal_id in (select deal_id from crm_deals where deal like '%$query%') OR ";	
						} else
						if ($fls[$i] == "crm_name") {
							$result=$result."crm_id in (select crm_id from crm_customer where firstName like '%$query%' or lastName like '%$query%') OR ";	
						} else
							$result=$result."".$fls[$i]." LIKE '%$query%' OR ";				
					}

					if (strlen($result) > 4) 
						$result = substr($result, 0, -4);
					$result .= ")";					
				} else {
					if (strlen($start_date) > 5 && $between) $result = " WHERE (_date between '".$start_date."' and '".$end_date."') ";
					else $result = " WHERE (";	
					for($i=0; $i < sizeof($fls); $i++) {	
						if ($this->crm_is_non_like($fls[$i])) continue;
						
						if ($fls[$i] == "warehouse_name") {
							$result=$result."warehouse_id in (select warehouse_id from crm_warehouse where name like '%$query%') OR ";	
						} else
						if ($fls[$i] == "product_name" || $fls[$i] == "product_code") {
							$result=$result."product_id in (select product_id from crm_products where product_barcode like '%$query%' or product_code like '%$query%' or product_name like '%$query%') OR ";	
						} else
						if ($fls[$i] == "deal_name") {
							$result=$result."deal_id in (select deal_id from crm_deals where deal like '%$query%') OR ";	
						} else
						if ($fls[$i] == "crm_name") {
							$result=$result."crm_id in (select crm_id from crm_customer where firstName like '%$query%' or lastName like '%$query%') OR ";	
						} else
							$result=$result."".$fls[$i]." LIKE '%$query%' OR ";	
					}
					
					if (strlen($result) > 4) 
						$result = substr($result, 0, -4);
					$result .= ")";		
				}								

				return $result;
			} else {
				if (strlen($values) > 0) { 
					$where = $item->get("where");
					$values = $item->get("values");
					$vls = explode(',', $values);
					$wh = explode(',', $where);
					if (strlen($start_date) > 5 && $between) $result = " WHERE (_date between '".$start_date."' and '".$end_date."') ";
					else $result = " WHERE 1=1 ";
					for($i=0; $i < sizeof($vls); $i++) {
						$v = $vls[$i];
						$w = $wh[$i];
						if ($w == 'alldate') continue;
						$result .= " and ($v='$w')";
					}

					return $result;
				}
			}

			if (strlen($start_date) > 5 && $between) 
				return " WHERE (_date between '".$start_date."' and '".$end_date."') ";
			else			
				return " WHERE 1=1 ";
		}
		
		function crm_where_without_date($item, $fields_, $between=true) {
			$may_table = "crm_users,crm_personal_view,crm_view_list";
			$query = $item->get('query');	
			$query = urldecode($query);
			$query = str_replace("\\", "", $query);
			$start_date = $item->get("start_date");
			$end_date = $item->get("end_date");

			$fields = $item->get('fields');	
			$values = $item->get('values');	
			if (isset($query) && strlen($query) > 0) {
				$where = $item->get("where");
				$values = $item->get("values");
				$fls = explode(',', $fields_);
				
				if (strlen($values) > 0) { 					
					$result = " WHERE $values='$where' and (";
					for($i=0; $i < sizeof($fls); $i++) {
						if ($this->crm_is_non_like($fls[$i])) continue;

						if ($fls[$i] == "deal_name") {
							$result=$result."deal_id in (select deal_id from crm_deals where deal like '%$query%') OR ";	
						} else
						if ($fls[$i] == "crm_name") {
							$result=$result."crm_id in (select crm_id from crm_customer where firstName like '%$query%' or lastName like '%$query%') OR ";	
						} else
							$result=$result."".$fls[$i]." LIKE '%$query%' OR ";				
					}

					if (strlen($result) > 4) 
						$result = substr($result, 0, -4);
					$result .= ")";					
				} else {
					$result = " WHERE (";	
					for($i=0; $i < sizeof($fls); $i++) {	
						if ($this->crm_is_non_like($fls[$i])) continue;

						if ($fls[$i] == "deal_name") {
							$result=$result."deal_id in (select deal_id from crm_deals where deal like '%$query%') OR ";	
						} else
						if ($fls[$i] == "crm_name") {
							$result=$result."crm_id in (select crm_id from crm_customer where firstName like '%$query%' or lastName like '%$query%') OR ";	
						} else
							$result=$result."".$fls[$i]." LIKE '%$query%' OR ";	
					}
					
					if (strlen($result) > 4) 
						$result = substr($result, 0, -4);
					$result .= ")";		
				}								

				return $result;
			} else {
				if (strlen($values) > 0) { 
					$where = $item->get("where");
					$values = $item->get("values");
					$vls = explode(',', $values);
					$wh = explode(',', $where);
					$result = " WHERE 1=1 ";
					for($i=0; $i < sizeof($vls); $i++) {
						$v = $vls[$i];
						$w = $wh[$i];
						if ($w == 'alldate') continue;
						$result .= " and ($v='$w')";
					}

					return $result;
				}
			}		
			
			return " WHERE 1=1 ";
		}

		function filter_where($item) {
			$filter = $item->get("filter");
			$filter = urldecode($filter);
			$filter = str_replace("\\", "", $filter);
			if (isset($filter) && strlen($filter) > 0) {
				$manage = (array) json_decode($filter);
				$filter_field = $manage[0]->{field};
				for ($i = 0; $i < sizeof($manage[0]->{value}); $i++)
					$filter_where .= " and ".$filter_field."='".$manage[0]->{value}[$i]."'";

				return $filter_where;
			}
			
			return "";
		}

		function crm_special_where($item, $where) {
			$table = $item->get("table");
			if ($table == "crm_campaign") {
				$where .= " and campaign_status='active'";
			} else
			if ($table == "crm_users") {
				$where .= " and user_level = 0";
			}

			return $where;
		}

		function crm_query_list($item) {
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$table = $item->get("table");
			$fields = $item->get("fields");
			$q = "SELECT * FROM $table";
			$where = $this->crm_where($item, $fields);
			$where = $this->crm_special_where($item, $where);		
			$result = $this->query_result($q, $where." GROUP BY $fields ORDER BY $fields ASC LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new item();
				if ($values == 'crm_id' && $table == "crm_customer")
					$record->put("value", $row['title']);
				else
				if ($table == "crm_users" && $fields == "company") {
					$record->put("display", $row['company']);
					$record->put("value", $row['company']);
				} else
				if ($table == "crm_users") {
					$record->put("display", $row['level']);
					$record->put("value", $row['owner']);
				} else
				if ($table == "crm_products") {
					$record->put("name", $row['id']);
					if ($fields == "product_vendor")
						$record->put("value", $row['product_vendor']);
					else
						$record->put("value", $row['product_name']);
				} else
				if ($table == "crm_warehouse") {
					$record->put("warehouse_id", $row['warehouse_id']);
					$record->put("name", $row['name']);
				}
				else
					$record->put("value", $row[$fields]);
				$record->put($values, $row[$fields]);
				$json .= $record->json().",";
				$count++;
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}	
		
		function crm_customer_query_list($item) {
			$count = 0;
			$json = "";
			$where = $item->get("query");
			$q = "SELECT crm_id,firstName,lastName,phone,type FROM crm_customer WHERE firstName like '%$where%' or lastName like '%$where%' or engName like '%$where%' or phone like '%$where%' or phone1 like '%$where%' or phone2 like '%$where%'";
			$result = $this->query_result($q, "");
			while ($row = mysql_fetch_array($result)) {
				$record = new item();			
				$record->put('crm_id', $row['crm_id']);
				$record->put('phone', $row['phone']);
				$record->put('crm_name', $row['firstName']." ".$row['lastName']." (".$row['type'].")");
				$json .= $record->json().",";
				$count++;
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}					

		function crm_view_query($item) {
			$q = "select query from crm_view_list";
			$views = $item->get("views");
			if (strlen($views) == 0) return ""; 
			$result = $this->query_result($q, " WHERE view='$views'");
			while ($row = mysql_fetch_array($result)) {
				$logged = $_SESSION["logged"]['owner'];
				$result = str_replace('$logged', $logged, $row["query"]);
				return $result;
			}

			$bagged = false;
			$q = "select field,equals,value from crm_personal_view";
			$result = $this->query_result($q, " WHERE personal='$views'");
			$ret = " and (";
			while ($row = mysql_fetch_array($result)) {
				$bagged = true;
				if ($row['equals'] == 'equal')
					$ret .= $row['field']."='".$row['value']."' and ";
				if ($row['equals'] == 'does not equal')
					$ret .= $row['field']."<>'".$row['value']."' and ";
				if ($row['equals'] == 'is greater than')
					$ret .= $row['field'].">'".$row['value']."' and ";
				if ($row['equals'] == 'is less than')
					$ret .= $row['field']."<'".$row['value']."' and ";
				if ($row['equals'] == 'begins with')
					$ret .= $row['field']." like '".$row['value']."%' and ";
				if ($row['equals'] == 'ends with')
					$ret .= $row['field']." like '%".$row['value']."' and ";
			}
			if ($bagged) {
				$ret .= "1=1)";
				return $ret;
			}
			
			if (strlen($views) > 0) 
				return " and (crm_id in (select crm_id from crm_customer_campaigns where campaign='$views'))";
			
			$ret .= "1=1)";
			return $ret;
		}

		function crm_retail_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");		
			$q = "SELECT * FROM crm_customer";
			$filter_where = $this->filter_where($item);									
			$filter_where .= $this->crm_view_query($item);
			$record = new crm_retail();
			$query_all = $this->crm_where($item, $record->basic_fields)." and customer_type=0 $filter_where";
			$rows = $this->query_result_rows("SELECT crm_id FROM crm_customer", $query_all);
			$result = $this->query_result($q, $this->crm_where($item, $record->basic_fields)." and customer_type=0 $filter_where ORDER BY $sort $dir LIMIT $start,$end");
			$_SESSION['Contact'] = $q." ".$this->crm_where($item, $record->basic_fields)." and customer_type=0 $filter_where ORDER BY $sort $dir";			
			while ($row = mysql_fetch_array($result)) {				
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
				$count++;
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$rows.',"items":['.$json.']}';
		}	
		
		function crm_corporate_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_customer";
			$filter_where = $this->filter_where($item);									
			$filter_where .= $this->crm_view_query($item);
			$record = new crm_corporate();
			$query_all = $this->crm_where($item, $record->basic_fields)." and customer_type=1 $filter_where";
			$rows = $this->query_result_rows("SELECT crm_id FROM crm_customer",$query_all);
			$result = $this->query_result($q, $this->crm_where($item, $record->basic_fields)." and customer_type=1 $filter_where ORDER BY $sort $dir LIMIT $start,$end");
			$_SESSION['Account'] = $q." ".$this->crm_where($item, $record->basic_fields)." and customer_type=1 $filter_where ORDER BY $sort $dir";
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_corporate();
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
				$count++;
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$rows.',"items":['.$json.']}';
		}	


		function crm_customer_xml_list($item) {
			$array = array();
			$count = 0;
			$xml = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$where = $item->get("where");
			$q = "SELECT * FROM crm_customer WHERE owner='$where'";
			$record = new crm_customer();
			$rows = $this->query_result_rows("SELECT crm_id FROM crm_customer", " WHERE owner='$where' ORDER BY $sort $dir");
			$result = $this->query_result($q, " ORDER BY $sort $dir");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_customer();
				$record->init($row);
				$array[$count] = $record;
				$xml .= $record->xml("customer");
				$count++;
			}
			return '<?xml version="1.0" encoding="utf-8"?>'."\n".'<data>'."\n".$xml."</data>";
		}

		function crm_risk_question_xml_list($item) {
			$array = array();
			$count = 0;
			$xml = "";
			$q = "SELECT * FROM crm_risk_questions";
			$record = new crm_risk_questions();
			$result = $this->query_result($q, " ORDER BY id");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_risk_questions();
				$record->init($row);
				$array[$count] = $record;
				$xml .= $record->xml("question");
				$count++;
			}
			return '<?xml version="1.0" encoding="utf-8"?>'."\n".'<data>'."\n".$xml."</data>";
		}
		
		function crm_product_xml_list($item) {
			$array = array();
			$count = 0;
			$xml = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_products";
			$result = $this->query_result($q, " ORDER BY $sort $dir");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_product();
				$record->init($row);
				$array[$count] = $record;
				$xml .= $record->xml("products");
				$count++;
			}
			return '<?xml version="1.0" encoding="utf-8"?>'."\n".'<data>'."\n".$xml."</data>";
		}
		
		function crm_product_available_xml_list($item) {
			$query = "update crm_products as p set total = (select sum(incoming)-sum(outgoing)-ifnull((select sum(qty) from crm_deal_products where product_id=p.product_id and flag>0),0) from crm_balance as b where b.product_id=p.product_id and deposit='storage' and b.warehouse_id=1) where total<5000";
			mysql_query($query, $this->db->conn());

			$array = array();
			$count = 0;
			$xml = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "select product_id,total as last from crm_products";
			$result = $this->query_result($q, " WHERE total>0 ORDER BY $sort $dir");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_product_available();
				$record->init($row);
				$array[$count] = $record;
				$xml .= $record->xml("product_available");
				$count++;
			}
			return '<?xml version="1.0" encoding="utf-8"?>'."\n".'<data>'."\n".$xml."</data>";
		}

		function crm_owner_service_product_xml_list($item) {
			$array = array();
			$count = 0;
			$xml = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$where = $item->get("where");
			$wh = explode(',', $where);
			$logged = $wh[0];
			$date = $wh[1];
			$service_id = $wh[2];
			if (strlen($service_id) > 0 && $service_id > 0)
				$q = "SELECT product_id,sum(qty) as qty, sum(amount) as amount,price,type FROM crm_deal_products WHERE userCode='$logged' and service_id=$service_id GROUP by product_id,type,price";
			else {
				$user_dir = $this->crm_user_direction("owner=$logged");
				if ($user_dir == "retail")
					$q = "SELECT product_id,sum(qty) as qty, sum(amount) as amount,price,type FROM crm_deal_products WHERE userCode='$logged' and date(_date)='$date' and crm_id in (select crm_id from crm_customer where _class='AGENT' and owner='$logged') GROUP by product_id,type,price";
				else
					$q = "SELECT product_id,sum(qty) as qty, sum(amount) as amount,price,type FROM crm_deal_products WHERE userCode='$logged' and date(_date)='$date' GROUP by product_id,type,price";
			}
			$result = $this->query_result($q, " ORDER BY $sort $dir");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_deal_product();
				$v = $this->crm_product_name_simple($row['product_id']);
				$vw = explode('|', $v);
				$row['product_name'] = $vw[0];
				$row['product_code'] = $vw[1];
				$record->init($row);
				$array[$count] = $record;
				$xml .= $record->xml("service_product");
				$count++;
			}
			return '<?xml version="1.0" encoding="utf-8"?>'."\n".'<data>'."\n".$xml."</data>";
		}
		
		function crm_owner_service_customer_xml_list($item) {
			$array = array();
			$count = 0;
			$xml = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$where = $item->get("where");
			$wh = explode(',', $where);
			$logged = $wh[0];
			$date = $wh[1];
			$user_dir = $this->crm_user_direction("owner=$logged");
			if ($user_dir == "retail")
				$q = "SELECT crm_id, sum(amount) as amount,GROUP_CONCAT(DISTINCT warehouse_id ORDER BY warehouse_id) as warehouse FROM crm_deal_products WHERE userCode='$logged' and date(_date)='$date' and crm_id in (select crm_id from crm_customer where _class='AGENT' and owner='$logged') GROUP by crm_id";
			else
				$q = "SELECT crm_id,sum(qty) as qty, sum(amount) as amount,GROUP_CONCAT(DISTINCT warehouse_id ORDER BY warehouse_id) as warehouse FROM crm_deal_products WHERE userCode='$logged' and date(_date)='$date' GROUP by crm_id";
			
			$result = $this->query_result($q, " ORDER BY $sort $dir");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_service_customer();
				$row['crm_name'] = $this->crm_customer_name_simple($row['crm_id']);
				$record->init($row);
				$array[$count] = $record;
				$xml .= $record->xml("service_customer");
				$count++;
			}
			return '<?xml version="1.0" encoding="utf-8"?>'."\n".'<data>'."\n".$xml."</data>";
		}

		function crm_warehouse_xml_list($item) {
			$array = array();
			$count = 0;
			$xml = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_warehouse";
			$result = $this->query_result($q, " WHERE warehouse_type<>'container' ORDER BY $sort $dir");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_warehouse();
				$record->init($row);
				$array[$count] = $record;
				$xml .= $record->xml("warehouse");
				$count++;
			}
			return '<?xml version="1.0" encoding="utf-8"?>'."\n".'<data>'."\n".$xml."</data>";
		}

		function crm_service_xml_list($item) {
			$this->crm_service_list_before();
			$this->crm_service_products_to_sales_action($item);
			$array = array();
			$count = 0;
			$xml = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT *,(select sum(service_revenue) from crm_services where crm_id=b.crm_id and date(_date)=date(b._date)) as total,(select partner from crm_users where owner=b.userCode) as partner FROM crm_services as b";
			$result = $this->query_result($q, " WHERE crm_id=".$item->get("where")." ORDER BY $sort $dir LIMIT 0,10");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_service();
				$record->init($row);
				$array[$count] = $record;
				$xml .= $record->xml("services");
				$count++;
			}
			return '<?xml version="1.0" encoding="utf-8"?>'."\n".'<data>'."\n".$xml."</data>";
		}

		function crm_case_xml_list($item) {
			$array = array();
			$count = 0;
			$xml = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_complain";
			$result = $this->query_result($q, " WHERE crm_id=".$item->get("where")." ORDER BY $sort $dir");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_complain();
				$record->init($row);
				$array[$count] = $record;
				$xml .= $record->xml("case");
				$count++;
			}
			return '<?xml version="1.0" encoding="utf-8"?>'."\n".'<data>'."\n".$xml."</data>";
		}

		function crm_deal_xml_list($item) {
			$array = array();
			$count = 0;
			$xml = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_deals";
			$result = $this->query_result($q, " WHERE crm_id=".$item->get("where")." ORDER BY $sort $dir");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_deal();
				$record->init($row);
				$array[$count] = $record;
				$xml .= $record->xml("deals");
				$count++;
			}
			return '<?xml version="1.0" encoding="utf-8"?>'."\n".'<data>'."\n".$xml."</data>";
		}
		
		function crm_personal_view_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_personal_view";
			$record = new crm_personal_view();
			$where = $this->crm_where($item, $record->basic_fields);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_personal_view();
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
				$count++;
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}	

		function crm_post_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_posts";
			$record = new crm_post();
			$where = $this->crm_where($item, $record->basic_fields);
			$count = $this->num_rows($q, $where);
			
			if (strlen($where) > 0) {
				$logged = $_SESSION["logged"]['owner'];
				$query_update = "UPDATE crm_posts SET reply_id='1' ".$where." and length(reply_id)=0 and owner='$logged'";
				mysql_query($query_update, $this->db->conn());
			}

			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_post();
				$row['deal_name'] = $this->crm_deal_name_simple($row);
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}	
		
		function crm_risk_result_list($item) {
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$where = $item->get("query");
			$q = "SELECT r.id,crm_id,category,section,question,score,_repeat,r.status,owner,_date FROM crm_risk_questions as q join crm_risk_results as r on q.id=r.question_id";
			$record = new crm_risk_result();
			$where = $this->crm_where($item, $record->basic_fields);
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_risk_result();
				$row['crm_name'] = $this->crm_customer_name($row['crm_id']);			
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}

		function crm_risk_result_ui_list($item) {
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$where = $item->get("query");
			$q = "SELECT r.id,crm_id,category,section,question,score,_repeat,r.status,owner,_date FROM crm_risk_questions as q join crm_risk_results as r on q.id=r.question_id";
			$record = new crm_risk_result();
			$where = $this->crm_where($item, $record->basic_fields);
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_risk_result();
				$row['crm_name'] = $this->crm_customer_name($row['crm_id']);
				
				if ($row['score'] == 0 || $row['score'] == 1 || $row['score'] == 2) $row['score'] = rand(0, 250); 
				else
				if ($row['score'] == 3 || $row['score'] == 4 || $row['score'] == 5) $row['score'] = rand(250, 500);

				if ($row['_repeat'] == 0 || $row['_repeat'] == 1 || $row['_repeat'] == 2) $row['_repeat'] = rand(0, 250); 
				else
				if ($row['_repeat'] == 3 || $row['_repeat'] == 4 || $row['_repeat'] == 5) $row['_repeat'] = rand(250, 500);
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '['.$json.']';
		}

		function crm_workflow_ui_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$where = $item->get("where");
			$filter_where = $this->filter_where($item);			
			$record = new crm_workflow();
			$where = $this->crm_where($item, $record->basic_fields);	
			$where = $this->crm_session_where($where); 
			$where .= $this->crm_view_query($item);
			$q = "select * from crm_workflow";
			$count = $this->num_rows($q, "");
			$result = $this->query_result($q, $where." ORDER BY $sort $dir");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_workflow();
				if ($row['issue'] == 1 || $row['issue'] == 2) $row['issue'] = rand(0, 200); 
				else
				if ($row['issue'] == 3 || $row['issue'] == 4 || $row['issue'] == 5) $row['issue'] = rand(200, 400);
				if ($row['priority'] == 'low' || $row['priority'] == 'medium') $row['priority'] = rand(0, 200); 
				else
				if ($row['priority'] == 'high' || $row['priority'] == 'important') $row['priority'] = rand(200, 400);
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '['.$json.']';
		}

		function crm_note_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_notes";
			$record = new crm_note();
			$where = $this->crm_where($item, $record->basic_fields);
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_note();
				$row['crm_name'] = $this->crm_customer_name($row['crm_id']);
				$row['deal_name'] = $this->crm_deal_name_simple($row);
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}	
		
		function crm_email_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_emails";
			$record = new crm_email();
			$where = $this->crm_where($item, $record->basic_fields);
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_email();
				$row['crm_name'] = $this->crm_customer_name($row['crm_id']);
				$row['deal_name'] = $this->crm_deal_name_simple($row);
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}	
		
		function crm_task_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_tasks";
			$record = new crm_task();
			$where = $this->crm_where($item, $record->basic_fields);
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_task();
				$row['crm_name'] = $this->crm_customer_name($row['crm_id']);
				$row['deal_name'] = $this->crm_deal_name_simple($row);
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}	

		function crm_event_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_events";
			$record = new crm_event();
			$where = $this->crm_where($item, $record->basic_fields);
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_event();
				$row['crm_name'] = $this->crm_customer_name($row['crm_id']);
				$row['deal_name'] = $this->crm_deal_name_simple($row);
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}
		
		function crm_calllog_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_calllog";
			$record = new crm_calllog();
			$where = $this->crm_where($item, $record->basic_fields);
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_calllog();
				$row['crm_name'] = $this->crm_customer_name($row['crm_id']);
				$row['deal_name'] = $this->crm_deal_name_simple($row);
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}
		
		function crm_contact_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_customer";
			$record = new crm_contacts();
			$where = $this->crm_where($item, $record->basic_fields);
			$count = $this->num_rows($q, $where." and customer_type=0");
			$result = $this->query_result($q, $where." and customer_type=0 ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_contacts();
				$row['crm_name'] = $this->crm_customer_name_simple($row['crm_id']);
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}
		
		function crm_reseller_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$logged = $_SESSION["logged"]['owner'];
			$q = "SELECT * FROM crm_customer";
			$record = new crm_contacts();
			$where = $this->crm_where($item, $record->basic_fields);
			$count = $this->num_rows($q, $where." and owner='$logged' and (_class='RESELLER' or _class='AGENT')"); 
			$result = $this->query_result($q, $where." and owner='$logged' and (_class='RESELLER' or _class='AGENT') ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_contacts();
				$row['crm_name'] = $this->crm_customer_name_simple($row['crm_id']);
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}

		function crm_message_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_message";
			$record = new crm_message();
			$where = $this->crm_where($item, $record->basic_fields);
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_message();
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}
		
		function crm_complain_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_complain";
			$record = new crm_complain();
			$where = $this->crm_where($item, $record->basic_fields);
//			$where = $this->crm_session_userCode_where($where);
			$where .= $this->crm_view_query($item);
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");

			while ($row = mysql_fetch_array($result)) {
				$record = new crm_complain();
				$row['crm_name'] = $this->crm_customer_name($row['crm_id']);
				$row['notify'] = $this->crm_case_post_notify($row['case_id']);
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}

		function crm_calendar_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$where = $item->get("where");
			$filter_where = $this->filter_where($item);			
			$logged = $_SESSION["logged"]['owner'];
			$q = "select crm_id,subject,date(duedate) as _date, duetime as times,priority, 'task' as work_type, descr, task_status as status,owner,campaign from crm_tasks where owner='$logged'
			union 
			select crm_id,subject,date(start_date) as _date, start_time as times,priority,'appointment' as work_type, descr, event_status as status,owner,campaign from crm_events where owner='$logged'
			union 
			select crm_id,subject,date(_date) as _date, '' as times,priority,'phone call' as work_type, _to as descr, callresult as status,owner,campaign from crm_calllog where owner='$logged'
			union 
			select crm_id,subject,date(_date) as _date, '' as times,priority,'email' as work_type, descr,email_status as status,owner,campaign from crm_emails where owner='$logged'";
			$count = $this->num_rows($q, "");
			$result = $this->query_result($q, " ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_calendar();
				$row['crm_name'] = $this->crm_customer_name($row['crm_id']);
				$row['deal_name'] = $this->crm_deal_name_simple($row);
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
			
		}

		function crm_workflow_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$where = $item->get("where");
			$filter_where = $this->filter_where($item);			
			$record = new crm_workflow();
			$where = $this->crm_where($item, $record->basic_fields);	
			$where = $this->crm_session_where($where); 
			$where .= $this->crm_view_query($item);
			$q = "select * from crm_workflow";
			$count = $this->num_rows($q, "");
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_workflow();
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
			
		}

		function crm_customer_activity_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$where = $item->get("where");
			$views = $item->get("views");
			$record = new crm_calendar();
			$where = $this->crm_where($item, $record->basic_fields);	
			$date_where = $this->date_where($item);
			$a = 0; $b = 0; $c = 0; $d = 0; $e = 0;
			if ($views == 'Appointment List') $a = 1; else
			if ($views == 'Phone Call List') $b = 1; else
			if ($views == 'Email List') $c = 1; else
			if ($views == 'Note List') $d = 1; else	
			if ($views == 'Task List') $e = 1; else
			{$a = 1; $b = 1; $c = 1; $d = 1; $e = 1;}
			$q = "select concat(cast(id as char), '_t') as id,crm_id,subject,(duedate) as days, duetime as times,priority, 'task' as work_type, descr, task_status as status,owner,case_id,deal_id,campaign,'' as phone,_date,userCode from crm_tasks $where and 1=$e $date_where
			union 
			select concat(cast(id as char), '_a') as id,crm_id,subject,(start_date) as days, start_time as times,priority,'appointment' as work_type, descr, event_status as status,owner,case_id,deal_id,campaign,'' as phone,_date,userCode from crm_events $where and 1=$a $date_where
			union 
			select concat(cast(id as char), '_c') as id,crm_id,subject,(_date) as days, '' as times,priority,'phone call' as work_type, descr as descr, callresult as status,owner,case_id,deal_id,campaign,_to as phone,_date,userCode from crm_calllog $where and 1=$b $date_where
			union 
			select concat(cast(id as char), '_n') as id,crm_id,'Note' as subject,(_date) as days, '' as times,'' as priority,'note' as work_type, descr, 'noted' as status,owner,case_id,deal_id,'' as campaign,'' as phone,_date,userCode from crm_notes $where and 1=$d $date_where
			union 
			select concat(cast(id as char), '_e') as id,crm_id,subject,(_date) as days, '' as times,priority,'email' as work_type, descr,email_status as status,owner,case_id,deal_id,campaign,_to as phone,_date,userCode from crm_emails $where and 1=$c $date_where";
			
			$count = $this->num_rows($q, "");
			$result = $this->query_result($q, " ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_calendar();
				$row['crm_name'] = $this->crm_customer_name($row['crm_id']);
				$row['source'] = $row['case_id']>0?'case':'deal';
				if ($row['deal_id'] == 0 && $row['case_id'] == 0) $row['source'] = ($row['campaign']?'campaign':'');
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
			
		}

		function crm_customer_activity_xml_list($item) {
			$array = array();
			$count = 0;
			$xml = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$where = $item->get("where");
			$views = $item->get("views");
			$record = new crm_calendar();
			$where = $this->crm_where($item, $record->basic_fields);	
			$a = 0; $b = 0; $c = 0; $d = 0; $e = 0;
			if ($views == 'Appointment List') $a = 1; else
			if ($views == 'Phone Call List') $b = 1; else
			if ($views == 'Email List') $c = 1; else
			if ($views == 'Note List') $d = 1; else	
			if ($views == 'Task List') $e = 1; else
			{$a = 1; $b = 1; $c = 1; $d = 1; $e = 1;}
			$q = "select concat(cast(id as char), '_t') as id,crm_id,subject,(duedate) as days, duetime as times,priority, 'task' as work_type, descr, task_status as status,owner,case_id,deal_id,campaign,_date from crm_tasks $where and 1=$e
			union 
			select concat(cast(id as char), '_a') as id,crm_id,subject,(start_date) as days, start_time as times,priority,'appointment' as work_type, descr, event_status as status,owner,case_id,deal_id,campaign,_date from crm_events $where and 1=$a
			union 
			select concat(cast(id as char), '_c') as id,crm_id,subject,(_date) as days, '' as times,priority,'phone call' as work_type, descr as descr, callresult as status,owner,case_id,deal_id,campaign,_date from crm_calllog $where and 1=$b
			union 
			select concat(cast(id as char), '_n') as id,crm_id,'Note' as subject,(_date) as days, '' as times,'' as priority,'note' as work_type, descr, 'noted' as status,owner,case_id,deal_id,'' as campaign,_date from crm_notes $where and 1=$d
			union 
			select concat(cast(id as char), '_e') as id,crm_id,subject,(_date) as days, '' as times,priority,'email' as work_type, descr,email_status as status,owner,case_id,deal_id,campaign,_date from crm_emails $where and 1=$c";

			$result = $this->query_result($q, " ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_calendar();
				$row['crm_name'] = $this->crm_customer_name($row['crm_id']);
				$row['source'] = $row['case_id']>0?'case':'deal';
				if ($row['deal_id'] == 0 && $row['case_id'] == 0) $row['source'] = ($row['campaign']?'campaign':'');
				$record->init($row);
				$array[$count] = $record;
				$xml .= $record->xml('activity');
			}
			return '<?xml version="1.0" encoding="utf-8"?>'."\n".'<data>'."\n".$xml."</data>";
			
		}

		function date_where($item) {
			$start_date = $item->get("start_date");
			$end_date = $item->get("end_date");

			if ($start_date) {
				return " and (_date between '$start_date' and '$end_date')";
			}

			return "";
		}
		
		function date_closing_where($item) {
			$start_date = $item->get("start_date");
			$end_date = $item->get("end_date");

			if ($start_date) {
				return " and (closing_date between '$start_date' and '$end_date')";
			}

			return "";
		}

		function crm_my_activity_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$where = $item->get("where");
			$record = new crm_calendar();
			$where = $this->crm_where($item, $record->basic_fields);	
			$logged = $_SESSION['logged']['owner'];
			$views = $item->get("views");
			$a = 0; $b = 0; $c = 0; $e = 0; $k = ""; $cm = ""; $tm = ""; $em = ""; $ce = "";				
			if ($views == 'Appointment List') $a = 1; else
			if ($views == 'Phone Call List') $b = 1; else
			if ($views == 'Email List') $c = 1; else
			if ($views == 'Task List') $e = 1; else
			if ($views == 'All Activity List (Case)') {$k = " and case_id<>0"; $a = 1; $b = 1; $c = 1; $e = 1;}else
			if ($views == 'All Activity List (Remind)') {$cm = " and callresult='remind'"; $tm = " and task_status='remind'"; $em = " and email_status='remind'"; $ce = " and event_status='remind'"; $a = 1; $b = 1; $c = 1; $e = 1;}else
			{$a = 1; $b = 1; $c = 1;  $e = 1;}
			$session_where = $this->crm_session_where($where);
			$date_where = $this->date_where($item);
			
			$q = "select concat(cast(id as char), '_t') as id,crm_id,deal_id,case_id,subject,(duedate) as days, duetime as times,priority, 'task' as work_type, descr, task_status as status,owner,case_id,deal_id,campaign,'' as phone,_date,userCode,remind_at from crm_tasks $session_where and 1=$e $k $tm $date_where and length(owner)>0
			union 
			select concat(cast(id as char), '_a') as id,crm_id,deal_id,case_id,subject,(start_date) as days, start_time as times,priority,'appointment' as work_type, descr, event_status as status,owner,case_id,deal_id,campaign,'' as phone,_date,userCode,remind_at from crm_events $session_where and 1=$a $k $ce $date_where and length(owner)>0
			union 
			select concat(cast(id as char), '_c') as id,crm_id,deal_id,case_id,subject,(_date) as days, '' as times,priority,'phone call' as work_type, descr as descr, callresult as status,owner,case_id,deal_id,campaign,_to as phone,_date,userCode,remind_at from crm_calllog $session_where and 1=$b $k $cm $date_where and length(owner)>0	
			union 
			select concat(cast(id as char), '_e') as id,crm_id,deal_id,case_id,'Email' as subject,(_date) as days, '' as times,priority,'email' as work_type, descr,email_status as status,owner,case_id,deal_id,campaign,_to as phone,_date,userCode,'' as remind_at from crm_emails $session_where and 1=$c $k $em $date_where and length(owner)>0";

			$count = $this->num_rows($q, "");
			$result = $this->query_result($q, " ORDER BY $sort $dir LIMIT $start,$end");

			while ($row = mysql_fetch_array($result)) {
				$record = new crm_calendar();
				$row['crm_name'] = $this->crm_customer_name($row['crm_id']);
				$row['deal_name'] = $this->crm_deal_name_simple($row);
				$row['source'] = $row['case_id']>0?'case':'deal';
				if ($row['deal_id'] == 0 && $row['case_id'] == 0) $row['source'] = ($row['campaign']?'campaign':'');
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';			
		}

		function crm_all_activity_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$where = $item->get("where");
			$record = new crm_calendar();
			$where = $this->crm_where($item, $record->basic_fields);	
			$logged = $_SESSION['logged']['owner'];
			$views = $item->get("views");
			$a = 0; $b = 0; $c = 0; $e = 0; $k = "";
			if ($views == 'Appointment List') $a = 1; else
			if ($views == 'Phone Call List') $b = 1; else
			if ($views == 'Email List') $c = 1; else
			if ($views == 'Task List') $e = 1; else
			if ($views == 'All Activity List (Case)') {$k = " and case_id<>0"; $a = 1; $b = 1; $c = 1; $e = 1;}else
			{$a = 1; $b = 1; $c = 1;  $e = 1;}
			$session_where = $this->crm_session_where($where);			
			$date_where = $this->date_where($item);
			$q = "select concat(cast(id as char), '_t') as id,crm_id,deal_id,case_id,subject,(duedate) as days, duetime as times,priority, 'task' as work_type, descr, task_status as status,owner,_date,campaign,'' as phone,_date,userCode from crm_tasks $session_where and 1=$e $k $date_where
			union all
			select concat(cast(id as char), '_a') as id,crm_id,deal_id,case_id,subject,(start_date) as days, start_time as times,priority,'appointment' as work_type, descr, event_status as status,owner,_date,campaign,'' as phone,_date,userCode from crm_events $session_where and 1=$a $k $date_where
			union all
			select concat(cast(id as char), '_c') as id,crm_id,deal_id,case_id,subject,(_date) as days, '' as times,priority,'phone call' as work_type, descr as descr, callresult as status,owner,_date,campaign,_to as phone,_date,userCode from crm_calllog $session_where and 1=$b $k $date_where		
			union all
			select concat(cast(id as char), '_e') as id,crm_id,deal_id,case_id,'Email' as subject,(_date) as days, '' as times,priority,'email' as work_type, descr,email_status as status,owner,_date,campaign,_to as phone,_date,userCode from crm_emails $session_where and 1=$c $k $date_where";

			$count = $this->num_rows($q, "");
			$result = $this->query_result($q, " ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_calendar();
				$row['crm_name'] = $this->crm_customer_name($row['crm_id']);
				$row['deal_name'] = $this->crm_deal_name_simple($row);
				$row['source'] = $row['case_id']>0?'case':'deal';
				if ($row['deal_id'] == 0 && $row['case_id'] == 0) $row['source'] = ($row['campaign']?'campaign':'');
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';			
		}
		
		function crm_alarm_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$where = $item->get("where");
			$record = new crm_alarm();
			$where = $this->crm_where($item, $record->basic_fields);	
			$logged = $_SESSION['logged']['owner'];
			$q = "select crm_id,subject,'phone call' as type,callresult as status,owner from crm_calllog where callresult='remind' and owner='$logged' union
				  select crm_id,subject,'appointment' as type,event_status as status,owner from crm_events where event_status='remind' and remind_at<=SUBDATE(now(), INTERVAL 1 day) and owner='$logged' union
				  select crm_id,subject,'task' as type,task_status as status, owner from crm_tasks where task_status='remind' and remind_at<=SUBDATE(now(), INTERVAL 1 day) and owner='$logged' union
				  select crm_id,deal as subject,'deal' as type,stage as status,owner from crm_deals where deal_type=1 and ((status='open' or status='inactive') or (closing_date<=SUBDATE(now(), INTERVAL 1 day) and status='postponed')) and owner='$logged' union
				  select crm_id,complain_reason as subject,'case' as type,complain_status as status,owner from crm_complain where complain_status<>'solved' and owner='$logged'
				  union
				  select id as crm_id,subject,'command' as type,'workflow' as status,owner from crm_workflow where workflow_status<>'completed' and owner='$logged' and now()>=SUBDATE(end_date, INTERVAL 1 day)
				  union
				  select id as crm_id,message as subject,'deal' as type,'commented' as status,owner from crm_posts where deal_id>0 and length(reply_id)=0 and owner='$logged'
				  union
				  select id as crm_id,message as subject,'case' as type,'commented' as status,owner from crm_posts where case_id>0 and length(reply_id)=0 and owner='$logged'
				  union
				  select crm_id,deal as subject,'deal' as type,'assigned' as status,userCode as owner from crm_deals where deal_id in (select deal_id from crm_owner_transfer_log where owner='$logged' and flag=1)
				  union
				  select crm_id,deal as subject,'deal' as type,'remind' as status,userCode as owner from crm_deals where now()>=SUBDATE(remind_date, INTERVAL 1 day) and (stage='close as won' or stage='close as lost') and owner='$logged' and deal_type=1
				  union
				  select crm_id,subject,'service' as type,'receipt' as status,userCode as owner from crm_services where service_stage='receipt'";

			$count = $this->num_rows($q, "");
			$result = $this->query_result($q, " ");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_alarm();
				$row['crm_name'] = $this->crm_customer_name_simple($row['crm_id']);
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';			
		}

		function crm_campaign_activity_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$logged = $_SESSION['logged']['owner'];
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$record = new crm_calendar_search();
			$qwhere = $this->crm_where($item, $record->basic_fields);
			$record = new crm_calendar();
			$campaign = $item->get("where");
			$views = $item->get("views");
			$a = 0; $b = 0; $c = 0; $pc = ""; $cm = ""; $tm = ""; $em = ""; $ce = ""; 
			if ($views == 'Appointment List') $a = 1; else
			if ($views == 'Phone Call List') $b = 1; else
			if ($views == 'Email List') $c = 1; else
			{$a = 1; $b = 1; $c = 1;}
			$where = "";
			if ($views == 'My Activity List') { $where = " and owner='$logged'"; $pc = " and (callresult='pending' or callresult='remind')"; }
			if ($views == 'My Activity List (Pending)') { $where = " and owner='$logged'"; $pc = " and callresult='pending'"; }
			if ($views == 'My Activity List (Remind)') {$where = " and owner='$logged'";  $cm = " and callresult='remind'"; $tm = " and task_status='remind'"; $em = " and email_status='remind'"; $ce = " and event_status='remind'"; $a = 1; $b = 1; $c = 1; $e = 1;}

			if ($views == 'All Activity List') { $pc = " and (callresult='pending' or callresult='remind')"; }
			if ($views == 'All Activity List (Pending)') { $pc = " and callresult='pending'"; }
			if ($views == 'All Activity List (Remind)') { $cm = " and callresult='remind'"; $tm = " and task_status='remind'"; $em = " and email_status='remind'"; $ce = " and event_status='remind'"; $a = 1; $b = 1; $c = 1; $e = 1;}

			if ($views == 'Without Owner Activity List') $where = " and owner=''";
			//$session_where = $this->crm_session_where("");
			$date_where = $this->date_where($item);
			$q = "select concat(cast(id as char), '_a') as id,crm_id,case_id,deal_id,subject,date(start_date) as days, start_time as times,priority,'appointment' as work_type, descr, event_status as status,owner,case_id,deal_id,campaign,'' as phone,_date,userCode,'' as remind_at from crm_events where 1=1 $session_where and campaign='$campaign' and (1=$a) $date_where $ce $where
			union 
			select concat(cast(id as char), '_c') as id,crm_id,case_id,deal_id,subject,date(_date) as days, '' as times,priority,'phone call' as work_type, descr, callresult as status,owner,case_id,deal_id,campaign,_to as phone,_date,userCode,remind_at from crm_calllog $qwhere and 1=1 $session_where and campaign='$campaign' and (1=$b) $date_where $pc $cm $where 
			union 
			select concat(cast(id as char), '_e') as id,crm_id,case_id,deal_id,'Email' as subject,date(_date) as days, '' as times,priority,'email' as work_type,descr,email_status as status,owner,case_id,deal_id,campaign,_to as phone,_date,userCode,'' as remind_at from crm_emails $qwhere and 1=1 $session_where and campaign='$campaign' and (1=$c) $date_where $em $where";

			$count = $this->num_rows($q, "");
			$sort = 'remind_at';
			$result = $this->query_result($q, " ORDER BY $sort $dir LIMIT $start,$end");
			
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_calendar();
				$row['crm_name'] = $this->crm_customer_name($row['crm_id']);
				$row['deal_name'] = $this->crm_deal_name_simple($row);
				$row['source'] = $row['case_id']>0?'case':'deal';
				if ($row['deal_id'] == 0 && $row['case_id'] == 0) $row['source'] = ($row['campaign']?'campaign':'');
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
			
		}
		
		function num_rows($q, $where) {
			$result = $this->query_result($q, $where);
			$count = mysql_num_rows($result);
			return $count;
		}

		function crm_customer_opportunity_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_deals";
			$record = new crm_deal();
			$where = $this->crm_where($item, $record->basic_fields);					
			$where = $this->crm_session_where($where);
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_deal();
				$row['crm_name'] = $this->crm_customer_name($row['crm_id']);
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
			
		}
		
		function crm_customer_campaign_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_customer_campaigns";
			$record = new crm_customer_campaign();
			$where = $this->crm_where($item, $record->basic_fields);							
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_customer_campaign();
				$row['crm_name'] = $this->crm_customer_name($row['crm_id']);
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';			
		}

		function crm_customer_company_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_customer_company";
			$record = new crm_customer_company();
			$where = $this->crm_where($item, $record->basic_fields);							
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_customer_company();
				$row['crm_name'] = $this->crm_customer_name($row['crm_id']);
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';			
		}

		function crm_customer_sales_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_sales";
			$record = new crm_sales();
			$where = $this->crm_where($item, $record->basic_fields);							
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_sales();
				$row['crm_name'] = $this->crm_customer_name($row['crm_id']);
				$row['deal_name'] = $this->crm_deal_name_simple($row);
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';			
		}

		function crm_quote_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_quotes";
			$record = new crm_quote();
			$where = $this->crm_where($item, $record->basic_fields);		
			$where .= $this->crm_view_query($item);
			$where = $this->crm_session_where($where);
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_quote();
				$row['crm_name'] = $this->crm_customer_name($row['crm_id']);
				$row['deal_name'] = $this->crm_deal_name_simple($row);
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}
		
		function crm_sales_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_sales";
			$record = new crm_sales();
			$where = $this->crm_where($item, $record->basic_fields);					
			$where = $this->crm_session_where($where);
			$where .= $this->crm_view_query($item);
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_sales();
				$row['crm_name'] = $this->crm_customer_name($row['crm_id']);
				$row['deal_name'] = $this->crm_deal_name_simple($row);
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}
		
		function crm_warehouse_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_warehouse";
			$record = new crm_warehouse();
			$where = $this->crm_where($item, $record->basic_fields);
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_warehouse();
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}

		function crm_storage_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT warehouse_id,product_id,sum(incoming)-sum(outgoing) as qty,sum(pty) as pty,max(_date) as _date FROM crm_balance";
			$record = new crm_storage();
			$where = $this->crm_where($item, $record->basic_fields);
			$count = $this->num_rows($q, $where." and deposit='storage' GROUP BY product_id ORDER BY $sort $dir");
			$result = $this->query_result($q, $where." and deposit='storage' GROUP BY product_id ORDER BY $sort $dir LIMIT $start,$end");
			
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_storage();				
				$ph = explode('|', $this->crm_product_name_simple($row['product_id']));
				$row['product_name'] = $ph[0];
				$row['product_code'] = $ph[1];
				$row['warehouse_name'] = $this->crm_warehouse_name_simple($row['warehouse_id']);
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}

		function crm_product_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_products";
			$record = new crm_product();
			$where = $this->crm_where($item, $record->basic_fields);
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			$_SESSION['Products'] = $q.$where." ORDER BY $sort $dir";
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_product();
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}
		
		function crm_quote_detail_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_quote_details";
			$record = new crm_quote_detail();
			$where = $this->crm_where($item, $record->basic_fields);
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_quote_detail();
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}

		function crm_deal_list($item) {
			$query = "UPDATE crm_deals SET status='inactive' WHERE closing_date<CURRENT_TIMESTAMP and (stage='opportunity' or stage='quote') and status<>'postponed'";
			$result = mysql_query($query, $this->db->conn());

			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$date_where = $this->date_where($item);
			$q = "SELECT * FROM crm_deals";
			$record = new crm_deal();
			$where = $this->crm_where($item, $record->basic_fields);
			$where = $this->crm_session_where($where);
			$where .= $this->crm_view_query($item);
			$view = $this->crm_view_query($item);
			$logged = $_SESSION['logged'];
			$owner = $logged['owner'];
			$where .= " or (1=1 $view and deal_id in (select deal_id from crm_deal_sales_team where owner='$owner'))";
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." $date_where ORDER BY $sort $dir LIMIT $start,$end");
			$_SESSION['Deal'] = $q." ".$where." ORDER BY $sort $dir";
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_deal();
				$row['crm_name'] = $this->crm_customer_name($row['crm_id']);
				$row['notify'] = $this->crm_deal_post_notify($row['deal_id']);
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}

		function crm_service_list_before() {
			$query = "update crm_deal_products set service_id=(select service_id from crm_services where subject=crm_deal_products.descr and userCode=crm_deal_products.userCode and flag>0 and crm_id=crm_deal_products.crm_id limit 0,1) where service_id=0 and deal_id=0 and length(descr)>0";
			mysql_query($query, $this->db->conn());

//			$query = "update crm_services set userCode=(select owner from crm_customer where crm_id=crm_services.crm_id) where length(userCode)=0";
//			mysql_query($query, $this->db->conn());

			$query = "UPDATE crm_services as b SET service_revenue=(select sum(amount) from crm_deal_products as c where c.service_id=b.service_id),service_debt=(select sum(amount) from crm_deal_products as c where c.service_id=b.service_id and type='loan')-ifnull((select sum(amount) from crm_service_payroll as d where d.service_id=b.service_id),0)-service_revenue*service_precent/100 where service_stage<>'closed' and (service_revenue=0 or service_debt=0)";
			$result = mysql_query($query, $this->db->conn());

			$query = "UPDATE crm_services as b SET service_stage='closed' where service_stage='service' and service_debt=0 and service_revenue>0 and length(product_vendor)<3";//zeeliin uldegdelgui bolson update hiih
			$result = mysql_query($query, $this->db->conn());
		}

		function crm_service_list($item) {
			$this->crm_service_list_before();
			$this->crm_service_products_to_sales_action($item);			
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$date_where = $this->date_where($item);
			$q = "SELECT *,(select sum(service_revenue) from crm_services where crm_id=b.crm_id and date(_date)=date(b._date)) as total,(select partner from crm_users where owner=b.userCode) as partner FROM crm_services as b";
			$record = new crm_service();
			$where = $this->crm_where($item, $record->basic_fields);
			$where = $this->crm_session_where($where);
			$where .= $this->crm_view_query($item);
			$view = $this->crm_view_query($item);

			$loggedUser = $_SESSION['logged'];
			$logged = $loggedUser['owner'];
			$warehouse_id = $loggedUser['warehouse_id'];

			$where .= " and (service_id in (select service_id from crm_deal_products where warehouse_id=(select warehouse_id from crm_users where owner='$logged')) or '$warehouse_id'='0' or userCode='$logged')";

			$logged = $_SESSION['logged'];
			$owner = $logged['owner'];
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." $date_where ORDER BY $sort $dir LIMIT $start,$end");
			$_SESSION['Service'] = $q." ".$where." ORDER BY $sort $dir";
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_service();
				$row['crm_name'] = $this->crm_customer_name($row['crm_id']);
				$row['notify'] = $this->crm_deal_post_notify($row['service_id']);
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}

		function crm_competitor_deal_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_deals";
			$record = new crm_deal();
			$where = $this->crm_where($item, $record->basic_fields);
			$where .= " and stage='close as lost'";
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			$_SESSION['Competitor_Deal'] = $q." ".$where." ORDER BY $sort $dir";
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_deal();
				$row['crm_name'] = $this->crm_customer_name($row['crm_id']);
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}
		
		function crm_changeprice_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_changeprice";
			$record = new crm_changeprice();
			$where = $this->crm_where($item, $record->basic_fields);
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			$_SESSION['Competitor_Deal'] = $q." ".$where." ORDER BY $sort $dir";
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_changeprice();
				$row['crm_name'] = $this->crm_customer_name($row['crm_id']);
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}

		function crm_deal_product_list($item) {
			$values = $item->get("values");
			if ($values == "deal_id") {
				$deal_id = $item->get("where");
				$query_one = "UPDATE crm_deals SET expected_revenue=(select sum(amount) from crm_deal_products where crm_deal_products.deal_id=crm_deals.deal_id) WHERE deal_id=$deal_id and	deal_id in (select deal_id from crm_deal_products)";
				mysql_query($query_one, $this->db->conn());	
			}

			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_deal_products";
			$record = new crm_deal_product();
			$where = $this->crm_where($item, $record->basic_fields);
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_deal_product();
				$v = $this->crm_product_name_simple($row['product_id']);
				$vw = explode('|', $v);
				$row['product_name'] = $vw[0];
				$row['product_code'] = $vw[1];
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}

		function crm_deal_payroll_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_deal_payroll";
			$record = new crm_deal_payroll();
			$where = $this->crm_where($item, $record->basic_fields);
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_deal_payroll();
				$row['deal_name'] = $this->crm_deal_name_simple($row);
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}

		function crm_service_payroll_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_service_payroll";
			$record = new crm_service_payroll();
			$where = $this->crm_where($item, $record->basic_fields);
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_service_payroll();
				$row['service_name'] = $this->crm_service_name_simple($row['service_id']);
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}

		function crm_case_product_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_case_products";
			$record = new crm_case_product();
			$where = $this->crm_where($item, $record->basic_fields);
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_case_product();
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}

		function crm_deal_transfer_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_owner_transfer_log";
			$record = new crm_deal_transfer();
			$where = $this->crm_where($item, $record->basic_fields);
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_deal_transfer();
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}

		function crm_case_transfer_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_complain_transfer";
			$record = new crm_case_transfer();
			$where = $this->crm_where($item, $record->basic_fields);
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_case_transfer();
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}

		function crm_deal_competitor_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_deal_competitors";
			$record = new crm_deal_competitor();
			$where = $this->crm_where($item, $record->basic_fields);
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_deal_competitor();
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}

		function crm_deal_sales_team_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_deal_sales_team";
			$record = new crm_deal_sales_team();
			$where = $this->crm_where($item, $record->basic_fields);
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_deal_sales_team();
				$row['deal_name'] = $this->crm_deal_name_simple($row);
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}

		function crm_potential_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_potentials";
			$record = new crm_potential();
			$where = $this->crm_where($item, $record->basic_fields);
			$where = $this->crm_session_where($where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_potential();
				$row['crm_name'] = $this->crm_customer_name($row['crm_id']);
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
				$count++;
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}
		
		function crm_campaign_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_campaign";
			$record = new crm_campaign();
			$where = $this->crm_where($item, $record->basic_fields);
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_campaign();
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}
		
		function crm_users_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_users";
			$record = new crm_user();
			$where = $this->crm_where($item, $record->basic_fields);
			$count = $this->num_rows($q, $where);
			$where = $this->crm_session_where($where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			$_SESSION['Users'] = $q." ".$where." ORDER BY $sort $dir LIMIT $start,$end";
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_user();
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}		
		
		function crm_commission_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_comission";
			$record = new crm_commission();
			$where = $this->crm_where($item, $record->basic_fields);
			$count = $this->num_rows($q, $where);
			$where = $this->crm_session_where($where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			$_SESSION['Users'] = $q." ".$where." ORDER BY $sort $dir LIMIT $start,$end";
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_commission();
				$row['crm_name'] = $this->crm_customer_name($row['crm_id']);
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}

		function crm_competitor_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_competitors";
			$record = new crm_competitor();
			$where = $this->crm_where($item, $record->basic_fields);
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_competitor();
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}	

		function crm_user_planning_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT id,owner,(select team from crm_users where crm_users.owner=crm_user_planning.owner limit 0,1) as team,start_date,end_date,amountTheshold,_date,userCode FROM crm_user_planning";
			$record = new crm_goal();
			$where = $this->crm_where($item, $record->basic_fields);
			$where = $this->crm_session_where($where);
			$where .= $this->crm_view_query($item);
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_goal();
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}	

		function crm_stat_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT id,owner,(select team from crm_users where crm_users.owner=crm_user_stat.owner limit 0,1) as team,_year,_month,event_p,quote_p,newcus_p,expat_p,vip_p,extend_p,_date,userCode FROM crm_user_stat";
			$record = new crm_stat();
			$where = $this->crm_where($item, $record->basic_fields);
			$where = $this->crm_session_where($where);
			$where .= $this->crm_view_query($item);
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_stat();
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}	
		
		function crm_user_group_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT * FROM crm_user_groups";
			$record = new crm_user_group();
			$where = $this->crm_where($item, $record->basic_fields);
			$where = $this->crm_session_where($where);
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir LIMIT $start,$end");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_user_group();
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}	
		
		function crm_deal_sales_team($deal_id) {
			$result = $this->query_result("SELECT owner from crm_deal_sales_team WHERE deal_id=".$deal_id, "");
			$return = "";
			while ($row = mysql_fetch_array($result)) {
				$return .= $row['owner'].", ";
			}

			return $return;
		}

		function crm_report_deal_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$logged = $_SESSION["logged"]['owner'];
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			
			$start_date = $item->get("start_date");
			$end_date = $item->get("end_date");

			$q = "SELECT crm_deals.crm_id,crm_deals.deal_id,GROUP_CONCAT(concat(concat(crm_deal_products.product_name,' '), cast(CONCAT(FORMAT(crm_deal_products.amount, 2), ' ₮') as char(100))) SEPARATOR ', ') as product_name,stage,expected_revenue,probablity,crm_deals.descr,owner FROM crm_deals left join crm_deal_products on crm_deal_products.deal_id=crm_deals.deal_id";
			$record = new crm_report_deal();
			$where = $this->crm_where($item, $record->basic_fields);
			$where = $this->crm_session_where($where);
			$where = str_replace("_date", "crm_deals.closing_date", $where);
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." and deal_type=1 and (crm_deals.closing_date between '$start_date' and '$end_date') or '$logged' in (select owner from crm_deal_sales_team where crm_deal_sales_team.deal_id=crm_deals.deal_id and crm_deal_sales_team.deal_id in (select deal_id from crm_deals where closing_date between '$start_date' and '$end_date')) group by crm_deals.deal_id ORDER BY crm_deals.$sort $dir");
			$_SESSION['CRM_REPORT'] = $q." ".$where." and deal_type=1 and (crm_deals.closing_date between '$start_date' and '$end_date') or '$logged' in (select owner from crm_deal_sales_team where crm_deal_sales_team.deal_id=crm_deals.deal_id and crm_deal_sales_team.deal_id in (select deal_id from crm_deals where closing_date between '$start_date' and '$end_date')) group by crm_deals.deal_id ORDER BY crm_deals.$sort $dir";
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_report_deal();
				$row['owner'] .= ", ".$this->crm_deal_sales_team($row['deal_id']);
				$row['crm_name'] = $this->crm_customer_name_simple($row['crm_id']);
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}
		
		function crm_report_product_list($item) {
			mysql_query("delete from crm_report_product", $this->db->conn());
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");

			$start_date = $item->get("start_date");
			$end_date = $item->get("end_date");

			$logged = $_SESSION['logged']['owner'];
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT product_id,sum(incoming) as qty,sum(pty) as pty,sum(amount) as amount, avg(price) as avg_price from crm_balance";
			$record = new crm_report_product();
			$where = $this->crm_where($item, $record->basic_fields);
			$where = $this->crm_session_where($where);
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." and deposit='sales' group by product_id ORDER BY $sort $dir");
			$_SESSION['CRM_REPORT_PRODUCT'] = $q." ".$where." and deposit='sales' group by product_id ORDER BY $sort $dir";

			while ($row = mysql_fetch_array($result)) {
				$record = new crm_report_product();
				$v = $this->crm_product_name_simple($row['product_id']);
				$vw = explode('|', $v);
				$row['product_name'] = $vw[0];
				$row['product_code'] = $vw[1];
				$row['product_brand'] = $vw[2];
				$row['unit_size'] = $vw[3];
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
				
				$a1 = $row['product_code'];$a2 = $row['product_barcode'];$a3 = $row['product_brand'];$a4 = $row['product_name'];
				$a5 = doubleval($row['unit_size']);$a6 = doubleval($row['qty']);$a7 = doubleval($row['pty']);$a8 = doubleval($row['amount']);
				$a9 = doubleval($row['avg_price']);
				$qins = "insert into crm_report_product (product_code,product_barcode,product_brand,product_name,unit_size,qty,pty,amount,average_price) values ('$a1','$a2','$a3','$a4',$a5,$a6,$a7,$a8,$a9)";
				$result_ins = mysql_query($qins, $this->db->conn());

			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}

		function crm_report_customer_product_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");

			$start_date = $item->get("start_date");
			$end_date = $item->get("end_date");

			$logged = $_SESSION['logged']['owner'];
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT crm_id,product_id,sum(incoming) as qty,sum(pty) as pty,sum(amount) as amount, avg(price) as avg_price from crm_balance";
			$record = new crm_report_customer_product();
			$where = $this->crm_where($item, $record->basic_fields);
			$where = $this->crm_session_where($where);
			$count = $this->num_rows($q, $where." and deposit='sales' and crm_id not in (select crm_id from crm_customer where _class='AGENT') group by crm_id,product_id ORDER BY $sort $dir");			
			$result = $this->query_result($q, $where." and deposit='sales' and crm_id not in (select crm_id from crm_customer where _class='AGENT') group by crm_id,product_id ORDER BY $sort $dir");
			$_SESSION['CRM_REPORT_CUSTOMER'] = $q." ".$where." and deposit='sales' and crm_id not in (select crm_id from crm_customer where _class='AGENT') group by crm_id,product_id ORDER BY $sort $dir";
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_report_customer_product();
				$row['crm_name'] = $this->crm_customer_name_simple($row['crm_id']);
				$v = $this->crm_product_name_simple($row['product_id']);
				$vw = explode('|', $v);
				$row['product_name'] = $vw[0];
				$row['product_code'] = $vw[1];
				$row['product_brand'] = $vw[2];
				$row['unit_size'] = $vw[3];
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}
		
		function crm_report_customer_list($item) {
			mysql_query("delete from crm_report_customer", $this->db->conn());
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");

			$start_date = $item->get("start_date");
			$end_date = $item->get("end_date");

			$logged = $_SESSION['logged']['owner'];
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "select crm_id, SUM(IF(deposit = 'lease' and _date<'$start_date', amount,0)) as first, SUM(IF(deposit = 'cash', amount,0)) as paid, SUM(IF(deposit = 'back', amount,0)) as ret, SUM(IF(deposit = 'sales', amount,0)) as amount, SUM(IF(deposit = 'sales' and warehouse_id=1, amount,0)) as amount1, SUM(IF(deposit = 'sales' and warehouse_id=2, amount,0)) as amount2, SUM(IF(deposit = 'discount', amount,0)) as discount, SUM(IF(deposit = 'changeprice', amount,0)) as changeprice from crm_balance";
			$record = new crm_report_customer();
			$where = $this->crm_where($item, $record->basic_fields);
			$where = $this->crm_session_where($where);
			$count = $this->num_rows($q, $where." and type<>7 group by crm_id ORDER BY $sort $dir");
			$result = $this->query_result($q, $where." and type<>7 group by crm_id ORDER BY $sort $dir");
			$_SESSION['CRM_REPORT_CUSTOMER'] = $q." ".$where." and type<>7 group by crm_id ORDER BY $sort $dir";
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_report_customer();
				$row['crm_name'] = $this->crm_customer_name_simple($row['crm_id']);
				$row['last'] = doubleval($row['first']) + doubleval($row['amount']) + doubleval($row['ret']) - doubleval($row['paid']) - doubleval($row['discount']) - doubleval($row['changeprice']);
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";

				$a1 = $row['crm_name'];$a2 = doubleval($row['first']);$a3 = doubleval($row['amount1']);$a4 = doubleval($row['amount2']);
				$a5 = doubleval($row['sales']);$a6 = doubleval($row['paid']);$a7 = doubleval($row['ret']);$a8 = doubleval($row['changeprice']);
				$a9 = doubleval($row['discount']);$a10 = doubleval($row['last']);
				$qins = "insert into crm_report_customer (crm_name,old_balance,huns,goo,total,paid,ret,changeprice,discount,new_balance) values ('$a1',$a2,$a3,$a4,$a5,$a6,$a7,$a8,$a9,$a10)";
				$result_ins = mysql_query($qins, $this->db->conn());
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}
		
		function crm_report_storage_daily_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");

			$start_date = $item->get("start_date");
			$end_date = $item->get("end_date");

			$logged = $_SESSION['logged']['owner'];
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT product_id,'' as product_brand,
			SUM(IF(deposit='storage' and _date<'$start_date', incoming-outgoing, 0)) as first,
			SUM(IF(deposit='storage' and type<>4 and _date between '$start_date' and '$end_date', incoming, 0)) as incoming,			
			SUM(IF(deposit='storage' and  type=4 and _date between '$start_date' and '$end_date', incoming, 0)) as ret,
			SUM(IF(deposit='storage' and _date between '$start_date' and '$end_date', outgoing, 0)) as sales,
			0 as promo,
			0 as bm3,
			0 as bm4,
			0 as shop,
			0 as last  from crm_balance as b";
			$record = new crm_report_storage();
			$where = $this->crm_where($item, $record->basic_fields);
			$where = $this->crm_session_where($where);
			$count = $this->num_rows($q, $where." and product_id > 0 group by product_id ORDER BY $sort $dir");			
			$result = $this->query_result($q, $where." and product_id > 0 group by product_id  ORDER BY $sort $dir");
			$_SESSION['CRM_REPORT_STORAGE_DAILY'] = $q." ".$where." and product_id > 0 group by product_id  ORDER BY $sort $dir";
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_report_storage_daily();
				$v = $this->crm_product_name_simple($row['product_id']);
				$vw = explode('|', $v);
				$row['product_name'] = $vw[0];
				$row['product_code'] = $vw[1];
				$row['product_brand'] = $vw[2];
				$row['unit_size'] = $vw[3];
				$row['last'] = doubleval($row['first']) + doubleval($row['incoming']) + doubleval($row['ret']) - doubleval($row['sales']) - doubleval($row['promo']);
				$row['total'] = doubleval($row['first']) + doubleval($row['incoming']) + doubleval($row['ret']) - doubleval($row['sales']) - doubleval($row['promo']) + doubleval($row['bm3']) + doubleval($row['bm4']) + doubleval($row['shop']);
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}

		function crm_report_storage_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");

			$start_date = $item->get("start_date");
			$end_date = $item->get("end_date");

			$logged = $_SESSION['logged']['owner'];
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT product_id,'' as product_brand,
			SUM(IF(deposit='storage' and _date<'$start_date', incoming-outgoing, 0)) as first,
			SUM(IF(deposit='storage' and type<>4 and _date between '$start_date' and '$end_date', incoming, 0)) as incoming,			
			SUM(IF(deposit='storage' and  type=4 and _date between '$start_date' and '$end_date', incoming, 0)) as ret,			
			SUM(IF(deposit='storage' and _date between '$start_date' and '$end_date', outgoing, 0)) as sales,			
			0 as promo,
			0 as last  from crm_balance as b";
			$record = new crm_report_storage();
			$where = $this->crm_where($item, $record->basic_fields);
			$where = $this->crm_session_where($where);
			$count = $this->num_rows($q, $where." and product_id > 0 group by product_id ORDER BY $sort $dir");			
			$result = $this->query_result($q, $where." and product_id > 0 group by product_id ORDER BY $sort $dir");
			$_SESSION['CRM_REPORT_STORAGE'] = $q." ".$where." group by product_id  ORDER BY $sort $dir";
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_report_storage();
				$v = $this->crm_product_name_simple($row['product_id']);
				$vw = explode('|', $v);
				$row['product_name'] = $vw[0];
				$row['product_code'] = $vw[1];
				$row['product_brand'] = $vw[2];
				$row['unit_size'] = $vw[3];
				$row['last'] = doubleval($row['first']) + doubleval($row['incoming']) + doubleval($row['ret']) - doubleval($row['sales']) - doubleval($row['promo']); 
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}
		
		function crm_report_case_list($item) {
			mysql_query("delete from crm_report_case", $this->db->conn());

			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");

			$start_date = $item->get("start_date");
			$end_date = $item->get("end_date");

			$logged = $_SESSION['logged']['owner'];
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT userCode as owner,(select team from crm_users where owner=userCode) as section from crm_complain";
			$record = new crm_report_case();
			$where = $this->crm_where_without_date($item, $record->basic_fields);
//			$where = $this->crm_session_where($where);
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." GROUP BY userCode ORDER BY $sort $dir");
			$_SESSION['CRM_REPORT_PRODUCT'] = "";

			while ($row = mysql_fetch_array($result)) {
				$record = new crm_report_case();				
				$userCode = $row['owner'];
				$row['c1'] = $this->query_result_rows("select resolution_type from crm_complain where userCode='$userCode' and resolution_type='calls'", "");
				$row['c2'] = $this->query_result_rows("select resolution_type from crm_complain where userCode='$userCode' and resolution_type='information request'", "");
				$row['c3'] = $this->query_result_rows("select resolution_type from crm_complain where userCode='$userCode' and resolution_type='complaints'", "");
				$row['c4'] = $this->query_result_rows("select resolution_type from crm_complain where userCode='$userCode' and resolution_type='information submitted'", "");
				$row['c5'] = $this->query_result_rows("select resolution_type from crm_complain where userCode='$userCode' and resolution_type='other'", "");
				
				$row['p1'] = $this->query_result_rows("select priority from crm_complain where userCode='$userCode' and priority='low'", "");
				$row['p2'] = $this->query_result_rows("select priority from crm_complain where userCode='$userCode' and priority='medium'", "");
				$row['p3'] = $this->query_result_rows("select priority from crm_complain where userCode='$userCode' and priority='high'", "");

				$row['s1'] = $this->query_result_rows("select case_stage from crm_complain where userCode='$userCode' and case_stage='identify'", "");
				$row['s2'] = $this->query_result_rows("select case_stage from crm_complain where userCode='$userCode' and case_stage='research'", "");
				$row['s3'] = $this->query_result_rows("select case_stage from crm_complain where userCode='$userCode' and case_stage='resolve'", "");

				$row['d1'] = $this->query_result_rows("select calltype from crm_complain where userCode='$userCode' and calltype='inbound'", "");
				$row['d2'] = $this->query_result_rows("select calltype from crm_complain where userCode='$userCode' and calltype='outbound'", "");

				$row['e1'] = $this->query_result_rows("select call_from from crm_complain where userCode='$userCode' and call_from='94097007'", "");
				$row['e2'] = $this->query_result_rows("select call_from from crm_complain where userCode='$userCode' and call_from='70107007'", "");

				$row['t1'] = $this->query_result_rows("select owner from crm_complain where owner='sukh@mandal' and userCode='$userCode'", "");
				$row['t2'] = $this->query_result_rows("select owner from crm_complain where owner='myagmartseren@mandal' and userCode='$userCode'", "");

				$record->init($row);				
				$array[$count] = $record;
				$json .= $record->json().",";
				$owner = $userCode;
				$team = $row['section'];
				$c1 = $row['c1'];$c2 = $row['c2'];$c3 = $row['c3'];$c4 = $row['c4'];$c5 = $row['c5'];
				$p1 = $row['p1'];$p2 = $row['p2'];$p3 = $row['p3'];
				$s1 = $row['s1'];$s2 = $row['s2'];$s3 = $row['s3'];
				$d1 = $row['d1'];$d2 = $row['d2'];
				$e1 = $row['e1'];$e2 = $row['e2'];
				$t1 = $row['t1'];$t2 = $row['t2'];
				$qins = "insert into crm_report_case (
				owner,
				section,
				c1,c2,c3,c4,c5,p1,p2,p3,s1,s2,s3,d1,d2,e1,e2,t1,t2) VALUES(
				'$owner','$team',$c1,$c2,$c3,$c4,$c5,$p1,$p2,$p3,$s1,$s2,$s3,$d1,$d2,$e1,$e2,$t1,$t2)";
				$result_ins = mysql_query($qins, $this->db->conn());
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}

		function crm_chart_product_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");

			$start_date = $item->get("start_date");
			$end_date = $item->get("end_date");

			$logged = $_SESSION['logged']['owner'];
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT product_id,sum(incoming) as qty,sum(pty) as pty,sum(amount) as amount, avg(price) as avg_price from crm_balance";
			$record = new crm_report_product();
			$where = $this->crm_where($item, $record->basic_fields);
			$where = $this->crm_session_where($where);
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." and deposit='sales' group by product_id ORDER BY sum(amount) desc LIMIT 10");

			while ($row = mysql_fetch_array($result)) {
				$record = new crm_report_product();
				$v = $this->crm_product_name_simple($row['product_id']);
				$vw = explode('|', $v);
				$row['product_name'] = $vw[0];
				$row['product_code'] = $vw[1];
				$row['product_brand'] = $vw[2];
				$row['unit_size'] = $vw[3];
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}

		function crm_chart_gps_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");

			$start_date = $item->get("start_date");
			$end_date = $item->get("end_date");

			$logged = $_SESSION['logged']['owner'];
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "SELECT max(id) as id,owner,lat,lng,max(_date) as _date from crm_gps";
			$record = new crm_gps();
			$where = $this->crm_where($item, $record->basic_fields);
			$where = $this->crm_session_where($where);
			$count = $this->num_rows($q, $where." group by owner,lat,lng order by _date asc");
			$result = $this->query_result($q, $where." group by owner,lat,lng order by _date asc");
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_gps();
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}


		function crm_report_reseller_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start_date = $item->get("start_date");
			$end_date = $item->get("end_date");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			
			$logged = $_SESSION['logged'];
			$company = $logged['company'];

			$q = "SELECT crm_id,ifnull((select owner from crm_deals where crm_deals.crm_id=crm_customer.crm_id and deal_type=2 and DATE_SUB(_date, INTERVAL 0 day) between '$start_date' and '$end_date' limit 0,1),owner) as owner,(select count(*) from crm_events where crm_events.crm_id=crm_customer.crm_id and _date between '$start_date' and '$end_date') as meeting,(select count(*) from crm_calllog where crm_calllog.crm_id=crm_customer.crm_id and _date between '$start_date' and '$end_date') as phonecall,(select count(*) from crm_emails where crm_emails.crm_id=crm_customer.crm_id and _date between '$start_date' and '$end_date') as email,			
			(select sum(amount) from crm_deal_products where crm_deal_products.crm_id=crm_customer.crm_id and DATE_SUB(_date, INTERVAL 10 day) between '$start_date' and '$end_date' and deal_id in (select deal_id from crm_deals where deal_type=2 and crm_id=crm_customer.crm_id)) as total_amount,
			(select sum(qty) from crm_deal_products where crm_deal_products.crm_id=crm_customer.crm_id and DATE_SUB(_date, INTERVAL 10 day) between '$start_date' and '$end_date' and deal_id in (select deal_id from crm_deals where deal_type=2 and crm_id=crm_customer.crm_id)) as total_qty,
			(select sum(qty) from crm_deal_products where crm_deal_products.crm_id=crm_customer.crm_id and DATE_SUB(_date, INTERVAL 10 day) between '$start_date' and '$end_date' and product_name='АВТОТЭЭВРИЙН ХЭРЭГСЛИЙН ДААТГАЛ' and deal_id in (select deal_id from crm_deals where deal_type=2 and crm_id=crm_customer.crm_id)) as p1_qty,
			(select sum(amount) from crm_deal_products where crm_deal_products.crm_id=crm_customer.crm_id and DATE_SUB(_date, INTERVAL 10 day) between '$start_date' and '$end_date' and product_name='АВТОТЭЭВРИЙН ХЭРЭГСЛИЙН ДААТГАЛ' and deal_id in (select deal_id from crm_deals where deal_type=2 and crm_id=crm_customer.crm_id)) as p1_amount,
			(select sum(qty) from crm_deal_products where crm_deal_products.crm_id=crm_customer.crm_id and DATE_SUB(_date, INTERVAL 10 day) between '$start_date' and '$end_date' and product_name='АЛБАН ЖУРМЫН ДААТГАЛ - ЖОЛООЧИЙН ДААТГАЛ' and deal_id in (select deal_id from crm_deals where deal_type=2 and crm_id=crm_customer.crm_id)) as p2_qty,
			(select sum(amount) from crm_deal_products where crm_deal_products.crm_id=crm_customer.crm_id and DATE_SUB(_date, INTERVAL 10 day) between '$start_date' and '$end_date' and product_name='АЛБАН ЖУРМЫН ДААТГАЛ - ЖОЛООЧИЙН ДААТГАЛ' and deal_id in (select deal_id from crm_deals where deal_type=2 and crm_id=crm_customer.crm_id)) as p2_amount,
			(select sum(qty) from crm_deal_products where crm_deal_products.crm_id=crm_customer.crm_id and DATE_SUB(_date, INTERVAL 10 day) between '$start_date' and '$end_date' and product_name='ЭД ХӨРӨНГИЙН ДААТГАЛ' and deal_id in (select deal_id from crm_deals where deal_type=2 and crm_id=crm_customer.crm_id)) as p3_qty,
			(select sum(amount) from crm_deal_products where crm_deal_products.crm_id=crm_customer.crm_id and DATE_SUB(_date, INTERVAL 10 day) between '$start_date' and '$end_date' and product_name='ЭД ХӨРӨНГИЙН ДААТГАЛ' and deal_id in (select deal_id from crm_deals where deal_type=2 and crm_id=crm_customer.crm_id)) as p3_amount,
			(select sum(qty) from crm_deal_products where crm_deal_products.crm_id=crm_customer.crm_id and DATE_SUB(_date, INTERVAL 10 day) between '$start_date' and '$end_date' and product_name='ЗЭЭЛДЭГЧИЙН ГЭНЭТИЙН ОСЛЫН ДААТГАЛ' and deal_id in (select deal_id from crm_deals where deal_type=2 and crm_id=crm_customer.crm_id)) as p4_qty,
			(select sum(amount) from crm_deal_products where crm_deal_products.crm_id=crm_customer.crm_id and DATE_SUB(_date, INTERVAL 10 day) between '$start_date' and '$end_date' and product_name='ЗЭЭЛДЭГЧИЙН ГЭНЭТИЙН ОСЛЫН ДААТГАЛ' and deal_id in (select deal_id from crm_deals where deal_type=2 and crm_id=crm_customer.crm_id)) as p4_amount,
			(select sum(qty) from crm_deal_products where crm_deal_products.crm_id=crm_customer.crm_id and DATE_SUB(_date, INTERVAL 10 day) between '$start_date' and '$end_date' and product_name='ГАДААД ЗОРЧИГЧИЙН ДААТГАЛ' and deal_id in (select deal_id from crm_deals where deal_type=2 and crm_id=crm_customer.crm_id)) as p5_qty,
			(select sum(amount) from crm_deal_products where crm_deal_products.crm_id=crm_customer.crm_id and DATE_SUB(_date, INTERVAL 10 day) between '$start_date' and '$end_date' and product_name='ГАДААД ЗОРЧИГЧИЙН ДААТГАЛ' and deal_id in (select deal_id from crm_deals where deal_type=2 and crm_id=crm_customer.crm_id)) as p5_amount FROM crm_customer where _class='RESELLER'";
			
			$record = new crm_report_reseller();
//			$where = $this->crm_where($item, $record->basic_fields);
			$where = $this->crm_session_where($where);
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir");
			$_SESSION['CRM_REPORT_RESELLER'] = $q." ".$where." ORDER BY $sort $dir";
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_report_reseller();
				$row['crm_name'] = $this->crm_customer_name_simple($row['crm_id']);
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}

		function crm_report_direct_sales_list($item) {
			$array = array();
			$count = 0;
			$json = "";
			$start_date = $item->get("start_date");
			$end_date = $item->get("end_date");
			$sort = $item->get("sort");
			$dir = $item->get("dir");	
			$logged = $_SESSION['logged'];
			$company = $logged['company'];
			$q = "select owner,team as section,(select count(crm_id) from crm_calllog where owner=b.owner and callresult='pending' and length(campaign)>0 and _date between '$start_date' and '$end_date') as c_p,(select count(crm_id) from crm_calllog where owner=b.owner and callresult='remind' and length(campaign)>0 and _date between '$start_date' and '$end_date') as c_r,(select count(crm_id) from crm_calllog where owner=b.owner and callresult='success' and length(campaign)>0 and _date between '$start_date' and '$end_date') as c_s,(select count(crm_id) from crm_events where owner=b.owner and event_status='completed' and length(campaign)=0 and _date between '$start_date' and '$end_date') as a_m,(select count(crm_id) from crm_calllog where owner=b.owner and callresult='success' and length(campaign)=0 and _date between '$start_date' and '$end_date') as a_p,(select count(crm_id) from crm_emails where owner=b.owner and email_status='sent' and length(campaign)=0 and _date between '$start_date' and '$end_date') as a_e,(select count(deal) from crm_deals where userCode=b.owner and closing_date between '$start_date' and '$end_date' and stage='close as won') as total_qty,(select sum(expected_revenue) from crm_deals where userCode=b.owner and closing_date between '$start_date' and '$end_date' and stage='close as won') as total_amount from crm_users as b";
			$record = new crm_report_direct_sales_list();
			$where = " WHERE team='direct sales' ";//$this->crm_where($item, $record->basic_fields);
			$where = $this->crm_session_where($where);
			$count = $this->num_rows($q, $where);
			$result = $this->query_result($q, $where." ORDER BY $sort $dir");
			
			$_SESSION['CRM_REPORT_DIRECT_SALES'] = $q." ".$where." ORDER BY $sort $dir";
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_report_direct_sales_list();
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}

		function crm_report_activity_list($item) {
			$record = new crm_user();
			$start = $item->get('start_date');
			$end = $item->get('end_date');
			
			mysql_query("delete from crm_report_activity", $this->db->conn());

			$where = " WHERE 1=1 ";
			$where = $this->crm_session_extend_where("crm_users", $where);
			$users = $this->query_result("SELECT crm_users.owner,crm_users.team,event_p,quote_p,newcus_p,expat_p,vip_p,extend_p from crm_users left join crm_user_stat on crm_users.owner=crm_user_stat.owner and year('$start')=_year and month('$start')=_month and crm_users.user_level<2", $where);
			$count = 0;						
			while ($row = mysql_fetch_array($users)) {
				$owner = $row['owner'];
				$phone_a = $this->query_result_rows("SELECT * from crm_calllog", " WHERE (callresult='success' or callresult='remind') and owner='$owner' and _date between '$start' and '$end'");
				$email_a = $this->query_result_rows("SELECT * from crm_emails", " WHERE owner='$owner' and _date between '$start' and '$end'");
				$event_a = $this->query_result_rows("SELECT * from crm_events", " WHERE (event_status='completed' or event_status='remind') and owner='$owner' and _date between '$start' and '$end'");
				$quote_a = $this->query_result_rows("SELECT * from crm_quotes", " WHERE owner='$owner' and _date between '$start' and '$end'");
				$new_cusa = $this->query_result_rows("SELECT * from crm_customer", " WHERE owner='$owner' and _date between '$start' and '$end' and level='customer' and crm_id in (select crm_id from crm_deals where closing_date between '$start' and '$end' and stage='close as won')");
				$expat_a = $this->query_result_rows("SELECT * from crm_customer", " WHERE owner='$owner' and _class='EXPAT' and _date between '$start' and '$end' and level='customer' and crm_id in (select crm_id from crm_deals where closing_date between '$start' and '$end' and stage='close as won')");
				$vip_a = $this->query_result_rows("SELECT * from crm_customer", " WHERE owner='$owner' and _class='VIP' and _date between '$start' and '$end' and level='customer'and crm_id in (select crm_id from crm_deals where closing_date between '$start' and '$end' and stage='close as won')");
				$ext_a = $this->query_result_rows("SELECT * from crm_deals", " WHERE owner='$owner' and deal_origin='extension' and closing_date between '$start' and '$end' and stage='close as won'");
				
				$e_t = 0; if (intval($row['event_p']) > 0) $e_t = intval($event_a)*100/intval($row['event_p']);
				$q_t = 0; if (intval($row['quote_p']) > 0) $q_t = $quote_a*100/intval($row['quote_p']);
				$n_t = 0; if (intval($row['newcus_p']) > 0) $n_t = $new_cusa*100/intval($row['newcus_p']);
				$x_t = 0; if (intval($row['expat_p']) > 0) $x_t = $expat_a*100/intval($row['expat_p']);
				$v_t = 0; if (intval($row['vip_p']) > 0) $v_t = $vip_a*100/intval($row['vip_p']);
				$ex_t = 0; if (intval($row['ext_p']) > 0) $ex_t = $ext_a*100/intval($row['extend_p']);
				$json .= '{"owner":"'.$owner.'","section":"'.$row['team'].'","call_p":'.$phone_a.',"email_p":'.$email_a.',"meeting_q":'.$event_a.',"meeting_p":'.intval($row['event_p']).',"meeting_t":'.$e_t.',"quote_p":'.intval($row['quote_p']).',"quote_q":'.$quote_a.',"quote_t":'.$q_t.',"newcus_p":'.intval($row['newcus_p']).',newcus_q:'.$new_cusa.',"newcus_t":'.$n_t.',"expat_p":'.intval($row['expat_p']).',"expat_q":'.$expat_a.',"expat_t":'.$x_t.',"vip_p":'.intval($row['vip_p']).',"vip_q":'.$vip_a.',"v_t":'.$v_t.',"ext_p":'.intval($row['extend_p']).',"ext_a":'.$ext_a.',"ext_q":'.$ex_t.'},';
				
				$team = $row['team'];
				$event_p = intval($row['event_p']);
				$quote_p = intval($row['quote_p']);
				$newcus_p = intval($row['newcus_p']);
				$expat_p = intval($row['expat_p']);
				$vip_p = intval($row['vip_p']);
				$extend_p = intval($row['quote_p']);
				$qins = "insert into crm_report_activity (
				owner,
				section,
				call_p,
				email_p,
				meeting_p,
				meeting_q,
				meeting_t,
				quote_p,
				quote_q,
				quote_t,
				newcus_p,
				newcus_q,
				newcus_t,
				expat_p,
				expat_q,
				expat_t,
				vip_p,
				vip_q,
				v_t,
				ext_p,
				ext_a,
				ext_t) VALUES(
				'$owner',
				'$team',
				$phone_a,
				$email_a,
				$event_p,
				$event_a,
				$e_t,
				$quote_p,
				$quote_a,
				$q_t,
				$newcus_p,
				$new_cusa,
				$n_t,
				$expat_p,
				$expat_a,
				$x_t,
				$vip_p,
				$vip_a,
				$v_t,
				$extend_p,
				$ext_a,
				$ex_t)";
				$result_ins = mysql_query($qins, $this->db->conn());
				$count++;
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}

		function crm_customer_products($crm_id) {
			$result = $this->query_result("SELECT product_name,start_date,end_date from crm_sales", " WHERE crm_id=$crm_id");
			while ($row = mysql_fetch_array($result)) {
				return $row;
			}
			
			$row = array();
			return $row;
		}

		function crm_customer_name($crm_id) {
			$result = $this->query_result("SELECT level,_class,firstName,lastName,title,job_title,phone,email,lastLogTime FROM crm_customer", " WHERE crm_id=$crm_id");
			while ($row = mysql_fetch_array($result)) {
				$class = $row['level'];
				$findme = "vip";
				$pos = stripos($row["_class"], $findme);
				if ($pos !== false) $class = "vip";
				
				$plog = $row['lastLogTime'];
				$phone = $row['phone'];
				$email = $row['email'];
				$title = $row['title'];
				$job_title = $row['job_title'];
				if ($plog == "0000-00-00 00:00:00") $plog = "";

				$prow = $this->crm_customer_products($crm_id);
				$pname = $prow['product_name'];
				$pedate = $prow['end_date'];
				
				return '<span title="'.$class.'" class="circle '.$class.'">&nbsp;</span>&nbsp;&nbsp;<a href="javascript:customerInfo(\''.$crm_id.'\')" class="select_customer"><g>'.$row['firstName']." </g><span style='color:gray'>".$row['lastName']."</span></a>,$plog;$phone;$email";
			}
			
			return $crm_id;
		}
		
		function crm_deal_post_notify($deal_id) {
			$logged = $_SESSION["logged"]['owner'];
			$result_one = $this->query_result("SELECT * FROM crm_posts", " WHERE deal_id=$deal_id and length(reply_id)=0 and owner='$logged'");
			$rows = mysql_num_rows($result_one);
			if ($rows > 0)
				return '<div class="noti_bubble_small">'.$rows.'</div>';

			return "";
		}

		function crm_case_post_notify($case_id) {
			$logged = $_SESSION["logged"]['owner'];
			$result_one = $this->query_result("SELECT * FROM crm_posts", " WHERE case_id=$case_id and length(reply_id)=0 and owner='$logged'");
			$rows = mysql_num_rows($result_one);
			if ($rows > 0)
				return '<div class="noti_bubble_small">'.$rows.'</div>';

			return "";
		}

		function crm_deal_name_simple($row) {
			$deal_id = $row['deal_id'];
			if ($deal_id != 0) {
				$result = $this->query_result("SELECT deal FROM crm_deals", " WHERE deal_id=$deal_id");
				while ($row = mysql_fetch_array($result)) {			
					return '<span class="dealtext">'.$row['deal'].'</span>';					
				}
				
				return $deal_id;
			} else {
				$case_id = $row['case_id'];
				if ($case_id != 0) {
					$result = $this->query_result("SELECT complain_reason FROM crm_complain", " WHERE case_id=$case_id");
					while ($row = mysql_fetch_array($result)) {
						return '<span class="casetext">'.$row['complain_reason'].'</span>';
					}
					
					return $case_id;
				} else {						
					$service_id = $row['service_id'];
					if ($service_id != 0) {
						$result = $this->query_result("SELECT subject FROM crm_services", " WHERE service_id=$service_id");
						while ($row = mysql_fetch_array($result)) {
							return '<span class="servicetext">'.$row['subject'].'</span>';
						}
						
						return $service_id;
					}	
				}
			}
		}

		function crm_service_name_simple($service_id) {
			$result = $this->query_result("SELECT subject FROM crm_services", " WHERE service_id=$service_id");
			while ($row = mysql_fetch_array($result)) {			
				return '<span class="servicetext">'.$row['subject'].'</span>';					
			}
			
			return $service_id;			
		}
		
		function crm_product_name_simple($product_id) {
			$result = $this->query_result("SELECT product_name,product_code,product_brand,unit_size FROM crm_products", " WHERE product_id=$product_id");
			while ($row = mysql_fetch_array($result)) {			
				return $row['product_name'].'|'.$row['product_code'].'|'.$row['product_brand'].'|'.$row['unit_size'];					
			}
			
			return $product_id;			
		}

		function crm_warehouse_name_simple($warehouse_id) {
			$result = $this->query_result("SELECT name FROM crm_warehouse", " WHERE warehouse_id=$warehouse_id");
			while ($row = mysql_fetch_array($result)) {			
				return $row['name'];					
			}
			
			return $warehouse_id;			
		}

		function crm_customer_name_simple($crm_id) {
			$result = $this->query_result("SELECT level,_class,firstName,lastName,phone,email,lastLogTime FROM crm_customer", " WHERE crm_id=$crm_id");
			while ($row = mysql_fetch_array($result)) {				
				return $row['firstName']." ".$row['lastName'];
			}
			
			return $crm_id;
		}

		function crm_stage_of_sales_pipeline_list($crm_id) {
			$result = $this->query_result("select level as name, count(level) as value from crm_customer group by level", "");
			$json = "";
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_stage_of_sales_pipeline();
				$record->init($row);
				$array[$count] = $record;
				$json .= $record->json().",";
				$count++;
			}
			
			return '{"results":'.$count.',"items":['.$json.']}';
		}		
		
		function crm_campaign_result_list($item) {						
			$count = 0;
			$json = "";
			$start = $item->get("start");
			$end = $item->get("end");
			$start_date = $item->get("start_date");
			$end_date = $item->get("end_date");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$q = "select owner,sum(if(callresult = 'pending', 1, 0)) as pending,sum(if(callresult = 'remind', 1, 0)) as remind,sum(if(callresult = 'success', 1, 0)) as success from crm_calllog";
			$record = new crm_report_product();
			$where = $this->crm_where($item, "campaign");
			$where = $this->crm_session_where($where);
			$where .= " and length(owner)>0 ";
			$count = $this->num_rows($q, $where);			
			$result = $this->query_result($q, $where." group by owner");
			$count = 0;
			while ($row = mysql_fetch_array($result)) {
				$record = new crm_campaign_result();
				$row['total'] = $row['pending']+$row['remind']+$row['success'];
				$row['performance'] = 100 * ($row['success'] + $row['remind']) / $row['total'];
				$record->init($row);
				$json .= $record->json().",";
				$count++;
			}
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';
		}

		function crm_campaign_by_status_list($item) {
			$result = $this->query_result("SELECT callresult, count(callresult) as value FROM crm_calllog WHERE campaign in (select campaign from crm_campaign where campaign_type='cold call')", " group by callresult");
			$json = "";
			$coldcall = array();
			while ($row = mysql_fetch_array($result)) {				
				$coldcall[$row['callresult']] = $row['value'];
			}
			$count = 0;
			$target = intval($coldcall['success'])+intval($coldcall['unsuccess'])+intval($coldcall['pending'])+intval($coldcall['remind']);
			$success = intval($coldcall['success']);
			$unsuccess = intval($coldcall['unsuccess']);
			$pending = intval($coldcall['pending'])+intval($coldcall['remind']);
			$json = '{"campaign_type":"cold call","target":'.$target.',"success":'.$success.',"unsuccess":'.$unsuccess.',"pending":'.$pending.'}';	
			$count++;

			return '{"results":'.$count.',"items":['.$json.']}';			
		}
				
		function crm_opportunity_by_revenue_list($item) {
			$record = new crm_user();
			$start_date = $item->get('start_date');
			$end_date = $item->get('end_date');

			$where = $this->crm_where($item, $record->basic_fields, false);
			$where = $this->crm_session_where($where);			
			//$q = "SELECT owner, team, (select sum(expected_revenue) from crm_deals where owner=crm_users.owner and stage<>'disqualified' and stage<>'close as won' and _date between '$start_date' and '$end_date') as expected_revenue, (select sum(expected_revenue)-sum(expected_revenue)*100/(select sum(precent) from crm_deal_sales_team where crm_deal_products.deal_id=crm_deals.deal_id) from crm_deals where owner=crm_users.owner and stage='close as won' and _date between '$start_date' and '$end_date')+(select sum(expected_revenue) from crm_deals where deal_id in (select deal_id from )) as actual_revenue, (select sum(amountTheshold) from crm_user_planning where crm_user_planning.owner=crm_users.owner and start_date between '$start_date' and '$end_date') as target_revenue from crm_users";
			
			/*
			+ifnull(
				cast(
					(
						select 
							cast(expected_revenue as unsigned)/100*cast(sum(precent) as unsigned)
						from crm_deal_sales_team 					
						right join 
						crm_deals on crm_deals.closing_date between '$start_date' and '$end_date' 
						and crm_deals.stage='close as won' and crm_deal_sales_team.deal_id = crm_deals.deal_id and crm_deals.owner<>crm_deal_sales_team.owner 
						where crm_deal_sales_team.owner=crm_users.owner
					) 
				as unsigned)					
			,0) + 

ifnull(
				(
					select 
							sum(cast(expected_revenue as unsigned)-
								cast(expected_revenue as unsigned)*
								ifnull(cast(
									(select sum(precent) from crm_deal_sales_team where crm_deal_sales_team.deal_id=crm_deals.deal_id)
									as unsigned),0)
							/100)  
					from crm_deals 
					where owner=crm_users.owner and stage='close as won' and closing_date between '$start_date' and '$end_date'
				)	
			,0)

			*/

			$q = "SELECT owner, team, (select sum(expected_revenue) from crm_deals where owner=crm_users.owner and stage<>'disqualified' and stage<>'close as won' and _date between '$start_date' and '$end_date' and stage<>'close as lost') as expected_revenue, 
			
			ifnull(
				(
					select 
							sum(expected_revenue -
								expected_revenue*
								ifnull(
									(select sum(precent) from crm_deal_sales_team where crm_deal_sales_team.deal_id=crm_deals.deal_id)
									,0)
							/100)  
					from crm_deals 
					where owner=crm_users.owner and stage='close as won' and (CASE section WHEN 'retail' THEN _date ELSE closing_date END) between '$start_date' and '$end_date'
				)	
			,0)
			
			+
			
			ifnull(
					(
						select 
							sum(expected_revenue/100*precent)
						from crm_deal_sales_team 
						join 
						crm_deals on crm_deals.closing_date between '$start_date' and '$end_date' 
						and crm_deals.stage='close as won' and crm_deal_sales_team.deal_id = crm_deals.deal_id and crm_deals.owner<>crm_deal_sales_team.owner 
						where crm_deal_sales_team.owner=crm_users.owner
					) 
			,0) + 
			
			ifnull(			
				(select sum(amount) from crm_deal_payroll where pay_date between '$start_date' and '$end_date' and crm_deal_payroll.userCode=crm_users.owner)
			,0)
			as actual_revenue, (select sum(amountTheshold) from crm_user_planning where crm_user_planning.owner=crm_users.owner and start_date between '$start_date' and '$end_date') as target_revenue from crm_users";			
			
			$where .= " and (user_level<2) and owner in (select owner from crm_user_planning where DATE_ADD(start_date, INTERVAL 10 DAY) between '$start_date' and '$end_date')";
			$result = $this->query_result($q, $where);
			$json = "";
			$count = 0;
			$_SESSION['CRM_REPORT_REVENUE'] = $q." ".$where;
			while ($row = mysql_fetch_array($result)) {				
				$tab = $row['target_revenue'];
				$ab = 0;
				if (floatval($tab) > 0)
					$ab = $row['actual_revenue']*100/$tab;
				$json .= '{"owner":"'.$row['owner'].'","team":"'.$row['team'].'","expected_revenue":'.floatval($row['expected_revenue']).',"actual_revenue":'.floatval($row['actual_revenue']).',"target_revenue":'.floatval($row['target_revenue']).',"perform":'.($ab).'},';
				$count++;
			}
			
			if ($count > 0) 
				$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';			
		}

		function crm_user_stat_by_summary_list($item) {
			$record = new crm_user();
			$year = $item->get('start_date');
			$month = $item->get('end_date');

			$where = $this->crm_where($item, $record->basic_fields);
			$where = $this->crm_session_where($where);
			$plan = $this->query_result("SELECT _year,_month,event_p,quote_p,newcus_p,expat_p,vip_p from crm_user_stat", $where." and _year=".$year." and _month=".$month);
						
			while ($row = mysql_fetch_array($plan)) {
				$event_a = $this->query_result_rows("SELECT * from crm_events", $where." and year(_date)=".$row['_year']." and month(_date)=".$row['_month']);
				$quote_a = $this->query_result_rows("SELECT * from crm_quotes", $where." and year(_date)=".$row['_year']." and month(_date)=".$row['_month']);
				$new_cusa = $this->query_result_rows("SELECT * from crm_customer", $where." and level='customer' and year(_date)=".$row['_year']." and month(_date)=".$row['_month']);
				$expat_a = $this->query_result_rows("SELECT * from crm_customer", $where." and level='customer' and _class='EXPAT' and year(_date)=".$row['_year']." and month(_date)=".$row['_month']);
				$vip_a = $this->query_result_rows("SELECT * from crm_customer", $where." and level='customer' and _class='VIP' and year(_date)=".$row['_year']." and month(_date)=".$row['_month']);
				$json = '{"stat_type":"Уулзалт","actual":'.$event_a.',"planning":'.intval($row['event_p']).'},';
				$json .= '{"stat_type":"Үнийн санал","actual":'.$quote_a.',"planning":'.intval($row['quote_p']).'},';
				$json .= '{"stat_type":"Шинэ харилцагч","actual":'.$new_cusa.',"planning":'.intval($row['new_cus']).'},';
				$json .= '{"stat_type":"Гадаад харилцагч","actual":'.$expat_a.',"planning":'.intval($row['expat_p']).'},';
				$json .= '{"stat_type":"VIP харилцагч","actual":'.$vip_a.',"planning":'.intval($row['vip_p']).'}';
			}			

			return '{"results":5,"items":['.$json.']}';			
		}

		function crm_campaign_by_revenue_list($item) {
			$result = $this->query_result("SELECT campaign_type, sum(expected_revenue) as campaign_target, budgeted_cost+(select IFNULL(sum(budgeted_cost),0) from crm_tasks where crm_tasks.campaign=crm_campaign.campaign)+(select IFNULL(sum(budgeted_cost),0) from crm_events where crm_events.campaign=crm_campaign.campaign) as campaign_cost, (select sum(amount) from crm_sales where crm_sales.campaign=crm_campaign.campaign) as actual_revenue, (select sum(expected_revenue) from crm_potentials where crm_potentials.campaign=crm_campaign.campaign) as in_progress from crm_campaign", " where campaign_status='active' group by campaign_type");
			$json = "";
			$count = 0;
			while ($row = mysql_fetch_array($result)) {				
				$json .= '{"campaign_type":"'.$row['campaign_type'].'","campaign_target":'.floatval($row['campaign_target']).',"campaign_cost":'.floatval($row['campaign_cost']).',"actual_revenue":'.floatval($row['actual_revenue']).',"in_progress":'.floatval($row['in_progress']).'},';	
				$count++;
			}
			
			if ($count > 0) 
				$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';			
		}
		
		
		function crm_complain_by_status_list($item) {
			$start_date = $item->get("start_date");
			$end_date = $item->get("end_date");
			$result = $this->query_result("SELECT complain_status,count(complain_status) as value FROM crm_complain", " WHERE _date>='$start_date' and _date<'$end_date' group by complain_status");
			$json = "";
			$count = 0; 
			while ($row = mysql_fetch_array($result)) {				
				$json .= '{"name":"'.$row["complain_status"].'","value":'.$row["value"].'},';
				$count++;
			}
			
			$json = substr($json, 0, -1);
			return '{"results":'.$count.',"items":['.$json.']}';			
		}
		
		function crm_lead_by_source_list($item) {
			$where = " WHERE 1=1 ".$this->date_where($item);
			$result = $this->query_result("SELECT source as name, count(source) as value FROM crm_customer", $where." group by source");
			$json = "";
			$count = 0;
			while ($row = mysql_fetch_array($result)) {				
				$source = $row["name"];
				if (strlen($source) == 0) $source = "unknown";
				$json .= '{"name":"'.$source.'","value":'.$row["value"].'},';
				$count++;
			}
			if ($count > 0)
				$json = substr($json, 0, -1);

			return '{"results":'.$count.',"items":['.$json.']}';			
		}

		function crm_potential_by_probablity_list($item) {
			$result = $this->query_result("SELECT probablity as name, count(probablity) as value FROM crm_potentials", " group by probablity");
			$json = "";
			$count = 0;
			while ($row = mysql_fetch_array($result)) {				
				$json .= '{"name":"'.$row["name"].' %","value":'.$row["value"].'},';
				$count++;
			}
			if ($count > 0)
				$json = substr($json, 0, -1);

			return '{"results":'.$count.',"items":['.$json.']}';			
		}

		function crm_account_by_industry_list($item) {
			$result = $this->query_result("SELECT industry as name, count(industry) as value FROM crm_customer WHERE customer_type=1", " group by industry");
			$json = "";
			$count = 0;
			while ($row = mysql_fetch_array($result)) {				
				$json .= '{"name":"'.$row["name"].' ('.$row["value"].')","value":'.$row["value"].'},';
				$count++;
			}
			if ($count > 0)
				$json = substr($json, 0, -1);

			return '{"results":'.$count.',"items":['.$json.']}';			
		}

		function crm_deal_funnel_list($item) {
			$where = "WHERE 1=1 ".$this->crm_session_where($item->get("where"));
			$where .= " and ((stage='close as won' ".$this->date_closing_where($item).") or (stage='lead' or stage='opportunity' or stage='quote'))";
			$result = $this->query_result("SELECT stage as name, sum(expected_revenue) as value FROM crm_deals", $where." group by stage order by stage");
			$json = "";
			$count = 0;
			while ($row = mysql_fetch_array($result)) {				
				$json .= '{"name":"'.$row["name"].'","value":'.$row["value"].'},';
				$count++;
			}
			if ($count > 0)
				$json = substr($json, 0, -1);

			return '{"results":'.$count.',"items":['.$json.']}';			
		}

		function crm_service_funnel_list($item) {
			$where = "WHERE 1=1 ".$this->crm_session_where($item->get("where"));
			$where .= " and ((service_stage='closed' ".$this->date_closing_where($item).") or (service_stage='receipt' or service_stage='service' or service_stage='remind'))";
			$result = $this->query_result("SELECT service_stage as name, sum(service_revenue) as value FROM crm_services", $where." group by service_stage order by service_stage");
			$json = "";
			$count = 0;
			while ($row = mysql_fetch_array($result)) {
				if ($row['name'] == 'receipt') $row['name'] = 'ирсэн';
				if ($row['name'] == 'service') $row['name'] = 'олгосон';
				if ($row['name'] == 'remind') $row['name'] = 'хойшлосон';
				if ($row['name'] == 'closed') $row['name'] = 'хаагдсан';
				$json .= '{"name":"'.$row["name"].'","value":'.$row["value"].'},';
				$count++;
			}
			if ($count > 0)
				$json = substr($json, 0, -1);

			return '{"results":'.$count.',"items":['.$json.']}';			
		}

		function crm_select($item) {
			$func = $item->get("func");	
			$chart = $this->crm_chart($item);
			$report = $this->crm_report($item);

			if (strlen($report) > 0) 
				return $report;

			if (strlen($chart) > 0) 
				return $chart;

			if ($func == "crm_query_list")
				return $this->crm_query_list($item);
			else
			if ($func == "crm_customer_query_list")
				return $this->crm_customer_query_list($item);
			else
			if ($func == "crm_retail_list")
				return $this->crm_retail_list($item);
			else
			if ($func == "crm_corporate_list")
				return $this->crm_corporate_list($item);
			else
			if ($func == "crm_customer_xml_list")
				return $this->crm_customer_xml_list($item);
			else
			if ($func == "crm_risk_question_xml_list")
				return $this->crm_risk_question_xml_list($item);
			else
			if ($func == "crm_customer_activity_xml_list")
				return $this->crm_customer_activity_xml_list($item);			
			else
			if ($func == "crm_deal_xml_list")
				return $this->crm_deal_xml_list($item);
			else
			if ($func == "crm_service_xml_list")
				return $this->crm_service_xml_list($item);
			else
			if ($func == "crm_case_xml_list")
				return $this->crm_case_xml_list($item);
			else
			if ($func == "crm_product_xml_list")
				return $this->crm_product_xml_list($item);
			else
			if ($func == "crm_product_available_xml_list")
				return $this->crm_product_available_xml_list($item);
			else
			if ($func == "crm_warehouse_xml_list")
				return $this->crm_warehouse_xml_list($item);
			else
			if ($func == "crm_owner_service_product_xml_list")
				return $this->crm_owner_service_product_xml_list($item);
			else
			if ($func == "crm_owner_service_customer_xml_list")
				return $this->crm_owner_service_customer_xml_list($item);
			else
			if ($func == "crm_post_list")
				return $this->crm_post_list($item);
			else
			if ($func == "crm_note_list")
				return $this->crm_note_list($item);
			else
			if ($func == "crm_email_list")
				return $this->crm_email_list($item);
			else
			if ($func == "crm_task_list")
				return $this->crm_task_list($item);
			else
			if ($func == "crm_event_list")
				return $this->crm_event_list($item);
			else
			if ($func == "crm_calllog_list")
				return $this->crm_calllog_list($item);
			else
			if ($func == "crm_contact_list")
				return $this->crm_contact_list($item);
			else
			if ($func == "crm_reseller_list")
				return $this->crm_reseller_list($item);
			else
			if ($func == "crm_message_list")
				return $this->crm_message_list($item);
			else
			if ($func == "crm_complain_list") 
				return $this->crm_complain_list($item);
			else
			if ($func == "crm_calendar_list") 
				return $this->crm_calendar_list($item);
			else
			if ($func == "crm_alarm_list") 
				return $this->crm_alarm_list($item);
			else
			if ($func == "crm_customer_activity_list") 
				return $this->crm_customer_activity_list($item);
			else
			if ($func == "crm_my_activity_list") 
				return $this->crm_my_activity_list($item);
			else
			if ($func == "crm_all_activity_list") 
				return $this->crm_all_activity_list($item);
			else
			if ($func == "crm_campaign_activity_list") 
				return $this->crm_campaign_activity_list($item);
			else				
			if ($func == "crm_customer_opportunity_list") 
				return $this->crm_customer_opportunity_list($item);
			else	
			if ($func == "crm_customer_sales_list") 
				return $this->crm_customer_sales_list($item);
			else
			if ($func == "crm_personal_view_list") 
				return $this->crm_personal_view_list($item);
			else								
			if ($func == "crm_quote_list") 
				return $this->crm_quote_list($item);
			else
			if ($func == "crm_risk_result_list") 
				return $this->crm_risk_result_list($item);
			else
			if ($func == "crm_risk_result_ui_list") 
				return $this->crm_risk_result_ui_list($item);
			else
			if ($func == "crm_sales_list") 
				return $this->crm_sales_list($item);
			else
			if ($func == "crm_deal_list")
				return $this->crm_deal_list($item);
			else
			if ($func == "crm_service_list")
				return $this->crm_service_list($item);
			else
			if ($func == "crm_changeprice_list")
				return $this->crm_changeprice_list($item);
			else
			if ($func == "crm_competitor_deal_list")
				return $this->crm_competitor_deal_list($item);
			else				
			if ($func == "crm_deal_product_list")
				return $this->crm_deal_product_list($item);
			else
			if ($func == "crm_deal_payroll_list")
				return $this->crm_deal_payroll_list($item);
			else
			if ($func == "crm_service_payroll_list")
				return $this->crm_service_payroll_list($item);
			else
			if ($func == "crm_case_product_list")
				return $this->crm_case_product_list($item);
			else
			if ($func == "crm_deal_transfer_list")
				return $this->crm_deal_transfer_list($item);
			else
			if ($func == "crm_case_transfer_list")
				return $this->crm_case_transfer_list($item);
			else
			if ($func == "crm_deal_competitor_list")
				return $this->crm_deal_competitor_list($item);
			else
			if ($func == "crm_deal_sales_team_list")
				return $this->crm_deal_sales_team_list($item);
			else
			if ($func == "crm_potential_list")
				return $this->crm_potential_list($item);
			else
			if ($func == "crm_campaign_list")
				return $this->crm_campaign_list($item);
			else
			if ($func == "crm_product_list")
				return $this->crm_product_list($item);
			else
			if ($func == "crm_warehouse_list")
				return $this->crm_warehouse_list($item);
			else
			if ($func == "crm_storage_list")
				return $this->crm_storage_list($item);
			else
			if ($func == "crm_quote_detail_list")
				return $this->crm_quote_detail_list($item);
			else
			if ($func == "crm_users_list")
				return $this->crm_users_list($item);
			else
			if ($func == "crm_commission_list")
				return $this->crm_commission_list($item);
			else
			if ($func == "crm_competitor_list")
				return $this->crm_competitor_list($item);
			else				
			if ($func == "crm_workflow_list")
				return $this->crm_workflow_list($item);
			else
			if ($func == "crm_workflow_ui_list")
				return $this->crm_workflow_ui_list($item);
			else				
			if ($func == "crm_user_planning_list")
				return $this->crm_user_planning_list($item);
			else
			if ($func == "crm_stat_list")
				return $this->crm_stat_list($item);			
			else				
			if ($func == "crm_customer_campaign_list")
				return $this->crm_customer_campaign_list($item);
			else
			if ($func == "crm_customer_company_list")
				return $this->crm_customer_company_list($item);
			else
			if ($func == "crm_user_group_list")
				return $this->crm_user_group_list($item);
			else
			if ($func == "crm_campaign_create_crm_list")
				return $this->crm_campaign_create_crm_list($item);
			else
			if ($func == "crm_campaign_customer_list")
				return $this->crm_campaign_customer_list($item);			
			else
			if ($func == "crm_campaign_remove_crm_list")
				return $this->crm_campaign_remove_crm_list($item);
			else
			if ($func == "crm_campaign_result_list")
				return $this->crm_campaign_result_list($item);

			return "success";
		}

		function crm_chart($item) {
			$func = $item->get("func");
			if ($func == "crm_deal_funnel_list")
				return $this->crm_deal_funnel_list($item);
			if ($func == "crm_service_funnel_list")
				return $this->crm_service_funnel_list($item);
			if ($func == "crm_stage_of_sales_pipeline_list")
				return $this->crm_stage_of_sales_pipeline_list($item);
			if ($func == "crm_campaign_by_revenue_list")
				return $this->crm_campaign_by_revenue_list($item);
			if ($func == "crm_opportunity_by_revenue_list")
				return $this->crm_opportunity_by_revenue_list($item);			
			if ($func == "crm_user_stat_by_summary_list")
				return $this->crm_user_stat_by_summary_list($item);			
			if ($func == "crm_campaign_by_status_list")
				return $this->crm_campaign_by_status_list($item);
			if ($func == "crm_complain_by_status_list")
				return $this->crm_complain_by_status_list($item);
			if ($func == "crm_lead_by_source_list")
				return $this->crm_lead_by_source_list($item);
			if ($func == "crm_potential_by_probablity_list")
				return $this->crm_potential_by_probablity_list($item);
			if ($func == "crm_account_by_industry_list") 
				return $this->crm_account_by_industry_list($item);
			if ($func == "crm_chart_product_list") 
				return $this->crm_chart_product_list($item);
			if ($func == "crm_chart_gps_list") 
				return $this->crm_chart_gps_list($item);

			return "";
		}

		function crm_report($item) {
			$func = $item->get("func");
			if ($func == "crm_report_deal_list")
				return $this->crm_report_deal_list($item);
			else
			if ($func == "crm_report_direct_sales_list")
				return $this->crm_report_direct_sales_list($item);
			else
			if ($func == "crm_report_reseller_list")
				return $this->crm_report_reseller_list($item);
			else				
			if ($func == "crm_report_storage_list")
				return $this->crm_report_storage_list($item);
			else
			if ($func == "crm_report_storage_daily_list")
				return $this->crm_report_storage_daily_list($item);
			else
			if ($func == "crm_report_customer_product_list")
				return $this->crm_report_customer_product_list($item);
			else
			if ($func == "crm_report_customer_list")
				return $this->crm_report_customer_list($item);
			else
			if ($func == "crm_report_product_list")
				return $this->crm_report_product_list($item);
			else
			if ($func == "crm_report_activity_list")
				return $this->crm_report_activity_list($item);			
			else
			if ($func == "crm_report_case_list")
				return $this->crm_report_case_list($item);			

			return "";
		}
		
		function crm_write_log($table, $crm_name) {
			$logged = $_SESSION['logged']['owner'];
			if ($table == "crm_complain") {
				$subject = "Case";
				$owner = $logged;
				$_from = "system@mandal";
				$descr = $crm_name;
				$query = "INSERT INTO crm_message (subject,owner,_from,descr) VALUES ('$subject','$owner','$_from','$descr')";
				$result = mysql_query($query, $this->db->conn());
			} else
			if ($table == "crm_tasks") {
				$subject = "Task";
				$owner = $logged;
				$_from = "system@mandal";
				$descr = $crm_name;
				$query = "INSERT INTO crm_message (subject,owner,_from,descr) VALUES ('$subject','$owner','$_from','$descr')";
				$result = mysql_query($query, $this->db->conn());
			} else
			if ($table == "crm_events") {
				$subject = "Appointment";
				$owner = $logged;
				$_from = "system@mandal";
				$descr = $crm_name;
				$query = "INSERT INTO crm_message (subject,owner,_from,descr) VALUES ('$subject','$owner','$_from','$descr')";
				$result = mysql_query($query, $this->db->conn());
			} else
			if ($table == "crm_quotes") {
				$subject = "Quote";
				$owner = $logged;
				$_from = "system@mandal";
				$descr = $crm_name;
				$query = "INSERT INTO crm_message (subject,owner,_from,descr) VALUES ('$subject','$owner','$_from','$descr')";
				$result = mysql_query($query, $this->db->conn());
			}
		}

		function crm_deal_quote_create_action($item) {
			$logged = $_SESSION['logged']['owner'];
			$parent_deal_id = $item->get("where");
			if ($this->notNull($parent_deal_id)) {
				$query = "select * from crm_deals where deal_id=$parent_deal_id";
				$result = mysql_query($query, $this->db->conn());
				while ($row = mysql_fetch_array($result)) {				

					$query_zero_zero = "select * from crm_quotes where deal_id=$parent_deal_id";
					$zero_zero = mysql_query($query_zero_zero, $this->db->conn());
					while ($zero_zero_row = mysql_fetch_array($zero_zero)) {
						$quote_id = $zero_zero_row['quote_id']; 
						if ($this->notNull($quote_id)) {
							$query_two_one = "delete from crm_quote_details where quote_id=$quote_id";
							mysql_query($query_two_one, $this->db->conn());
						}

						if ($this->notNull($parent_deal_id)) {
							$query_one_zero = "delete from crm_quotes where deal_id=$parent_deal_id";
							mysql_query($query_one_zero, $this->db->conn());
						}
					}

					$quote_code = 'P'.microtime(true);
					$crm_id = $row['crm_id'];
					$owner = $row['owner'];
					$campaign = $row['campaign'];
					$query_one = "INSERT INTO crm_quotes (crm_id,deal_id,quote_status,quote_code,_date,owner,userCode,campaign) VALUES ($crm_id,$parent_deal_id,'confirmed','$quote_code',CURRENT_TIMESTAMP,'$owner','$logged','$campaign')";
					$result_one = mysql_query($query_one, $this->db->conn());
					$quote_id = mysql_insert_id();
					$query_two = "select * from crm_deal_products where deal_id=$parent_deal_id";
					$result_two = mysql_query($query_two, $this->db->conn());			
					$total_amount = 0;
					$total_qty = 0;
					while ($row_two = mysql_fetch_array($result_two)) {
						$p_name = $row_two['product_name'];
						$qty = $row_two['qty'];
						$price = $row_two['price'];
						$amount = $row_two['amount'];
						$total_qty += $qty;
						$total_amount += $amount;
						$query_three = "INSERT INTO crm_quote_details (quote_id,product_name,qty,price,amount,_date) VALUES ($quote_id,'$p_name',$qty,$price,$amount,CURRENT_TIMESTAMP)";
						mysql_query($query_three, $this->db->conn());
					}
					
					$query_six = "UPDATE crm_quotes SET qty=$total_qty,amount=$total_amount WHERE id=$quote_id";
					mysql_query($query_six, $this->db->conn());
				}
				return "success";
			}

			return "fail";
		}
		
		function crm_quote_to_sales_action($item) {
			$logged = $_SESSION['logged']['owner'];
			$quote_id = $item->get("where");
			$crm_id = "";
			$deal_id = "";
			$campaign = "";
			$quote_code = "";
			$owner = "";
			$query = "select * from crm_quotes where id=$quote_id";
			$result = mysql_query($query, $this->db->conn());
			while ($row = mysql_fetch_array($result)) {
				$crm_id = $row['crm_id'];
				$deal_id = $row['deal_id'];
				$campaign = $row['campaign'];
				$quote_code = $row['quote_code'];
				$owner = $row['owner'];
			}
			
			if ($this->notNull($crm_id)) {
				$query = "delete from crm_sales where quote_code='$quote_code' and crm_id=$crm_id";
				mysql_query($query, $this->db->conn());
			}
		
			if ($this->notNull($quote_id)) {
				$query = "update crm_quotes set quote_status='close as won' where id=$quote_id";
				mysql_query($query, $this->db->conn());
			}

			$query = "select * from crm_quote_details where quote_id=$quote_id";
			$result = mysql_query($query, $this->db->conn());
			while ($row = mysql_fetch_array($result)) {
				$p_name = $row['product_name'];
				$qty = $row['qty'];
				$price = $row['price'];
				$amount = $row['amount'];

				$query_one = "INSERT INTO crm_sales (crm_id,deal_id,product_name,qty,price,amount,quote_code,start_date,_date,owner,userCode,campaign) VALUES ($crm_id,$deal_id,'$p_name',$qty,$price,$amount,'$quote_code',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,'$owner','$logged','$campaign')";
				mysql_query($query_one, $this->db->conn());			
			}

			return "success";
		}
		/*
		v[0] - qty
		v[1] - type
		v[2] - price
		v[3] - product_id
		v[4] - crm_id
		v[5] - owner
		v[6] - _date
		v[7] - amount
		v[8] - descr
		*/

		function crm_service_products_to_sales_action($item) {
			$logged = $_SESSION['logged']['owner'];
			$service_id = $item->get("where");
			if (!isset($service_id) || strlen($service_id) == 0) $service_id = "0";
			$query = "select * from crm_services where (service_id=$service_id and flag>0) or ((service_stage='service' or service_stage='closed') and flag>0)";
			$result = mysql_query($query, $this->db->conn());
			while ($row = mysql_fetch_array($result)) {
				$crm_id = $row['crm_id'];
				$owner = $row['owner'];
				$service_id = $row['service_id'];
				$subject = $row['subject'];
				$service_precent = $row['service_precent']; //niluuleltees bodogddog uramshuulaliin huvid huvi orj irne
				$query_one = "select * from crm_deal_products where service_id=$service_id and flag>0";
				$result_one = mysql_query($query_one, $this->db->conn());
				$bool = false;
				while ($row_one = mysql_fetch_array($result_one)) {
					$bool = true;
					$id = $row_one['id'];
					$product_id = $row_one['product_id'];
					$qty = $row_one['qty'];
					$pty = $row_one['pty'];
					$price = $row_one['price'];
					$amount = $row_one['amount'];
					$warehouse_id = $row_one['warehouse_id'];
					$type = ($row_one['type'] == 'cash' ? 0 : 1);					
					$v = "qty=$qty&pty=$pty&type=$type&price=$price&product_id=$product_id&crm_id=$crm_id&warehouse_id=$warehouse_id&owner=$owner&amount=$amount&descr=$subject";
					$fin = new item();
					$fin->put("table", "sales");
					$fin->put("values", $v);
					$this->crm_finance_fun($fin);
					
					$query_two = "update crm_deal_products set flag=0 where id=$id";
					mysql_query($query_two, $this->db->conn());
				}

				if ($bool) {
					if ($service_precent > 0) {
						$product_id = 0;
						$qty = 0;
						$pty = 0;
						$price = 0;
						$amount = $row['service_revenue'] - $row['service_debt'];
						$warehouse_id = 0;
						$type = 0;					
						$v = "qty=$qty&pty=$pty&type=$type&price=$price&product_id=$product_id&crm_id=$crm_id&warehouse_id=$warehouse_id&owner=$owner&amount=$amount&descr=$subject";
						$fin = new item();
						$fin->put("table", "discount");
						$fin->put("values", $v);
						$this->crm_finance_fun($fin);
					}

					$query_three = "update crm_services set flag=0 where service_id=$service_id";
					mysql_query($query_three, $this->db->conn());
				}
			}


			$query = "select id,crm_id,service_id,promo_code,pay_type,pay_date,precent,amount,total_amount,userCode from crm_service_payroll where flag>0";
			$result = mysql_query($query, $this->db->conn());
			while ($row = mysql_fetch_array($result)) {
				$id = $row['id'];
				$crm_id = $row['crm_id'];
				$owner = $row['userCode'];
				$service_id = $row['service_id'];
				$pay_type = $row['pay_type'];
				$precent = $row['precent'];
				$promo_code = $row['promo_code'];
				$amount = doubleval($row['amount']);
				$total_amount = doubleval($row['total_amount']);
				$discount_amount = doubleval($total_amount - $amount);

				if ($service_id > 0) {
					$product_id = 0;
					$qty = -1;
					$pty = 0;
					$price = 0;					
					$warehouse_id = 0;
					$type = ($pay_type == 'cash' ? 0:1); //zeel tololtiin helber 0 - bol belneer, 1 - belen busaar	
					$v = "qty=$qty&pty=$pty&type=$type&price=$price&product_id=$product_id&crm_id=$crm_id&warehouse_id=$warehouse_id&owner=$owner&amount=$amount&descr=$subject";
					$fin = new item();
					$fin->put("table", "lease");
					$fin->put("values", $v);
					$this->crm_finance_fun($fin);

					if ($discount_amount > 0) {//uramshuulal baigaa bol
						$qty = 0;
						$v = "qty=$qty&pty=$pty&type=$type&price=$price&product_id=$product_id&crm_id=$crm_id&warehouse_id=$warehouse_id&owner=$owner&amount=$discount_amount&descr=$subject";
						$fin = new item();
						$fin->put("table", "discount");
						$fin->put("values", $v);
						$this->crm_finance_fun($fin);
					}
					
					$query_three = "update crm_service_payroll set flag=0 where id=$id";
					mysql_query($query_three, $this->db->conn());
				} else {					
					$product_id = 0;
					$qty = -1;
					$pty = 0;
					$price = 0;
					$warehouse_id = 0;
					$service_amount = $total_amount;

					$query_two = "select service_id,service_debt from crm_services where service_debt>0 and service_stage='service' and crm_id=$crm_id order by _date asc";
					$result_two = mysql_query($query_two, $this->db->conn());
					while ($row_two = mysql_fetch_array($result_two)) {
						$service_id = $row_two['service_id'];
						$service_debt = $row_two['service_debt'];
						if ($service_debt <= $service_amount) {
							$query_five = "update crm_services set service_stage='closed',service_debt=0 where service_id=$service_id";
							mysql_query($query_five, $this->db->conn());							
						} else {
							$query_five = "update crm_services set service_debt=service_debt-$service_amount where service_id=$service_id";
							mysql_query($query_five, $this->db->conn());			
							break;
						}
						$service_amount -= $service_debt;
					}

					$type = ($pay_type == 'cash' ? 0:1); //zeel tololtiin helber 0 - bol belneer, 1 - belen busaar	
					$v = "qty=$qty&pty=$pty&type=$type&price=$price&product_id=$product_id&crm_id=$crm_id&warehouse_id=$warehouse_id&owner=$owner&amount=$amount&descr=$subject";
					$fin = new item();
					$fin->put("table", "lease");
					$fin->put("values", $v);
					$this->crm_finance_fun($fin);
					
					if ($discount_amount > 0) {//uramshuulal baigaa bol
						$qty = 0;
						$v = "qty=$qty&pty=$pty&type=$type&price=$price&product_id=$product_id&crm_id=$crm_id&warehouse_id=$warehouse_id&owner=$owner&amount=$discount_amount&descr=$subject";
						$fin = new item();
						$fin->put("table", "discount");
						$fin->put("values", $v);
						$this->crm_finance_fun($fin);
					}
					
					$query_three = "update crm_service_payroll set flag=0 where id=$id";
					mysql_query($query_three, $this->db->conn());
				}
			}
			
			$query = "select * from crm_changeprice where flag>0";
			$result = mysql_query($query, $this->db->conn());
			while ($row = mysql_fetch_array($result)) {
				$id = $row['id'];
				$crm_id = $row['crm_id'];
				$amount = $row['amount'];
				$owner = $row['userCode'];
								
				$product_id = 0;
				$qty = 0;
				$pty = 0;
				$price = 0;					
				$warehouse_id = 0;
				$type = 0;
				$v = "qty=$qty&pty=$pty&type=$type&price=$price&product_id=$product_id&crm_id=$crm_id&warehouse_id=$warehouse_id&owner=$owner&amount=$amount&descr=$subject";
				$fin = new item();
				$fin->put("table", "changeprice");
				$fin->put("values", $v);
				$this->crm_finance_fun($fin);
			
				$query_three = "update crm_changeprice set flag=0 where id=$id";
				mysql_query($query_three, $this->db->conn());				
			}

			return "success";
		}

		function crm_service_products_to_instock_action($item) {
			$logged = $_SESSION['logged']['owner'];
			$service_id = $item->get("where");
			if (!isset($service_id) || strlen($service_id) == 0) return "";
			$query = "select * from crm_services where service_id=$service_id and flag>0";
			$result = mysql_query($query, $this->db->conn());
			while ($row = mysql_fetch_array($result)) {
				$crm_id = $row['crm_id'];
				$owner = $row['owner'];
				$service_id = $row['service_id'];
				$subject = $row['subject'];
				$query_one = "select * from crm_deal_products where service_id=$service_id and flag>0";
				$result_one = mysql_query($query_one, $this->db->conn());
				$bool = false;
				while ($row_one = mysql_fetch_array($result_one)) {
					$bool = true;
					$id = $row_one['id'];
					$product_id = $row_one['product_id'];
					$qty = $row_one['qty'];
					$pty = $row_one['pty'];
					$price = $row_one['price'];
					$amount = $row_one['amount'];
					$warehouse_id = $row_one['warehouse_id'];
					$type = 7;//logistic
					$v = "qty=$qty&pty=$pty&type=$type&price=$price&product_id=$product_id&crm_id=$crm_id&warehouse_id=$warehouse_id&owner=$owner&amount=$amount&descr=$subject";
					$fin = new item();
					$fin->put("table", "storage");
					$fin->put("values", $v);
					$this->crm_finance_fun($fin);
					
					$query_two = "update crm_deal_products set flag=0 where id=$id";
					mysql_query($query_two, $this->db->conn());
				}
				if ($bool) {
					$query_three = "update crm_services set flag=0 where service_id=$service_id";
					mysql_query($query_three, $this->db->conn());
				}
			}
			
			return "success";
		}

		function crm_service_products_to_back_action($item) {
			$logged = $_SESSION['logged']['owner'];
			$service_id = $item->get("where");
			if (!isset($service_id) || strlen($service_id) == 0) return "";
			$query = "select * from crm_services where service_id=$service_id and flag>0";
			$result = mysql_query($query, $this->db->conn());
			while ($row = mysql_fetch_array($result)) {
				$crm_id = $row['crm_id'];
				$owner = $row['owner'];
				$service_id = $row['service_id'];
				$subject = $row['subject'];
				$query_one = "select * from crm_deal_products where service_id=$service_id and flag>0";
				$result_one = mysql_query($query_one, $this->db->conn());
				$bool = false;
				while ($row_one = mysql_fetch_array($result_one)) {
					$bool = true;
					$id = $row_one['id'];
					$product_id = $row_one['product_id'];
					$qty = $row_one['qty'];
					$pty = $row_one['pty'];
					$price = $row_one['price'];
					$amount = $row_one['amount'];
					$warehouse_id = $row_one['warehouse_id'];
					$type = 4;//back
					$v = "qty=$qty&pty=$pty&type=$type&price=$price&product_id=$product_id&crm_id=$crm_id&warehouse_id=$warehouse_id&owner=$owner&amount=$amount&descr=$subject";
					$fin = new item();
					$fin->put("table", "back");
					$fin->put("values", $v);
					$this->crm_finance_fun($fin);
					
					$query_two = "update crm_deal_products set flag=0 where id=$id";
					mysql_query($query_two, $this->db->conn());
				}
				if ($bool) {
					$query_three = "update crm_services set flag=0 where service_id=$service_id";
					mysql_query($query_three, $this->db->conn());
				}
			}
			
			return "success";
		}


		function startsWith($haystack, $needle) {
		    return substr($haystack, 0, strlen($needle)) === $needle;
		}
		
		function crm_campaign_customer_list($item) {		
			$start = $item->get("start");
			$end = $item->get("end");
			$sort = $item->get("sort");
			$dir = $item->get("dir");
			$where = $item->get("where");
			$where = urldecode($where);
			$where = str_replace("\\", "", $where);
			if (intval($where) > 0)
				$query = "select * from crm_campaign where id=$where";
			else
				$query = "select * from crm_campaign where campaign='$where'";
			$result = mysql_query($query, $this->db->conn());
			while ($row = mysql_fetch_array($result)) {
				$logged = $_SESSION['logged']['owner'];
				$personal = $row['personal'];
				$campaign = $row['campaign'];
								
				$query_one = "";
				if (strlen($personal) == 0) {
					$query_one = "select * from crm_customer where crm_id in (select crm_id from crm_customer_campaigns where campaign='$campaign')";
				} else {
	//				$encoded = base64_decode($personal);
					$encoded = $personal;
					if ($this->startsWith($encoded, "SELECT")) {
						$query_one = $encoded;
					}
					else {
						$ids = explode(":", $personal);
/*						$where_one = "";
						for ($i = 0; $i < sizeof($ids); $i++) {
							if (strlen($ids[$i]) > 0) {
								if (strlen($where_one) == 0)
									$where_one .= "crm_id=".$ids[$i];
								else
									$where_one .= " or crm_id=".$ids[$i];
							}
						}*/

						$where_one = "locate(concat(':',concat(cast(crm_id as char),':')),':".$personal."')>0";
						$query_one = "select * from crm_customer where ".$where_one;
					}				
				}

				$count = $this->num_rows($query_one, "");
				$result_one = $this->query_result($query_one, " LIMIT $start,$end");
				while ($row = mysql_fetch_array($result_one)) {
					$record = new crm_contacts();
					$row['crm_name'] = $this->crm_customer_name_simple($row['crm_id']);
					$record->init($row);
					$array[$count] = $record;
					$json .= $record->json().",";
				}
				$json = substr($json, 0, -1);
				return '{"results":'.$count.',"items":['.$json.']}';				
			}

			return "success";
		}

		function crm_campaign_create_crm_list($item) {		
			$where = $item->get("where");
			$query = "select * from crm_campaign where id=$where";
			$result = mysql_query($query, $this->db->conn());
			while ($row = mysql_fetch_array($result)) {
				$logged = $_SESSION['logged']['owner'];
				$personal = $row['personal'];
								
				$query_one = "";
				if (strlen($personal) == 0) {
					$query_one = "select * from crm_customer where crm_id in (select crm_id from crm_customer_campaigns where campaign='$campaign')";
				} else {
	//				$encoded = base64_decode($personal);
					$encoded = $personal;
					if ($this->startsWith($encoded, "SELECT"))
						$query_one = $encoded;
					else {
/*						$ids = explode(":", $personal);
						$where_one = "";
						for ($i = 0; $i < sizeof($ids); $i++) {
							if (strlen($ids[$i]) > 0) {
								if (strlen($where_one) == 0)
									$where_one .= "crm_id=".$ids[$i];
								else
									$where_one .= " or crm_id=".$ids[$i];
							}
						}*/

						$where_one = "locate(concat(':',concat(cast(crm_id as char),':')),':".$personal."')>0";
						$query_one = "select * from crm_customer where ".$where_one;
					}
				}

				$result_one = mysql_query($query_one, $this->db->conn());				
				
				$total_members = mysql_num_rows($result_one);
				$query_two = "update crm_campaign set total_members=$total_members where id=$where";
				mysql_query($query_two, $this->db->conn());

				$this->any_delete("crm_emails", "campaign", $row['campaign']);
				$this->any_delete("crm_calllog", "campaign", $row['campaign']);
				$this->any_delete("crm_event", "campaign", $row['campaign']);
				$descr = $row['descr']; $descr1 = $descr;
				while ($row_one = mysql_fetch_array($result_one)) {
					$descr1 = $row_one['descr'];
					$subject = $descr1;
					if ($row['campaign_type'] == 'email') {
						$vls = $row_one['crm_id'].",'".$subject."','".$row_one['email']."','".$row['campaign']."','".$logged."','".$descr."'";
						$query_two = "INSERT INTO crm_emails (crm_id,subject,_to,campaign,userCode,descr) VALUES (".$vls.")";
						$result_two = mysql_query($query_two, $this->db->conn());
					} else
					if ($row['campaign_type'] == 'phone call') {
						$vls = $row_one['crm_id'].",'".$subject."','".$row_one['phone']."','".$row['campaign']."','".$logged."','".$descr."'";
						$query_two = "INSERT INTO crm_calllog (crm_id,subject,_to,campaign,userCode,descr) VALUES (".$vls.")";
						$result_two = mysql_query($query_two, $this->db->conn());
					} else
					if ($row['campaign_type'] == 'appointment') {
						$vls = $row_one['crm_id'].",'".$subject."','".$row_one['email']."','".$row['campaign']."','".$logged."','".$descr."'";
						$query_two = "INSERT INTO crm_events (crm_id,subject,_to,campaign,userCode,descr) VALUES (".$vls.")";
						$result_two = mysql_query($query_two, $this->db->conn());
					}
				}
			}

			return "success";
		}
		
		function crm_campaign_remove_crm_list($item) {		
			$where = $item->get("where");
			$query = "select * from crm_campaign where id=$where";
			$result = mysql_query($query, $this->db->conn());
			while ($row = mysql_fetch_array($result)) {				
				if (strlen($row['campaign']) > 2) {
					$query_two = "update crm_campaign set total_members=0 where id=$where";
					mysql_query($query_two, $this->db->conn());
					$this->any_delete("crm_emails", "campaign", $row['campaign']);
					$this->any_delete("crm_calllog", "campaign", $row['campaign']);
					$this->any_delete("crm_event", "campaign", $row['campaign']);		
				}
			}

			return "success";
		}		

		/*
		v[0] - qty
		v[1] - type
		v[2] - price
		v[3] - product_id
		v[4] - crm_id
		v[5] - owner
		v[6] - warehouse_id
		v[7] - amount
		v[8] - descr
		*/
		function crm_out_deposit($table, $v) {
			$fields = "";
			$values = "";
			for ($i = 0; $i < sizeof($v); $i++) {
				$pk = explode('=', $v[$i]);
				if ($pk[0] == "qty") { $pk[0] = "outgoing"; $pk[1] = abs($pk[1]); }
				if ($pk[0] == "amount") { $pk[1] = -$pk[1]; }
				$fields .= $pk[0].",";
				$values .= "'".$pk[1]."',";
			}
			$fields .= 'deposit';
			$values .= "'$table'";

			$query = "insert into crm_balance ($fields) values ($values)";
			$result = mysql_query($query, $this->db->conn());
		}

		function crm_in_deposit($table, $v) {
			$fields = "";
			$values = "";
			for ($i = 0; $i < sizeof($v); $i++) {
				$pk = explode('=', $v[$i]);
				if ($pk[0] == "qty") $pk[0] = "incoming";
				$fields .= $pk[0].",";
				$values .= "'".$pk[1]."',";
			}
			$fields .= 'deposit';
			$values .= "'$table'";

			$query = "insert into crm_balance ($fields) values ($values)";
			$result = mysql_query($query, $this->db->conn());
		}
		
		function crm_my_explode_value($v) {
			$t = explode('=', $v);
			return $t[1];
		}

		function crm_qty_plus($v) {
			$t = explode('=', $v);
			return (doubleval($t[1])>=0);
		}

		function crm_type_cash($v) {
			$t = explode('=', $v);
			return ($t[1] == 0);
		}

		function crm_type_lease($v) {
			$t = explode('=', $v);
			return ($t[1] == 1);
		}

		function crm_user_direction($v) {		
			$v = $this->crm_my_explode_value($v);
			$query = "select user_type from crm_users where owner='$v'";
			$result = mysql_query($query, $this->db->conn());
			while ($row = mysql_fetch_array($result)) {				
				return $row['user_type'];
			}

			return 'corporate';
		}

		function crm_customer_id($v) {		
			$v = $this->crm_my_explode_value($v);
			$query = "select crm_id from crm_customer where owner='$v' and _class='AGENT'";
			$result = mysql_query($query, $this->db->conn());
			while ($row = mysql_fetch_array($result)) {				
				return $row['crm_id'];
			}

			return $v;
		}

		function crm_customer_type($v) {	
			$v = $this->crm_my_explode_value($v);
			$query = "select _class from crm_customer where crm_id='$v'";
			$result = mysql_query($query, $this->db->conn());
			while ($row = mysql_fetch_array($result)) {				
				return $row['_class'];
			}

			return 'SME';
		}

		function crm_finance_fun($item) {
			$table = $item->get("table");
			$values = $item->get("values");
			$v = explode('&', $values);

			if ($table == "sales") {				
				if ($this->crm_qty_plus($v[0])) {//orlogo bol
					$user_dir = $this->crm_user_direction($v[7]);
					$cus_type = $this->crm_customer_type($v[5]);
					if ($user_dir == "retail" && $cus_type != "AGENT") {
						//empty
					} else
						$this->crm_out_deposit("storage", $v);

					$this->crm_in_deposit("sales", $v);
					if ($this->crm_type_cash($v[2]))
						$this->crm_in_deposit("cash", $v);
					else
					if ($this->crm_type_lease($v[2]))
						$this->crm_in_deposit("lease", $v);
				} else {//zarlaga
					
				}
			} else 
			if ($table == "storage") {
				if ($this->crm_qty_plus($v[0])) {//orlogo bol
					$this->crm_in_deposit("storage", $v);
				} else {
					$this->crm_out_deposit("storage", $v);
				}
			} else
			if ($table == "lease") {
				if ($this->crm_qty_plus($v[0])) {//orlogo bol
					$this->crm_in_deposit("lease", $v);
				} else {
					//zeel tololt hiigdej baigaa ued VAN SALING hun baival AGENT gedeg hariltsagchiin zeeliig haana	
					$this->crm_out_deposit("lease", $v);
					$this->crm_in_deposit("cash", $v);
				}
			} else
			if ($table == "back") {
				if ($this->crm_qty_plus($v[0])) {//orlogo bol
					$this->crm_in_deposit("back", $v);
					$this->crm_in_deposit("storage", $v);
//					$this->crm_out_deposit("sales", $v);
//					$this->crm_out_deposit("cash", $v);
				} else {
					$this->crm_out_deposit("back", $v);
				}
			} else
			if ($table == "discount") {
				if ($this->crm_qty_plus($v[0])) {//orlogo bol
					$this->crm_in_deposit("discount", $v);		
					$this->crm_out_deposit("lease", $v);
				} else {
					$this->crm_out_deposit("discount", $v);
				}
			} else
			if ($table == "changeprice") {
				if ($this->crm_qty_plus($v[0])) {//orlogo bol
					$this->crm_in_deposit("changeprice", $v);					
				} else {
					$this->crm_out_deposit("changeprice", $v);
				}
			}
		}

		function crm_duplicate_customer_check($field, $value) {
			$fields = array("phone","phone1","email","regNo","firstName","lastName");
			if (in_array($field, $fields)) {
				$scores = array(15,10,15,50,5,5);
				$index = array_search($field, $fields);		
				$query = "select $field from crm_customer where $field='$value' and length($field)>1";
				$result = mysql_query($query, $this->db->conn());
				$rows = mysql_num_rows($result);
				if ($rows > 0)
					return $scores[$index];				
			}

			return 0;
		}
		
		function crm_any_update($table, $values, $where) {			
			$query = "UPDATE ".$table." SET ".$values." WHERE ".$where;
			$result = mysql_query($query, $this->db->conn());
		}

		function crm_check_field_value($q, $v) {
			if (strpos($v, "and7")) 
				$v = str_replace("and7", "&", $v);	

			if ($q == "owner" || $q == "userCode") 
				return strtolower($v);
			if ($q == "password" && strlen($v) < 20) 
				return hash("sha512", $v);

			if ($q == "personal" && ($v == "Contact" || $v == "Account")) {
				$v = $_SESSION[$v];
//				$v = base64_encode($v);
				$v = $v;
			}

			return $v;
		}

		function crm_action($item) {
			$action = $item->get("action");			
			
			if ($action == 'merge_records') {
				$table = $item->get("table");
				if ($table == "crm_customer") {
					$where = $item->get("where");
					$values = $item->get("values");
					$values = urldecode ($values);
					$values = str_replace("\\", "", $values);

					$crm_ids = explode(",", $where);
					$master_crm_id = $crm_ids[0];
					$slave_crm_id = $crm_ids[1];
					
					if ($this->notNull($master_crm_id)) {
						$query = "UPDATE crm_customer SET ".$values.",mayDuplicate=0 WHERE crm_id=$master_crm_id";
						$result = mysql_query($query, $this->db->conn());
					}
					
					if ($this->notNull($slave_crm_id)) {
						$query = "UPDATE crm_customer SET parent_crm_id=$master_crm_id WHERE parent_crm_id=$slave_crm_id and parent_crm_id<>0";
						$result = mysql_query($query, $this->db->conn());

						$query = "DELETE FROM crm_customer WHERE crm_id=$slave_crm_id";
						$result = mysql_query($query, $this->db->conn());							

						$query = "DELETE FROM crm_customer_campaigns WHERE crm_id=$slave_crm_id";
						$result = mysql_query($query, $this->db->conn());				

						$query = "DELETE FROM crm_customer_company WHERE crm_id=$slave_crm_id";
						$result = mysql_query($query, $this->db->conn());

						$this->crm_any_update("crm_tasks", "crm_id=".$master_crm_id, "crm_id=".$slave_crm_id);
						$this->crm_any_update("crm_events", "crm_id=".$master_crm_id, "crm_id=".$slave_crm_id);
						$this->crm_any_update("crm_calllog", "crm_id=".$master_crm_id, "crm_id=".$slave_crm_id);
						$this->crm_any_update("crm_complain", "crm_id=".$master_crm_id, "crm_id=".$slave_crm_id);
						$this->crm_any_update("crm_deals", "crm_id=".$master_crm_id, "crm_id=".$slave_crm_id);
						$this->crm_any_update("crm_emails", "crm_id=".$master_crm_id, "crm_id=".$slave_crm_id);
						$this->crm_any_update("crm_notes", "crm_id=".$master_crm_id, "crm_id=".$slave_crm_id);
						$this->crm_any_update("crm_quotes", "crm_id=".$master_crm_id, "crm_id=".$slave_crm_id);
						$this->crm_any_update("crm_sales", "crm_id=".$master_crm_id, "crm_id=".$slave_crm_id);	
					}		
				} else 
				if ($table == "crm_products") {

				} else 
				if ($table == "crm_services") {
					$where = $item->get("where");
					$values = $item->get("values");
					$values = urldecode ($values);
					$values = str_replace("\\", "", $values);

					$service_ids = explode(",", $where);
					$master_service_id = $service_ids[0];
					$slave_service_id = $service_ids[1];
					
					if ($this->notNull($master_service_id)) {
						$query = "UPDATE crm_services SET ".$values." WHERE service_id=$master_service_id";
						$result = mysql_query($query, $this->db->conn());
					}
					if ($this->notNull($slave_service_id)) {
						$query = "DELETE FROM crm_services WHERE service_id=$slave_service_id";
						$result = mysql_query($query, $this->db->conn());	

						$this->crm_any_update("crm_deal_products", "service_id=".$master_service_id, "service_id=".$slave_service_id);

						$query = "UPDATE crm_deal_products SET descr=(select subject from crm_services where service_id=$master_service_id) WHERE service_id=$master_service_id";
						$result = mysql_query($query, $this->db->conn());	
					}
				}
			} else		
			if ($action == "sales") {
				$this->crm_service_products_to_sales_action($item);
			} else
			if ($action == "instock") {
				$this->crm_service_products_to_instock_action($item);
			} else
			if ($action == "return") {
				$this->crm_service_products_to_back_action($item);
			} else
			if ($action == "balance") {
				$this->crm_finance_fun($item);
			} else
			if ($action == "insert") {
				$table = $item->get("table");
				$table_name = $table;
				$values = $item->get("values");
				$item = new item();
				$values = urldecode ($values);
				$dols = explode('$', $values); 				
				$crm_id = ""; 
				$score = 0;
				for ($d = 0; $d < sizeof($dols); $d++) {
					$v = explode('&', $dols[$d]); 				
					$vls = "";
					$fls = "";
					$score = 0;
					for ($i = 0; $i < sizeof($v); $i++) {
						$q = explode('=', $v[$i]);
						if ($q[0] == "id" || $q[0] == "crm_name" || $q[0] == "notify" || $q[0] == "partner") continue;
						if ($q[0] == "crm_id") $crm_id = $q[1];
						$fls = $fls.$q[0].",";
						$q[1] = trim($q[1]);
						$q[1] = $this->crm_check_field_value($q[0], $q[1]);
						$item->put($q[0], $q[1]);
						$vls = $vls.'"'.$q[1].'",';										
						if ($table == "crm_customer") 
							$score += $this->crm_duplicate_customer_check($q[0], $q[1]);
					}
					
					if ($table == "crm_customer") {
						if ($score < 20) $score = 0;
						$fls .= "mayDuplicate";
						$vls .= $score;
					} else {
						$fls = substr($fls, 0, strlen($fls)-1);
						$vls = substr($vls, 0, strlen($vls)-1);
					}

					if ($score < 100) {
						$query = "INSERT INTO ".$table."(".$fls.") VALUES (".$vls.")";
						$result = mysql_query($query, $this->db->conn());
					} else
						return 'duplicated';
				}
				
				if ($table == "crm_posts" && $item->get("owner") != $item->get("userCode")) {
					$pk = "deals";
					if ($item->get("deal_id") != "0") $pk = "deals";
					else $pk = "cases";
					$this->crm_mail_sender($item->get("owner").".mn", "CRM Message", $item->get("message"), $item->get("userCode"), $this->db->crm_url."?pk=".$pk);
				}
				
				if ($table == "crm_complain" && $item->get("owner") != $item->get("userCode")) {
					$this->crm_mail_sender($item->get("owner").".mn", "CRM Case", $item->get("complain_reason"), $item->get("userCode"), $this->db->crm_url."?pk=cases");
				}

				if ($table == "crm_workflow" && $item->get("owner") != $item->get("userCode")) {
					$this->crm_mail_sender($item->get("owner").".mn", "CRM Task", $item->get("subject"), $item->get("userCode"), $this->db->crm_url."?pk=workspace");
				}
				
				$new_id = mysql_insert_id();							
				if ($table_name == "crm_customer" && $new_id > 0) {
					$logged = $_SESSION['logged'];
					$company = $logged['company'];
					$userCode = $logged['owner'];
					
					$query = "UPDATE crm_customer SET company_list='$company' WHERE crm_id=$news_id";
					mysql_query($query, $this->db->conn());

					$query = "INSERT INTO crm_customer_company (crm_id,company,userCode) VALUES ($new_id,'$company','$userCode')";
					mysql_query($query, $this->db->conn());
				} else	
				if ($table_name == "crm_services" && $new_id > 0) {
					$logged = $_SESSION['logged'];
					$userCode = $logged['owner'];
					$descr = $item->get("subject");
					$crm_id = $item->get("crm_id");
					$vendor = $item->get("product_vendor");
					if (strlen($vendor) > 3) {
						$query = "INSERT INTO crm_deal_products (service_id,crm_id,product_id,type,userCode,descr,warehouse_id,unit_size) (select $new_id,$crm_id,product_id,'plan' as type,'$userCode' as userCode,'$descr',warehouse_id,unit_size from crm_products where product_vendor='$vendor')";
						mysql_query($query, $this->db->conn());
					}
				}
				
				
				if (strlen($crm_id) > 0) {
					$query = "UPDATE crm_customer SET lastLogTime=CURRENT_TIMESTAMP WHERE crm_id=$crm_id";				
					$result = mysql_query($query, $this->db->conn());
					$crm_name = $this->crm_customer_name_simple($crm_id);
					$this->crm_write_log($table, $crm_name);
				}
				

				if (strlen($item->get("func")) == 0) {
					return $new_id;
				}
			
				$q = explode('=', $v[1]);
				$item->put("values", $q[0]);
				$item->put("where", $q[1]);
				return $this->crm_select($item);
			} else
			if ($action == "create_quote") {
				return $this->crm_deal_quote_create_action($item);
			} else
			if ($action == "create_sales") {
				return $this->crm_quote_to_sales_action($item);
			} else
			if ($action == "update_customer_owner") {
				$logged = $_SESSION['logged']['owner'];
				$table = $item->get("table");
				$values = $item->get("values");
				$where = $item->get("where");
				$values = urldecode ($values);
				$values = str_replace("\\", "", $values);
				$values = str_replace("&", ",", $values);
				$vs = explode(',', $values);
				$owner = $vs[0];
				$qs = explode(':', $vs[1]);
				for ($i = 0; $i < sizeof($qs); $i++) {
					$crm_id = $qs[$i];
					$descr = $vs[2];
					$query_zero = "INSERT crm_owner_transfer_log (crm_id,owner,userCode,descr) VALUES ($crm_id,'$owner','$logged','$descr')";
					mysql_query($query_zero, $this->db->conn());

					$query = "UPDATE ".$table." SET owner='$owner' WHERE crm_id=".$qs[$i];
					$result = mysql_query($query, $this->db->conn());
				}

				$item->put("values", "");
				$item->put("where", "");
				return $this->crm_select($item);
			} else
			if ($action == "update_deals_owner") {
				$logged = $_SESSION['logged']['owner'];
				$table = $item->get("table");
				$values = $item->get("values");
				$where = $item->get("where");
				$values = urldecode ($values);
				$values = str_replace("\\", "", $values);
				$values = str_replace("&", ",", $values);
				$vs = explode(',', $values);
				$owner = $vs[0];
				$qs = explode(':', $vs[1]);
				for ($i = 0; $i < sizeof($qs); $i++) {
					if ($this->notNull($qs[$i])) {
						$deal_id = $qs[$i];
						$descr = $vs[2];
						$query_zero = "INSERT crm_owner_transfer_log (deal_id,owner,userCode,descr) VALUES ($deal_id,'$owner','$logged','$descr')";
						mysql_query($query_zero, $this->db->conn());
						
						$this->crm_mail_sender($owner.".mn", "CRM Deal Assign", $descr, $logged, $this->db->crm_url."?pk=deals"); //deal assign hiih ued
						
						$query = "UPDATE ".$table." SET owner='$owner' WHERE deal_id=".$qs[$i];
						$result = mysql_query($query, $this->db->conn());					
					}
				}

				return "success";
			} else
			if ($action == "update_services_owner") {
				$logged = $_SESSION['logged']['owner'];
				$table = $item->get("table");
				$values = $item->get("values");
				$where = $item->get("where");
				$values = urldecode ($values);
				$values = str_replace("\\", "", $values);
				$values = str_replace("&", ",", $values);
				$vs = explode(',', $values);
				$owner = $vs[0];
				$qs = explode(':', $vs[1]);
				for ($i = 0; $i < sizeof($qs); $i++) {
					if ($this->notNull($qs[$i])) {
						$deal_id = $qs[$i];
						$descr = $vs[2];
						$query_zero = "INSERT crm_owner_transfer_log (service_id,owner,userCode,descr) VALUES ($service_id,'$owner','$logged','$descr')";
						mysql_query($query_zero, $this->db->conn());
						
						$this->crm_mail_sender($owner.".mn", "CRM Service Assign", $descr, $logged, $this->db->crm_url."?pk=services"); //deal assign hiih ued
						
						$query = "UPDATE ".$table." SET owner='$owner' WHERE service_id=".$qs[$i];
						$result = mysql_query($query, $this->db->conn());					
					}
				}

				return "success";
			} else
			if ($action == "update_services_next_stage") {
				$logged = $_SESSION['logged']['owner'];
				$table = $item->get("table");
				$values = $item->get("values");
				$where = $item->get("where");
				$values = urldecode ($values);
				$values = str_replace("\\", "", $values);
				$values = str_replace("&", ",", $values);
				$vs = explode(',', $values);
				$owner = $vs[0];
				$stage = $vs[3];
				$qs = explode(':', $vs[1]);
				for ($i = 0; $i < sizeof($qs); $i++) {
					if ($this->notNull($qs[$i])) {
						$deal_id = $qs[$i];
						$descr = $vs[2];
						$query_zero = "INSERT crm_owner_transfer_log (service_id,owner,userCode,descr) VALUES ($service_id,'$owner','$logged','$descr')";
						mysql_query($query_zero, $this->db->conn());
						
						$this->crm_mail_sender($owner.".mn", "CRM Service Assign", $descr, $logged, $this->db->crm_url."?pk=services"); //deal assign hiih ued
						
						$query = "UPDATE ".$table." SET owner='$owner',service_stage='$stage' WHERE service_id=".$qs[$i]." and service_stage='receipt'";
						$result = mysql_query($query, $this->db->conn());
						$row_affected = mysql_affected_rows();
						if ($row_affected > 0) {
							$it = new $item();
							$it->put("values", "service_id");
							$it->put("where", $qs[$i]);
							$this->crm_service_products_to_sales_action($it);
						}
					}
				}

				return "success";
			} else
			if ($action == "update_campaign_activity_owner") {
				$logged = $_SESSION['logged']['owner'];
				$table = $item->get("table");
				$values = $item->get("values");
				$where = $item->get("where");
				$values = urldecode ($values);
				$values = str_replace("\\", "", $values);
				$values = str_replace("&", ",", $values);
				$vs = explode(';', $values);
				$campaign = $vs[2];
				$descr = $vs[3];
				if ($vs[1] == 'all' && $this->notNull($campaign)) {//buh activity-iig huvaarilah
					$owners = explode(',', $vs[0]); //owner-uudiig avah
					$qs = explode(':', $vs[1]);
					$ct = (sizeof($qs)-1)/sizeof($owners);
					for ($i = 0; $i < sizeof($owners); $i++) {
						$owner = $owners[$i];						
						$_descr = $ct." shirheg campaign activity onoov !";
						$query_zero = "INSERT crm_owner_transfer_log (owner,userCode,descr) VALUES ('$owner','$logged','$_descr')";
						mysql_query($query_zero, $this->db->conn());
						//$this->crm_mail_sender($owner.".mn", "CRM Activity Assign (Campaign)", $_descr, $logged, $this->db->crm_url."?pk=campaigns"); //activity assign hiih ued
					}
					
					$query = "SELECT id FROM crm_calllog WHERE campaign='$campaign' and callresult='pending'";
					$result = mysql_query($query, $this->db->conn());
					$i=0;
					while ($row = mysql_fetch_array($result)) {
						$qs = $row['id'];
						$owner = $owners[$i%sizeof($owners)];
						if ($this->notNull($qs)) {
							if (strlen($descr) > 3)
								$query_one = "UPDATE crm_calllog SET owner='$owner',descr='$descr' WHERE id=".$qs;
							else
								$query_one = "UPDATE crm_calllog SET owner='$owner' WHERE id=".$qs;
							$result_one = mysql_query($query_one, $this->db->conn());						
						}
						$i++;
					}

					$query = "SELECT id FROM crm_tasks WHERE campaign='$campaign' and task_status='open'";
					$result = mysql_query($query, $this->db->conn());
					$i=0;
					while ($row = mysql_fetch_array($result)) {
						$qs = $row['id'];
						$owner = $owners[$i%sizeof($owners)];
						if ($this->notNull($qs)) {
							if (strlen($descr) > 3)
								$query_one = "UPDATE crm_tasks SET owner='$owner',descr='$descr' WHERE id=".$qs;
							else
								$query_one = "UPDATE crm_tasks SET owner='$owner' WHERE id=".$qs;
							$result_one = mysql_query($query_one, $this->db->conn());						
						}
						$i++;
					}

					$query = "SELECT id FROM crm_events WHERE campaign='$campaign' and event_status='pending'";
					$result = mysql_query($query, $this->db->conn());
					$i=0;
					while ($row = mysql_fetch_array($result)) {
						$qs = $row['id'];
						$owner = $owners[$i%sizeof($owners)];
						if ($this->notNull($qs)) {
							if (strlen($descr) > 3)
								$query_one = "UPDATE crm_events SET owner='$owner',descr='$descr' WHERE id=".$qs;
							else
								$query_one = "UPDATE crm_events SET owner='$owner' WHERE id=".$qs;
							$result_one = mysql_query($query_one, $this->db->conn());						
						}
						$i++;
					}
				} else {
					$owners = explode(',', $vs[0]); //owner-uudiig avah
					$qs = explode(':', $vs[1]);
					$descr = $vs[3];
					$_descr = (sizeof($qs)-1)." shirheg campaign activity onoov !";
					$query_zero = "INSERT crm_owner_transfer_log (owner,userCode,descr) VALUES ('$owner','$logged','$descr')";
					mysql_query($query_zero, $this->db->conn());
					$this->crm_mail_sender($owner.".mn", "CRM Activity Assign (Campaign)", $descr, $logged, $this->db->crm_url."?pk=campaigns"); //activity assign hiih ued

					for ($i = 0; $i < sizeof($qs); $i++) {
						$acs = explode('_', $qs[$i]);
						$owner = $owners[$i%sizeof($owners)];
						if ($acs[1] == 'c' && $this->notNull($acs[0])) {
							if (strlen($descr) > 3)
								$query = "UPDATE crm_calllog SET owner='$owner',descr='$descr' WHERE id=".$acs[0];
							else
								$query = "UPDATE crm_calllog SET owner='$owner' WHERE id=".$acs[0];
							$result = mysql_query($query, $this->db->conn());					
						}
					}
				}
				return "success";
			} else
			if ($action == "update_deals_move") {
				$logged = $_SESSION['logged']['owner'];
				$table = $item->get("table");
				$values = $item->get("values");
				$where = $item->get("where");
				$values = urldecode ($values);
				$values = str_replace("\\", "", $values);
				$values = str_replace("&", ",", $values);
				$vs = explode(',', $values);
				$day = $vs[0];
				$qs = explode(':', $vs[1]);
				for ($i = 0; $i < sizeof($qs); $i++) {
					$deal_id = $qs[$i];
					if (!$this->notNull($qs[$i])) continue;

					$query_zero = "INSERT crm_owner_transfer_log (deal_id,userCode,descr) VALUES ($deal_id,'$logged','deal-iig ".$day." hongoor shiljuulev !')";
					mysql_query($query_zero, $this->db->conn());

					$query = "UPDATE crm_deals SET _date=DATE_SUB(_date, INTERVAL ".$day." DAY) WHERE deal_id=".$qs[$i];
					$result = mysql_query($query, $this->db->conn());		
					
					$query = "UPDATE crm_deal_products SET _date=DATE_SUB(_date, INTERVAL ".$day." DAY) WHERE deal_id=".$qs[$i];
					$result = mysql_query($query, $this->db->conn());					

					$query = "UPDATE crm_calllog SET _date=DATE_SUB(_date, INTERVAL ".$day." DAY) WHERE deal_id=".$qs[$i];
					$result = mysql_query($query, $this->db->conn());					

					$query = "UPDATE crm_events SET _date=DATE_SUB(_date, INTERVAL ".$day." DAY) WHERE deal_id=".$qs[$i];
					$result = mysql_query($query, $this->db->conn());					

					$query = "UPDATE crm_emails SET _date=DATE_SUB(_date, INTERVAL ".$day." DAY) WHERE deal_id=".$qs[$i];
					$result = mysql_query($query, $this->db->conn());					

					$query = "UPDATE crm_notes SET _date=DATE_SUB(_date, INTERVAL ".$day." DAY) WHERE deal_id=".$qs[$i];
					$result = mysql_query($query, $this->db->conn());	
					
					$query = "UPDATE crm_deal_competitors SET _date=DATE_SUB(_date, INTERVAL ".$day." DAY) WHERE deal_id=".$qs[$i];
					$result = mysql_query($query, $this->db->conn());

					$query = "UPDATE crm_tasks SET _date=DATE_SUB(_date, INTERVAL ".$day." DAY) WHERE deal_id=".$qs[$i];
					$result = mysql_query($query, $this->db->conn());

					$query = "UPDATE crm_commission SET _date=DATE_SUB(_date, INTERVAL ".$day." DAY) WHERE deal_id=".$qs[$i];
					$result = mysql_query($query, $this->db->conn());
					 
					$query = "UPDATE crm_deal_sales_team SET _date=DATE_SUB(_date, INTERVAL ".$day." DAY) WHERE deal_id=".$qs[$i];
					$result = mysql_query($query, $this->db->conn());
				}

				return "success";
			} else
			if ($action == "update_deal_products_move") {
				$logged = $_SESSION['logged']['owner'];
				$table = $item->get("table");
				$values = $item->get("values");
				$where = $item->get("where");
				$values = urldecode ($values);
				$values = str_replace("\\", "", $values);
				$values = str_replace("&", ",", $values);
				$vs = explode(',', $values);
				$day = $vs[0];
				$qs = explode(':', $vs[1]);
				for ($i = 0; $i < sizeof($qs); $i++) {
					if (!$this->notNull($qs[$i])) continue;
					$query = "UPDATE crm_deal_products SET _date=DATE_SUB(_date, INTERVAL ".$day." DAY) WHERE id=".$qs[$i];
					$result = mysql_query($query, $this->db->conn());										
				}

				return "success";
			} else
			if ($action == "update_deals_undo") {
				$logged = $_SESSION['logged']['owner'];
				$table = $item->get("table");
				$values = $item->get("values");
				$where = $item->get("where");
				$values = urldecode ($values);
				$values = str_replace("\\", "", $values);
				$values = str_replace("&", ",", $values);
				$vs = explode(',', $values);
				$stage = $vs[0];
				$qs = explode(':', $vs[1]);
				for ($i = 0; $i < sizeof($qs); $i++) {
					$deal_id = $qs[$i];
					if ($this->notNull($qs[$i])) {
						$query_zero = "INSERT crm_owner_transfer_log (deal_id,userCode,descr) VALUES ($deal_id,'$logged','deal-iig butsaav !')";
						mysql_query($query_zero, $this->db->conn());

						$query = "UPDATE ".$table." SET stage='$stage' WHERE deal_id=".$qs[$i];
						$result = mysql_query($query, $this->db->conn());					
					}
				}

				return "success";
			} else
			if ($action == "update_services_undo") {
				$logged = $_SESSION['logged']['owner'];
				$table = $item->get("table");
				$values = $item->get("values");
				$where = $item->get("where");
				$values = urldecode ($values);
				$values = str_replace("\\", "", $values);
				$values = str_replace("&", ",", $values);
				$vs = explode(',', $values);
				$stage = $vs[0];
				$qs = explode(':', $vs[1]);
				for ($i = 0; $i < sizeof($qs); $i++) {
					$deal_id = $qs[$i];
					if ($this->notNull($qs[$i])) {
						$query_zero = "INSERT crm_owner_transfer_log (service_id,userCode,descr) VALUES ($deal_id,'$logged','service-iig butsaav !')";
						mysql_query($query_zero, $this->db->conn());

						$query = "UPDATE ".$table." SET service_stage='$stage' WHERE service_id=".$qs[$i];
						$result = mysql_query($query, $this->db->conn());					
					}
				}

				return "success";
			} else
			if ($action == "insert_customer_campaign") {
				$table = $item->get("table");
				$values = $item->get("values");
				$where = $item->get("where");
				if ($this->notNull($where)) {
					$query = "DELETE FROM ".$table." WHERE crm_id=$where";
					$result = mysql_query($query, $this->db->conn());

					$values = urldecode ($values);
					$values = str_replace("\\", "", $values);
					$values = str_replace("&", ",", $values);
					$vs = explode(',', $values);
					$owner = $_SESSION['logged']['owner'];
					for ($i = 0; $i < sizeof($vs); $i++) {
						$ws = $vs[$i];
						$as = explode('=', $ws);
						$ps = $as[1];
						$query = "INSERT INTO ".$table." (crm_id,campaign,userCode) VALUES ($where,'$ps','$owner')";
						$result = mysql_query($query, $this->db->conn());
					}

					return "success";
				}
			} else				
			if ($action == "add_to_campaign_customer") {
				$table = $item->get("table");
				$values = $item->get("values");
				$where = $item->get("where");
				if ($this->notNull($where)) {
					$values = urldecode ($values);
					$values = str_replace("\\", "", $values);
					$values = str_replace("&", ",", $values);
					$owner = $_SESSION['logged']['owner'];

					$query = "UPDATE crm_campaign SET personal=concat(personal, '$values') WHERE campaign='$where' and userCode='$owner'";
					$result = mysql_query($query, $this->db->conn());

					return "success";
				}
			} else
			if ($action == "remove_from_campaign_customer") {
				$table = $item->get("table");
				$values = $item->get("values");
				$where = $item->get("where");
				$owner = $_SESSION['logged']['owner'];
				if ($this->notNull($where)) {
					$values = urldecode ($values);
					$values = str_replace("\\", "", $values);
					$values = str_replace("&", ",", $values);
					$personal = "";
					$ids = explode(':', $values);
					$query = "SELECT personal FROM crm_campaign WHERE campaign='$where' and userCode='$owner'";
					$result = mysql_query($query, $this->db->conn());
					while ($row = mysql_fetch_array($result)) {
						$personal = $row['personal'];
						for ($i = 0; $i < sizeof($ids); $i++) {
							$personal = str_replace($ids[$i].":", "", $personal);
						}
					}

					$query = "UPDATE crm_campaign SET personal='$personal' WHERE campaign='$where' and userCode='$owner'";
					$result = mysql_query($query, $this->db->conn());

					return "success";
				}
			} else
			if ($action == "insert_customer_company") {
				$table = $item->get("table");
				$values = $item->get("values");
				$where = $item->get("where");
				if ($this->notNull($where)) {
					$query = "DELETE FROM ".$table." WHERE crm_id=$where";
					$result = mysql_query($query, $this->db->conn());

					$values = urldecode ($values);
					$values = str_replace("\\", "", $values);
					$values = str_replace("&", ",", $values);
					$vs = explode(',', $values);
					$owner = $_SESSION['logged']['owner'];
					for ($i = 0; $i < sizeof($vs); $i++) {
						$ws = $vs[$i];
						$as = explode('=', $ws);
						$ps = $as[1];
						$query = "INSERT INTO ".$table." (crm_id,company,userCode) VALUES ($where,'$ps','$owner')";
						$result = mysql_query($query, $this->db->conn());
					}

					return "success";
				}
			} else
			if ($action == "insert_reseller_deals") {
				$logged = $_SESSION['logged']['owner'];
				$table = $item->get("table");
				$values = $item->get("values");
				$where = $item->get("where");
				
				$values = urldecode ($values);
				$values = str_replace("\\", "", $values);
				$values = str_replace("&", ",", $values);
				$vs = explode(',', $values);
				$year = intval($vs[3]);
				$month = intval($vs[4])+1;
				if ($month >= 13) { $year = $year+1; $month = 1;}
				$closing_date = $year."-".$month."-10";
				$deal = $vs[0]."-".$vs[3]."/".$vs[4];
				$descr = $vs[2];
				$owner = $vs[1];
				
				if ($where == "all") {
					$query = "SELECT crm_id FROM crm_customer WHERE owner='$logged' and (_class='RESELLER' or _class='AGENT')";
					$result = mysql_query($query, $this->db->conn());
					$count = 0;
					while ($row = mysql_fetch_array($result)) {
						$crm_id = $row['crm_id'];
						$query_one = "INSERT INTO crm_deals (crm_id,deal,stage,closing_date,owner,userCode,probablity,descr,deal_type) VALUES ($crm_id,'$deal','quote','$closing_date','$owner','$logged',100,'$descr',2)";
						mysql_query($query_one, $this->db->conn());
						$count++;
					}
				} else {
					$crm_ids = explode(':', $where);
					$count = 0;
					for ($i = 0; $i < sizeof($crm_ids); $i++) {
						$crm_id = $crm_ids[$i];
						$query_one = "INSERT INTO crm_deals (crm_id,deal,stage,closing_date,owner,userCode,probablity,descr,deal_type) VALUES ($crm_id,'$deal','quote','$closing_date','$owner','$logged',100,'$descr',2)";
						mysql_query($query_one, $this->db->conn());
						$count++;
					}
				}

				return $count;
			} else
			if ($action == "update") {
				$table = $item->get("table");
				$values = $item->get("values");
				$where = $item->get("where");
				$values = urldecode ($values);
				$values = str_replace("\\", "", $values);
				$values = str_replace("&", ",", $values);
				$values = str_replace("and7", "&", $values);
				$where = str_replace("\\", "", $where);
				$query = "UPDATE ".$table." SET ".$values." WHERE ".$where;
				$result = mysql_query($query, $this->db->conn());			
				$item->put("values", "");				
				$item->put("where", "");
				return $this->crm_select($item);
			} else
			if ($action == "delete") {
				$table = $item->get("table");
				$where = $item->get("where");
				if (!$this->notNull($where))
					return "fail";

				$wh = explode(':', $where);
				for ($i = 0; $i < sizeof($wh); $i++) {
					$where = $wh[$i];
					$query = "";
					if ($table == 'crm_campaign') {
						$query = "SELECT * FROM ".$table." WHERE id=".$where;
						$result = mysql_query($query, $this->db->conn());
						while ($row = mysql_fetch_array($result)) {
							$campaign = $row['campaign'];
							$this->any_delete("crm_emails", 'campaign', $campaign);
							$this->any_delete("crm_events", 'campaign', $campaign);
							$this->any_delete("crm_calllog", 'campaign', $campaign);
							$this->any_delete("crm_customer_campaigns", 'campaign', $campaign);
						}
						
						$query = "DELETE FROM ".$table." WHERE id=".$where;
						$result = mysql_query($query, $this->db->conn());
					} else
					if ($table == 'crm_deals') {
						$this->any_delete("crm_deal_products", 'deal_id', $where);
						$this->any_delete("crm_deal_competitors", 'deal_id', $where);
						$this->any_delete("crm_deal_sales_team", 'deal_id', $where);
						$this->any_delete("crm_deal_payroll", 'deal_id', $where);
						$this->any_delete("crm_potentials", 'deal_id', $where);
						$this->any_delete("crm_tasks", 'deal_id', $where);
						$this->any_delete("crm_events", 'deal_id', $where);
						$this->any_delete("crm_calllog", 'deal_id', $where);
						$this->any_delete("crm_emails", 'deal_id', $where);
						$this->any_delete("crm_notes", 'deal_id', $where);
						$this->any_delete("crm_posts", 'deal_id', $where);

						$query = "DELETE FROM ".$table." WHERE deal_id=".$where;
						$result = mysql_query($query, $this->db->conn());
					} else
					if ($table == 'crm_services') {
						$this->any_delete("crm_deal_products", 'service_id', $where);
						$this->any_delete("crm_deal_sales_team", 'service_id', $where);
						$this->any_delete("crm_deal_payroll", 'service_id', $where);
						$this->any_delete("crm_tasks", 'service_id', $where);
						$this->any_delete("crm_events", 'service_id', $where);
						$this->any_delete("crm_calllog", 'service_id', $where);
						$this->any_delete("crm_emails", 'service_id', $where);
						$this->any_delete("crm_notes", 'service_id', $where);
						$this->any_delete("crm_posts", 'service_id', $where);

						$query = "DELETE FROM ".$table." WHERE service_id=".$where;
						$result = mysql_query($query, $this->db->conn());
					} else
					if ($table == 'crm_complain') {
						$this->any_delete("crm_case_products", 'case_id', $where);
						$this->any_delete("crm_tasks", 'case_id', $where);
						$this->any_delete("crm_events", 'case_id', $where);
						$this->any_delete("crm_calllog", 'case_id', $where);
						$this->any_delete("crm_emails", 'case_id', $where);
						$this->any_delete("crm_notes", 'case_id', $where);
						$this->any_delete("crm_posts", 'case_id', $where);

						$query = "DELETE FROM ".$table." WHERE case_id=".$where;
						$result = mysql_query($query, $this->db->conn());
					} else
					if ($table == 'crm_quotes') {
						$this->any_delete("crm_quote_details", 'quote_id', $where);
						$query = "DELETE FROM ".$table." WHERE id=".$where;
						$result = mysql_query($query, $this->db->conn());
					} else
					if ($table == 'crm_customer_campaings') {
						$query = "DELETE FROM ".$table." WHERE crm_id=".$where;
						$result = mysql_query($query, $this->db->conn());
					} else
					if ($table == 'crm_customer_company') {
						$query = "DELETE FROM ".$table." WHERE crm_id=".$where;
						$result = mysql_query($query, $this->db->conn());
					} else
					if ($table == 'crm_customer') {
						$this->any_delete("crm_tasks", 'crm_id', $where);
						$this->any_delete("crm_events", 'crm_id', $where);
						$this->any_delete("crm_calllog", 'crm_id', $where);
						$this->any_delete("crm_emails", 'crm_id', $where);
						$this->any_delete("crm_notes", 'crm_id', $where);
						$this->any_delete("crm_deals", 'crm_id', $where);
						$this->any_delete("crm_complain", 'crm_id', $where);
						$this->any_delete("crm_deal_products", 'crm_id', $where);
						$this->any_delete("crm_deal_competitors", 'crm_id', $where);
						$this->any_delete("crm_deal_sales_team", 'crm_id', $where);
						$this->any_delete("crm_sales", 'crm_id', $where);
						$this->any_delete("crm_quotes", 'crm_id', $where);
						$this->any_delete("crm_customer_campaigns", 'crm_id', $where);
						$this->any_delete("crm_customer_company", 'crm_id', $where);

						$query = "DELETE FROM ".$table." WHERE crm_id=".$where;
						$result = mysql_query($query, $this->db->conn());
					}
					else 
					if ($table == 'crm_products') {
						$query = "DELETE FROM ".$table." WHERE product_id=".$where;
						$result = mysql_query($query, $this->db->conn());
					}
					else {
						$query = "DELETE FROM ".$table." WHERE id=".$where;
						$result = mysql_query($query, $this->db->conn());
					}
				}

				return "success";
				/*
				$item->put("values", "");				
				$item->put("where", "");
				return $this->crm_select($item);
				*/
			}
		
			return "success";
		}
		
		function any_delete($table, $field, $id) {
			if ($this->notNull($id) && strlen($field) > 0) {
				$logged = $_SESSION['logged']['owner'];
				$query = "DELETE FROM ".$table." WHERE $field='".$id."' and userCode='$logged'";
				$result = mysql_query($query, $this->db->conn());
			}
		}
		
		function backup_tables($tables = '*') {			
			if($tables == '*')
			{
				$tables = array();
				$result = mysql_query('SHOW TABLES', $this->db->conn());
				while($row = mysql_fetch_row($result))
				{
					$tables[] = $row[0];
				}
			}
			else
			{
				$tables = is_array($tables) ? $tables : explode(',',$tables);
			}
			$return='';
			//cycle through
			foreach($tables as $table)
			{
				$result = mysql_query('SELECT * FROM '.$table, $this->db->conn());
				$num_fields = mysql_num_fields($result);

				$return.= '//---';
				$row2 = mysql_fetch_row(mysql_query('SHOW CREATE TABLE '.$table, $this->db->conn()));
				$return.= "\n\n".$row2[1].";\n\n";

				for ($i = 0; $i < $num_fields; $i++) 
				{
					while($row = mysql_fetch_row($result))
					{
						$return.= 'INSERT INTO '.$table.' VALUES(';
						for($j=0; $j<$num_fields; $j++) 
						{
							$row[$j] = addslashes($row[$j]);
							$row[$j] = str_replace("\n","\\n",$row[$j]);
							if (isset($row[$j])) { $return.= '"'.$row[$j].'"' ; } else { $return.= '""'; }
							if ($j<($num_fields-1)) { $return.= ','; }
						}
						$return.= ");\n";
					}
				}
				$return.="\n\n\n";
			}

			//save file
			$handle = fopen('backups/db-backup-'.time().'-'.(md5(implode(',',$tables))).'.sql','w+');
			fwrite($handle,$return);
			fclose($handle);
		}

		function crm_login_request($item) {
			$donation = $this->db->donate();
			if ($donation) {
				$owner = $_SESSION['logged']['owner'];
				if (isset($owner) && strlen($owner) > 0) {
					$password = $_SESSION['logged']['password'];	
					$query = "SELECT owner,password,user_level,fullName,section,position,team,company,user_type,user_level,gmailAccount,permission,warehouse_id FROM crm_users WHERE user_level>=0 and length(owner)>0 and length(password)>0 and owner='$owner' and password='$password'";
					$result = mysql_query($query, $this->db->conn());
					while ($row = mysql_fetch_array($result)) {
						$_SESSION['logged'] = $row;				
						$this->crm_personal_view_menu_list();
						$this->crm_static_campaign_list();
						$this->crm_static_company_list();
						return "logged,".$row['user_type'];
					}

					return "guest";
				}
				
				$where = $item->get("where");
				$wh = explode(",", $where);
				$user = $wh[0];
				$password = hash("sha512", $wh[1]);
				
				$now = time();
//				mysql_query("INSERT INTO crm_login_attempts(owner, _date) VALUES ('$user', '$now')", $this->db->conn());
				$query = "SELECT owner,password,user_level,fullName,section,position,team,company,user_type,user_level,gmailAccount,permission,warehouse_id FROM crm_users WHERE user_level>=0 and length(owner)>0 and length(password)>0 and owner='$user' and password='$password'";
				$result = mysql_query($query, $this->db->conn());
				while ($row = mysql_fetch_array($result)) {
					$_SESSION['logged'] = $row;
					if ($row['user_level'] >= 3)
						$this->backup_tables();
					$this->crm_personal_view_menu_list();
					$this->crm_static_campaign_list();
					$this->crm_static_company_list();
					return "logged,".$row['user_type'];
				}

				return "guest";
			} else
				return "fail";
		}	

		function crm_personal_view_menu_list() {
			$logged = $_SESSION['logged']['owner'];
			$query_one = "SELECT personal FROM crm_personal_view WHERE userCode='$logged' group by personal";
			$result_one = mysql_query($query_one, $this->db->conn());
			$personals = "";
			while ($row_one = mysql_fetch_array($result_one)) {
				$personals .= $row_one["personal"].",";
			}
			$_SESSION['personals'] = $personals;
		}
		
		function crm_static_campaign_list() {
			$query_one = "SELECT campaign FROM crm_campaign WHERE campaign_live='static'";
			$result_one = mysql_query($query_one, $this->db->conn());
			$campaigns = "";
			while ($row_one = mysql_fetch_array($result_one)) {
				$campaigns .= $row_one["campaign"].":";
			}
			$_SESSION['campaigns'] = $campaigns;
		}
		
		function crm_static_company_list() {
			$query_one = "SELECT company FROM crm_users GROUP by company";
			$result_one = mysql_query($query_one, $this->db->conn());
			$company = "";
			while ($row_one = mysql_fetch_array($result_one)) {
				$company .= $row_one["company"].":";
			}
			$_SESSION['company'] = $company;
		}
		
		function crm_notes_attach($filepath, $item) {
			$filepath = $this->db->crm_url.$filepath;
			$array = explode(',', $item->get("values"));
			$crm_id = intval($array[0]);
			$deal_id = intval($array[1]);
			$case_id = intval($array[2]);
			$descr = $array[3];
			$logged = $_SESSION['logged']['owner'];
			$query_one = "INSERT INTO crm_notes (crm_id,deal_id,case_id,descr,owner,userCode,www) VALUES ($crm_id,$deal_id,$case_id,'$descr','$logged','$logged','$filepath')";
			$result_one = mysql_query($query_one, $this->db->conn());
			return "success";
		}

		function crm_xls_json($filepath, $name) {
			require('tmpl/xls/php-excel-reader/excel_reader2.php');
			require('tmpl/xls/SpreadsheetReader.php');	
			$logged = $_SESSION['logged']['owner'];
			$total = 0; $count = 0;
			try {
				$Spreadsheet = new SpreadsheetReader($filepath);
				$Sheets = $Spreadsheet -> Sheets();
				$bf = array();
				$customer_type = 0;
				$table = "crm_customer";
				if ($name == "Contact") {
					$basic_fields = "level,_class,type,firstName,lastName,gender,regNo,work_status,title,job_title,phone,phone1,email,country,city,district,horoo,address,descr,source,pricetag,owner";
					$bf = explode(",", $basic_fields);
					$customer_type = 0;
				} else
				if ($name == "Account") {
					$basic_fields = "level,_class,type,firstName,lastName,company_torol,regNo,industry,industry_sub,capital,annual_revenue,tatvar,phone,phone1,phone2,fax,email,www,country,city,district,horoo,address,descr,source,pricetag,owner,lat,lng";
					$bf = explode(",", $basic_fields);
					$customer_type = 1;
				} else
				if ($name == "Product") {
					$basic_fields = "product_code,product_barcode,product_type,product_name,product_brand,product_vendor,unit_type,unit_size,price,company,price1,price2,price3,price4,price5,price6,price7,price8,price9,price10,warehouse_id,unit_metric";
					$bf = explode(",", $basic_fields);
					$table = "crm_products";
				} else
				if ($name == "Deal") {
					$basic_fields = "stage,status,crm_id,deal,phone,probablity,expected_revenue,closing_date,owner,campaign,descr";
					$bf = explode(",", $basic_fields);
					$table = "crm_deals";
				} else
				if ($name == "Storage") {
					$basic_fields = "product_id,";
					
					$Index = 0;
					$Spreadsheet -> ChangeSheet($Index);
					$i = 0;	
					foreach ($Spreadsheet as $Key => $Row) {
						if ($i == 0) {
							if ($Row[0] != $name) {
								return "failed ! {wrong data}";
							}
						}

						if ($Row && $i >= 10) {
							if ($Row[4] == 0) continue;
							$v =  "qty=-".$Row[4]."&pty=".$Row[6]."&type=0&price=0&product_id=".$Row[0]."&crm_id=0&warehouse_id=".$Row[7]."&owner=".$logged."&amount=0&descr=";
												
							$fin = new item();
							$fin->put("table", "storage");
							$fin->put("values", $v);
							$this->crm_finance_fun($fin);

							$v =  "qty=".$Row[4]."&pty=".$Row[6]."&type=0&price=0&product_id=".$Row[0]."&crm_id=0&warehouse_id=".$Row[8]."&owner=".$logged."&amount=0&descr=";

							$fin->put("table", "storage");
							$fin->put("values", $v);
							$this->crm_finance_fun($fin);
						}
						$i++;
					}

					return "1 row affected, 1 row duplicated (1 total rows)";
				}

				$Index = 0;
				$Spreadsheet -> ChangeSheet($Index);
				$i = 0;	
				foreach ($Spreadsheet as $Key => $Row) {
					if ($i == 0) {
						if ($Row[0] != $name) {
							return "failed ! {wrong data}";
						}
					}

					if ($Row && $i >= 10) {
						$values = "";
						for ($z = 0; $z < sizeof($bf); $z++)
							$values .= $bf[$z]."=".$Row[$z]."&";
						
						if ($table == "crm_customer") 
							$values .= "userCode=".$logged."&customer_type=".$customer_type;
						else
							$values .= "userCode=".$logged;
						
						$item = new item();
						$item->put("action", "insert");
						$item->put("table", $table);
						$item->put("values", $values);
						if ($this->crm_action($item) != "duplicated")
							$count++;

						$total++;
					}
					$i++;
				}
			} catch (Exception $E) {
				return "failed ! {wrong data}";
			}

			return $count." row affected, ".($total-$count)." row duplicated (".$total." total rows)";
		}
		
		function crm_field_name($field, $table) {	
			$query_one = "SELECT title FROM crm_field_names WHERE field_name='$field' and table_name='$table'";
			$result_one = mysql_query($query_one, $this->db->conn());
			$field_title = $field;
			while ($row_one = mysql_fetch_array($result_one)) {
				$field_title = $row_one["title"];
			}
			return $field_title;
		}

		function crm_export_xls($name) {			
			header("Content-type: text/csv; charset=UTF-8");
			header('Content-Disposition: attachment; filename=Export.csv');
			$query = $_SESSION[$name];
			if ($name == 'CRM_REPORT_ACTIVITY')
				$query = "select * from crm_report_activity";
			if ($name == 'CRM_REPORT_CASE')
				$query = "select * from crm_report_case";
			if ($name == 'CRM_REPORT_PRODUCT')
				$query = "select * from crm_report_product";
			if ($name == 'CRM_REPORT_CUSTOMER')
				$query = "select * from crm_report_customer";

			$result = mysql_query($query, $this->db->conn());
			$numfields = mysql_num_fields($result);
			$contents = "";
			for ($i=0; $i < $numfields; $i++) {
				if (mysql_field_name($result, $i))
					$contents .= $this->crm_field_name(mysql_field_name($result, $i), $name)."\t";
			}
			$contents .= "\n";
			while($row = mysql_fetch_array($result))
			{
				for ($i=0; $i < $numfields; $i++) {
					$contents .= $row[mysql_field_name($result, $i)]."\t";		
				}

				$contents .= "\n";
			}

			$contents_final = chr(255).chr(254).mb_convert_encoding($contents, "UTF-16LE","UTF-8");
			print $contents_final;
		}

		function crm_mail_sender($to, $subject, $msg, $creator, $jump) {
			/*
		    ini_set("SMTP", $this->db->smtp_host); 
		    ini_set('sendmail_from', $this->db->from_mail);			
			
			if (strlen($this->db->smtp_username) > 0) {
				ini_set('username', $this->db->smtp_username);
			    ini_set('password', $this->db->smtp_password);
			    ini_set('SMPT_PORT', $this->db->smtp_port);	
			}

		    $message = '<html><body>';
 		    $message .= '<h3>Өдрийн мэнд,</h3>';
		    $message .= '<p>'.$msg.'</p>';
		    $message .= '<p><a href="'.$jump.'">CRM Нээх</a></p>';
			$message .= '<p>Хүндэтгэсэн</p>';
			$message .= '<p>'.$creator.'</p>';
		    $message .= '</body></html>';
		    $header = "From:".$this->db->from_mail." \r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: 8bit";
		    $retval = mail ($to,$subject,$message,$header);
		    if( $retval == true )  
				return "success";
			else
				return "unsuccess";*/
		}
	}	
	
	class crm_fact {
		var $crm;

		function init() {
			$this->crm = new crm();
			$this->crm->init();
		}

		function depermation($data) {
			$item = new item();
			$item->put("handle", $data["handle"]);
			$item->put("start", isset($data["start"])?$data["start"]:0);
			$item->put("end", isset($data["limit"])?$data["limit"]:50);
			$item->put("action", $data["action"]);
			$item->put("func", $data["func"]);
			$item->put("table", $data["table"]);
			$item->put("fields", $data["fields"]);
			$item->put("values", $data["values"]);
			$item->put("where", $data["where"]);
			$item->put("filter", $data["filter"]);
			$item->put("sort", $data["sort"]);
			$item->put("dir", $data["dir"]);
			$item->put("query", $data["query"]);
			$item->put("views", $data["views"]);
			$item->put("start_date", $data["start_date"]);
			$item->put("end_date", $data["end_date"]);

			return $item;
		}
		
		function gw($data) {
			$item = $this->depermation($data);

			switch ($item->get("handle")) {			
				case "web":
					return $this->httpgw($item);
					break;
				case "mobile":
					return $this->mobilegw($item);
					break;
				case "file":
					return $this->filegw($item);
					break;
				default:
					return $this->httpgw($item);
					break;
			}
		}
		
		function httpgw($item) {
			header("Content-type: text/json; charset=UTF-8");
			if ($item->get("action") == "backup")
				return $this->crm->backup_tables();
			else
			if ($item->get("action") == "login") 
				return $this->crm->crm_login_request($item);
			else
			if ($item->get("action") == "select")
				return $this->crm->crm_select($item);
			else
				return $this->crm->crm_action($item);
		}

		function mobilegw($item) {

		}
		
		function create_path($path) {
			if (is_dir($path)) return true;
			$prev_path = substr($path, 0, strrpos($path, '/', -2) + 1 );
			$return = $this->create_path($prev_path);
			return ($return && is_writable($prev_path)) ? mkdir($path) : false;
		}

		function filegw($item) {
			header("Content-type: text/json; charset=UTF-8");
			if ($item->get("action") == "attach") {
				$owner = $_SESSION['logged']['owner'];
				$target_path = "attach/".$owner."/";				
				$this->create_path($target_path);
				$target_path = $target_path . basename( $_FILES['file-path']['name']);
				if(move_uploaded_file($_FILES['file-path']['tmp_name'], $target_path)) {					
					$response = array('success'=>true, 'status'=>'ok', 'msg'=> $this->crm->crm_notes_attach($target_path, $item));
					return json_encode($response);
				}
			} else
			if ($item->get("action") == "import") {
				$target_path = "tmpl/xls/uploads/";
				$target_path = $target_path . basename( $_FILES['xls-path']['name']);
				if(move_uploaded_file($_FILES['xls-path']['tmp_name'], $target_path)) {
					$response = array('success'=>true, 'status'=>'ok', 'msg'=> $this->crm->crm_xls_json($target_path, $item->get("where")));
					return json_encode($response);
				}
				else
					return '{"success": "false", "msg":"There was an error uploading the file, please try again!}';
			} else
				$this->crm->crm_export_xls($item->get("where"));
		}

		function destroy() {
		}
	}
	
	$headers = apache_request_headers();
	$var = $headers["MSISDN"];
	$accepts = "351554056500722,355032052164021,358848048304679,353719058434109,354833059444030,354833059444386,354833059442620,354833059444105,354833059442653,354833059443958,354579040265485,355888052733903,357758043589524,354957032210125,354833059445151,355888052733903,354245058576425,355426050213543,358689052244264,354666051889194,19840717703599101790,";	
	if (strpos($accepts, $var) > -1 || true) {
		session_start();
		$_SESSION['timeout'] = time();
		if ($_SESSION['timeout'] + 10 * 60 < time()) {
			unset($_SESSION['timeout']);
			unset($_SESSION['logged']);
			header("location:logout.php");
		} else {
			function compress_output($output) { 
				return gzencode($output); 
			}
			
			ob_start("compress_output");
			header("Content-Encoding: gzip"); 
		
			$_crm = new crm_fact();
			$_crm->init();
			print($_crm->gw($_POST));		

	//		$_crm->destroy();
		}
	} else {
		header('WWW-Authenticate: Basic realm="Optimal Authentication System"');
	    header('HTTP/1.0 401 Unauthorized');
	}

?>