var express = require('express');
var bodyParser = require('body-parser');
var twilio = require('twilio');
var midle = require('./validation');

var accountSid = 'AC9e28984b348bc1a4195524a0f47b4610';
var authToken = '8645905a2333dfa0cc2c64e3dbfb0f58';

var client = twilio(accountSid, authToken);


app = express();


app.use(bodyParser());

app.post('/get_pass', midle, function(req, res, next) {
    var rand = 100000 - 0.5 + Math.random() * 900000;
    rand = Math.round(rand);
    client.messages.create({
        to: "+37493683005",
        from: "+14015923144",
        body: rand
    }, function(err, message) {
       if(err) next(err);
       else console.log(message);
    });
});


app.listen(3000);

module.exports = app;