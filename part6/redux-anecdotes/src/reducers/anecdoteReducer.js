import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdoteService"

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    set(state, action) {
      return action.payload
    },
    create(state, action) {
      const newAnecdote = action.payload
      state.push(newAnecdote)
    },
    update(state, action) {
      const updatedAnecdote = action.payload
      const anecdoteIndex = state.findIndex(a => a.id === updatedAnecdote.id)
      state[anecdoteIndex] = updatedAnecdote
    }
  }
})

export const { set, create, update } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(set(anecdotes))
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(create(newAnecdote))
  }
}

export const upvoteAnecdote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update({id: anecdote.id, votes: anecdote.votes + 1})
    dispatch(update(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer