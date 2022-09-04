import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clear } from "../reducers/userReducer";
import { Container, Button, NavLink } from "@mantine/core";
import { useState } from "react";

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [activeLink, setActiveLink] = useState(0);

  const handleLogout = (e) => {
    window.localStorage.removeItem("user");
    dispatch(clear());
  };

  return (
    <Container fluid>
      <NavLink
        to="/"
        active={activeLink === 0}
        label="blogs"
        component={Link}
        onClick={() => setActiveLink(0)}
        variant={"filled"}
      />
      <NavLink
        to="/users"
        active={activeLink === 1}
        label="users"
        component={Link}
        onClick={() => setActiveLink(1)}
        variant={"filled"}
      />
      <Container fluid>
        {user.name} logged in!{" "}
        <Button variant="subtle" onClick={handleLogout}>
          log out
        </Button>
      </Container>
    </Container>
  );
};

export default Header;
