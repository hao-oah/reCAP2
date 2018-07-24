/////////////// reCAP pattern
var recaptcha = require('express-recaptcha');
var keys = require('.route/env');
recaptcha.init('6LdN5mUUAAAAAJ09epNNa5ZNhGdvh1pAgXbzSeWP', keys.recaptchaKey);



app.post('/api/switts', function(req, res) {
  recaptcha.verify(req, function(error){
    if(!error) {
      var newSwitt = new db.Switt({
        name: req.body.name,
        super_power: req.body.super_power,
      });
      newSwitt.save(function(err, savedSwitt) {
        if (err) {
          res.sendStatus(404);
        }
        res.json(savedSwitt);
      });
    }
    else {
      console.log("Captcha failure");
    }
  });
});

