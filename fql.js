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


var FQL = function(table) {
};

FQL.prototype.exec = function () {};

FQL.prototype.where = function (filters) {};

FQL.prototype.count = function () {};

FQL.prototype.limit = function (amount) {};

FQL.prototype.select = function (columnNames) {};

FQL.prototype.nimit = function () {};

FQL.prototype.order = function (columnName) {};

FQL.prototype.left_join = function (foriegnFql, rowMatcher) {};

FQL.prototype.addIndex = function (columnName) {};

FQL.prototype.getInidicesOf = function (columnName, val) {};