import { Controller, Get, Param, Query } from '@nestjs/common';
import { CommonController } from '../../common';
import { TodoChangeLogService } from './todo-change-log.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TodoChangeLog } from '../entities';
import {
  ApiNeedLoginDecorator,
  ApiSuccessPageResponseDecorator,
  Uid,
} from '../../decorators';
import { FindPageDto } from '../../common/find-page.dto';

@Controller()
export class TodoChangeLogController extends CommonController {
  @Get('/todo/:todoId/change-log')
  @ApiTags('Todo相关')
  @ApiNeedLoginDecorator()
  @ApiOperation({ description: 'Todo修改历史记录' })
  @ApiParam({
    name: 'todoId',
    description: '要查询的Todo的id',
  })
  @ApiResponse({
    status: 401,
    description: '用户未登录',
  })
  @ApiSuccessPageResponseDecorator(TodoChangeLog)
  public async listChangeLog(
    @Param('todoId') todoId: number,
    @Query() findPageDto: FindPageDto,
    @Uid() uid: number,
  ) {
    const [list, total] = await this.todoChangeLogService.listChangeLog(
      todoId,
      findPageDto,
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

  constructor(private todoChangeLogService: TodoChangeLogService) {
    super();
  }
}
