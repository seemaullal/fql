// Place your code here:

// Adds properties of obj2 into obj1
function merge(obj1, obj2) {

	var tmp = { };
	for (atr in obj1) {
		if (obj1.hasOwnProperty(atr)) 
			tmp[atr] = obj1[atr];
	}

	for (atr2 in obj2) {
		if (obj2.hasOwnProperty(atr2)) 
			tmp[atr2] = obj2[atr2];
	}
	return tmp;
}


function FQL(table) {
	this.table = table;

};

FQL.prototype.exec = function () {
	return this.table;
};

FQL.prototype.where = function (filters) {
	results = [ ];
	for (var i=0, len= this.table.length; i<len; i++) {
		var isMatch = true;
		for (atr in filters) {
			if (typeof filters[atr] === "function") {
				if (!filters[atr](this.table[i][atr]))
					isMatch=false;
			}
			else if (this.table[i][atr] !== filters[atr]) {
				isMatch = false;
			}
		//did not continue so it matches every attribute
		}
		if (isMatch) {
			console.log(this.table[i]);
			results.push(this.table[i]);
		}
	}
	
	return new FQL(results);
};

FQL.prototype.count = function () {
	return this.exec().length;
};

FQL.prototype.limit = function (amount) {
	var tmp = [ ];
	for (var i=0; i<amount; i++) {
		if (i=== this.table.length)
			return tmp; //don't go past the length of the table
		tmp.push(this.table[i]);
	}
	return new FQL(tmp);
};

FQL.prototype.select = function (columnNames) {};

FQL.prototype.nimit = function () {};

FQL.prototype.order = function (columnName) {};

FQL.prototype.left_join = function (foriegnFql, rowMatcher) {};

FQL.prototype.addIndex = function (columnName) {};

FQL.prototype.getInidicesOf = function (columnName, val) {};