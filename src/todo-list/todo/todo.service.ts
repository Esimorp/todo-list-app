import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoRepo } from '../repositories/todo.repo';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { Todo, TodoChangeAction, TodoOrder } from '../entities';
import {
  Between,
  DeepPartial,
  FindOptionsOrder,
  FindOptionsWhere,
  LessThan,
  MoreThan,
} from 'typeorm';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { AddSubTodoDto } from '../dto/add-sub-todo.dto';
import { I18nService } from 'nestjs-i18n';
import { TodoChangeLogService } from '../change-log';
import { FindPageDto } from '../../common/find-page.dto';
import { FindTodoDto } from '../dto/find-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoRepo)
    private todoRepository: TodoRepo,
    private readonly i18n: I18nService,
    private todoChangeLogService: TodoChangeLogService,
  ) {}

  public async createTodo(
    createTodoDto: CreateTodoDto,
    userId: number,
  ): Promise<Todo> {
    const todo: DeepPartial<Todo> = createTodoDto;
    todo.owner = { id: userId };

    //TODO do with createTodoDto.organizationId
    const result = await this.todoRepository.save(todo);
    await this.todoChangeLogService.addChangeLog(
      TodoChangeAction.CREATE_TODO,
      result.id,
      userId,
      null,
    );
    return result;
  }

  public async updateTodo(
    updateTodoDto: UpdateTodoDto,
    userId: number,
  ): Promise<Todo> {
    const { id } = updateTodoDto;
    const existed = await this.todoRepository.findOneBy({ id });
    if (!existed)
      throw new BadRequestException(
        await this.i18n.t('errors.TODO_NOT_EXISTED'),
      );
    if (existed.owner.id != userId)
      throw new ForbiddenException(
        await this.i18n.t('errors.WRONG_PERMISSIONS'),
      );
    if (updateTodoDto.description) {
      await this.todoChangeLogService.addChangeLog(
        TodoChangeAction.UPDATE_TODO_DESCRIPTION,
        existed.id,
        userId,
        updateTodoDto.description,
      );
    }
    if (updateTodoDto.title) {
      await this.todoChangeLogService.addChangeLog(
        TodoChangeAction.UPDATE_TODO_TITLE,
        existed.id,
        userId,
        updateTodoDto.title,
      );
    }
    if (updateTodoDto.finished) {
      await this.todoChangeLogService.addChangeLog(
        TodoChangeAction.FINISH_TODO,
        existed.id,
        userId,
        null,
      );
    }
    return await this.todoRepository.save(updateTodoDto);
  }

  public async addSubTodo(
    addSubTodoDto: AddSubTodoDto,
    userId: number,
  ): Promise<Todo> {
    const { parentId } = addSubTodoDto;
    const parent = await this.todoRepository.findOneBy({ id: parentId });
    if (!parent)
      throw new BadRequestException(
        await this.i18n.t('errors.TODO_NOT_EXISTED'),
      );
    if (parent.owner.id != userId)
      throw new ForbiddenException(
        await this.i18n.t('errors.WRONG_PERMISSIONS'),
      );
    const subTodo: DeepPartial<Todo> = addSubTodoDto;
    subTodo.parentTodo = { id: addSubTodoDto.parentId };
    subTodo.owner = { id: userId };

    const result = await this.todoRepository.save(subTodo);
    await this.todoChangeLogService.addChangeLog(
      TodoChangeAction.CREATE_SUB_TODO,
      parent.id,
      userId,
      null,
    );
    await this.todoChangeLogService.addChangeLog(
      TodoChangeAction.CREATE_TODO,
      subTodo.id,
      userId,
      null,
    );
    return result;
  }

  public async removeTodo(todoId: number, userId: number): Promise<Todo> {
    const existed = await this.todoRepository.findOneBy({ id: todoId });
    if (!existed)
      throw new BadRequestException(
        await this.i18n.t('errors.TODO_NOT_EXISTED'),
      );
    if (existed.owner.id != userId)
      throw new ForbiddenException(
        await this.i18n.t('errors.WRONG_PERMISSIONS'),
      );
    return await this.todoRepository.softRemove(existed);
  }

  async findTodos(findPageDto: FindPageDto, findTodoDto: FindTodoDto) {
    //TODO find with findTodoDto.organizationId
    const where = {} as FindOptionsWhere<Todo>;
    const orderBy = {} as FindOptionsOrder<Todo>;
    const { startAt, endAt, ownerId, order } = findTodoDto;
    if (startAt && endAt) {
      where.created_at = Between(findTodoDto.startAt, findTodoDto.endAt);
    } else if (startAt) {
      where.created_at = MoreThan(startAt);
    } else if (startAt) {
      where.created_at = LessThan(endAt);
    }

    if (ownerId) {
      where.owner = { id: ownerId };
    }

    switch (order) {
      case TodoOrder.CREATE_AT_ASC:
        orderBy.created_at = 'ASC';
        break;
      case TodoOrder.CREATE_AT_DESC:
        orderBy.created_at = 'DESC';
        break;
      case TodoOrder.DEADLINE_ASC:
        orderBy.deadline = 'ASC';
        break;
      case TodoOrder.DEADLINE_DESC:
        orderBy.deadline = 'DESC';
        break;
      case TodoOrder.OWNER_ASC:
        orderBy.owner = { id: 'ASC' };
        break;
      case TodoOrder.OWNER_DESC:
        orderBy.owner = { id: 'DESC' };
        break;
      case TodoOrder.ID_ASC:
        orderBy.id = 'ASC';
        break;
      case TodoOrder.ID_DESC:
        orderBy.id = 'DESC';
        break;
    }
    const { pageSize, pageIndex } = findPageDto;
    return this.todoRepository.findAndCount({
      where,
      order: orderBy,
      relations: { owner: true },
      take: pageSize,
      skip: pageIndex * pageSize,
    });
  }
}
