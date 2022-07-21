import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons/'

const getAll = () => {
    return axios
        .get(baseUrl)
        .then(res => res.data)
}

const createEntry = (newPerson) => {
    return axios
        .post(baseUrl, newPerson)
        .then(res => res.data)
}

const updateEntry = (personId, newNumber) => {
    return axios
        .patch(`${baseUrl}/${personId}`, {number: newNumber})
        .then(res => res.data)
}

const deleteEntry = (personId) => {
    axios.delete(`${baseUrl}/${personId}`)
}


const NumberService = {
    getAll,
    createEntry,
    updateEntry,
    deleteEntry
}

export default NumberService