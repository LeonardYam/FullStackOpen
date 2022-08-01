import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogService'

const App = () => {
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')

  const wrappedSetNotification = (value) => {
    setNotification(value)
    setTimeout(() => setNotification(''), 3000)
  }

  useEffect(() => {
    const localUserJSON = window.localStorage.getItem('user')
    if (localUserJSON) {
      const localUser = JSON.parse(localUserJSON)
      setUser(localUser)
      blogService.setToken(localUser.token)
    }
  }, [])

  return (
    <div>
      <Notification notification={notification} />
      {user === null
        ? <LoginForm setUser={setUser} setNotification={wrappedSetNotification} />
        : <Blogs user={user} setUser={setUser} setNotification={wrappedSetNotification} />
      }
    </div>
  )
}

export default App
