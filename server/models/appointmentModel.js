const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Login to book appointment' ],
    },
    date:{
        type: Date,
        required: [true, "Please include valid date and time"],
        unique: [true, 'That date and time is not available please select a different date'],
    },
    service:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        validate: {
            validator: function (value) {
                // Custom validation logic for the service field
                return value !== null && value !== undefined && value !== '';
            },
            message: 'Please select a service',
        },
        // Add a pre-validation step to check for an empty string
        set: function (value) {
            return value === '' ? null : value;
        },
    },
    comments:{
        type: String,
        required:false,
        maxlength: [100, "Please keep comments under 100 characters"],
    },
},{
    timestamps:true
});

const Appointment = mongoose.model('Appointment',appointmentSchema);
module.exports = Appointment;
