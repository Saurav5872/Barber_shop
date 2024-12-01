const Appointment= require('../models/appointmentModel')

//Description:  Create New Appointment
//Route:        POST - api/appointments/create
//Access:       Public
const createAppointment = async (req,res) => { 
    try {
        const newAppointment = new Appointment(req.body);
        await newAppointment.save();
        res.status(201).json(newAppointment)
    } catch (error) {
        res.status(400).json(error);
    }
};
//Description:  Get All Appointments
//Route:        GET - api/appointments/all
//Access:       Public
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json(err);
    }
};

//Description:  Get One Appointment By ID
//Route:        GET - api/appointments/:id
//Access:       Public
const getAppointmentById = async (req, res) => {
    const appointmentId = req.params.id;
    try {
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Description:  Update One Appointment By ID
//Route:        POST - api/appointments/update/:id
//Access:       Private
const updateAppointmentById = async (req, res) => {
    const appointmentId = req.params.id;
    try {
        const appointment = await Appointment.findByIdAndUpdate(appointmentId, req.body, { new: true });
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Description:  Delete One Appointment By ID
//Route:        POST - api/appointments/delete/:id
//Access:       Private
const deleteAppointmentById = async (req, res) => {
    const appointmentId = req.params.id;
    try {
        const appointment = await Appointment.findByIdAndDelete(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Description: Get All Appointments By User ID
// Route: GET - api/appointments/user/:userId
// Access: Private
const getAppointmentsByUserId = async (req, res) => {
    const userId = req.params.userId;

    try {
        const appointments = await Appointment.find({ user: userId });
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointmentById,
    deleteAppointmentById,
    getAppointmentsByUserId,
};