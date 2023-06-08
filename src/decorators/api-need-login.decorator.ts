import { applyDecorators } from '@nestjs/common';
import { APP_TEST_TOKEN, AUTH_TOKEN_KEY } from '../common';
import { ApiHeader, ApiResponse } from '@nestjs/swagger';

export const ApiNeedLoginDecorator = () => {
  return applyDecorators(
    ApiHeader({
      name: AUTH_TOKEN_KEY,
      description: '认证Token',
      schema: { default: APP_TEST_TOKEN },
    }),
    ApiResponse({
      status: 401,
      description: '未登录',
    }),
    ApiResponse({
      status: 403,
      description: '权限异常',
    }),
  );
};
