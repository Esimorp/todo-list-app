import { Module } from '@nestjs/common';
import { TodoController, TodoService } from './todo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo, TodoChangeLog } from './entities';
import { TodoRepo } from './repositories/todo.repo';
import { I18nContext } from 'nestjs-i18n';
import { TodoChangeLogRepo } from './repositories/todo-change-log.repo';
import { TodoChangeLogService } from './change-log/todo-change-log.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, TodoChangeLog])],
  controllers: [TodoController],
  providers: [
    TodoService,
    TodoRepo,
    I18nContext,
    TodoChangeLogRepo,
    TodoChangeLogService,
  ],
})
export class TodoListModule {}
