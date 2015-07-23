var express = require('express');
var router = express.Router();
var mandrill = require('mandrill-api');
var config = require('../config/index');


/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Express' });
});


router.get('/contact', function(req, res) {
	res.render('index', { title: 'Express' });
});


router.post('/contact', function(req, res) {

	var mandrill_client = new mandrill.Mandrill(config.mandrill.key);
	var name = req.body.name;
	var email = req.body.email;
	var postMessage = req.body.message;

	var message = {
		'html': 'Name: <strong>' + name + '</strong><br>' + 'Email address: <strong>'  + email + '</strong><br><br><br>' + postMessage ,
		'subject': 'Andy Aparece Website Form Submission',
		'from_email': email,
		'from_name': name,
		'to': [{
			'email': config.mandrill.email_to,
			'name': config.mandrill.email_to_name       
		}],
		'headers': {
			'Reply-To': email
		},
		'track_opens': true,
		'track_clicks': true,
		'auto_text': true
	};

	mandrill_client.messages.send({'message': message}, function(result) {
		console.log(result);

	}, function(e) {
		// Mandrill returns the error as an object with name and message keys
		console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
		// A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
	});

	res.redirect('/');
});

module.exports = router;
