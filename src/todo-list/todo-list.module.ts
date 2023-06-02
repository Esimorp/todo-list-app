import { Module } from '@nestjs/common';
import { TodoController, TodoService } from './todo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities';
import { TodoRepo } from './repositories/todo.repo';
import { I18nContext } from 'nestjs-i18n';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService, TodoRepo, I18nContext],
})
export class TodoListModule {}
