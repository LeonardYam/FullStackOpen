import { useEffect, useState } from 'react'
import NumberService from './services/NumberService'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  const wrappedSetNotification = (notification) => {
    setNotification(notification)
    setTimeout(() => setNotification(null), 3000)
  }


  useEffect(() => {
    NumberService
      .getAll(setPersons)
      .then(people => setPersons(people))
  }, [])




  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification}/>
      <Filter filter={filter} setFilter={setFilter} />

      <h3>Add a new person</h3>

      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setNotification={wrappedSetNotification}
      />

      <h3>Numbers</h3>

      <Persons
        persons={persons}
        setPersons={setPersons}
        filter={filter}
      />
    </div>
  )
}

export default App