//Import users database schema
const Rave =  require('../models/raveModel')

initializePayment = (reg, res) => {
	console.log("Rave Payment initialize")
}

verifyPayment = (req, res) => {
	console.log('Rave payment verified')
}

module.exports = {
	initializePayment,
	verifyPayment,
}