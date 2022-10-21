import React from 'react'
import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { LOGIN } from "../queries";


const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, res] = useMutation(LOGIN)
  
  useEffect(() => {
    if (res.data) {
      const token = res.data.login.value
      localStorage.setItem('token', token)
      props.setToken(token)
    }  
  }, [props, res])

  if (!props.show) return null
  if (res.loading) return <p>loading...</p>

  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    login({variables: {username, password}})
    setUsername('')
    setPassword('')
  };
  const handleUsernameChange = (e) => setUsername(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)

  return ( 
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">username</label>
          <input value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
