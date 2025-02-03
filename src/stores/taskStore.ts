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
      try {
        const tasksData: TaskData[] = JSON.parse(tasksJson);
        console.log("Loaded tasks data:", tasksData);
        this.tasks = tasksData.map((taskData) => this.parseTaskData(taskData));
      } catch (error) {
        console.error("Error loading tasks from localStorage", error);
        this.tasks = [];
      }
    } else {
      console.log("No tasks found in localStorage");
    }
  }

  saveTasksToLocalStorage() {
    const tasksJson = JSON.stringify(this.tasks.map((task) => task.toJSON()));
    localStorage.setItem(TASKS_STORAGE_KEY, tasksJson);
  }

  parseTaskData(taskData: TaskData, parent?: TaskModel): TaskModel {
    const task = new TaskModel(taskData.title, parent);
    task.id = taskData.id;
    task.isCompleted = taskData.isCompleted;

    task.subtasks = taskData.subtasks.map((subtaskData) =>
      this.parseTaskData(subtaskData, task)
    );

    return task;
  }

  addTask(title: string, subtasks: TaskModel[] = []) {
    const newTask = new TaskModel(title, undefined, subtasks);
    this.tasks.push(newTask);
    this.saveTasksToLocalStorage();
  }

  toggleTaskCompletion(taskId: string) {
    const findTaskById = (tasks: TaskModel[], id: string): TaskModel | null => {
      for (const task of tasks) {
        if (task.id === id) {
          return task;
        }
        const subtask = findTaskById(task.subtasks, id);
        if (subtask) {
          return subtask;
        }
      }
      return null;
    };

    const task = findTaskById(this.tasks, taskId);
    if (task) {
      task.toggleCompletion();
      this.saveTasksToLocalStorage();
    } else {
      console.error(`Task with id ${taskId} not found`);
    }
  }
  removeTask(taskId: string) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.saveTasksToLocalStorage();
  }

  clearAllTasks() {
    this.tasks = [];
    this.saveTasksToLocalStorage();
  }
}

const taskStore = new TaskStore();
export default taskStore;
