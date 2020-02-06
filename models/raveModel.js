//Import express web framework for node.js
const mongoose = require('mongoose')

//Declare the mongoose Schema
const Schema = mongoose.Schema

// Construct the Rave Schema 
const RaveSchema = new Schema(
    {
	    fullnname: {type: String, required: true },
	    email: { type: String, required: true },
	    amount: { type: Number, required: true },
	    reference: { type: String, required: true },
	    paymentMadeBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }
    },
    { timestamps: true },
)

//Export the module for use in other modules
module.exports = mongoose.model('Rave', RaveSchema)