var MongoClient = require('mongodb').MongoClient;
var jwt = require('jsonwebtoken');
require('dotenv').config()
var mongoUrl = process.env.MONGO_URL;
module.exports.delete_check = function (params, callback) {
	MongoClient.connect(mongoUrl, { useNewUrlParser: true }, function (err, db) {
		if (err) {
			console.log("Unable to connect to the mongoDB server. Error:" + err);

		}
		else {
			console.log("Mongo DB is connected !!!");
			var collection = db.collection('userscollection');
			collection.find({ "email": params.details }).toArray(function (err, result) {
				if (err) {
					console.log(err)
					var data = { "Message": err, "status": "500" }
					callback(data);
				}
				else {
					if (result.length > 0) {
						console.log(result[0]);
						if (result[0].role == "admin") {
							collection.remove({ "email": params.info.altEmail }, function (err, result) {
								if (err) {
									console.log(err)
									var data = { "Message": err, "status": "500" }
									callback(data);
								}
								else {
									console.log(result);
									var data = { "Message": "Delete the Document", "status": "200" }
									callback(data);


								}
							})
						}
						else {
							var data = { "Message": "You dont have a permission to delete the document", "status": "200" }
							callback(data);
						}

					}
					else {
						console.log(result[0]);
						var data = { "Message": "You are not an admin", "status": "200" }
						callback(data);
					}

				}
			})


		}
	});
}
