import { addAnecdote } from "../reducers/anecdoteReducer"
import { connect } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {
    const handleSubmit = async (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        props.addAnecdote(content)
        props.setNotification(`You created "${content}"`, 5)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </div>

    )
}

const mapDispatchToProps = { addAnecdote, setNotification }

const connectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default connectedAnecdoteForm