import React from "react";
import Button from "../ui/Button/Button";
import TaskModel from "../../models/TaskModel";
import styles from "./TaskMenu.module.scss";

const TaskMenu: React.FC<{
  task: TaskModel;
  menuRef: React.RefObject<HTMLDivElement>;
  setIsModalOpen: (value: boolean) => void;
  setIsAddSubtaskModalOpen: (value: boolean) => void;
  onRemoveSubtask?: (subtaskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  isSubtask: boolean;
}> = ({
  task,
  menuRef,
  setIsModalOpen,
  setIsAddSubtaskModalOpen,
  onRemoveSubtask,
  onDeleteTask,
  isSubtask,
}) => {
  return (
    <div ref={menuRef} className={styles.task__menu}>
      <Button onClick={() => setIsModalOpen(true)}>Редактировать</Button>
      <Button onClick={() => setIsAddSubtaskModalOpen(true)}>
        Добавить подзадачу
      </Button>
      <Button
        onClick={() => {
          if (isSubtask && onRemoveSubtask) {
            onRemoveSubtask(task.id);
          } else {
            onDeleteTask(task.id);
          }
        }}
      >
        Удалить
      </Button>
    </div>
  );
};

export default TaskMenu;
