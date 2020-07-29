import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Icon,
  Button,
  Responsive,
  Form,
  Input,
  Segment,
  Modal,
  Image,
  Grid,
  TextArea,
  Label,
  ButtonGroup,
  Breadcrumb,
} from "semantic-ui-react";
import { IBlogSection, ElementType, IBlog } from "../models/blog";
import DraggableBlog from "./DraggableBlog";
import { toast } from "react-toastify";
import agent from "../agent";
import { useParams, Link } from "react-router-dom";
import Loading from "./Loading";
import { ViewBlog } from "./ViewBlog";
import { Helmet } from "react-helmet";

export const ComposeBlog = () => {
  const [pageIsLoading, setPageIsLoading] = useState(true);
  const { id } = useParams();

  const [addIsOpen, setAddIsOpen] = useState(false);
  const [previewIsOpen, setPreviewIsOpen] = useState(false);
  const [saveIsLoading, setSaveIsLoading] = useState(false);

  const [coverImageSrc, setCoverImageSrc] = useState<
    string | ArrayBuffer | null
  >(null);

  const emptySection: IBlogSection = { id: "", index: -1, type: 0 };
  const [currentSection, setCurrentSection] = useState<IBlogSection>(
    emptySection
  );
  const [editTextIsOpen, setEditTextIsOpen] = useState(false);
  const [editLongTextIsOpen, setEditLongTextIsOpen] = useState(false);

  const coverImageInputRef = useRef<HTMLInputElement>(null);

  const initialBlog: IBlog = {
    id: "blank",
    title: "Blank",
    sections: [],
    ownerUsername: "blank",
    coverImageUrl: "",
  };

  const [blog, setBlog] = useState<IBlog>(initialBlog);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const blogFromDB: IBlog = await agent.BlogPosts.getMyBlog(id!);
        setCoverImageSrc(
          `${process.env.PUBLIC_URL}${blogFromDB.coverImageUrl}`
        );
        setBlog(blogFromDB);
        setPageIsLoading(false);
      } catch (error) {
        toast.error("Error getting blog.");
      }
    };

    getBlog();
  }, [id]);

  if (pageIsLoading) return <Loading content="Loading blog post..." />;

  const handleTitleChange = (event: any) => {
    let updatedBlog: IBlog = {
      id: blog.id,
      title: event.target.value.substring(0, 50),
      sections: [...blog.sections],
      ownerUsername: blog.ownerUsername,
      coverImageUrl: blog.coverImageUrl,
      coverImageFile: blog.coverImageFile,
    };
    setBlog(updatedBlog);
  };

  const SetImageButton: React.FC<{ section: IBlogSection }> = ({ section }) => {
    const handleClick = () => {
      setCurrentSection(section);
      coverImageInputRef.current!.click();
    };

    return (
      <Button
        icon
        labelPosition="right"
        color="blue"
        onClick={handleClick}
        className="no-border-radius table-button"
      >
        Set Image
        <Icon name="file image" />
      </Button>
    );
  };

  const handleImageChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event) => {
    if (event.target.files?.length === 0) return;

    if (
      event.target.files![0].type !== "image/jpeg" &&
      event.target.files![0].type !== "image/png"
    ) {
      toast.error("Image type must be jpeg or png.");
      return;
    }

    const maxImageSizeKB = 501;

    if (event.target.files![0].size > maxImageSizeKB * 1000) {
      toast.error("Images must be smaller than 500kb.");
      return;
    }

    const reader = new FileReader();

    // read the image file as a data URL.
    reader.readAsDataURL(event.target.files![0]);

    reader.onload = function (e) {
      const file = reader.result;
      if (file !== null && typeof file === "string") {
        if (
          currentSection.id === emptySection.id &&
          currentSection.index === emptySection.index
        ) {
          setCoverImageSrc(e.target!.result);
          setBlog({ ...blog, coverImageFile: file });
        } else {
          let updatedSection = { ...currentSection };
          updatedSection.imageSrc = e.target!.result!.toString();
          updatedSection.imageFile = file;
          let updatedSections = [...blog.sections];
          updatedSections[currentSection.index] = updatedSection;
          setSections(updatedSections);
          setCurrentSection(emptySection);
        }
      }
    };
  };

  const openEdit = (section: IBlogSection) => {
    setCurrentSection(section);
    if (
      section.type === ElementType.Paragraph ||
      section.type === ElementType.ListItem
    )
      setEditLongTextIsOpen(true);
    else setEditTextIsOpen(true);
  };

  const handleEdit = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.FormEvent<HTMLTextAreaElement>
  ) => {
    let maxLength = 0;
    switch (currentSection.type) {
      case ElementType.Heading:
        maxLength = 50;
        break;
      case ElementType.Paragraph:
        maxLength = 5000;
        break;
      case ElementType.ListItem:
        maxLength = 5000;
        break;
      case ElementType.Image:
        maxLength = 100;
        break;
      default:
        break;
    }
    let updatedSection: IBlogSection = {
      ...currentSection,
      text: event.currentTarget.value.substring(0, maxLength),
    };
    setCurrentSection(updatedSection);
  };

  const confirmEdit = () => {
    let updatedSections = [...blog.sections];
    updatedSections[currentSection.index] = currentSection;
    setSections(updatedSections);
    closeEdit();
  };

  const closeEdit = () => {
    setEditTextIsOpen(false);
    setEditLongTextIsOpen(false);
    setCurrentSection(emptySection);
  };

  const removeSection = () => {
    const updatedSections = blog.sections.filter((x) => x !== currentSection);
    setSections(updatedSections);
    closeEdit();
  };

  const setSections = (sections: IBlogSection[]) => {
    const updatedBlog: IBlog = { ...blog, sections };
    setBlog(updatedBlog);
  };

  const addHeading = () => {
    const newSection: IBlogSection = {
      id: blog.sections.length.toString() + Math.random(),
      type: ElementType.Heading,
      text: "Blank",
      index: blog.sections.length,
    };
    setSections([...blog.sections, newSection]);
    setAddIsOpen(false);
  };

  const addParagraph = () => {
    const newSection: IBlogSection = {
      id: blog.sections.length.toString() + Math.random(),
      type: ElementType.Paragraph,
      text: "Blank",
      index: blog.sections.length,
    };
    setSections([...blog.sections, newSection]);
    setAddIsOpen(false);
  };

  const addListItem = () => {
    const newSection: IBlogSection = {
      id: blog.sections.length.toString() + Math.random(),
      type: ElementType.ListItem,
      text: "Blank",
      index: blog.sections.length,
    };
    setSections([...blog.sections, newSection]);
    setAddIsOpen(false);
  };

  const addImage = () => {
    const newSection: IBlogSection = {
      id: blog.sections.length.toString() + Math.random(),
      type: ElementType.Image,
      text: "Blank",
      index: blog.sections.length,
      imageFile: undefined,
      imageUrl:
        "https://takeradxrays.s3.us-east-2.amazonaws.com/Loch-Ness-big.png",
    };
    setSections([...blog.sections, newSection]);
    setAddIsOpen(false);
  };

  const saveBlog = async () => {
    setSaveIsLoading(true);
    try {
      await agent.BlogPosts.edit(blog);
      let updatedSections = [...blog.sections];
      updatedSections.forEach((x) => (x.imageFile = null));
      let updatedBlog = { ...blog, updatedSections };
      updatedBlog.coverImageFile = null;
      setBlog(updatedBlog);
      setSaveIsLoading(false);
      toast.success(`${blog.title} has been saved!`);
    } catch (error) {
      toast.error("Error saving post.");
      setSaveIsLoading(false);
    }
  };

  const AddSectionModal = () => {
    return (
      <Modal
        dimmer
        open={addIsOpen}
        onClose={() => setAddIsOpen(false)}
        size="mini"
      >
        <Modal.Header>Add Section</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Container>
              <Button.Group vertical primary className="text-center width-100">
                <Button
                  primary
                  content="Heading"
                  onClick={addHeading}
                  className="no-border-radius button-border"
                  icon="plus"
                  labelPosition="right"
                />
                <Button
                  primary
                  content="Paragraph"
                  onClick={addParagraph}
                  className="no-border-radius button-border"
                  icon="plus"
                  labelPosition="right"
                />
                <Button
                  primary
                  content="List Item"
                  onClick={addListItem}
                  className="no-border-radius button-border"
                  icon="plus"
                  labelPosition="right"
                />
                <Button
                  primary
                  content="Image"
                  onClick={addImage}
                  className="no-border-radius button-border"
                  icon="plus"
                  labelPosition="right"
                />
              </Button.Group>
            </Container>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setAddIsOpen(false)}>
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
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
            <ViewBlog blog={blog} />
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

  const Toolbar = () => {
    return (
      <div className="border blog-tools">
        <Button.Group widths="3">
          <Button
            icon
            labelPosition="right"
            color="blue"
            onClick={() => setAddIsOpen(true)}
            className="no-border-radius"
          >
            Add Section
            <Icon name="plus" />
          </Button>
          <Button
            icon
            labelPosition="right"
            color="orange"
            onClick={() => setPreviewIsOpen(true)}
            className="no-border-radius"
          >
            Preview
            <Icon name="file alternate outline" />
          </Button>
          <Button
            icon
            labelPosition="right"
            color="green"
            className="no-border-radius"
            loading={saveIsLoading}
            onClick={saveBlog}
          >
            Save
            <Icon name="save" />
          </Button>
        </Button.Group>
        <Segment attached textAlign="center" className="no-border">
          <Icon circular color="yellow" name="warning" />
          Drag and drop sections to rearrange them.
        </Segment>
      </div>
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
          <Breadcrumb.Section as={Link} to="/my-blog-posts">
            My Blog Posts
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section>Compose Blog</Breadcrumb.Section>
        </Breadcrumb>
        <div className="important">
          **Make sure to save before leaving this page!
        </div>
      </Segment>
    );
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>{`Compose Post | Rad X-Rays`}</title>
      </Helmet>
      <Responsive as={Toolbar} maxWidth={767} />
      <Responsive as={Toolbar} minWidth={768} />
      <div className="compose-background">
        <Container text>
          <CurrentBreadcrumbs />
          <Form className="margin-bottom-1">
            <Form.Field>
              <Input
                label="Title"
                required
                value={blog.title}
                placeholder="Title..."
                onChange={handleTitleChange}
              />
            </Form.Field>
          </Form>

          <Segment.Group>
            <Segment className="no-border-radius light-gray-background">
              {typeof blog.coverImageUrl === "string" ? (
                <Image
                  src={coverImageSrc}
                  centered
                  className="blog-image-preview"
                />
              ) : null}
            </Segment>
            <Segment className="no-border-radius">
              <Grid columns={2}>
                <Grid.Row verticalAlign="middle">
                  <Grid.Column textAlign="center">
                    <h3>Cover Image</h3>
                  </Grid.Column>
                  <Grid.Column>
                    <SetImageButton section={emptySection} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
            <input
              ref={coverImageInputRef}
              hidden
              type="file"
              onChange={handleImageChange}
            />
          </Segment.Group>
          <DraggableBlog
            sections={blog.sections}
            setSections={setSections}
            handleEdit={openEdit}
            SetImageButton={SetImageButton}
          />
        </Container>
      </div>
      <AddSectionModal />
      <PreviewModal />

      <Modal
        dimmer="blurring"
        open={editTextIsOpen}
        onClose={() => setEditTextIsOpen(false)}
      >
        <Modal.Header>Edit Section</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Field>
                <Input
                  label="Text"
                  placeholder="Text..."
                  value={currentSection.text}
                  onChange={(event) => handleEdit(event)}
                />
              </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <ButtonGroup widths="3">
            <Button
              negative
              content="Remove"
              onClick={removeSection}
              icon="trash alternate outline"
              labelPosition="right"
            />
            <Button color="black" onClick={closeEdit}>
              Cancel
            </Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Set"
              onClick={confirmEdit}
            />
          </ButtonGroup>
        </Modal.Actions>
      </Modal>

      <Modal
        dimmer="blurring"
        open={editLongTextIsOpen}
        onClose={() => setEditLongTextIsOpen(false)}
      >
        <Modal.Header>Edit Section</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Field>
                <Label pointing="below">Text</Label>
                <TextArea
                  rows="10"
                  placeholder="Text..."
                  value={currentSection.text}
                  onChange={(event) => handleEdit(event)}
                />
              </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <ButtonGroup widths="3">
            <Button
              negative
              content="Remove"
              onClick={removeSection}
              icon="trash alternate outline"
              labelPosition="right"
            />
            <Button color="black" onClick={closeEdit}>
              Cancel
            </Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Set"
              onClick={confirmEdit}
            />
          </ButtonGroup>
        </Modal.Actions>
      </Modal>
    </React.Fragment>
  );
};
