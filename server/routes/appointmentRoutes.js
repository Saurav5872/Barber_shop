const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Create a new appointment
router.post('/appointments/create', appointmentController.createAppointment);

// Get all appointments
router.get('/appointments/all', appointmentController.getAllAppointments);

router.get('/appointments/user/:userId', appointmentController.getAppointmentsByUserId);


// Get a specific appointment by ID
router.get('/appointments/:id', appointmentController.getAppointmentById);

// Update an appointment by ID
router.put('/appointments/update/:id', appointmentController.updateAppointmentById);

// Delete an appointment by ID
router.delete('/appointments/delete/:id', appointmentController.deleteAppointmentById);

module.exports = router;
