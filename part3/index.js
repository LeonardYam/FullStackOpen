require('dotenv').config()
const Entry = require('./models/entry')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())


morgan.token('post', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))

app.get('/info', (req, res) => {
	Entry.find({})
		.then(entries => {
			res.send(`<p>Phonebook has info for ${entries.length} people</p>
                      ${Date()}`)
		})
})

app.get('/api/persons', (req, res) => {
	Entry.find({})
		.then(entries => res.json(entries))
})

app.post('/api/persons', (req, res, next) => {
	const body = req.body

	Entry.findOne({ name: body.name })
		.then(result => {
			//Name already exists
			if (result !== null) {
				res.status(400).send({ error: `${body.name} already exists!` })
			} else {
				const entry = new Entry({ ...body })
				entry.save()
					.then((savedEntry) => res.json(savedEntry))
					.catch((err) => next(err))
			}
		})


})

app.get('/api/persons/:id', (req, res) => {
	Entry.findById(req.params.id)
		.then(foundEntry => res.json(foundEntry))
})

app.patch('/api/persons/:id', (req, res, next) => {
	const newEntry = {
		...req.body
	}
	Entry.findByIdAndUpdate(req.params.id, newEntry, { new: true, runValidators: true, context: 'query' })
		.then((updatedEntry) => res.json(updatedEntry))
		.catch((err) => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
	Entry.findByIdAndDelete(req.params.id)
		.then(() => res.status(204).end())
		.catch((err) => next(err))
})

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'Unknown endpoint!' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
	console.error(error.name)

	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message })
	}

	//Pass to express error handler
	next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}!`)
})