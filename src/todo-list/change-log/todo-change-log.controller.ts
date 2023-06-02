import { Controller, Get, Query } from '@nestjs/common';
import { CommonController } from '../../common';
import { TodoChangeLogService } from './todo-change-log.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TodoChangeLog } from '../entities';
import { Uid } from '../../decorators';
import { ApiSuccessPageResponseDecorator } from '../../decorators/api-success-page-response.decorator';
import { FindPageDto } from '../../common/find-page.dto';

@Controller('change-log')
export class TodoChangeLogController extends CommonController {
  @Get()
  @ApiTags('Todo相关')
  @ApiOperation({ description: 'Todo修改历史记录' })
  @ApiQuery({
    name: 'todoId',
    description: '要查询的Todo的id',
  })
  @ApiQuery({
    type: FindPageDto,
  })
  @ApiResponse({
    status: 401,
    description: '用户未登录',
  })
  @ApiSuccessPageResponseDecorator(TodoChangeLog)
  public async createTodo(
    @Query('todoId') todoId: number,
    @Query() findPageDto: FindPageDto,
    @Uid() uid: number,
  ) {
    const [list, total] = await this.todoChangeLogService.listChangeLog(
      todoId,
      findPageDto,
      uid,
    );
    console.log(list);
    return this.successPage(
      list,
      total,
      Math.ceil(total / findPageDto.pageSize),
      findPageDto.pageIndex,
      findPageDto.pageSize,
    );
  }

  constructor(private todoChangeLogService: TodoChangeLogService) {
    super();
  }
}
