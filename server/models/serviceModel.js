const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title:{
        type:String,
        required: [true,' Title cant be title'],
        unique: [true, 'Title already in use, try a different one '],
    },
    description:{
        type: String,
        required: [true, 'Description cant be empty'],
    },
    duration:{
        type: Number,
        required: [true, 'Duration cant be empty'],
        default: 10,
    },
    price: {
        type: Number,
        required: [true, 'Price cant be empty'],
        validate: {
            validator: function (value) {
                // Custom validator function to check if the price has exactly two decimal places
                const regex = /^\d+(\.\d{1,2})?$/;
                return regex.test(value.toString());
            },
            message: 'Price must have exactly two decimal places'
        },
        default:0.00
    },
    forMen:{
        type: Boolean,
        required: false,
        default: false,
    },
    forWomen:{
        type: Boolean,
        required: false,
        default: false,
    },
    forKids:{
        type: Boolean,
        required: false,
        default: false,
    },
},{
    timestamps:true
});

const Service = mongoose.model('Service', serviceSchema );
module.exports = Service;

