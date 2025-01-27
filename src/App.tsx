import React from "react";
import TaskList from "./components/TaskList/TaskList";
import taskStore from "./stores/taskStore";

import Header from "./components/layout/Header/Header";
import LayoutContainer from "./components/layout/LayoutContainer/LayoutContainer";
import AddTask from "./components/AddTask/AddTask";

const App: React.FC = () => {
  const handleAddTask = (title: string) => {
    taskStore.addTask(title); // Добавление задачи в хранилище
  };

  return (
    <>
      <Header />
      <main>
        <section>
          <LayoutContainer>
            <AddTask onAddTask={handleAddTask} placeholder="Добавить задачу" />
            <TaskList />
          </LayoutContainer>
        </section>
      </main>
    </>
  );
};

export default App;
