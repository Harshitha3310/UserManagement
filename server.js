require('dotenv').config()
var http = require('http');
var express = require('express');
var app = express();
const server = http.createServer(app)
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept , Authorization ");
	next();
});
var jwt = require('jsonwebtoken');
var authfunction = require('./jwtverify.js')

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
  });
//=================================== LIST of APIS ==========================================//
var registerCheck = require('./registercheck.js');
var loginCheck = require('./logincheck.js');
var getallusersCheck = require('./getalluserscheck.js');
var getusersCheck = require('./getparticularuserinfo.js');
var deleteCheck = require('./deleteusercheck.js');
var updateCheck = require('./updateuser.js');

// =========================================== Register API =========================================//
app.post('/userdetails', function (request, response) {
	var details = request.body;
	details.role = "user";
	registerCheck.register_check({ details: details }, function (data) {
		console.log(data.Message);
		if (data.status == 200) {
			response.status(data.status).json({ "Message": data.Message })
		}
		else {
			response.status(data.status).json({ "Message": data.Message })
		}
	});
});
// =========================================== Login API =========================================//
app.post('/login', function (request, response) {
	var details = request.body;
	loginCheck.login_check({ details: details }, function (data) {
		console.log(data.Message);
		if (data.status == 200) {
			response.status(data.status).json(data.Message)
		}
		else if(data.status == 400){
			response.status(data.status).json(data.Message)
		}
		else{
			response.status(data.status).json({ "Message": data.Message })
		}
	});
})

// ======================================= Get All info API ========================================//
app.post('/getallusers', authfunction, function (request, response) {
	var details = request.body;
	//var headers = request.headers;
	console.log(details);
	console.log(request.token);
	var details = jwt.verify(request.token, 'secret');
	console.log(details.data)
	if (details) {
		getallusersCheck.getallusers_check({ details: details.data }, function (data) {
			console.log(data.Message);
			if (data.status == 200) {
				response.status(data.status).json(data.Message)
			}
			else {
				response.status(data.status).json({ "Message": data.Message })
			}
		});
	}
	else {
		res.status(500).json({ "Message": "Token is not valid" })
	}

})
// ======================================= Get particular user info API ========================================//
app.post('/getuserinfo', authfunction, function (request, response) {
	var info = request.body;
	var details = jwt.verify(request.token, 'secret');
	console.log(details.data)
	if (details) {
		getusersCheck.getusers_check({ details: details.data, info: info }, function (data) {
			console.log(data.Message);
			if (data.status == 200) {
				response.status(data.status).json(data.Message)
			}
			else {
				response.status(data.status).json({ "Message": data.Message })
			}
		});
	}

	else {
		res.status(500).json({ "Message": "Token is not valid" })
	}
})
// ======================================= Delete API ========================================//
app.post('/deleteuser', authfunction, function (request, response) {
	var info = request.body;
	console.log(info)
	var details = jwt.verify(request.token, 'secret');
	console.log(details.data)
	if (details) {
		deleteCheck.delete_check({ details: details.data, info: info }, function (data) {
			console.log(data.Message);
			if (data.status == 200) {
				response.status(data.status).json({ "Message": data.Message })
			}
			else {
				response.status(data.status).json({ "Message": data.Message })
			}
		});
	}
	else {
		res.status(500).json({ "Message": "Token is not valid" })
	}

})
// ======================================= Delete API ========================================//
app.post('/updateuser', authfunction, function (request, response) {
	var info = request.body;
	var details = jwt.verify(request.token, 'secret');
	console.log(details.data)
	if (details) {
		updateCheck.update_check({ details: details.data, info: info }, function (data) {
			console.log(data.Message);
			if (data.status == 200) {
				response.status(data.status).json({ "Message": data.Message })
			}
			else {
				response.status(data.status).json({ "Message": data.Message })
			}
		});
	}
	else {
		res.status(500).json({ "Message": "Token is not valid" })
	}
})


server.listen( process.env.PORT || 5000, function () {
	console.log(`Server is running at ${process.env.PORT} || 5000 ` );
})