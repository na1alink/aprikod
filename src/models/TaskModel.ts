import { makeAutoObservable } from "mobx";

export interface TaskData {
  id: string;
  title: string;
  isCompleted: boolean;
  subtasks: TaskData[];
}

class TaskModel {
  id: string;
  title: string;
  isCompleted: boolean;
  subtasks: TaskModel[];

  constructor(title: string, subtasks: TaskModel[] = []) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.title = title;
    this.isCompleted = false;
    this.subtasks = subtasks;
    makeAutoObservable(this);
  }

  // Метод для изменения названия задачи
  setTitle(newTitle: string) {
    this.title = newTitle;
  }

  // Добавление подзадачи
  addSubtask(title: string) {
    if (this.subtasks.length === 0) {
      // Проверяем, что у текущей задачи нет подзадач
      this.subtasks.push(new TaskModel(title));
    } else {
      console.warn(
        "Невозможно добавить подзадачу: вложенность ограничена двумя уровнями."
      );
    }
  }

  // Переключение статуса выполнения задачи
  toggleCompletion() {
    this.isCompleted = !this.isCompleted;
    if (this.isCompleted) {
      this.subtasks.forEach((subtask) => subtask.setCompleted(true));
    }
  }

  // Установка статуса выполнения задачи
  setCompleted(value: boolean) {
    this.isCompleted = value;
    this.subtasks.forEach((subtask) => subtask.setCompleted(value));
  }

  // Удаление подзадачи по id
  removeSubtask(subtaskId: string) {
    this.subtasks = this.subtasks.filter((subtask) => subtask.id !== subtaskId);
  }

  // Преобразование задачи в JSON
  toJSON(): TaskData {
    return {
      id: this.id,
      title: this.title,
      isCompleted: this.isCompleted,
      subtasks: this.subtasks.map((subtask) => subtask.toJSON()),
    };
  }
}

export default TaskModel;
