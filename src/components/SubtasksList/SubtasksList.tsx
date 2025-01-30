import React from "react";
import Task from "../Task/Task";
import TaskModel from "../../models/TaskModel";
import styles from "./SubtasksList.module.scss";

const SubtasksList: React.FC<{
  task: TaskModel;
  onToggleCompletion: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onRemoveSubtask: (subtaskId: string) => void;
  depth: number;
}> = ({ task, onToggleCompletion, onDeleteTask, onRemoveSubtask, depth }) => {
  return (
    <div className={styles.subtasks__link}>
      {task.subtasks.map((subtask) => (
        <Task
          key={subtask.id}
          task={subtask}
          onToggleCompletion={onToggleCompletion}
          onDeleteTask={onDeleteTask}
          onRemoveSubtask={onRemoveSubtask}
          isSubtask={true}
          depth={depth + 1}
        />
      ))}
    </div>
  );
};

export default SubtasksList;
