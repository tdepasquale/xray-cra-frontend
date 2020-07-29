import React, { useState } from "react";
import { Container, Header, Button } from "semantic-ui-react";
import { SocialLogins } from "./SocialLogins";
import { ModalTemplate } from "./ModalTemplate";

export const Hero = () => {
  const [isOpen, setOpen] = useState(false);
  const closeModal = () => {
    setOpen(false);
  };
  const [form, setform] = useState(
    <SocialLogins closeModal={closeModal} isSignUpVariant={true} />
  );

  const handleSignup = () => {
    setform(<SocialLogins closeModal={closeModal} isSignUpVariant={true} />);
    setOpen(true);
  };

  return (
    <div className="hero">
      <ModalTemplate isOpen={isOpen} modalBody={form} closeModal={closeModal} />
      <div className="dark-overlay">
        <Container text textAlign="center" className="hero-align">
          <Header as="h1" inverted className="hero-text">
            Get <em>free</em> access to our technique chart tool
          </Header>
          <Button.Group className="hero-buttons-align" widths="2">
            <Button
              as="a"
              href="/technique-chart-demo"
              className="btn hero-btn"
            >
              Learn More
            </Button>
            <Button
              as="a"
              className="btn cta-button hero-btn"
              onClick={handleSignup}
            >
              Yes, Please!
            </Button>
          </Button.Group>
        </Container>
      </div>
    </div>
  );
};
