import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({name, value}) => (
  <tr>
    <td>{name}</td><td>{value}</td>
  </tr>
)

const Statistics = (props) => {
  const {good, neutral, bad} = props
  const total = good + neutral + bad

  if (total === 0) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <tbody>
      <StatisticLine name='good' value={good}/>
      <StatisticLine name='neutral' value={neutral}/>
      <StatisticLine name='bad' value={bad}/>
      <StatisticLine name='all' value={total}/>
      <StatisticLine name='average' value={(good - bad) / total} />
      <StatisticLine name='positive' value={good/total*100 + ' %'}/>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button onClick={() => setGood(good + 1)} text='good'/>
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral'/>
      <Button onClick={() => setBad(bad + 1)} text='bad'/>

      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>   
    </div>
  )
}

export default App
