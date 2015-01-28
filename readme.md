This implements some SQL like functions on Javascript arrays. Sample queries include:

moviesTable
                    .where({rank: function (v) {return v > 8;}})
                    .select(["id", "name"])
                    .limit(3)
		    .exec();
