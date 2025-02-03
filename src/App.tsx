import React from "react";
import TaskList from "./components/TaskList/TaskList";
import taskStore from "./stores/taskStore";

import Header from "./components/layout/Header/Header";
import LayoutContainer from "./components/layout/LayoutContainer/LayoutContainer";
import AddTask from "./components/AddTask/AddTask";
import TaskModel from "./models/TaskModel";

import styles from "./App.module.scss";

const App: React.FC = () => {
  const handleAddTask = (title: string, subtasks: TaskModel[] = []) => {
    taskStore.addTask(title, subtasks);
  };

  return (
    <>
      <Header />
      <main>
        <section className={styles.content}>
          <LayoutContainer>
            <AddTask onAddTask={handleAddTask} />
            <TaskList />
          </LayoutContainer>
        </section>
      </main>
    </>
  );
};

export default App;
