import { useState } from "react";
import login from "../services/loginService";
import blogService from "../services/blogService";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { set } from "../reducers/userReducer";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await login({ username, password });
      window.localStorage.setItem("user", JSON.stringify(user));
      dispatch(set(user));
      setUsername("");
      setPassword("");
      dispatch(setNotification({ type: "success", text: "login successful!" }));
      blogService.setToken(user.token);
    } catch (err) {
      setNotification({
        type: "error",
        text: "wrong username or password!",
      });
    }
  };

  return (
    <div>
      <h2>log in to application</h2>
      <form className="loginForm" onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <button type="submit" name="login">
            login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
