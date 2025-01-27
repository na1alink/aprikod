import { makeAutoObservable } from "mobx";
import TaskModel from "../models/TaskModel";

class TaskStore {
  tasks: TaskModel[] = []; // Задачи первого уровня

  constructor() {
    makeAutoObservable(this);
  }

  // Добавление задачи первого уровня
  addTask(title: string) {
    this.tasks.push(new TaskModel(title));
  }

  // Переключение статуса выполнения задачи
  toggleTaskCompletion(task: TaskModel) {
    task.toggleCompletion();
  }

  // Удаление задачи (первого уровня или подзадачи)
  removeTask(taskId: string) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }
}

const taskStore = new TaskStore();
export default taskStore;
