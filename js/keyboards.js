var keyboards = {};

keyboards.miniKey = {name: 'Simplified (uniform/alpha-numeric)'};
keyboards.miniKey.keyboard = ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m','.',"\n",' '];
keyboards.miniKey.filter = function(text){
	return text.toLowerCase().replace(/[^a-z.\n ]/g, '');
};

keyboards.QWERTY = {name: 'QWERTY (probabilistic/full)'};
keyboards.QWERTY.keyboard = [
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
keyboards.QWERTY.filter = function(text){
	return text;
};
