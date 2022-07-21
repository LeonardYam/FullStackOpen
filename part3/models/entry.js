require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

mongoose
	.connect(url)
	.then(() => console.log('Connected to db!'))
	.catch(err => console.log('error: ', err.message))

const entrySchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: true
	},
	number: {
		type: String,
		minLength: 8,
		validate: {
			validator: (value) => /\d{2,3}-\d+/.test(value)
		},
		required: true
	}
})

entrySchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
		return returnedObject
	}
})

module.exports = mongoose.model('Entry', entrySchema)