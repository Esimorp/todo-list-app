import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTodoDto } from '../dto/create-todo.dto';
import {
  ApiNeedLoginDecorator,
  ApiSuccessPageResponseDecorator,
  ApiSuccessResponse,
  Uid,
} from '../../decorators';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CommonController } from '../../common';
import { TodoService } from './todo.service';
import { Todo, TodoChangeLog } from '../entities';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { AddSubTodoDto } from '../dto/add-sub-todo.dto';
import { FindPageDto } from '../../common/find-page.dto';
import { FindTodoDto } from '../dto/find-todo.dto';

@Controller('todo')
export class TodoController extends CommonController {
  constructor(private todoService: TodoService) {
    super();
  }

  @Post()
  @ApiTags('Todo相关')
  @ApiNeedLoginDecorator()
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

  @Put()
  @ApiTags('Todo相关')
  @ApiOperation({
    description:
      '更新Todo接口，修改基本信息、添加描述、修改Todo状态都通过此接口',
  })
  @ApiBody({
    type: UpdateTodoDto,
  })
  @ApiResponse({
    status: 400,
    description: 'todo不存在',
  })
  @ApiNeedLoginDecorator()
  @ApiSuccessResponse(Todo)
  public async updateTodo(@Body() updateTodoDto: UpdateTodoDto, @Uid() uid) {
    const updatedTodo = await this.todoService.updateTodo(updateTodoDto, uid);
    return this.success(updatedTodo);
  }

  @Post('/sub-todo')
  @ApiTags('Todo相关')
  @ApiOperation({
    description: '添加子任务',
  })
  @ApiBody({
    type: AddSubTodoDto,
  })
  @ApiResponse({
    status: 400,
    description: 'todo不存在',
  })
  @ApiNeedLoginDecorator()
  @ApiSuccessResponse(Todo)
  public async addSubTodo(@Body() addSubTodoDto: AddSubTodoDto, @Uid() uid) {
    const createdTodo = await this.todoService.addSubTodo(addSubTodoDto, uid);
    return this.success(createdTodo);
  }

  @Delete('')
  @ApiTags('Todo相关')
  @ApiOperation({
    description: '移除任务',
  })
  @ApiQuery({
    name: 'id',
    example: 1,
  })
  @ApiResponse({
    status: 400,
    description: 'todo不存在',
  })
  @ApiNeedLoginDecorator()
  @ApiSuccessResponse(Todo)
  public async removeTodo(
    @Query('id', ParseIntPipe) todoId: number,
    @Uid() uid,
  ) {
    const removedTodo = await this.todoService.removeTodo(todoId, uid);
    return this.success(removedTodo);
  }

  @Get()
  @ApiTags('Todo相关')
  @ApiOperation({ description: 'Todo列表' })
  @ApiNeedLoginDecorator()
  @ApiSuccessPageResponseDecorator(TodoChangeLog)
  public async listTodos(
    @Query() findPageDto: FindPageDto,
    @Query() findTodoDto: FindTodoDto,
    @Uid() uid: number,
  ) {
    const [list, total] = await this.todoService.findTodos(
      findPageDto,
      findTodoDto,
      uid,
    );
    return this.successPage(
      list,
      total,
      Math.ceil(total / findPageDto.pageSize),
      findPageDto.pageIndex,
      findPageDto.pageSize,
    );
  }
}
