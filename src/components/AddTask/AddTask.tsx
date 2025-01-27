import React, { useState } from "react";
import InputField from "../InputField/InputField";
import Button from "../ui/Button/Button";
import styles from "./AddTask.module.scss";

interface AddTaskProps {
  onAddTask: (title: string) => void;
  placeholder?: string;
}

const AddTask: React.FC<AddTaskProps> = ({ onAddTask, placeholder }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      onAddTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  return (
    <div className={styles.addTask}>
      <InputField
        value={newTaskTitle}
        onChange={setNewTaskTitle}
        onEnterPress={handleAddTask}
        placeholder={placeholder || "Название задачи"}
      />
      <Button onClick={handleAddTask}>+</Button>
    </div>
  );
};

export default AddTask;
