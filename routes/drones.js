const express = require('express');
const router = express.Router();

// require the Drone model here
const Drone = require('../models/Drone.model');

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
  Drone.find()
    .then((drones) => {
      res.render('drones/list', { drones });
    })
    .catch((err) => {
      next(err);
    })
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  res.render('drones/create-form');
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  const { name, propellers, maxSpeed } = req.body;
  console.log(name, propellers, maxSpeed);
  Drone.create({ name, propellers, maxSpeed })
    .then(() => {
      res.redirect('/drones');
    })
    .catch((err) => {
      console.log(err);
    })
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  Drone.findById(req.params.id)
    .then((drone) => {
      res.render('drones/update-form', { drone });
    })
    .catch((err) => {
      next(err);
    })
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  const { name, propellers, maxSpeed } = req.body;
  Drone.findByIdAndUpdate(req.params.id, { name, propellers, maxSpeed }, { new: true })
    .then(() => {
      res.redirect('/drones');
    })
    .catch((err) => {
      next(err);
    })
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
  const { id } = req.params;
  Drone.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/drones');
    })
    .catch((err) => {
      next(err);
    })


});

module.exports = router;
