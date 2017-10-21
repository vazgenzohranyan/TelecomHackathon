 function midle(req, res, next) {
    var body = req.body;
    var phone = body.phone_number;
    phone = phone.split('');
    if(phone[4] === '9'  && phone[5] === '9') next();
    else next(new Error("not beeline number"));
}




module.exports = midle;