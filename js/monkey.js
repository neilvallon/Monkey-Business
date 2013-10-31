var Monkey = function(goal, errTolerance){
	this.goal = goal;
	this.goalLen = goal.length;
	this.errTolerance = errTolerance;
	
	this.paper = [];
	this.correctKeys = 0;
};

Monkey.prototype.correctChars = function(){
	for(var i=0; i<this.goal.length; i++)
		if(this.paper[i] != this.goal[i])
			break;
	return i;
};

Monkey.prototype.foundString = function(){
	return this.goalLen == this.correctKeys;
};

Monkey.prototype.typeChar = function(key){
	this.paper.push(key);
	
	if(this.paper[this.correctKeys] == this.goal[this.correctKeys])
		this.correctKeys++;
	
	if((this.paper.length - this.correctKeys) > this.errTolerance){
		this.paper.shift();
		this.correctKeys = this.correctChars();
	}
};

Monkey.prototype.backspace = function(){
	if(this.correctKeys && this.paper.length <= this.correctKeys)
		this.correctKeys--;
	return this.paper.pop();
};

Monkey.prototype.toString = function(){
	return this.paper.join('');
};
