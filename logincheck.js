var MongoClient = require('mongodb').MongoClient;
var jwt = require('jsonwebtoken');
require('dotenv').config()
var mongoUrl = process.env.MONGO_URL;
module.exports.login_check = function (params, callback) {
	MongoClient.connect(mongoUrl, function (err, db) {
		if (err) {
			console.log("Unable to connect to the mongoDB server. Error:" + err);

		}
		else {
			console.log("Mongo DB is connected !!!");
			var collection = db.collection('userscollection');
			console.log(params.details);
			if (params.details.email == '' || params.details.password == '') {
				var data = { "Message": "please include the email and password inside your input model", "status": "400" }
				callback(data);
			}
			else {
				collection.find({ "email": params.details.email }).toArray(function (err, result) {
					if (err) {
						console.log(err)
						var data = { "Message": err, "status": "500" }
						callback(data);
					}
					else {
						console.log(result);
						for (var i = 0; i < result.length; i++) {
							if (result[i].password === params.details.password) {
								var token = jwt.sign({
									data: params.details.email
								}, 'secret');
								console.log(token);
								var Message = {
									"result": result[i],
									"token": token
								}
								var data = { "Message": Message, "status": "200" }
								callback(data);
								break;
							}
							else {
								var data = { "Message": "Documents are not found", "status": "400" }
								callback(data);
							}
						}


					}
				})


			}

		}
	});
}
