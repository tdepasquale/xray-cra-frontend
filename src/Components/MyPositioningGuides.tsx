import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Breadcrumb,
  Button,
  Container,
  Header,
  Icon,
  Image,
  Modal,
  Segment,
} from "semantic-ui-react";
import agent from "../agent";
import { IBlog } from "../models/blog";
import Loading from "./Loading";

export const MyPositioningGuides = () => {
  const [blogPosts, setBlogPosts] = useState<IBlog[]>([]);
  const [pageIsLoading, setPageIsLoading] = useState(true);
  const [addIsLoading, setAddIsLoading] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<IBlog | null>(null);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [submitIsOpen, setSubmitIsOpen] = useState(false);

  const getBlogs = async () => {
    try {
      const blogsFromDB = await agent.BlogPosts.listMyPositioningGuides();
      setBlogPosts(blogsFromDB);
      setPageIsLoading(false);
    } catch (error) {
      toast.error("Error getting positioning guides.");
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  if (pageIsLoading) return <Loading content="Loading positioning guides..." />;

  const addBlog = async () => {
    setAddIsLoading(true);
    try {
      const response = await agent.BlogPosts.createPositioningGuide();
      setBlogPosts([response, ...blogPosts!]);
      setAddIsLoading(false);
      toast.success("A new positioning guide was created successfully.");
    } catch (error) {
      toast.error("Error creating positioning guide.");
    }
  };

  const submitBlog = async () => {
    setSubmitIsLoading(true);
    try {
      await agent.BlogPosts.submit(currentBlog!.id);
      const updatedBlogs = blogPosts.filter(
        (blog) => blog.id !== currentBlog?.id
      );
      setBlogPosts(updatedBlogs);
      setSubmitIsLoading(false);
      setSubmitIsOpen(false);
      toast.success(`${currentBlog?.title} was successfully submitted.`);
    } catch (error) {
      toast.error("Error submitting positioning guide.");
    }
  };

  const deleteBlog = async () => {
    setDeleteIsLoading(true);
    try {
      await agent.BlogPosts.delete(currentBlog!.id);
      const updatedBlogs = blogPosts.filter(
        (blog) => blog.id !== currentBlog?.id
      );
      setBlogPosts(updatedBlogs);
      setDeleteIsLoading(false);
      setDeleteIsOpen(false);
      toast.success(`${currentBlog?.title} was successfully deleted.`);
    } catch (error) {
      toast.error("Error deleting positioning guide.");
    }
  };

  const openConfirmDelete = (selectedBlog: IBlog) => {
    setCurrentBlog(selectedBlog);
    setDeleteIsOpen(true);
  };

  const openConfirmSubmit = (selectedBlog: IBlog) => {
    setCurrentBlog(selectedBlog);
    setSubmitIsOpen(true);
  };

  const SubmitModal = () => {
    return (
      <Modal
        dimmer="blurring"
        open={submitIsOpen}
        onClose={() => setSubmitIsOpen(false)}
        size="tiny"
      >
        <Modal.Header>Submit Positioning Guide</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            Are you sure that you want to submit &nbsp;
            <strong>{currentBlog?.title}</strong>
            &nbsp; for approval?
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setSubmitIsOpen(false)}>
            Cancel
          </Button>
          <Button
            positive
            content="Submit"
            onClick={submitBlog}
            loading={submitIsLoading}
          />
        </Modal.Actions>
      </Modal>
    );
  };

  const DeleteModal = () => {
    return (
      <Modal
        dimmer="blurring"
        open={deleteIsOpen}
        onClose={() => setDeleteIsOpen(false)}
        size="tiny"
      >
        <Modal.Header>Delete Positioning Guide</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            Are you sure that you want to delete &nbsp;
            <strong>{currentBlog?.title}</strong>
            &nbsp;?
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setDeleteIsOpen(false)}>
            Cancel
          </Button>
          <Button
            negative
            content="Delete"
            onClick={deleteBlog}
            loading={deleteIsLoading}
          />
        </Modal.Actions>
      </Modal>
    );
  };

  const CurrentBreadcrumbs = () => {
    return (
      <Segment>
        <Breadcrumb className="padding-bottom-1">
          <Breadcrumb.Section as={Link} to="/admin">
            Admin
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section>My Positioning Guides</Breadcrumb.Section>
        </Breadcrumb>
      </Segment>
    );
  };

  const BlogSegment = () => {
    return (
      <React.Fragment>
        <Segment attached="top">
          <Header as="h1" textAlign="center">
            My Positioning Guides
          </Header>
        </Segment>
        <Button
          icon
          labelPosition="right"
          color="blue"
          className="no-border-radius table-button"
          fluid
          onClick={addBlog}
          loading={addIsLoading}
        >
          Add Blog
          <Icon name="plus square outline" />
        </Button>
        {blogPosts?.map((blog) => (
          <Segment.Group key={blog.id}>
            {blog.feedback && (
              <Segment textAlign="center">
                <strong>Feedback</strong> <br />
                {blog.feedback}
              </Segment>
            )}
            <Segment>
              {blog.coverImageUrl.length !== 0 ? (
                <Image
                  src={`${process.env.PUBLIC_URL}${blog.coverImageUrl}`}
                  className="blog-image-preview"
                />
              ) : null}
            </Segment>
            <Segment textAlign="center">
              <Link to={`/compose-blog/${blog.id}`} className="rem-1-5">
                {blog.title}
              </Link>
            </Segment>
            <Segment.Group horizontal>
              <Segment className="no-padding">
                <Button
                  onClick={() => openConfirmSubmit(blog)}
                  to={`/compose-blog/${blog.id}`}
                  icon
                  labelPosition="right"
                  color="green"
                  className="no-border-radius table-button"
                  fluid
                >
                  Submit
                  <Icon name="check" />
                </Button>
              </Segment>
              <Segment className="no-padding">
                <Button
                  as={Link}
                  to={`/compose-blog/${blog.id}`}
                  icon
                  labelPosition="right"
                  color="orange"
                  className="no-border-radius table-button"
                  fluid
                >
                  Edit
                  <Icon name="edit" />
                </Button>
              </Segment>
              <Segment className="no-padding">
                <Button
                  icon
                  labelPosition="right"
                  color="red"
                  className="no-border-radius table-button"
                  fluid
                  onClick={() => openConfirmDelete(blog)}
                >
                  Delete
                  <Icon name="trash alternate outline" />
                </Button>
              </Segment>
            </Segment.Group>
          </Segment.Group>
        ))}
      </React.Fragment>
    );
  };

  const NoBlogSegment = () => {
    return (
      <Segment placeholder>
        <Header icon>
          <Icon name="bell" />
          You don't seem to have any unsubmitted positioning guides.
        </Header>
        <Button primary onClick={addBlog} loading={addIsLoading}>
          Add positioning guide
        </Button>
      </Segment>
    );
  };

  return (
    <div className="chart-background">
      <Helmet>
        <title>{`My Positioning Guides | Rad X-Rays`}</title>
      </Helmet>
      <Container text className="padding-bottom-1">
        <CurrentBreadcrumbs />
        {blogPosts.length === 0 ? <NoBlogSegment /> : <BlogSegment />}
      </Container>
      <SubmitModal />
      <DeleteModal />
    </div>
  );
};
