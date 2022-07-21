import NumberService from "../services/NumberService"

const Person = ({persons, setPersons, person}) => {
    const {id, name, number} = person

    const handleDelete = () => {
        if (window.confirm(`Delete ${name}?`)) {
            NumberService.deleteEntry(id)
            setPersons(persons.filter(p => p.id !== id))
        }
    }

    return (
        <div>
            <p>{name} {number} <button onClick={handleDelete}>delete</button> </p>
        </div>
    )
}

export default Person