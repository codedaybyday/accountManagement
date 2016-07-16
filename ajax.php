<?php
	//echo empty($_POST)?false:true;
	$result = array();
	if(empty($_POST)){
		$result['status'] = false;
	}else{
		$result['status'] = true;
		$result['data'] = $_POST;
	}
	echo json_encode($result);
?>