import React, { useContext } from "react";
import { Segment, Container, Menu, Button } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";
import { INavbarProps } from "./Navbar";
import { UserContext, history } from "../App";
import { logoutAction } from "../contexts/UserContext";
import { toast } from "react-toastify";

export const NavbarDesktop: React.FC<INavbarProps> = ({ handleLogin }) => {
  const userContext = useContext(UserContext);

  const logout = () => {
    userContext!.dispatch(logoutAction());
    history.push("/");
    toast.info("See you later!");
  };

  const loginSignup = (
    <Menu.Item position="right">
      <Button as="a" inverted className="nav-btn" onClick={handleLogin}>
        Log in
      </Button>
    </Menu.Item>
  );

  const welcome = (
    <React.Fragment>
      <Menu.Item
        position="right"
        as={NavLink}
        to={`/my-technique-charts`}
        icon="table"
        name="My Charts"
      />
      {userContext!.userData.user?.roles.find(
        x => x === "Admin" || x === "Writer" || x === "Manager"
      ) && (
        <Menu.Item as={NavLink} to={"/admin"} icon="building" name="Admin" />
      )}
      <Menu.Item as={Link} to="/" onClick={logout} icon="power" name="Logout" />
    </React.Fragment>
  );

  return (
    <nav className="nav-desktop printing-hide">
      <Segment inverted className="no-border-radius sticky">
        <Container>
          <Menu inverted pointing secondary className="navbar">
            <Menu.Item as={NavLink} exact to="/" name="Home" icon="home" />
            <Menu.Item
              as={NavLink}
              to="/positioning-guides"
              name="Positioning Guides"
              icon="book"
            />

            {userContext!.userData.user === null ? loginSignup : welcome}
          </Menu>
        </Container>
      </Segment>
    </nav>
  );
};
