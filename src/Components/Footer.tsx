import React from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Segment } from "semantic-ui-react";

export const Footer = () => {
  return (
    <Segment color="black" inverted className="no-margin-top printing-hide">
      <Container>
        <Grid columns="equal" inverted stackable padded>
          <Grid.Row textAlign="center">
            <Grid.Column as={Link} to="/terms-of-use">
              Terms of Use
            </Grid.Column>
            <Grid.Column as={Link} to="/privacy-policy">
              Privacy Policy
            </Grid.Column>
          </Grid.Row>

          <Grid.Row textAlign="center">
            <Grid.Column as="a" href="mailto:takeradxrays@gmail.com">
              TakeRadXRays@gmail.com
            </Grid.Column>
            <Grid.Column>&#169; 2020 - Take Rad X-Rays</Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
};
