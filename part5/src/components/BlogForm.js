import PropTypes from 'prop-types'
import { useState } from "react"

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitleChange = e => setTitle(e.target.value)
    const handleAuthorChange = e => setAuthor(e.target.value)
    const handleUrlChange = e => setUrl(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newBlog = {
            title,
            author,
            url
        }
        await createBlog(newBlog)
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>Create new blog</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">title: </label>
                    <input id="title" value={title} onChange={handleTitleChange} />
                </div>
                <div>
                    <label htmlFor="author">author: </label>
                    <input id="author" value={author} onChange={handleAuthorChange} />
                </div>
                <div>
                    <label htmlFor="url">url: </label>
                    <input id="url" value={url} onChange={handleUrlChange} />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm