import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import TaskModel from "../../models/TaskModel";
import Button from "../ui/Button/Button";
import Modal from "../ui/Modal/Modal";
import styles from "./Task.module.scss";
import InputField from "../InputField/InputField";

interface TaskProps {
  task: TaskModel;
  onToggleCompletion: (task: TaskModel) => void;
  onDeleteTask: (taskId: string) => void;
  onRemoveSubtask?: (subtaskId: string) => void;
  isSubtask?: boolean;
}

const Task: React.FC<TaskProps> = observer(
  ({
    task,
    onToggleCompletion,
    onDeleteTask,
    onRemoveSubtask,
    isSubtask = false,
  }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddSubtaskModalOpen, setIsAddSubtaskModalOpen] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [newSubtasks, setNewSubtasks] = useState<string[]>([""]);
    const [showMenu, setShowMenu] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          menuRef.current &&
          !menuRef.current.contains(event.target as Node)
        ) {
          setShowMenu(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleSaveChanges = () => {
      task.setTitle(editedTitle);
      setIsModalOpen(false);
    };

    const handleAddSubtasks = () => {
      newSubtasks.forEach((title) => {
        if (title.trim()) {
          task.addSubtask(title);
        }
      });
      setNewSubtasks([]);
      setIsAddSubtaskModalOpen(false);
    };

    const handleToggleMenu = () => {
      setShowMenu(!showMenu);
    };

    const isTaskCompleted =
      task.isCompleted && task.subtasks.every((subtask) => subtask.isCompleted);

    return (
      <div
        className={`${styles.task} ${isTaskCompleted ? styles.completed : ""} ${
          isSubtask ? styles.taskSubtask : ""
        }`}
      >
        <div className={styles.task__header}>
          <input
            id={`task-checkbox-${task.id}`}
            className={styles.task__check}
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => onToggleCompletion(task)}
          />
          <label
            htmlFor={`task-checkbox-${task.id}`}
            className={styles.task__label}
          ></label>
          <span className={styles.task__title}>{task.title}</span>
          <button onClick={handleToggleMenu} className={styles.task__menu}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="1" fill="currentColor" />
              <circle cx="12" cy="6" r="1" fill="currentColor" />
              <circle cx="12" cy="18" r="1" fill="currentColor" />
            </svg>
          </button>
          {showMenu && (
            <div ref={menuRef} className={styles.task__menu__options}>
              <Button onClick={() => setIsModalOpen(true)}>
                Редактировать
              </Button>
              {!isSubtask && (
                <Button onClick={() => setIsAddSubtaskModalOpen(true)}>
                  Добавить подзадачу
                </Button>
              )}
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
          )}
        </div>

        {!isSubtask && task.subtasks.length > 0 && (
          <div className={styles.task__subtasks}>
            {task.subtasks.map((subtask) => (
              <Task
                key={subtask.id}
                task={subtask}
                onToggleCompletion={onToggleCompletion}
                onDeleteTask={onDeleteTask}
                onRemoveSubtask={(subtaskId) => task.removeSubtask(subtaskId)}
                isSubtask={true}
              />
            ))}
          </div>
        )}

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className={styles.modalContent}>
            <InputField
              value={editedTitle}
              onChange={setEditedTitle}
              placeholder="Название задачи"
            />
            <Button
              onClick={handleSaveChanges}
              className={styles.modalButtonSave}
            >
              Сохранить изменения
            </Button>
          </div>
        </Modal>

        <Modal
          isOpen={isAddSubtaskModalOpen}
          onClose={() => setIsAddSubtaskModalOpen(false)}
        >
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
      </div>
    );
  }
);

export default Task;
