import React from "react";
import { Container } from "semantic-ui-react";
import { DisplayElement } from "./DraggableBlog";
import { IBlog } from "../models/blog";

interface IProps {
  blog: IBlog;
}

export const ViewBlog: React.FC<IProps> = ({ blog }) => {
  return (
    <Container textAlign="center" className="blog">
      <h1>{blog.title}</h1>
      {blog.sections.map((item) => (
        <DisplayElement section={item} key={item.id} />
      ))}
    </Container>
  );
};
