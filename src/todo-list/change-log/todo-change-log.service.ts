import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { TodoChangeLogRepo } from '../repositories/todo-change-log.repo';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo, TodoChangeAction, TodoChangeLog } from '../entities';
import { User } from '../../user/entities';
import { TodoRepo } from '../repositories/todo.repo';
import { FindPageDto } from '../../common/find-page.dto';

@Injectable()
export class TodoChangeLogService {
  constructor(
    @InjectRepository(TodoChangeLogRepo)
    private todoChangeLogRepo: TodoChangeLogRepo,
    @InjectRepository(TodoRepo)
    private todoRepo: TodoRepo,
  ) {}

  public async addChangeLog(
    action: TodoChangeAction,
    todoId: number,
    userId: number,
    payload: string,
  ) {
    const changeLog = new TodoChangeLog();
    changeLog.todo = { id: todoId } as Todo;
    changeLog.action = action;
    changeLog.operator = { id: userId } as User;
    changeLog.payload = payload;
    return this.todoChangeLogRepo.save(changeLog);
  }

  async listChangeLog(todoId, findPageDto: FindPageDto, userId) {
    const todo = await this.todoRepo.findOneBy({ id: todoId });
    if (!todo) throw new BadRequestException('errors.TODO_NOT_EXISTED');
    if (todo.owner.id != userId)
      throw new ForbiddenException('errors.WRONG_PERMISSIONS');
    const { pageSize, pageIndex } = findPageDto;
    return this.todoChangeLogRepo.findAndCount({
      where: { todo: { id: todoId } },
      take: pageSize,
      skip: pageIndex * pageSize,
    });
  }
}
