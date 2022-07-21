import Person from "./Person"

const Persons = ({ persons, setPersons, filter }) => {
    const filteredPersons = persons.filter(({ name }) => name.toLowerCase().includes(filter))

    return (
        <div>
            {filteredPersons.map(person =>
                <Person
                    key={person.name}
                    persons={persons}
                    setPersons={setPersons}
                    person={person}
                />)}
        </div>

    )
}

export default Persons