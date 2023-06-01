import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoRepo } from '../repositories/todo.repo';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { Todo } from '../entities';
import { DeepPartial } from 'typeorm';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { AddSubTodoDto } from '../dto/add-sub-todo.dto';
import { I18n, I18nContext } from 'nestjs-i18n';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoRepo)
    private todoRepository: TodoRepo,
    @I18n() private i18n: I18nContext,
  ) {}

  public async createTodo(
    createTodoDto: CreateTodoDto,
    userId: number,
  ): Promise<Todo> {
    const todo: DeepPartial<Todo> = createTodoDto;
    todo.owner = { id: userId };
    return await this.todoRepository.save(todo);
  }

  public async updateTodo(
    createTodoDto: UpdateTodoDto,
    userId: number,
  ): Promise<Todo> {
    const { id } = createTodoDto;
    const existed = await this.todoRepository.findOneBy({ id });
    if (!existed)
      throw new BadRequestException(
        await this.i18n.t('errors.TODO_NOT_EXISTED'),
      );
    if (existed.owner.id != userId)
      throw new ForbiddenException(
        await this.i18n.t('errors.WRONG_PERMISSIONS'),
      );
    return await this.todoRepository.save(createTodoDto);
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
    return await this.todoRepository.save(subTodo);
  }
}
