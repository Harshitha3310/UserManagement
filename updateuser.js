var MongoClient = require('mongodb').MongoClient;
var jwt = require('jsonwebtoken');
require('dotenv').config()
var mongoUrl = process.env.MONGO_URL;
module.exports.update_check = function (params, callback) {
	MongoClient.connect(mongoUrl, { useNewUrlParser: true }, function (err, db) {
		if (err) {
			console.log("Unable to connect to the mongoDB server. Error:" + err);

		}
		else {
			console.log("Mongo DB is connected !!!");
			var collection = db.collection('userscollection');
			console.log(params.details);
			// if (params.details.email == '') {
			// 	var data = { "Message": "please include the email and password inside your input model", "status": "400" }
			// 	callback(data);
			// }
			// else {
			// var decoded = jwt.verify(params.details.token, 'secret');
			// console.log(decoded.data)
			collection.find({ "email": params.details }).toArray(function (err, result) {
				if (err) {
					console.log(err)
					var data = { "Message": err, "status": "500" }
					callback(data);
				}
				else {
					if (result.length > 0) {
						console.log(result);
						if (result[0].role == "admin") {
							console.log("IFFFFFFFFFFFFF")
							//console.log(params.details.altemail);
							collection.find({ "email": params.info.altemail }).toArray(function (err, result) {
								if (err) {
									console.log(err)
									var data = { "Message": err, "status": "500" }
									callback(data);
								}
								else {
									console.log(result);
									if (result.length > 0) {
										//console.log(result);
										//var document = result;
										// document.uname = params.info.uname,
										// 	document.url = params.info.url,
										// 	document.number = params.info.number
										collection.update({ "email": params.info.altemail }, { $set: { "uname": params.info.uname, "url": params.info.url, "number": params.info.number } }, function (err, result) {
											if (err) {
												console.log(err)
											}
											else {
												console.log(result);
												var data = { "Message": "Document updated successfully", "status": "200" }
												callback(data);
											}
										});


									}
									else {
										//console.log(result);
										var data = { "Message": "no docs are found", "status": "200" }
										callback(data);
									}

								}
							})
						}
						else {
							// var document = result;
							// document.uname = params.info.uname,
							// 	document.url = params.info.url,
							// 	document.number = params.info.number
							// collection.update({ "email": params.info.altemail }, { $set: { "uname": params.info.uname, "url": params.info.url, "number": params.info.number } }, function (err, result) {
							// 	if (err) {
							// 		console.log(err)
							// 	}
							// 	else {
							// 		console.log(result);
							// 		var data = { "Message": "Document updated successfully", "status": "200" }
							// 		callback(data);
							// 	}
							// });
							/* console.log(result[0]);
							var data ={"Message":result[0],"status":"200"}
			callback(data); */
							var data = { "Message": "You are not an admin", "status": "200" }
							callback(data);
						}
					}
					else {


						console.log(result[0]);
						var data = { "Message": "Documents are not found", "status": "200" }
						callback(data);
					}

				}
			})






		}

		// }
	});
}
