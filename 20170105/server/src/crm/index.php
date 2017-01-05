<?php
	session_start();
	$logged = $_SESSION['logged'];
	$owner = $logged['owner'];
	$company = $logged['company'];
	$gmailAccount = $logged['gmailAccount'];
	$userType = $logged['user_type'];
	$user_level = $logged['user_level'];
	$personals = $_SESSION['personals'];
	$campaigns = $_SESSION['campaigns'];
	$company = $_SESSION['company'];
	$permissions = $logged['permission'].",";
	$pk = $_GET['pk'];
	$token = '';
	if (!isset($pk)) $pk = 'dashboard';
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml"  dir="ltr">
<head>
	<meta charset="utf-8">
	<meta name="description" content="crm">
	<meta http-equiv="X-UA-Compatible" content="IE=8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">	
	<title>ОПТИМАЛ ERP 2.0 [<?=$owner?>]</title>

	<script>
		var logged = '<?=$owner?>';
		var company = '<?=$company?>';
		var gmailAccount = '<?=$gmailAccount?>';
		var userType = '<?=$userType?>';
		var user_level = '<?=$user_level?>';
		var personals = '<?=$personals?>';
		var campaigns_static = '<?=$campaigns?>';
		var company = '<?=$company?>';
		var permissions = '<?=$permissions?>';
		var pk = '<?=$pk?>';
		var token = '<?=$token?>';
	</script>
	<link rel="shortcut icon" href="fav-icon.png" type="image/png"/>
	<link rel="stylesheet" type="text/css" href="css/animated-dataview.css" />
	<script type="text/javascript" src="shared/include-ext.js"></script>
	<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3&sensor=false"></script>
	<link rel="stylesheet" type="text/css" href="css/css.css" />	
	
	<?
		if ($owner) {?>
		<style>
			.x-form-item, .x-form-field {
				font-size: 12px;
			}
		</style>
		<?}
	?>
</head>
<body>
	<div id="loading" class="loading">
	</div>


	<div class="way" id="way">
		<div class="paste">
			<img src="images/paste.png" style="display: block; margin: 0 auto;"/>
		</div>		
	</div>
</body>
</html>
