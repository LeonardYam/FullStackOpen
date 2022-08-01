import { useState } from "react"

const Blog = ({ user, blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const isCreator = user.username === blog.creator.username
  const buttonText = visible ? 'hide' : 'view'

  const handleViewClick = () => setVisible(!visible)

  const handleLikeClick = () => {
    updateBlog({ id: blog.id, likes: blog.likes + 1 })
  }

  const handleDeleteClick = () => window.confirm(`Delete ${blog.title}?`) && deleteBlog(blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={handleViewClick}>{buttonText}</button>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes} <button onClick={handleLikeClick}>like</button>
        </div>
        <div>
          {blog.creator.name}
        </div>
        {isCreator && <div><button onClick={handleDeleteClick}>delete</button></div>}
      </div>
    </div>
  )
}



export default Blog