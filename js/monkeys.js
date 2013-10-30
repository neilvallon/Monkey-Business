//(c) 2011 - Neil Vallon
var easy, fullKeyboard, text, running, txtLen, maxCount, monkeyCount, caps, character, monkeysInBox;
var miniKey = ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m','.',"\n",' '];
var keyboard = [
	{
		'probability': 0.002,
		'keyset': '|'
	},
	{
		'probability': 0.024,
		'keyset': '\\'
	},
	{
		'probability': 0.024,
		'keyset': '\t'
	},
	{
		'probability': 0.034,
		'keyset': 'CAPS'
	},
	{
		'probability': 0.034,
		'keyset': 'BACK'
	},
	{
		'probability': 0.039,
		'keyset': '\n'
	},
	{
		'probability': 0.059,
		'keyset': ['~','!','@','#','$','%','^','&','*','(',')','_','+','Q','W','E','R','T','Y','U','I','O','P','{','}','A','S','D','F','G','H','J','K','L',':','"','Z','X','C','V','B','N','M','<','>','?']
	},
	{
		'probability': 0.115,
		'keyset': ' '
	},
	{
		'probability': 0.669,
		'keyset': ['`','1','2','3','4','5','6','7','8','9','0','-','=','q','w','e','r','t','y','u','i','o','p','[',']','a','s','d','f','g','h','j','k','l',';',"'",'z','x','c','v','b','n','m',',','.','/']
	}
];


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


// Asumtion made that input is always a string, an array of strings, or an array of JSON.
var getChar = function(keyboard){
	if(typeof keyboard === "string")
		return keyboard;
	
	var target = Math.random();
	if(typeof keyboard[0] === "string")
		return keyboard[Math.floor(target*keyboard.length)];
	
	var x = 0;
	for(i=0; i<keyboard.length; i++){
		x += keyboard[i].probability
		if(x >= target)
			return getChar(keyboard[i].keyset);
	}
};


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
			rndChar = getChar(fullKeyboard? keyboard:miniKey);
			rndChar = caps? rndChar.toUpperCase() : rndChar;
			
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
