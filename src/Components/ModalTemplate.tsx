import React from "react";
import { Modal } from "semantic-ui-react";

interface IProps {
  modalBody: JSX.Element;
  isOpen: boolean;
  closeModal: () => void;
}

export const ModalTemplate = ({ modalBody, isOpen, closeModal }: IProps) => {
  return (
    <Modal open={isOpen} onClose={closeModal} size="mini">
      <Modal.Content>{modalBody}</Modal.Content>
    </Modal>
  );
};
