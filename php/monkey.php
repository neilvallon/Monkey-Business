<?php
	function getContents($file){
		$filename = $file;
		$handle = fopen($filename, "rb");
		$contents = fread($handle, filesize($filename));		fclose($handle);
		return $contents;
	}
	
	function mkEasy(){
		global $text;
		$text = strtolower($text);
		$text = preg_replace('/[^a-z0-9\n\t. ]/', '', $text);
	}
	
	function genCharArray(){
		global $text, $charArray;
		$len = strlen($text);
		for($i=0;$i<$len;++$i){
			$char = substr($text, $i, 1);
			if(!in_array($char, $charArray)) $charArray[] = $char;
		}
		sort($charArray);
	}
	
	function getChar(){
		global $charArray, $fullKeyboard, $keyboard, $caps;
		if(!$fullKeyboard) return $charArray[mt_rand(0,sizeof($charArray)-1)];
		$keyCode = mt_rand(0, $keyboard['bar']['max']);
		foreach($keyboard as $key => $group){
			if($keyCode >= $keyboard[$key]['min'] && $keyCode <= $keyboard[$key]['max']){
				$character = is_array($keyboard[$key]['char'])?$keyboard[$key]['char'][mt_rand(0, sizeof($keyboard[$key]['char'])-1)]:$keyboard[$key]['char'];
				if($caps && $key == 'alphaNumL'){					$character = strtoupper($character);
				}
				echo $character;
				return $character;
			}
		}
	}
	
	$easy = true;
	$fullKeyboard = false;
	
	$text = getContents('hamlet.txt');
	
	if($easy) mkEasy($text);
	
	
	
	
	
	$low	= array('`','1','2','3','4','5','6','7','8','9','0','-','=','q','w','e','r','t','y','u','i','o','p','[',']','a','s','d','f','g','h','j','k','l',';',"'",'z','x','c','v','b','n','m',',','.','/');
	$high	= array('~','!','@','#','$','%','^','&','*','(',')','_','+','Q','W','E','R','T','Y','U','I','O','P','{','}','A','S','D','F','G','H','J','K','L',':','"','Z','X','C','V','B','N','M','<','>','?');
	$keyboard = array(
		'alphaNumL' => array('min' => 0, 'max' => 597, 'char' => $low),
		'space' => array('min' => 598, 'max' => 700, 'char' => ' '),
		'enter' => array('min' => 701, 'max' => 736, 'char' => "\n"),
		'back' => array('min' => 737, 'max' => 768, 'char' => 'BACK'),
		'caps' => array('min' => 769, 'max' => 795, 'char' => 'CAPS'),
		'tab' => array('min' => 796, 'max' => 817, 'char' => "\t"),
		'slash' => array('min' => 818, 'max' => 839, 'char' => '\\'),
		'alphaNumU' => array('min' => 840, 'max' => 892, 'char' => $high),
		'bar' => array('min' => 893, 'max' => 894, 'char' => '|'),
		);
		
		//print_r($keyboard);
	
	$charArray = array();
	if(!$fullKeyboard) genCharArray();
	
	
	
	
	$len = strlen($text);
	$maxCount = 0;
	for($i=0;$i<100000;++$i){
		//echo "\n\nNew Monkey\n";
		$currentCount = 0;
		$errors = 0;
		$caps = 0;
		for($x=0;$x<$len;++$x){
			$char = substr($text, $x, 1);
			$rndChar = getChar();
			
			switch($rndChar){
				case 'BACK':
					if($errors){
						$errors=0;
					}elseif($currentCount) --$currentCount;
					
					if($x) $x -= 2;
					continue 2;
					
				case 'CAPS':
					$caps = $caps^1;
					continue 2;
			}
			
			if($errors) break;
			if($char != $rndChar){
				++$errors;
				continue;
			}else ++$currentCount;
		}
		if($currentCount > $maxCount) $maxCount = $currentCount;
		//echo "\n".$currentCount."c";
	}
	
	
	//Report
	echo "\n\n\nYour monkey made it ".$maxCount." characters in.\n\n";
	
	echo substr($text, 0, $maxCount);
	
	//print_r($charArray);
	
	//echo $text;
?>