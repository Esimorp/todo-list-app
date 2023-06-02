import { ApiProperty } from '@nestjs/swagger';

export class CommonController {
  success<T>(data: T, message = 'ok', code = 0) {
    return { message, data, code };
  }

  successPage<T>(
    list: T[],
    total: number,
    pageTotal: number,
    pageIndex: number,
    pageSize: number,
    message = 'ok',
    code = 0,
  ) {
    return {
      message,
      data: list,
      total,
      pageTotal,
      pageIndex,
      pageSize,
      code,
    };
  }

  fail(message = '系统错误', code = 100001, stack?: string) {
    return { message, code, stack };
  }
}

export class SuccessBodyDto<T> {
  data: T;
  @ApiProperty()
  message: string;
  @ApiProperty()
  code: number;
}

export class SuccessPageBodyDto<T> {
  data: T[];
  @ApiProperty()
  total: number;
  @ApiProperty()
  pageTotal: number;
  @ApiProperty()
  pageIndex: number;
  @ApiProperty()
  pageSize: number;
  @ApiProperty()
  message: string;
  @ApiProperty()
  code: number;
}
