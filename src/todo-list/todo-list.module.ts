import { Module } from '@nestjs/common';
import { TodoController, TodoService } from './todo';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Comment,
  Mention,
  MessageInbox,
  Todo,
  TodoChangeLog,
} from './entities';
import { TodoRepo } from './repositories/todo.repo';
import { I18nContext } from 'nestjs-i18n';
import { TodoChangeLogRepo } from './repositories/todo-change-log.repo';
import { TodoChangeLogController, TodoChangeLogService } from './change-log';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Todo,
      TodoChangeLog,
      Comment,
      Mention,
      MessageInbox,
    ]),
    UserModule,
  ],
  controllers: [TodoController, TodoChangeLogController],
  providers: [
    TodoService,
    TodoRepo,
    I18nContext,
    TodoChangeLogRepo,
    TodoChangeLogService,
  ],
})
export class TodoListModule {}
