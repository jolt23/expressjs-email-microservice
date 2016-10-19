var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

var smptHostUrl = 'test@test.com';
var smptUsername = 'test';
var smptPassword = 'test';

var smtpConfig = {
    host: smptHostUrl,
    port: 465,
    secure: true, // use SSL
    auth: {
        user: smptUsername,
        pass: smptPassword,
      }
  };

var transporter = nodemailer.createTransport(smtpConfig);

/* POST email listener.
    {
      "from":"xxx@xxx.xxx",
      "name":"XXXXX",
      "message":"XXXXX"
    }
*/
router.post('/', function(req, res, next) {
  var validation = isValid(req);

  if (validation.length === 0) {
    var sender = req.body.from;
    var name = req.body.name;
    var message = req.body.message;

    var mailOptions = {
        from: sender,
        to: 'test@test.com',
        subject: 'Email Microservice Test',
        text: message,
      };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          return console.log(error);
        }

        console.log('Message sent: ' + info.response);
      });
  }

  var response = {
    errors: validation,
    email: req.body
  };

  res.json(response);
});

function isValid(req) {
  var validation = [];

  var sender = req.body.from;
  var name = req.body.name;
  var message = req.body.message;

  if (isBlank(sender)) {
    validation.push({'errorCode': 'err001', 'errorMessage': 'From field was empty or null.'});
  }

  if (isBlank(name)) {
    validation.push({'errorCode': 'err002', 'errorMessage': 'Name field was empty or null.'});
  }

  if (isBlank(message)) {
    validation.push({'errorCode': 'err003', 'errorMessage': 'Message field was empty or null.'});
  }

  return validation;
}

function isBlank(str) {
  return (!str || /^\s*$/.test(str));
}

module.exports = router;
