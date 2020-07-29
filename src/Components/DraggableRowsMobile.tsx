import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Table, Button, Icon } from "semantic-ui-react";
import { ITechnique } from "../models/chart";

interface IProps {
  Techniques: ITechnique[];
  SetTechniques: (techniques: ITechnique[]) => void;
  HandleEdit: (technique: ITechnique) => void;
}

export const DraggableRowsMobile: React.FC<IProps> = ({
  Techniques,
  SetTechniques,
  HandleEdit
}) => {
  const reorder = (list: ITechnique[], startIndex: any, endIndex: any) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    if (startIndex < endIndex)
      result.forEach(item =>
        item.index <= endIndex && item.index > startIndex ? item.index-- : item
      );
    if (startIndex > endIndex)
      result.forEach(item =>
        item.index >= endIndex && item.index < startIndex ? item.index++ : item
      );
    removed.index = endIndex;
    result.splice(endIndex, 0, removed);

    return result;
  };

  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "DimGray",

    // styles we need to apply on draggables
    ...draggableStyle
  });

  const getListStyle = (isDraggingOver: any) => ({
    background: isDraggingOver ? "lightblue" : "black"
  });

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const updatedItems: ITechnique[] = reorder(
      Techniques,
      result.source.index,
      result.destination.index
    );

    SetTechniques(updatedItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <tbody
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {Techniques.map((item: ITechnique, index: any) => (
              <Draggable
                key={item.id}
                draggableId={item.id.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <tr
                    key={item.index}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <Table.Cell>{item.bodyPart}</Table.Cell>
                    <Table.Cell>{item.kVp}</Table.Cell>
                    <Table.Cell>{item.mAs}</Table.Cell>
                    <Table.Cell selectable>
                      <Button
                        icon
                        labelPosition="right"
                        color="blue"
                        onClick={() => HandleEdit(item)}
                        className="no-border-radius table-button"
                      >
                        Edit
                        <Icon name="edit" />
                      </Button>
                    </Table.Cell>
                  </tr>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </tbody>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableRowsMobile;
