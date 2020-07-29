import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Button, Grid, Icon, Segment } from "semantic-ui-react";
import { ElementType, IBlogSection } from "../models/blog";
import { BlogHeading } from "./BlogHeading";
import { BlogImage } from "./BlogImage";
import { BlogListItem } from "./BlogListItem";
import { BlogParagraph } from "./BlogParagraph";

interface IProps {
  sections: IBlogSection[];
  setSections: (sections: IBlogSection[]) => void;
  handleEdit: (sections: IBlogSection) => void;
  SetImageButton: React.FC<{ section: IBlogSection }>;
}

export const DisplayElement: React.FC<{ section: IBlogSection }> = ({
  section,
}) => {
  switch (section.type) {
    case ElementType.Heading:
      return <BlogHeading id={section.id} text={section.text!} />;
    case ElementType.Paragraph:
      return <BlogParagraph id={section.id} text={section.text!} />;
    case ElementType.ListItem:
      return <BlogListItem id={section.id} text={section.text!} />;
    case ElementType.Image:
      return (
        <BlogImage
          id={section.id}
          text={section.text!}
          imageURL={section.imageUrl}
          imageSrc={section.imageSrc}
        />
      );

    default:
      return <div>Something is broken...</div>;
  }
};

export const DraggableBlog: React.FC<IProps> = ({
  sections,
  setSections,
  handleEdit,
  SetImageButton,
}) => {
  const reorder = (list: IBlogSection[], startIndex: any, endIndex: any) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    if (startIndex < endIndex)
      result.forEach((item) =>
        item.index <= endIndex && item.index > startIndex ? item.index-- : item
      );
    if (startIndex > endIndex)
      result.forEach((item) =>
        item.index >= endIndex && item.index < startIndex ? item.index++ : item
      );
    removed.index = endIndex;
    result.splice(endIndex, 0, removed);

    return result;
  };

  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "lightgray",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver: any) => ({
    background: isDraggingOver ? "lightblue" : "darkgray",
  });

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const updatedItems: IBlogSection[] = reorder(
      sections,
      result.source.index,
      result.destination.index
    );

    setSections(updatedItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {sections.map((item: IBlogSection, index: any) => (
              <Draggable
                key={item.id}
                draggableId={item.id.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    className="margin-bottom-1 padding-top-1"
                    key={item.index}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <DisplayElement section={item} />

                    <Segment className="no-border-radius">
                      <Grid columns={2}>
                        <Grid.Row verticalAlign="middle">
                          <Grid.Column textAlign="center">
                            {item.type === ElementType.Image ? (
                              <SetImageButton section={item} />
                            ) : (
                              <h3>{ElementType[item.type]}</h3>
                            )}
                          </Grid.Column>
                          <Grid.Column>
                            <Button
                              icon
                              labelPosition="right"
                              color="blue"
                              onClick={() => handleEdit(item)}
                              className="no-border-radius table-button"
                            >
                              Edit Section
                              <Icon name="edit" />
                            </Button>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Segment>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableBlog;
