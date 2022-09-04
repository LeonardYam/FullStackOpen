import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Content from "./components/Content";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogService";
import { set } from "./reducers/userReducer";
import { AppShell, MantineProvider } from "@mantine/core";

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const localUserJSON = window.localStorage.getItem("user");
    if (localUserJSON) {
      const localUser = JSON.parse(localUserJSON);
      dispatch(set(localUser));
      blogService.setToken(localUser.token);
    }
  }, [dispatch]);

  return (
    <MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles withNormalizeCSS>
      <AppShell>
        <Notification />
        {user === null ? <LoginForm /> : <Content />}
      </AppShell>
    </MantineProvider>
  );
};

export default App;
