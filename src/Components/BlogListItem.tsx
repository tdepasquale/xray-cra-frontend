import React from "react";
import { Container, Icon } from "semantic-ui-react";
import { LinkifyComponentDecorator } from "./LinkifyComponentDecorator";
import Linkify from "react-linkify";

interface IProps {
  id: string;
  text: string;
}

export const BlogListItem: React.FC<IProps> = ({ id, text }) => {
  return (
    <Container key={id} text textAlign="left" className=" margin-all-1 blog">
      <div className="list-item">
        <Icon name="genderless" />
        <Linkify componentDecorator={LinkifyComponentDecorator}>{text}</Linkify>
      </div>
    </Container>
  );
};
