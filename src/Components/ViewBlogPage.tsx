import React from "react";
import { useParams } from "react-router-dom";
import { Container, Segment } from "semantic-ui-react";
import Loading from "./Loading";
import agent from "../agent";
import { ViewBlog } from "./ViewBlog";
import { Helmet } from "react-helmet";
import useSWR from "swr";
import { NotFound } from "./NotFound";

export const ViewBlogPage = () => {
  const { id } = useParams();

  const { data: blogPost, error } = useSWR([id], async (id) =>
    agent.BlogPosts.getPostedBlog(id)
  );

  if (error) return <NotFound />;
  if (!blogPost) return <Loading content="Loading blog post..." />;

  return (
    <Container className="home-background margin-top-4">
      <Helmet>
        <title>{`${blogPost?.title} | Rad X-Rays`}</title>
        <meta property="og:image" content={`${blogPost.coverImageUrl}`} />
      </Helmet>

      <Segment>
        <ViewBlog blog={blogPost!} />
      </Segment>
    </Container>
  );
};
