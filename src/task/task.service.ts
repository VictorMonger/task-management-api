import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindALLparameters, TaskDto } from './task.dto';

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
  findAll(params: FindALLparameters): TaskDto[] {
    return this.tasks.filter((task) => {
      let match = true;

      if (params.title != undefined && !task.title.includes(params.title)) {
        match = false;
      }

      if (params.status != undefined && !task.status.includes(params.status)) {
        match = false;
      }

      return match;
    });
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
  remove(id: string): TaskDto {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex >= 0) {
      this.tasks.splice(taskIndex, 1);
      return;
    }

    throw new HttpException(
      `task with id ${id} not found`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
