import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const numberOfAnecdotes = 6
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(numberOfAnecdotes).fill(0))
  const [max, setMax] = useState(0)

  const handleVoteClick = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)  
    if (copy[selected] > copy[max]) {
      setMax(selected)
    }
  }

  const handleNextClick = () => {
    let newAnecdote = Math.trunc(Math.random() * numberOfAnecdotes)
    while (newAnecdote === selected) newAnecdote = Math.trunc(Math.random() * numberOfAnecdotes)
    setSelected(newAnecdote)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>
        {anecdotes[selected]} <br/>
        has {votes[selected]} votes
      </p>
      <Button onClick={handleVoteClick} text='vote'/>
      <Button onClick={handleNextClick} text='next anecdote'/>
      <h2>Anecdote with the most votes</h2>
      <p>
        {anecdotes[max]} <br/>
        has {votes[max]} votes
      </p>
    </div> 
  )
}

export default App