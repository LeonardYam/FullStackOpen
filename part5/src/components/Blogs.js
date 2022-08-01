import Blog from "./Blog"
import BlogForm from "./BlogForm"
import blogService from "../services/blogService"
import Togglable from "./Togglable"
import { useState, useEffect, useRef } from "react"

const Blogs = ({ user, setUser, setNotification }) => {
    const [blogs, setBlogs] = useState([])

    const blogComparator = (a, b) => a.likes <= b.likes ? 1 : -1
    useEffect(() => {
        blogService.getAll().then(blogs =>
          setBlogs(blogs.sort(blogComparator))
        )
      }, [])

    const handleLogout = e => {
        window.localStorage.removeItem('user')
        setUser(null)
    }

    const updateBlog = async newBlog => {
        const updatedBlog = await blogService.updateBlog(newBlog)
        const newBlogs = blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b)
        setBlogs(newBlogs.sort(blogComparator))
        setNotification({type: 'success', message: `${updatedBlog.title} successfully updated!`})
    }

    const deleteBlog = async blogToDelete => {
        await blogService.deleteBlog(blogToDelete)
        const newBlogs = blogs.filter(b => b.id !== blogToDelete.id)
        setBlogs(newBlogs.sort(blogComparator))
        setNotification({type: 'success', message: `${blogToDelete.title} successfully deleted!`})
    }

    const createBlog = async newBlog => {
        const createdBlog = await blogService.createBlog(newBlog)
        setBlogs(blogs.concat(createdBlog).sort(blogComparator))
        setNotification({type: 'success', message: `${createdBlog.title} successfully created!`})
        blogFormRef.current.toggleVisibility()
    }
    
    const blogFormRef = useRef()

    return (
        <div>
            <h2>blogs</h2>
            <div>
                {user.name} logged in! <button type="button" onClick={handleLogout}>log out</button>
            </div>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm createBlog={createBlog} />
            </Togglable>
            <div className="blogList">
                {blogs.map(b => <Blog key={b.id} user={user} blog={b} updateBlog={updateBlog} deleteBlog={deleteBlog}/>)}
            </div>
        </div>
    )
}

export default Blogs