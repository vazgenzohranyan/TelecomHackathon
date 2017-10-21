module.exports = function VerCode () {
    var rand = 100000 - 0.5 + Math.random() * 900000;
    rand = Math.round(rand);
    return rand;
};