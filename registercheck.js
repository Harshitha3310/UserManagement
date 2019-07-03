var MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
var mongoUrl = process.env.MONGO_URL;
module.exports.register_check = function (params, callback) {
	MongoClient.connect(mongoUrl, function (err, db) {
		if (err) throw err;
		else {

			var collection = db.collection('userscollection');
			if (params.details == '') {
				var data = { "Message": "please include the details inside your input model", "status": "400" }
				callback(data);
			}
			else {


				collection.insert(params.details, function (err, result) {
					if (err) {
						console.log(err)
						var data = { "Message": err, "status": "500" }
						callback(data);
					}
					else {
						var data = { "Message": "Data Inserted Successfully", "status": "200" }
						callback(data);
					}


				})

			}

		}
		
	});
}
