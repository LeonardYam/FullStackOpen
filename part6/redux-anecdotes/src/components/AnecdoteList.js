import { useSelector, useDispatch } from "react-redux"
import { upvoteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        const { filter } = state
        return state.anecdotes.filter(a => a.content.includes(filter))
    })
    
    const dispatch = useDispatch()
    
    const handleVote = (anecdote) => {
        dispatch(upvoteAnecdote(anecdote))
        dispatch(setNotification(`You voted for "${anecdote.content}"`, 5))
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList