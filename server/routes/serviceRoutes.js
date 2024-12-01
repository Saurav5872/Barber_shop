const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController')

//Create new service 
router.post('/services/create', serviceController.createService)

// Get all services
router.get('/services/all', serviceController.getAllServices);

// Get a specific service by ID
router.get('/services/:id', serviceController.getServiceById);

// Update a service by ID
router.put('/services/update/:id', serviceController.updateServiceById);

// Delete a service by ID
router.delete('/services/delete/:id', serviceController.deleteServiceById);

module.exports = router;