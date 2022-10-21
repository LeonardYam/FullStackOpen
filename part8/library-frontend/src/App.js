import React from 'react'
import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient, useSubscription } from '@apollo/client'
import Recommendation from './components/Recommendation'
import { BOOK_SUBSCRIPTION } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  
  useSubscription(BOOK_SUBSCRIPTION, {onData: ({data}) => window.alert(`${data.data.bookAdded.title} just added`)});

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    if (userToken) setToken(userToken);
  }, [setToken])

  const handleLogout = () => {
    setToken(null)
    localStorage.removeItem('token')
    client.resetStore();
  }

  return (  
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommend')}>recommends</button>}
        {token && <button onClick={handleLogout}>logout</button>}
      </div>

      <Authors show={page === 'authors'}/>
      
      <Books show={page === 'books'}/>

      <NewBook show={page === 'add'}/>
      <Recommendation show={page === 'recommend'}/>
      <Login show={page === 'login'} setToken={setToken}/>

    </div>
  )
}

export default App
