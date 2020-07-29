import React from "react";
import { Image, Container, Header } from "semantic-ui-react";
import { Helmet } from "react-helmet";

export const NotFound = () => {
  return (
    <div className="white-centered-background">
      <Helmet>
        <title>{`Not Found | Rad X-Rays`}</title>
      </Helmet>
      <Container text>
        <Image
          src={
            "https://takeradxrays.s3.us-east-2.amazonaws.com/Astronaut-big.png"
          }
          size="medium"
          centered
        />
        <Header as="h1" textAlign="center">
          404: This Page is Lost in Space
        </Header>
        <Header as="p" textAlign="justified">
          You thought this mission to the moon would be a quick six month thing.
          Your neighbor offered to look after your dog. Your high school math
          teacher was impressed. He once said you wouldn’t amount to anything.
          You sure showed him. But now here you are, fifty feet from your
          spaceship with no way to get back. Your dog will be so sad. Your math
          teacher will be so smug. Pretty devastating.
        </Header>
      </Container>
    </div>
  );
};
