import React, { useContext } from "react";
import { Segment, Container, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { Helmet } from "react-helmet";

export const Admin = () => {
  const userContext = useContext(UserContext);

  return (
    <div className="chart-background">
      <Helmet>
        <title>{`Admin | Rad X-Rays`}</title>
      </Helmet>
      <Container text>
        {userContext!.userData.user?.roles.find((x) => x === "Writer") && (
          <Segment textAlign="center" className="no-padding">
            <Button
              as={Link}
              to={`/my-blog-posts`}
              className="no-border-radius table-button"
              fluid
            >
              My Blog Posts
            </Button>
          </Segment>
        )}
        {userContext!.userData.user?.roles.find((x) => x === "Writer") && (
          <Segment textAlign="center" className="no-padding">
            <Button
              as={Link}
              to={`/my-positioning-guides`}
              className="no-border-radius table-button"
              fluid
            >
              My Positioning Guides
            </Button>
          </Segment>
        )}
        {userContext!.userData.user?.roles.find((x) => x === "Manager") && (
          <Segment textAlign="center" className="no-padding">
            <Button
              as={Link}
              to={`/blog-posts-to-approve`}
              className="no-border-radius table-button"
              fluid
            >
              Blog Posts To Approve
            </Button>
          </Segment>
        )}
        {userContext!.userData.user?.roles.find((x) => x === "Manager") && (
          <Segment textAlign="center" className="no-padding">
            <Button
              as={Link}
              to={`/positioning-guides-to-approve`}
              className="no-border-radius table-button"
              fluid
            >
              Positioning Guides To Approve
            </Button>
          </Segment>
        )}
        {userContext!.userData.user?.roles.find((x) => x === "Admin") && (
          <Segment textAlign="center" className="no-padding">
            <Button
              as={Link}
              to={`/add-roles`}
              className="no-border-radius table-button"
              fluid
            >
              Add Roles to Users
            </Button>
          </Segment>
        )}
      </Container>
    </div>
  );
};
