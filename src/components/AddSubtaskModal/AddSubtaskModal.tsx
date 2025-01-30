import React from "react";
import Button from "../ui/Button/Button";
import Modal from "../ui/Modal/Modal";
import InputField from "../InputField/InputField";
import styles from "./AddSubtaskModal.module.scss";

const AddSubtaskModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  newSubtasks: string[];
  setNewSubtasks: (value: string[]) => void;
  handleAddSubtasks: () => void;
}> = ({ isOpen, onClose, newSubtasks, setNewSubtasks, handleAddSubtasks }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalContent}>
        {newSubtasks.map((subtask, index) => (
          <InputField
            key={index}
            value={subtask}
            onChange={(value) => {
              const updatedSubtasks = [...newSubtasks];
              updatedSubtasks[index] = value;
              setNewSubtasks(updatedSubtasks);
            }}
            placeholder="Название подзадачи"
          />
        ))}
        <div className={styles.modalBottom}>
          <Button
            onClick={() => setNewSubtasks([...newSubtasks, ""])}
            className={styles.modalButtonSave}
            variant="secondary"
          >
            Добавить еще поле
          </Button>
          <Button
            onClick={handleAddSubtasks}
            className={styles.modalButtonSave}
          >
            Сохранить
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddSubtaskModal;
