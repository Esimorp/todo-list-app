import { Module } from '@nestjs/common';
import { TodoController, TodoService } from './todo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities';
import { TodoRepo } from './repositories/todo.repo';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService, TodoRepo],
})
export class TodoListModule {}
