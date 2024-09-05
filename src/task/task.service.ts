import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  create(task: TaskDto) {
    this.tasks.push(task);
  }
  findById(id: string): TaskDto {
    const foundTask = this.tasks.filter((task) => task.id === id);

    if (!foundTask.length) {
      throw new HttpException(
        `task with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return foundTask[0];
  }
  update(task: TaskDto) {
    const taskIndex = this.tasks.findIndex((index) => index.id === task.id);

    if (taskIndex >= 0) {
      this.tasks[taskIndex] = task;
      return;
    }

    throw new HttpException(
      `task with id ${task.id} not found`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
