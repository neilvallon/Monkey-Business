//(c) 2011 - Neil Vallon
var easy, fullKeyboard, text, running, txtLen, maxCount, monkeyCount, caps, character, monkeysInBox;
var miniKey = ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m','.',"\n",' '];
var keyboard = [
		[0,		597,	['`','1','2','3','4','5','6','7','8','9','0','-','=','q','w','e','r','t','y','u','i','o','p','[',']','a','s','d','f','g','h','j','k','l',';',"'",'z','x','c','v','b','n','m',',','.','/']],
		[598,	700,	' '],
		[701,	736,	"\n"],
		[737,	768,	'BACK'],
		[769,	795,	'CAPS'],
		[796,	817,	"\t"],
		[818,	839, 	'\\'],
		[840,	892,	['~','!','@','#','$','%','^','&','*','(',')','_','+','Q','W','E','R','T','Y','U','I','O','P','{','}','A','S','D','F','G','H','J','K','L',':','"','Z','X','C','V','B','N','M','<','>','?']],
		[893,	894,	'|']];

function mt_rand(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


function setUp(){
	running = 0;
	maxCount = -1;
	monkeyCount = 0;
	caps = 0;
	$("#startButton").val('Start');
	$("#raw").val('');
	$("#stats").val('');
	$("#best").val('');
	$('#inputText').attr('disabled', false);
}


function typeMonkeyType(){
	$("#startButton").val(function (){ return ($("#startButton").val() == 'Start')?'Stop':'Start'; }); //Change Button
	$('#inputText').attr('disabled', true);
	
	text = $("#inputText").val();
	easy = $("#easy").is(':checked');
	monkeysInBox = $("#monkeyBox").val();
	fullKeyboard = easy?false:$("#fullKey").is(':checked');
	
	if(easy) text = text.toLowerCase().replace(/[^a-z.\n ]/g, '');
	txtLen = text.length;
	
	monkey();
}


function getChar(){
	if(!fullKeyboard) return miniKey[mt_rand(0,miniKey.length-1)];
	keyCode = mt_rand(0, keyboard[8][1]);
	$.each(keyboard, function(key, group){
		if(keyCode >= keyboard[key][0] && keyCode <= keyboard[key][1]){
			character = $.isArray(keyboard[key][2])?keyboard[key][2][mt_rand(0, keyboard[key][2].length-1)]:keyboard[key][2];
			if(caps && key == 0){ character = character.toUpperCase();}
			return false;
		}
	});
	return character;
}

function monkey(){
	if(!running) return;

		monkeyCount++;
		
		if(Math.ceil(monkeyCount/monkeysInBox) == monkeyCount/monkeysInBox)$("#raw").val(''); // alows more than one monkey into the bable also slows bable making it readable without slowing monkeys
		currentCount = -1;
		errors = 0;
		monkeyPress = '';
		//caps = 0;
		for(x=0;x<txtLen;++x){
			strChar = text.substr(x, 1);
			rndChar = getChar();
			
			$("#raw").val($("#raw").val()+rndChar);
			monkeyPress += rndChar;
			
			con=0;
			switch(rndChar){
				case 'BACK':
					if(errors){
						--errors;
					}else if(currentCount+1) --currentCount;
					x -= x?2:1;
					con=1;
					break;
					
				case 'CAPS':
					caps = caps^1;
					--x;
					con=1;
					break;
			}
			if(con) continue;
			
			if(errors >= 5) break;
			if(!errors && strChar == rndChar){
				++currentCount;
			}else ++errors;
		}
		
		if(currentCount > maxCount){
			maxCount = currentCount;
			$("#best").val('Monkey #'+monkeyCount+' - '+(maxCount+1)+' Letter'+(maxCount?'s':'')+'\n________________________\n'+monkeyPress);
		}

		out = monkeyCount+' Monkeys Created.\n'
		$("#stats").val(out);
		
		
		if(maxCount == txtLen-1){
			running = false;
			$("#startButton").val('Start');
		}

	setTimeout("monkey()",10);	
}

setUp();
