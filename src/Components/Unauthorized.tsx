import React from "react";
import { Image, Container, Header } from "semantic-ui-react";
import { Helmet } from "react-helmet";

export const Unauthorized = () => {
  return (
    <div className="white-centered-background">
      <Container text>
        <Helmet>
          <title>{`Unauthorized | Rad X-Rays`}</title>
        </Helmet>
        <Image
          src="https://takeradxrays.s3.us-east-2.amazonaws.com/Caution-Tape-big.png"
          size="medium"
          centered
        />
        <Header as="h1" textAlign="center">
          401: Caution! This Page is Cordoned Off
        </Header>
        <Header as="p" textAlign="justified">
          The earthquake was not good to the bike lane on your way to work. A
          large gap in the pavement (too big to be called a pothole) had
          swallowed three oblivious bikers whole. So the city had put up two
          pylons and yellow caution tape. Pretty frustrating for you given your
          propensity to do 360 jumps over the gap.
        </Header>
      </Container>
    </div>
  );
};
