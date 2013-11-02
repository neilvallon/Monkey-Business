var currentKeyboard, m;
var running = false;
var caps = 0;
var bestMonkey = 0;

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
	for(var i=0; i<keyboard.length; i++){
		x += keyboard[i].probability;
		if(x >= target)
			return getChar(keyboard[i].keyset);
	}
	
	// JS will probably error out before it's able to reach this line.
	// Once fixed this will keep things running and skip a key on error.
	console.log('Error: Could not find key in');
	console.log(keyboard);
	return 'NULL';
};


var monkeyRun = function(){
	if(!running || m.foundString()) return;
	
	var rndChar = getChar(currentKeyboard.keyboard);
	rndChar = caps? rndChar.toUpperCase() : rndChar;
	
	switch(rndChar){
		case 'BACK':
			m.backspace();
			break;
		case 'CAPS':
			caps ^= true;
			break;
		case 'NULL':
			break;
		default:
			m.typeChar(rndChar);
			break;
	}
	
	refreshOutput();
	setTimeout(monkeyRun, 10);	
};


var typeMonkeyType = function(){
	if(m == null){
		var text = $("#inputText").val();
		text = currentKeyboard.filter(text);
		
		m = new Monkey(text.split(''), 50);
	}
	
	monkeyRun();
};


$(document).ready(function(){
	// Generate Keyboard Options
	$.each(keyboards, function(key, value){
		$('#keyboards').append( $('<option>', {'value':key}).text(value.name) );
	});
	
	
	$("#keyboards").change(function() {
		currentKeyboard = keyboards[this.value];
	}); $("#keyboards").trigger("change");
	
	
	$("#startButton").click(function() {
		running ^= true;
		
		$("#startButton").text(running?'Stop':'Start');
		$('#inputText').attr('disabled', true);
		$('#keyboards').attr('disabled', true);
		
		typeMonkeyType();
	});
	
	
	$("#clear").click(function() {
		running = false;
		m = null;
		caps = 0;
		bestMonkey = 0;
		
		$("#startButton").text('Start');
		$("#raw").val('');
		$("#best").val('');
		$('#inputText').attr('disabled', false);
		$('#keyboards').attr('disabled', false);
	});
});
