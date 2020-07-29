import React from "react";
import { Card, Container, Segment, Header, Icon } from "semantic-ui-react";
import { BlogRollArticle } from "./BlogRollArticle";
import IBlogRollArticle from "../models/IBlogRollArticle";
import { IBlog } from "../models/blog";

interface IProps {
  blogs: IBlog[];
}

export const BlogRoll: React.FC<IProps> = ({ blogs }) => {
  let articles: IBlogRollArticle[];

  articles = blogs.map((blog) => {
    return {
      id: blog.id,
      title: blog.title,
      image: blog.coverImageUrl,
    };
  });

  if (blogs.length === 0)
    return (
      <Container className="margin-top-4 home-background">
        <Segment placeholder>
          <Header icon>
            <Icon name="bell" />
            New blog posts will be coming soon. Stay tuned, and keep taking rad
            x-rays!
          </Header>
        </Segment>
      </Container>
    );

  return (
    <div className="blog-roll-container">
      <Container className="margin-bottom-1">
        <Card.Group itemsPerRow={4} stackable>
          {articles.map((article) => (
            <BlogRollArticle key={article.id} article={article} />
          ))}
        </Card.Group>
      </Container>
      <br />
    </div>
  );
};
