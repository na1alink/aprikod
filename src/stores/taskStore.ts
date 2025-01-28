import { makeAutoObservable } from "mobx";
import TaskModel, { TaskData } from "../models/TaskModel";

const TASKS_STORAGE_KEY = "tasks";

class TaskStore {
  tasks: TaskModel[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadTasksFromLocalStorage();
  }

  loadTasksFromLocalStorage() {
    const tasksJson = localStorage.getItem(TASKS_STORAGE_KEY);
    if (tasksJson) {
      const tasksData: TaskData[] = JSON.parse(tasksJson);
      this.tasks = tasksData.map((taskData) => this.parseTaskData(taskData));
    }
  }

  saveTasksToLocalStorage() {
    const tasksJson = JSON.stringify(this.tasks.map((task) => task.toJSON()));
    localStorage.setItem(TASKS_STORAGE_KEY, tasksJson);
  }

  parseTaskData(taskData: TaskData): TaskModel {
    const task = new TaskModel(taskData.title);
    task.id = taskData.id;
    task.isCompleted = taskData.isCompleted;
    task.subtasks = taskData.subtasks.map((subtaskData) =>
      this.parseTaskData(subtaskData)
    );
    return task;
  }

  addTask(title: string, subtasks: TaskModel[] = []) {
    this.tasks.push(new TaskModel(title, subtasks));
    this.saveTasksToLocalStorage();
  }

  toggleTaskCompletion(task: TaskModel) {
    task.toggleCompletion();
    task.checkSubtasksCompletion();
    this.saveTasksToLocalStorage();
  }

  removeTask(taskId: string) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.saveTasksToLocalStorage();
  }

  clearAllTasks() {
    this.tasks = [];
  }
}

const taskStore = new TaskStore();
export default taskStore;
