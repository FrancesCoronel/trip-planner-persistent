var router = require('express').Router();

var models = require('../models');

router.get('/',
	function (req, res, next) {
		models.Hotel
			.find({})
			.exec(function (err, hotels) {
				// attach data to res.locals and then go on
				res.locals.all_hotels = hotels;
				next();
			});
	},
	function (req, res, next) {
		models.ThingToDo
			.find({})
			.exec(function (err, thingsToDo) {
				// attach data to res.locals and then go on
				res.locals.all_things_to_do = thingsToDo;
				next();
			});
	},
	function (req, res, next) {
		models.Restaurant
			.find({})
			.exec(function (err, restaurants) {
				// attach data to res.locals and then go on
				res.locals.all_restaurants = restaurants;
				next();
			});
	},
	function (req, res) {
		// all the data attached to res.locals will now be passed to the index template
		res.render('index');
	});

router.get('/hotels', function () {
	models.Hotel
		.find({})
		.exec(function (err, hotels) {
			if (err) return next(err);
			res.json(hotels);
		});
});

router.get('/restaurants', function () {
	models.Restaurant
		.find({})
		.exec(function (err, restaurants) {
			if (err) return next(err);
			res.json(restaurants);
		});
});

router.get('/thingsToDo', function () {
	models.ThingToDo
		.find({})
		.exec(function (err, thingsToDo) {
			if (err) return next(err);
			res.json(thingsToDo);
		});
});

module.exports = router;