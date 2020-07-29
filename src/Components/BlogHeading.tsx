import React from "react";
import { Container, Header } from "semantic-ui-react";

interface IProps {
  id: string;
  text: string;
}

export const BlogHeading: React.FC<IProps> = ({ id, text }) => {
  return (
    <Container key={id} text textAlign="center" className=" margin-all-1 blog">
      <Header as="h2">{text}</Header>
    </Container>
  );
};
