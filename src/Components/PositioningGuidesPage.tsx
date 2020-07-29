import React from "react";
import agent from "../agent";
import { LoadingBlogPosts } from "./LoadingBlogPosts";
import { BlogRoll } from "./BlogRoll";
import { Helmet } from "react-helmet";
import useSWR from "swr";
import { NotFound } from "./NotFound";

export const PositioningGuidesPage = () => {
  const { data: guides, error, mutate } = useSWR(
    ["listPostedGuides"],
    async () => agent.BlogPosts.listPostedPositioningGuides()
  );

  if (error) return <NotFound />;

  return (
    <div className="home-background">
      <Helmet>
        <title>{`Positioning Guides | Rad X-Rays`}</title>
        <meta
          property="og:image"
          content="https://takeradxrays.s3.us-east-2.amazonaws.com/optimized-hand-bones.jpg"
        />
      </Helmet>
      {!guides ? <LoadingBlogPosts /> : <BlogRoll blogs={guides} />}
    </div>
  );
};
