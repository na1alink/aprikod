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

  setTitle(newTitle: string) {
    this.title = newTitle;
  }

  addSubtask(title: string) {
    this.subtasks.push(new TaskModel(title));
  }

  checkSubtasksCompletion() {
    const allSubtasksCompleted = this.subtasks.every(
      (subtask) => subtask.isCompleted
    );
    if (allSubtasksCompleted && !this.isCompleted) {
      this.setCompleted(true);
    } else if (!allSubtasksCompleted && this.isCompleted) {
      this.setCompleted(false);
    }
  }

  toggleCompletion() {
    this.isCompleted = !this.isCompleted;
    if (this.isCompleted) {
      this.subtasks.forEach((subtask) => subtask.setCompleted(true));
    } else {
      this.subtasks.forEach((subtask) => subtask.setCompleted(false));
    }
    this.checkSubtasksCompletion();
  }

  setCompleted(value: boolean) {
    this.isCompleted = value;
    if (value) {
      this.subtasks.forEach((subtask) => subtask.setCompleted(value));
    } else {
      this.subtasks.forEach((subtask) => subtask.setCompleted(value));
      this.checkSubtasksCompletion();
    }
  }

  removeSubtask(subtaskId: string) {
    this.subtasks = this.subtasks.filter((subtask) => subtask.id !== subtaskId);
  }

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
