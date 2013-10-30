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
	m = new Monkey(text.split(''), 5);
	easy = $("#easy").is(':checked');
	monkeysInBox = $("#monkeyBox").val();
	fullKeyboard = easy?false:$("#fullKey").is(':checked');
	
	if(easy) text = text.toLowerCase().replace(/[^a-z.\n ]/g, '');
	txtLen = text.length;
	
	monkeyRun();
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

var m;
var bestM = 0;
var monkeyRun = function(){
	if(!running || m.foundString()) return;
	
	var rndChar = getChar(fullKeyboard? keyboard:miniKey);
	rndChar = caps? rndChar.toUpperCase() : rndChar;
	
	switch(rndChar){
		case 'BACK':
			m.backspace();
			break;
		case 'CAPS':
			caps = caps^1;
			break;
		default:
			m.typeChar(rndChar);
			break;
	}
	
	$("#raw").val(m);
	
	if(m.correctKeys > bestM){
		bestM = m.correctKeys;
		$("#best").val(m);
		$("#best").val(bestM + ' Letter(s)\n________________________\n' + m);
	}
	
	setTimeout("monkeyRun()", 10);	
};

setUp();

$(document).ready(function(){
	$("#easy").click(function() {
		$('#fullKey').attr('disabled', this.checked)
	});
	
	$("#startButton").click(function() {
		running ^= 1;
		typeMonkeyType();
	});
	
	$("#clear").click(function() {
		setUp();
	});
});
