var MongoClient = require('mongodb').MongoClient;
var jwt = require('jsonwebtoken');
require('dotenv').config()
var mongoUrl = process.env.MONGO_URL;
module.exports.getusers_check = function (params, callback) {
	MongoClient.connect(mongoUrl, { useNewUrlParser: true }, function (err, db) {
		if (err) {
			console.log("Unable to connect to the mongoDB server. Error:" + err);

		}
		else {
			console.log("Mongo DB is connected !!!");
			var collection = db.collection('userscollection');
			collection.find({ "email": params.info.email }).toArray(function (err, result) {
				if (err) {
					console.log(err)
					var data = { "Message": err, "status": "500" }
					callback(data);
				}
				else {
					var data = { "Message": result, "status": "200" }
					callback(data);

				}
			})


		}


	});
}
