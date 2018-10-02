var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mydb', ['tasks'])

// Get All tasks
router.get('/tasks', function(req, res, next) {
	db.tasks.find(function(err, tasks) {
		if (err) {
			res.send(err);
		}
		res.json(tasks);
	});
});

// Get Single task
router.get('/tasks/:id', function(req, res, next) {
	db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task) {
		if (err) {
			res.send(err);
		}
		res.json(task);
	});
});

//Save task
router.post('/task', function(req, res, next) {
	var task = req.body;

	console.log("Server: " + task.title);

	if (!task.title || !(task.isDone + '')) {
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
		} else {
			db.tasks.save(task, function(err, task){
				if (err) {
					res.send(err);
				}
				res.json(task);
					});
		}
})

// Delete Task
router.delete('/task/:id', function(req, res, next) {
	console.log(req.params);

	db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task) {
		if (err) {
			res.send(err);
		}
		res.json(task);
	});
});

// Update Task
router.put('/task/:id', function(req, res, next) {
	var task = req.body;
	var upTask = {};
	console.log(task);

	if (task.isDone) {
		upTask.isDone = task.isDone;

	}

	if (task.title) {
		upTask.title = task.title;
	}

	if (!upTask){
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	} else {

		db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, upTask, {}, function(err, task) {
			if (err) {
				res.send(err);
			}
			res.json(task);
		});
	
	}
});



module.exports = router;

