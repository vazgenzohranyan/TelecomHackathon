var express = require('express');
var bodyParser = require('body-parser');
var twilio = require('twilio');
var config = require('./config');
var midle = require('./validation');
var vercode = require('./verification');
var _ = require('underscore');
var mongoose = require('mongoose');
var number = require('./model');

mongoose.connect('mongodb://localhost/example');

var client = twilio(config.ACCOUNT_SID, config.AUTH_TOKEN);
var auth = [];

app = express();


app.use(bodyParser());

app.post('/get_pass', midle, function(req, res, next) {
    console.log("Sending massage");
    var Vercode = vercode();
    client.messages.create({
        to: "+37499553039",
        from: "+14015923144",
        body: Vercode
    }, function(err, message) {
       if(err) next(err);
       else auth.push({ phonenumber:message.to, vercode:Vercode });
        console.log(auth);

    });
    res.status(200).send({
        success: true,
        message: "Massage sended"
    });
});

app.post('/auth', function (req, res, next) {
        console.log(req.body);

    var body = req.body;
    var phonenumber = body.phone_number;
    var vercode = parseInt(body.vercode);
    console.log(auth);

    var find = _.find(auth, function(value, key) {
        return (value.phonenumber == phonenumber && value.vercode == vercode);
    });

    if(find === undefined) {
        res.status(404).send({
            success: false,
            message: "Verification code is not correct"
        });
    }
    else {
        res.status(200).send({
            success: true,
            message: "Verification is completed"
        });
    }


});

app.post('/getSecret', function(req, res, next) {
    console.log(req.body);

    var firstNumber = req.body.phoneNumber[0].split('');
    var secondNumber = req.body.phoneNumber[1].split('');

    firstNumber[0] = '1';
    secondNumber[0] = '1';
    firstNumber = firstNumber.join('');
    secondNumber = secondNumber.join('');

    firstNumber = parseInt(firstNumber);
    secondNumber = parseInt(secondNumber);

    res.json({
        secret:15462452, //firstNumber+secondNumber
    });
});

/*app.post('/setSecret', function(req, res, next) {
    console.log(req.body);
    var firstNumber = req.body.phoneNumber[0].split('');
    var secondNumber = req.body.phoneNumber[1].split('');

    firstNumber[0] = '1';
    secondNumber[0] = '1';

    firstNumber = parseInt(firstNumber.join(''));
    secondNumber = parseInt(secondNumber.join(''));

    number.find({numbers:firstNumber+secondNumber}, function (err, number) {
       if(err) console.log(err);
       else {
           if(number) {
               res.json({
                   secret:number[0].secret
               })
           }
           else {
               res.status(404).send({
                   success: false,
                   message: "Not found"
               });
           }
       }
    });
});*/

app.listen(3001, '0.0.0.0');

module.exports = app;