import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import TaskModel from "../../models/TaskModel";
import InputField from "../InputField/InputField";
import Button from "../ui/Button/Button";
import styles from "./Task.module.scss";

interface TaskProps {
  task: TaskModel;
  onToggleCompletion: (task: TaskModel) => void;
  onDeleteTask: (taskId: string) => void;
  isSubtask?: boolean;
}

const Task: React.FC<TaskProps> = observer(
  ({ task, onToggleCompletion, onDeleteTask, isSubtask = false }) => {
    const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);

    const handleAddSubtask = () => {
      if (newSubtaskTitle.trim()) {
        task.addSubtask(newSubtaskTitle);
        setNewSubtaskTitle("");
      }
    };

    const handleEditTitle = () => {
      if (isEditing && editedTitle.trim()) {
        task.setTitle(editedTitle);
      }
      setIsEditing(!isEditing);
    };

    return (
      <div className={styles.task}>
        <div className={styles.task__header}>
          <label
            htmlFor={`task-checkbox-${task.id}`}
            className={styles.task__label}
          >
            <input
              id={`task-checkbox-${task.id}`}
              className={styles.task__check}
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => onToggleCompletion(task)}
            />
          </label>

          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={handleEditTitle}
              onKeyDown={(e) => e.key === "Enter" && handleEditTitle()}
              autoFocus
            />
          ) : (
            <span
              className={styles.task__title}
              onClick={() => setIsEditing(true)}
            >
              {task.title}
            </span>
          )}

          <Button
            onClick={() => onDeleteTask(task.id)}
            className={styles.task__del}
          >
            <svg
              width="800px"
              height="800px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Button>
        </div>

        {/* Отображаем подзадачи, если они есть */}
        {task.subtasks.length > 0 && (
          <div className={styles.subtasks}>
            {task.subtasks.map((subtask) => (
              <Task
                key={subtask.id}
                task={subtask}
                onToggleCompletion={onToggleCompletion}
                onDeleteTask={onDeleteTask}
                isSubtask={true} // Указываем, что это подзадача
              />
            ))}
          </div>
        )}

        {/* Поле для добавления подзадачи, только если это не подзадача */}
        {!isSubtask && (
          <div className={styles.addSubtask}>
            <InputField
              value={newSubtaskTitle}
              onChange={setNewSubtaskTitle}
              placeholder="Название подзадачи"
            />
            <Button onClick={handleAddSubtask}>+</Button>
          </div>
        )}
      </div>
    );
  }
);

export default Task;
