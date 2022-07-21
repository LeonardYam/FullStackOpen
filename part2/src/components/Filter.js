const Filter = ({filter, setFilter}) => {
    const handleFilterChange = (e) => setFilter(e.target.value.toLowerCase())

    return (
        <div>
            filter shown with <input value={filter} onChange={handleFilterChange} />
        </div>
    )
}

export default Filter