import { ApiProperty } from '@nestjs/swagger';

export class CommonController {
  success<T>(data: T, message = 'ok', code = 0) {
    return { message, data, code };
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
