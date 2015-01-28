This implements some SQL like functions on Javascript arrays. Sample queries include:

*`moviesTable.where({rank: function (v) {return v > 8;}}).select(["id", "name"]).limit(3).exec();`
*`moviesTable.where({year: 2001, rank: function (v) {return v > 8;} })`

Functions include:
-`FQL(data)` //this creates an instance the FQL class with corresponding which includes all of the methods below
-`exec()` //this returns the data (data is represented as an array with objects for each data "row"  
-`where(filters)` //this is used for queries. The filters parameter is an object with column-names as keys and either data or 	functions as keys (see above for an example)  
-`count()` //this is similar to the SQL count function; it returns the number of rows in the table  
-`limit(num)` //this limits the rows returned to the number specified  
-`select(col_names)` //this only returns the indicated column names  
-`order(col_name)` //this orders the data based on the column specified  
-`left_join( otherFQL, rowMatcher)` //this is similar to left outer join in SQL; it is used to combineFQL classes  
-`addIndex(colName)` //similar to adding an index in SQL; useful for speeding up querying for large datasets  
-`getIndicesOf(colName,value)` //used to retrieve previously indexed data quickly  



