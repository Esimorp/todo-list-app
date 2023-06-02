import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoRepo } from '../repositories/todo.repo';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { Todo, TodoChangeAction } from '../entities';
import { DeepPartial } from 'typeorm';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { AddSubTodoDto } from '../dto/add-sub-todo.dto';
import { I18nService } from 'nestjs-i18n';
import { TodoChangeLogService } from '../change-log/todo-change-log.service';

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
}
