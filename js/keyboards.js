var keyboards = {};

keyboards.miniKey = {name: 'Simplified (uniform/alpha-numeric)'};
keyboards.miniKey.keyboard = ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m','.',"\n",' '];
keyboards.miniKey.filter = function(text){
	return text.toLowerCase().replace(/[^a-z.\n ]/g, '');
};


/**
 * New Probabilities are calculated from keysizes on this layout:
 * http://www.wasdkeyboards.com/media/keycap_layout.jpg
 * 
 * Main area size:
 * 75
 * Without modifier keys:
 * 75 - (1.25 * 7) = 66.25
 */
keyboards.QWERTY = {name: 'QWERTY (probabilistic/full)'};
keyboards.QWERTY.keyboard = [
	{
		'probability': 1.75 / 66.25,
		'keyset': 'CAPS'
	},
	{
		'probability': 2 / 66.25,
		'keyset': 'BACK'
	},
	{
		'probability': 2.25 / 66.25,
		'keyset': '\n'
	},
	{
		'probability': (1.5 * 2) / 66.25,
		'keyset': ['\t', '\\']
	},
	{
		'probability': (2.25 + 2.75) / 66.25,
		'keyset': 
			[{
				'probability': 1.5 / 66.25,
				'keyset': '|'
			},
			{
				'probability': 18.75 / 66.25, // non character key pressed
				'keyset': 'NULL'
				
			},
			{
				'probability': 46 / 66.25,
				'keyset': ['~','!','@','#','$','%','^','&','*','(',')','_','+','Q','W','E','R','T','Y','U','I','O','P','{','}','A','S','D','F','G','H','J','K','L',':','"','Z','X','C','V','B','N','M','<','>','?']
			}]
	},
	{
		'probability': 6.25 / 66.25,
		'keyset': ' '
	},
	{
		'probability': 46 / 66.25,
		'keyset': ['`','1','2','3','4','5','6','7','8','9','0','-','=','q','w','e','r','t','y','u','i','o','p','[',']','a','s','d','f','g','h','j','k','l',';',"'",'z','x','c','v','b','n','m',',','.','/']
	}
];
keyboards.QWERTY.filter = function(text){
	return text;
};
