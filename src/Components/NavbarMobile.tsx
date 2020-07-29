import React, { useState, useContext } from "react";
import "../App.css";
import { Segment, Menu, Container, Button, Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { INavbarProps } from "./Navbar";
import { UserContext, history } from "../App";
import { logoutAction } from "../contexts/UserContext";
import { toast } from "react-toastify";
import { CSSTransition } from "react-transition-group";

const NavbarMobile: React.FC<INavbarProps> = ({ handleLogin }) => {
  const userContext = useContext(UserContext);

  const logout = () => {
    userContext!.dispatch(logoutAction());
    history.push("/");
    setIsOpen(false);
    toast.info("See you later!");
  };

  const [isOpen, setIsOpen] = useState(false);

  const openLogin = () => {
    handleLogin();
    setIsOpen(false);
  };

  if (!isOpen)
    return (
      <nav className="nav-mobile printing-hide">
        <Segment inverted className="no-border-radius sticky">
          <Container>
            <Menu inverted pointing secondary className="navbar" fluid>
              <Menu.Item
                as="a"
                onClick={() => setIsOpen(true)}
                className="nav-space-between"
              >
                <div>Rad X-Rays</div>
                <Icon name="bars" size="large" color="blue" />
              </Menu.Item>
            </Menu>
          </Container>
        </Segment>
      </nav>
    );

  const loginSignup = (
    <Menu.Item position="right">
      <Button as="a" inverted className="nav-btn" onClick={openLogin}>
        Log in
      </Button>
    </Menu.Item>
  );

  const welcome = (
    <React.Fragment>
      <Menu.Item
        as={NavLink}
        to={`/my-technique-charts`}
        name="My Charts"
        icon="table"
        onClick={() => setIsOpen(false)}
      />
      {userContext!.userData.user?.roles.find(
        (x) => x === "Admin" || x === "Writer" || x === "Manager"
      ) && (
        <Menu.Item
          as={NavLink}
          to={"/admin"}
          icon="building"
          name="Admin"
          onClick={() => setIsOpen(false)}
        />
      )}
      <Menu.Item onClick={logout} name="Logout" icon="power" />
    </React.Fragment>
  );

  return (
    <nav className="nav-mobile printing-hide">
      <Segment inverted className="no-border-radius sticky">
        <CSSTransition
          timeout={300}
          classNames="nav-mobile-open"
          in={isOpen}
          appear
        >
          <Container>
            <Menu
              inverted
              pointing
              secondary
              className="navbar"
              vertical
              fluid
              icon="labeled"
            >
              <Menu.Item
                as="a"
                onClick={() => setIsOpen(false)}
                className="nav-item-center"
              >
                <Icon name="times circle" size="large" color="blue" />
              </Menu.Item>
              <br />
              <Menu.Item
                as={NavLink}
                exact
                to="/"
                name="Home"
                icon="home"
                onClick={() => setIsOpen(false)}
              />
              <Menu.Item
                as={NavLink}
                exact
                to="/positioning-guides"
                name="Positioning Guides"
                icon="book"
                onClick={() => setIsOpen(false)}
              />

              {userContext!.userData.user === null ? loginSignup : welcome}
            </Menu>
          </Container>
        </CSSTransition>
      </Segment>
    </nav>
  );
};

export default NavbarMobile;
