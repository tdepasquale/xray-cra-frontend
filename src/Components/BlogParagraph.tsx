import React from "react";
import { Container } from "semantic-ui-react";
import { LinkifyComponentDecorator } from "./LinkifyComponentDecorator";
import Linkify from "react-linkify";

interface IProps {
  id: string;
  text: string;
}

export const BlogParagraph: React.FC<IProps> = ({ id, text }) => {
  return (
    <Container
      key={id}
      text
      textAlign="justified"
      className=" margin-all-1 blog"
    >
      <div className="paragraph">
        <Linkify componentDecorator={LinkifyComponentDecorator}>{text}</Linkify>
      </div>
    </Container>
  );
};
