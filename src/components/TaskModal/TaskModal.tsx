import React from "react";
import Button from "../ui/Button/Button";
import Modal from "../ui/Modal/Modal";
import InputField from "../InputField/InputField";
import styles from "./TaskModal.module.scss";

const TaskModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  editedTitle: string;
  setEditedTitle: (value: string) => void;
  handleSaveChanges: () => void;
}> = ({ isOpen, onClose, editedTitle, setEditedTitle, handleSaveChanges }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalContent}>
        <InputField
          value={editedTitle}
          onChange={setEditedTitle}
          placeholder="Название задачи"
        />
        <Button onClick={handleSaveChanges} className={styles.modalButtonSave}>
          Сохранить изменения
        </Button>
      </div>
    </Modal>
  );
};

export default TaskModal;
