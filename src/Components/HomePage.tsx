import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import {
  Button,
  Card,
  Container,
  Header,
  Icon,
  Segment,
} from "semantic-ui-react";
import swr, { useSWRPages } from "swr";
import agent from "../agent";
import { UserContext } from "../App";
import { IBlog } from "../models/blog";
import IBlogRollArticle from "../models/IBlogRollArticle";
import { BlogRollArticle } from "./BlogRollArticle";
import { Hero } from "./Hero";
import { LoadingBlogPosts } from "./LoadingBlogPosts";
import { NotFound } from "./NotFound";

export const HomePage: React.FC = () => {
  const userContext = useContext(UserContext);

  const {
    pages,
    isLoadingMore,
    isReachingEnd,
    isEmpty,
    loadMore,
  } = useSWRPages(
    "blog-page",
    ({ offset, withSWR }) => {
      const { data, error } = withSWR(
        swr(["listPostedBlogs", offset], async (key, offset) =>
          agent.BlogPosts.listPaginatedBlogs(offset ?? 1)
        )
      );

      if (error) return <NotFound />;

      if (!data) return <LoadingBlogPosts />;

      let articles: IBlogRollArticle[] = data.blogs.map((blog: IBlog) => {
        return {
          id: blog.id,
          title: blog.title,
          image: blog.coverImageUrl,
        };
      });

      return articles.map((article: IBlogRollArticle) => (
        <BlogRollArticle key={article.id} article={article} />
      ));
    },

    // if there is a next page set it equal to that otherwise set it to null so isReachingEnd gets triggered.
    (SWR) =>
      SWR.data.nextPage <= SWR.data.totalPages ? SWR.data.nextPage : null,
    []
  );

  if (isEmpty)
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
    <div className="home-background">
      <Helmet>
        <title>{`Home | Rad X-Rays`}</title>
        <meta
          property="og:image"
          content="https://takeradxrays.s3.us-east-2.amazonaws.com/optimized-hand-bones.jpg"
        />
      </Helmet>
      {!!userContext?.userData.user ? null : <Hero />}
      <div className="blog-roll-container">
        <Container className="margin-bottom-1">
          <Card.Group itemsPerRow={4} stackable>
            {pages}
          </Card.Group>
        </Container>
        <br />
        {isReachingEnd ? null : (
          <Container textAlign="center" className="margin-bottom-1">
            <Button loading={isLoadingMore} onClick={loadMore}>
              Load More
            </Button>
          </Container>
        )}
      </div>
    </div>
  );

  /*  const { data: blogs, error, mutate } = useSWR(["listPostedBlogs"], async () =>
     agent.BlogPosts.listPostedBlogs()
   ); 

  if (error) return <NotFound />;

  return (
    <div className="home-background">
      <Helmet>
        <title>{`Home | Rad X-Rays`}</title>
        <meta
          property="og:image"
          content="https://takeradxrays.s3.us-east-2.amazonaws.com/optimized-hand-bones.jpg"
        />
      </Helmet>
      {isLoggedIn ? null : <Hero />}
      {!blogs ? <LoadingBlogPosts /> : <BlogRoll blogs={blogs} />}
    </div>
  ); */
};
