import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const createNew = async (content) => {
    const newAnecdote = { content, votes: 0 }
    const res = await axios.post(baseUrl, newAnecdote)
    return res.data
}

const update = async (updates) => {
    const res = await axios.patch(`${baseUrl}/${updates.id}`, updates)
    return res.data
}

const anecdoteService = { getAll, createNew, update }

export default anecdoteService