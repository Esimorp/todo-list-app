import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { TodoChangeLogRepo } from '../repositories/todo-change-log.repo';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoChangeAction, TodoChangeLog } from '../entities';
import { User } from '../../user/entities';
import { TodoRepo } from '../repositories/todo.repo';
import { I18nService } from 'nestjs-i18n';
import { FindPageDto } from '../../common/find-page.dto';

@Injectable()
export class TodoChangeLogService {
  constructor(
    @InjectRepository(TodoChangeLogRepo)
    private todoChangeLogRepo: TodoChangeLogRepo,
    @InjectRepository(TodoRepo)
    private todoRepo: TodoRepo,
    private readonly i18n: I18nService,
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

  async listChangeLog(todoId, findPageDto: FindPageDto, userId) {
    const todo = await this.todoRepo.findOneBy({ id: todoId });
    if (!todo)
      throw new BadRequestException(
        await this.i18n.t('errors.TODO_NOT_EXISTED'),
      );
    if (todo.owner.id != userId)
      throw new ForbiddenException(
        await this.i18n.t('errors.WRONG_PERMISSIONS'),
      );
    const { pageSize, pageIndex } = findPageDto;
    return this.todoChangeLogRepo.findAndCount({
      where: { todoId },
      take: pageSize,
      skip: pageIndex * pageSize,
    });
  }
}
