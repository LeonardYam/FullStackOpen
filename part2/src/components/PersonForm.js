import { useState } from 'react'
import NumberService from '../services/NumberService'

const PersonForm = ({ persons, setPersons, setNotification }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNameChange = (e) => setNewName(e.target.value)

    const handleNumberChange = (e) => setNewNumber(e.target.value)

    const handleAddPerson = (e) => {
        e.preventDefault()

        const foundPerson = persons.find(p => p.name === newName)

        //No such entry
        if (foundPerson === undefined) {
            const newPerson = {
                name: newName,
                number: newNumber
            }

            NumberService
                .createEntry(newPerson)
                .then(person => {
                    setPersons(persons.concat(person))
                    setNotification({
                        type: 'success',
                        message: `Added ${person.name}!`
                    })
                })
                .catch(e => {
                    console.log(e)
                    setNotification({
                        type: 'error',
                        message: e.response.data.error
                    })
                })


        //Update entry with new number
        } else {
            if (window.confirm(`${foundPerson.name} is already added to the phonebook, replace the old number with a new one?`)) {
                NumberService
                    .updateEntry(foundPerson.id, newNumber)
                    .then(updatedPerson => {
                        setPersons(persons.map(p => p.id !== updatedPerson.id ? p : updatedPerson))
                        setNotification({
                            type: 'success',
                            message: `${updatedPerson.name} number updated!`
                        })
                    })
                    .catch(e => {
                        setNotification({
                            type: 'error',
                            message: e.response.data.error
                        })
                    })
            }
        }

        setNewName('')
        setNewNumber('')
    }

    return (
        <div>
            <form onSubmit={handleAddPerson}>
                <div>
                    name: <input onChange={handleNameChange} value={newName} />
                </div>
                <div>
                    number: <input onChange={handleNumberChange} value={newNumber} />
                </div>
                <div>
                    <button type="submit">
                        add
                    </button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm