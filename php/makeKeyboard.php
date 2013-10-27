<?php
	/*$keySize['shiftR']		= 46;
	$keySize['shiftL']		= 36;*/
	$acuracy = 1;
	$shiftSize					= 36+46;
	$keySize['alphaNumL']	= 13*46;
	$keySize['space']			= 103;
	$keySize['enter']			= 36;
	$keySize['back']			= 32;
	$keySize['caps']			= 27;
	$keySize['tab']			= 22;
	$keySize['slash']			= 22;
	
	$total	= $shiftSize;
	foreach($keySize as $value) $total += $value;

	$keySize['alphaNumU'] = round($keySize['alphaNumL'] * $shiftSize/$total);
	$keySize['bar'] = round($keySize['slash'] * $shiftSize/$total);
	
	if($acuracy > 1) foreach($keySize as &$value) $value *= $acuracy;
	
	print_r($keySize);
	
	
	
	
	
	
	
	array('`','1','2','3','4','5','6','7','8','9','0','-','=','q','w','e','r','t','y','u','i','o','p','[',']','a','s','d','f','g','h','j','k','l',';',"'",'z','x','c','v','b','n','m',',','.','/');
	array('~','!','@','#','$','%','^','&','*','(',')','_','+','Q','W','E','R','T','Y','U','I','O','P','{','}','A','S','D','F','G','H','J','K','L',':','"','Z','X','C','V','B','N','M','<','>','?');
	
	$running = 0;
	foreach($keySize as $key => $size){
		$keyMap[$key] = array('min' => $running, 'max' => $running+$keySize[$key]-1);
		$running += $keySize[$key];
	}
	
	foreach($keyMap as $key => $size) $keyMap[$key]['range'] = $keyMap[$key]['max']-$keyMap[$key]['min']+1;

	print_r($keyMap);
	
	
	
	//$keyboard = array();
	
	//$chars = array();
	
	//genk($chars, 7);
	
	//foreach($keyboard as $key) echo '\''.$key.'\','*/
?>