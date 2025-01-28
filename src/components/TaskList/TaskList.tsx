import React from "react";
import { observer } from "mobx-react-lite";
import taskStore from "../../stores/taskStore";
import Task from "../Task/Task";
import styles from "./TaskList.module.scss";

const TaskList: React.FC = observer(() => {
  const handleDeleteTask = (taskId: string) => {
    taskStore.removeTask(taskId);
  };

  return (
    <div className={styles.taskList}>
      {taskStore.tasks.length > 0 ? (
        taskStore.tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onToggleCompletion={taskStore.toggleTaskCompletion}
            onDeleteTask={handleDeleteTask}
          />
        ))
      ) : (
        <div className={styles.taskList__placeholder}>
          <p>Задач пока нет. Добавьте новую задачу!</p>
        </div>
      )}
    </div>
  );
});

export default TaskList;
