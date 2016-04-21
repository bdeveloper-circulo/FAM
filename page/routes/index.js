var express = require('express');
var router = express.Router();
var validator = require('../lib/validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/pushformdata', function (req, res) {
  var valid = validator.formvalidator(req.body);

  if (!valid) {
    return res
            .status(400)
            .json({
              message: 'parametros invalidos.'
            });
  }

  req
    .dbconnection
    .collection('message')
    .insert(req.body, function(err, result){
      if (err) throw err;
      res.render('thankyou.jade');
    });

});

module.exports = router;
