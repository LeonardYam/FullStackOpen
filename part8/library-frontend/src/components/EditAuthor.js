import React from 'react'
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries';
import Select from 'react-select'

const EditAuthor = ({authors}) => {
    const [option, setOption] = useState(null);
    const [year, setYear] = useState('')
    const [editAuthor, {loading}] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{query: ALL_AUTHORS}]
      })

    if (loading) {
        return <p>loading...</p>
    }    

    const options = authors.map(a => {
        const obj = { value: a.name, label: a.name }
        return obj
    })

    const handleButtonClick = () => editAuthor({variables: {name: option.value, born: parseInt(year)}}) 

    return (
        <div>
            <h2>Set birthyear</h2>
            <Select options={options} value={option} onChange={setOption}/>
            <label htmlFor="year">born</label>
            <input name="year" value={year} onChange={e => setYear(e.target.value)}/>
            <button onClick={handleButtonClick}>edit</button>
        </div>
    )
}

export default EditAuthor