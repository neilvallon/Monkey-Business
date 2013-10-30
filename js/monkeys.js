//(c) 2011 - Neil Vallon
var currentKeyboard, m, bestMonkey, running, caps;

function setUp(){
	running = false;
	caps = 0;
	bestMonkey = 0;
	
	$("#startButton").val('Start');
	$("#raw").val('');
	$("#stats").val('');
	$("#best").val('');
	$('#inputText').attr('disabled', false);
	$('#keyboards').attr('disabled', false);
}


function typeMonkeyType(){
	$("#startButton").val(function (){ return ($("#startButton").val() == 'Start')?'Stop':'Start'; }); //Change Button
	$('#inputText').attr('disabled', true);
	$('#keyboards').attr('disabled', true);
	
	var text = $("#inputText").val();
	m = new Monkey(text.split(''), $("#babbleLen").val());
	
	monkeyRun();
}


var refreshOutput = function(){
	$("#raw").val(m);
	
	if(m.correctKeys > bestMonkey){
		bestMonkey = m.correctKeys;
		$("#best").val(m);
		$("#best").val(bestMonkey + ' Letter(s)\n________________________\n' + m);
	}
};

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


var monkeyRun = function(){
	if(!running || m.foundString()) return;
	
	var rndChar = getChar(currentKeyboard);
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
	
	refreshOutput();
	setTimeout("monkeyRun()", 10);	
};

setUp();

$(document).ready(function(){
	// Generate Keyboard Options
	$.each(keyboards, function(key, value){
		$('#keyboards')
			.append( $('<option>', {'value':key}).text(value.name) );
	});
	
	$("#keyboards").change(function() {
		currentKeyboard = keyboards[this.value].keyboard;
	});
	$("#keyboards").trigger("change");
	
	$("#startButton").click(function() {
		running ^= 1;
		typeMonkeyType();
	});
	
	$("#clear").click(function() {
		setUp();
	});
});
