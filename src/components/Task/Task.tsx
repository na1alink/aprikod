import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import taskStore from "../../stores/taskStore";
import TaskModel from "../../models/TaskModel";

import styles from "./Task.module.scss";
import SubtasksList from "../SubtasksList/SubtasksList";
import TaskModal from "../TaskModal/TaskModal";
import AddSubtaskModal from "../AddSubtaskModal/AddSubtaskModal";
import TaskMenu from "../TaskMenu/TaskMenu";

interface TaskProps {
  task: TaskModel;
  onToggleCompletion: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onRemoveSubtask?: (subtaskId: string) => void;
  isSubtask?: boolean;
  depth?: number;
}
const Task: React.FC<TaskProps> = observer(
  ({
    task,
    onToggleCompletion,
    onDeleteTask,
    onRemoveSubtask,
    isSubtask = false,
    depth = 0,
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
      taskStore.saveTasksToLocalStorage();
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
      taskStore.saveTasksToLocalStorage();
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
        } ${styles[`depth-${depth}`]} `}
      >
        <div className={styles.task__header}>
          <input
            id={`task-checkbox-${task.id}`}
            className={styles.task__check}
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => onToggleCompletion(task.id)}
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
            <TaskMenu
              task={task}
              menuRef={menuRef}
              setIsModalOpen={setIsModalOpen}
              setIsAddSubtaskModalOpen={setIsAddSubtaskModalOpen}
              onRemoveSubtask={onRemoveSubtask}
              onDeleteTask={onDeleteTask}
              isSubtask={isSubtask}
            />
          )}
        </div>
        {task.subtasks.length > 0 && (
          <SubtasksList
            task={task}
            onToggleCompletion={onToggleCompletion}
            onDeleteTask={onDeleteTask}
            onRemoveSubtask={(subtaskId) => task.removeSubtask(subtaskId)}
            depth={depth + 1}
          />
        )}
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          editedTitle={editedTitle}
          setEditedTitle={setEditedTitle}
          handleSaveChanges={handleSaveChanges}
        />
        <AddSubtaskModal
          isOpen={isAddSubtaskModalOpen}
          onClose={() => setIsAddSubtaskModalOpen(false)}
          newSubtasks={newSubtasks}
          setNewSubtasks={setNewSubtasks}
          handleAddSubtasks={handleAddSubtasks}
        />
      </div>
    );
  }
);

export default Task;
