import { Body, Controller, Post } from '@nestjs/common';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { Uid } from '../../decorators';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommonController } from '../../common';
import { TodoService } from './todo.service';
import { ApiSuccessResponse } from '../../decorators/api-success-response.decorator';
import { Todo } from '../entities';

@Controller('todo')
export class TodoController extends CommonController {
  constructor(private todoService: TodoService) {
    super();
  }

  @Post()
  @ApiOperation({ description: '创建Todo接口' })
  @ApiBody({
    type: CreateTodoDto,
  })
  @ApiResponse({
    status: 401,
    description: '用户未登录',
  })
  @ApiSuccessResponse(Todo)
  public async createTodo(@Body() createTodoDto: CreateTodoDto, @Uid() uid) {
    const createdTodo = await this.todoService.createTodo(createTodoDto, uid);
    return this.success(createdTodo);
  }
}
