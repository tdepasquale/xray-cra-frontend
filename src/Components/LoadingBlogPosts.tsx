import React from "react";
import { Container, Card, Placeholder } from "semantic-ui-react";

export const LoadingBlogPosts = () => {
  const PlaceholderPost = () => {
    return (
      <Card color="blue">
        <Placeholder>
          <Placeholder.Image square />
        </Placeholder>
        <Card.Content className="blog-card-content">
          <Card.Header className="blog-card-text">&nbsp;</Card.Header>
        </Card.Content>
      </Card>
    );
  };

  return (
    <div className="blog-roll-container">
      <Container className="margin-bottom-1">
        <Card.Group itemsPerRow={4} stackable>
          <PlaceholderPost />
          <PlaceholderPost />
          <PlaceholderPost />
          <PlaceholderPost />
          <PlaceholderPost />
          <PlaceholderPost />
          <PlaceholderPost />
          <PlaceholderPost />
        </Card.Group>
      </Container>
      <br />
    </div>
  );
};
