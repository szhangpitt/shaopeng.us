var express = require('express');
var router = express.Router();
var request = require('request');
var sprintf = require('sprintf');

// all requests to this router will first hit this middleware
router.use(function(req, res, next) {
  
  console.log('%s, %s, %s', req.method, req.url, req.path);
  next();
});

/* GET home page. */
router.get('/', function(req, res) {
  req.session.lastPage = '/';
  res.render('index', { title: 'Home' });
});

router.get('/education', function(req, res) {
  req.session.lastPage = '/education';
  res.render('education', { title: 'Education' });
});

router.get('/experience', function(req, res) {
  req.session.lastPage = '/experience';
  res.render('experience', { title: 'Experience' });
});


router.get('/photography', function(req, res) {
  req.session.lastPage = '/photography';
  res.render('photography', { title: 'Photography' });
});


router.get('/contact', function(req, res) {
  req.session.lastPage = '/contact';
  res.render('contact', { title: 'Contact' });
});

router.get('/photos', function(req, res){
  var photoSetID = '72157640655461625';
  var api_key = '19d20d6e18b1a236c0db7d8de24db679';
  var url = sprintf.sprintf('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=%s&photoset_id=%s&format=json&nojsoncallback=1', api_key, photoSetID);
  request.get(url, function(rerr, rres, rbody){
  	if(!rerr){
  		res.send(rbody);
  	}
  });
});

module.exports = router;
