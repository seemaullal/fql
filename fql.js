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
	this.indexTable = { };

};

FQL.prototype.exec = function () {
	return this.table;
};

FQL.prototype.where = function (filters) {
	var results = [ ];
	var hasIndex = false;
	for (atr in filters) {
		if (this.getIndex(atr,filters[atr]) != undefined ) {
			hasIndex = true;
			var indices = this.getIndex(atr,filters[atr]);
			break;
		}
	}
	if (hasIndex) {
		for (var i=0; i<indices.length; i++) {
			var isMatch = true;
		 	var curr = this.table[indices[i]];
			for (atr in filters) {
				if (typeof filters[atr] === "function") {
					if (!filters[atr](this.table[indices[i]][atr]))
						isMatch=false;
				}
				else if (this.table[indices[i]][atr] !== filters[atr]) {
					isMatch = false;
				}
			}
			if (isMatch) {
				results.push(this.table[indices[i]]);
			}
	}
	}
	else {
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
				results.push(this.table[i]);
			}
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

FQL.prototype.select = function (columnNames) {
	var result = [ ];
	for (var i = 0, len = this.table.length; i<len; i++) {
		var tmpObj = { };
		for (var j =0; j < columnNames.length; j++) {
			if (this.table[i].hasOwnProperty(columnNames[j])) 
				tmpObj[columnNames[j]] = this.table[i][columnNames[j]];
		}
		result.push(tmpObj);
	}
	//console.log(result);
	return new FQL(result);


	// var newTable = this.exec().map( function(row) {
	// 	var newRow = {};
	// 	columnNames.forEach(function (colName) {
	// 		newRow[colName] = row[colName];
	// 	});
	// 	return newRow;
	// });
	// return new FQL(newTable);
};

FQL.prototype.order = function (columnName) {
	var sortedTable = this.exec().slice(); //shallow copy
	sortedTable.sort(function(obj1,obj2) {
		return obj1[columnName] - obj2[columnName];
	});
	return new FQL(sortedTable);
};

FQL.prototype.left_join = function(foreignFql, rowMatcher) {
	var currTable = this.exec();
	var results = [ ];
	var foreignTable = foreignFql.exec();
	for (var i=0; i < currTable.length; i++) {
		//results.push(currTable[i]);
		for (var j=0; j < foreignTable.length; j++) {
			if (rowMatcher(currTable[i],foreignTable[j])) {
				// if (!results.find(foreignTable[j]))
					results.push(merge(currTable[i],foreignTable[j]));
			}
		}
	}
	return new FQL(results);



};

FQL.prototype.addIndex = function(columnName) {
	var indexTable = { };
	var curr_tab = this.exec();
	for (var i=0, len= curr_tab.length; i<len; i++) {
		if (curr_tab[i].hasOwnProperty(columnName)) {
			if(indexTable[curr_tab[i][columnName]]) {
				indexTable[curr_tab[i][columnName]].push(i);
			}
			else {
				indexTable[curr_tab[i][columnName]] = [ i ];
			}
		}
	}
	this.indexTable[columnName] = indexTable;
};

FQL.prototype.getIndex = function(columnName, val) {
	if (!this.indexTable[columnName])
		return undefined;
	return this.indexTable[columnName][val];
};

