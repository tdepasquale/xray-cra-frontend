import React, { useState } from "react";
import "../App.css";
import { Responsive } from "semantic-ui-react";
import { ModalTemplate } from "./ModalTemplate";
import { NavbarDesktop } from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";
import { SocialLogins } from "./SocialLogins";

export interface INavbarProps {
  handleLogin: () => void;
}

const Navbar: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  const closeModal = () => {
    setOpen(false);
  };
  const [form, setform] = useState(
    <SocialLogins closeModal={closeModal} isSignUpVariant={false} />
  );

  const Login = () => {
    setform(<SocialLogins closeModal={closeModal} isSignUpVariant={false} />);
    setOpen(true);
  };

  return (
    <React.Fragment>
      <ModalTemplate isOpen={isOpen} modalBody={form} closeModal={closeModal} />
      <Responsive as={NavbarDesktop} minWidth={768} handleLogin={Login} />
      <Responsive as={NavbarMobile} maxWidth={767} handleLogin={Login} />
    </React.Fragment>
  );
};

export default Navbar;
