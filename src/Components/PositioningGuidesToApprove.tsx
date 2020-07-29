import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Breadcrumb,
  Button,
  Container,
  Form,
  Header,
  Icon,
  Image,
  Label,
  Modal,
  Segment,
  TextArea,
} from "semantic-ui-react";
import agent from "../agent";
import { IBlog } from "../models/blog";
import Loading from "./Loading";
import { ViewBlog } from "./ViewBlog";

export const PositioningGuidesToApprove = () => {
  const [blogPosts, setBlogPosts] = useState<IBlog[]>([]);
  const [pageIsLoading, setPageIsLoading] = useState(true);
  const [currentBlog, setCurrentBlog] = useState<IBlog | null>(null);
  const [rejectIsOpen, setRejectIsOpen] = useState(false);
  const [rejectIsLoading, setRejectIsLoading] = useState(false);
  const [approveIsLoading, setSubmitIsLoading] = useState(false);
  const [submitIsOpen, setSubmitIsOpen] = useState(false);
  const [previewIsOpen, setPreviewIsOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const getBlogs = async () => {
    try {
      const blogsFromDB = await agent.BlogPosts.listSubmittedPositioningGuides();
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

  const approveBlog = async () => {
    setSubmitIsLoading(true);
    try {
      await agent.BlogPosts.approve(currentBlog!.id);
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

  const rejectBlog = async () => {
    setRejectIsLoading(true);
    try {
      await agent.BlogPosts.reject(currentBlog!.id, feedback);
      setFeedback("");
      const updatedBlogs = blogPosts.filter(
        (blog) => blog.id !== currentBlog?.id
      );
      setBlogPosts(updatedBlogs);
      setRejectIsLoading(false);
      setRejectIsOpen(false);
      toast.success(`${currentBlog?.title} was successfully rejected.`);
    } catch (error) {
      toast.error("Error rejecting positioning guide.");
    }
  };

  const openConfirmReject = (selectedBlog: IBlog) => {
    setCurrentBlog(selectedBlog);
    setRejectIsOpen(true);
  };

  const openConfirmApprove = (selectedBlog: IBlog) => {
    setCurrentBlog(selectedBlog);
    setSubmitIsOpen(true);
  };

  const openPreviewBlog = (selectedBlog: IBlog) => {
    setCurrentBlog(selectedBlog);
    setPreviewIsOpen(true);
  };

  const ApproveModal = () => {
    return (
      <Modal
        dimmer="blurring"
        open={submitIsOpen}
        onClose={() => setSubmitIsOpen(false)}
        size="tiny"
      >
        <Modal.Header>Approve Positioning Guide</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            Are you sure that you want to approve &nbsp;
            <strong>{currentBlog?.title}</strong>
            &nbsp; and post it?
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setSubmitIsOpen(false)}>
            Cancel
          </Button>
          <Button
            positive
            content="Submit"
            onClick={approveBlog}
            loading={approveIsLoading}
          />
        </Modal.Actions>
      </Modal>
    );
  };

  const closeRejectModal = () => {
    setRejectIsOpen(false);
    setFeedback("");
  };

  const handleEditFeedback = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setFeedback(event.currentTarget.value.substring(0, 500));
  };

  const PreviewModal = () => {
    return (
      <Modal
        dimmer
        open={previewIsOpen}
        onClose={() => setPreviewIsOpen(false)}
        size="large"
      >
        <Modal.Header>Preview</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <ViewBlog blog={currentBlog!} />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setPreviewIsOpen(false)}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };

  const BlogSegment = () => {
    return (
      <React.Fragment>
        <Segment attached="top">
          <Header as="h1" textAlign="center">
            Positioning Guides to Approve
          </Header>
        </Segment>
        {blogPosts?.map((blog) => (
          <Segment.Group key={blog.id}>
            <Segment>
              {blog.coverImageUrl.length !== 0 ? (
                <Image
                  src={`${process.env.PUBLIC_URL}${blog.coverImageUrl}`}
                  className="blog-image-preview"
                />
              ) : null}
            </Segment>
            <Segment textAlign="center">
              <div className="rem-1-5">{blog.title}</div>
            </Segment>
            <Segment.Group horizontal>
              <Segment className="no-padding">
                <Button
                  onClick={() => openConfirmApprove(blog)}
                  to={`/compose-blog/${blog.id}`}
                  icon
                  labelPosition="right"
                  color="green"
                  className="no-border-radius table-button"
                  fluid
                >
                  Approve
                  <Icon name="check" />
                </Button>
              </Segment>
              <Segment className="no-padding">
                <Button
                  onClick={openPreviewBlog.bind(null, blog)}
                  icon
                  labelPosition="right"
                  color="orange"
                  className="no-border-radius table-button"
                  fluid
                >
                  Preview
                  <Icon name="file alternate outline" />
                </Button>
              </Segment>
              <Segment className="no-padding">
                <Button
                  icon
                  labelPosition="right"
                  color="red"
                  className="no-border-radius table-button"
                  fluid
                  onClick={() => openConfirmReject(blog)}
                >
                  Reject
                  <Icon name="close" />
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
          There don't seem to be any positioning guides to approve.
        </Header>
      </Segment>
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
          <Breadcrumb.Section>Positioning Guides to Approve</Breadcrumb.Section>
        </Breadcrumb>
      </Segment>
    );
  };

  return (
    <div className="chart-background">
      <Helmet>
        <title>{`Positioning Guides to Approve | Rad X-Rays`}</title>
      </Helmet>
      <Container text className="padding-bottom-1">
        <CurrentBreadcrumbs />
        {blogPosts.length === 0 ? <NoBlogSegment /> : <BlogSegment />}
      </Container>
      <ApproveModal />
      <PreviewModal />
      <Modal
        dimmer="blurring"
        open={rejectIsOpen}
        onClose={closeRejectModal}
        size="tiny"
      >
        <Modal.Header>Reject Positioning Guide</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Field>
                <Label pointing="below">Feedback</Label>
                <TextArea
                  rows="10"
                  placeholder="Feedback..."
                  value={feedback}
                  onChange={(event) => handleEditFeedback(event)}
                />
              </Form.Field>
            </Form>
          </Modal.Description>
          <br />
          Are you sure that you want to reject &nbsp;
          <strong>{currentBlog?.title}</strong>
          &nbsp; and send it back to the writer?
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={closeRejectModal}>
            Cancel
          </Button>
          <Button
            negative
            content="Reject"
            onClick={rejectBlog}
            loading={rejectIsLoading}
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};
