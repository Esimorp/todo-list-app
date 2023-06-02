import { Injectable } from '@nestjs/common';
import { TodoChangeLogRepo } from '../repositories/todo-change-log.repo';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoChangeAction, TodoChangeLog } from '../entities';
import { User } from '../../user/entities';

@Injectable()
export class TodoChangeLogService {
  constructor(
    @InjectRepository(TodoChangeLogRepo)
    private todoChangeLogRepo: TodoChangeLogRepo,
  ) {}

  public async addChangeLog(
    action: TodoChangeAction,
    todoId: number,
    userId: number,
    payload: string,
  ) {
    const changeLog = new TodoChangeLog();
    changeLog.todoId = todoId;
    changeLog.action = action;
    changeLog.operator = { id: userId } as User;
    changeLog.payload = payload;
    return this.todoChangeLogRepo.save(changeLog);
  }
}
