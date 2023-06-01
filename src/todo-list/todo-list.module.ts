import { Module } from '@nestjs/common';
import { TodoController, TodoService } from './todo';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoListModule {}
