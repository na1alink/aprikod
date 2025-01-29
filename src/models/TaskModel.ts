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
  parent?: TaskModel;

  constructor(title: string, parent?: TaskModel, subtasks: TaskModel[] = []) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.title = title;
    this.isCompleted = false;
    this.subtasks = subtasks.map((subtask) => {
      subtask.setParent(this);
      return subtask;
    });
    this.parent = parent;
    makeAutoObservable(this);
  }

  setTitle(newTitle: string) {
    this.title = newTitle;
  }

  addSubtask(title: string) {
    const subtask = new TaskModel(title, this);
    this.subtasks.push(subtask);
  }

  removeSubtask(subtaskId: string) {
    this.subtasks = this.subtasks.filter((subtask) => subtask.id !== subtaskId);
  }

  setParent(parent: TaskModel | undefined) {
    this.parent = parent;
  }

  setCompleted(value: boolean) {
    if (this.isCompleted !== value) {
      this.isCompleted = value;
      if (value) {
        this.subtasks.forEach((subtask) => subtask.setCompleted(value));
      }
      if (this.parent) {
        this.parent.checkSubtasksCompletion();
      }
    }
  }

  toggleCompletion() {
    const newValue = !this.isCompleted;
    this.setCompleted(newValue);

    if (this.parent) {
      this.parent.checkSubtasksCompletion();
    }
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

    if (this.parent) {
      this.parent.checkSubtasksCompletion();
    }
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
