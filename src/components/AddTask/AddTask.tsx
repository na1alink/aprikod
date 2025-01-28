import React, { useState } from "react";
import InputField from "../InputField/InputField";
import Button from "../ui/Button/Button";
import styles from "./AddTask.module.scss";
import Modal from "../ui/Modal/Modal";
import TaskModel from "../../models/TaskModel";
import taskStore from "../../stores/taskStore";

interface AddTaskProps {
  onAddTask: (title: string, subtasks?: TaskModel[]) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [subtasks, setSubtasks] = useState<string[]>([]);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const subtaskModels = subtasks
        .concat(newSubtaskTitle.trim() ? [newSubtaskTitle] : [])
        .map((subtask) => new TaskModel(subtask));
      onAddTask(newTaskTitle, subtaskModels);
      setNewTaskTitle("");
      setSubtasks([]);
      setNewSubtaskTitle("");
      setIsModalOpen(false);
    }
  };

  const handleRemoveTask = () => {
    taskStore.clearAllTasks();
  };

  const handleAddSubtask = () => {
    if (newSubtaskTitle.trim()) {
      setSubtasks([...subtasks, newSubtaskTitle]);
      setNewSubtaskTitle("");
    }
  };

  return (
    <div className={styles.addTask}>
      <div className={styles.addTask__top}>
        <Button
          className={styles.addTask__button}
          onClick={() => setIsModalOpen(true)}
        >
          Новая задача
        </Button>

        <Button
          className={styles.addTask__button}
          onClick={() => handleRemoveTask()}
        >
          Очистить все
        </Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className={styles.modalContent}>
          <InputField
            value={newTaskTitle}
            onChange={setNewTaskTitle}
            placeholder="Название задачи"
          />

          <div className={styles.subtasksSection}>
            {subtasks.map((subtask, index) => (
              <div key={index} className={styles.subtask}>
                {subtask}
              </div>
            ))}

            <InputField
              value={newSubtaskTitle}
              onChange={setNewSubtaskTitle}
              placeholder="Название подзадачи"
            />
          </div>

          <div className={styles.modalBottom}>
            <Button
              variant="secondary"
              onClick={handleAddSubtask}
              className={styles.modalContent}
            >
              Добавить еще подзадачу
            </Button>
            <Button onClick={handleAddTask}>Сохранить</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddTask;
