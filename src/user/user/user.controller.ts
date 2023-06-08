import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRegisterLoginDto } from '../dto/user-register-login.dto';
import { Public } from '../../decorators';
import { UserService } from './user.service';
import { CommonController, RESPONSE_SET_TOKEN_KEY } from '../../common';
import { Response } from 'express';

@Controller('/user')
export class UserController extends CommonController {
  constructor(private userService: UserService) {
    super();
  }

  @ApiTags('用户相关')
  @ApiOperation({ description: '用户注册接口' })
  @Post()
  @Public()
  @ApiResponse({
    status: 400,
    description: '用户名密码校验失败',
  })
  @ApiResponse({
    status: 201,
    headers: {
      [RESPONSE_SET_TOKEN_KEY]: { description: '客户端需要储存的Token' },
    },
  })
  async register(
    @Body() userRegisterDto: UserRegisterLoginDto,
    @Res() res: Response,
  ) {
    try {
      const user = await this.userService.registerUser(userRegisterDto);
      const jwtToken = await this.userService.signUserJwtToken(user);
      res.setHeader(RESPONSE_SET_TOKEN_KEY, jwtToken);
      return res.send(this.success('ok'));
    } catch (e) {
      return res.send(this.fail(e));
    }
  }

  @ApiTags('用户相关')
  @ApiOperation({ description: '用户登录接口' })
  @Post('/token')
  @Public()
  @ApiResponse({
    status: 401,
    description: '用户名或密码错误',
  })
  @ApiResponse({
    status: 201,
    headers: {
      [RESPONSE_SET_TOKEN_KEY]: { description: '客户端需要储存的Token' },
    },
  })
  async login(
    @Body() userRegisterDto: UserRegisterLoginDto,
    @Res() res: Response,
  ) {
    try {
      const user = await this.userService.loginUser(userRegisterDto);
      const jwtToken = await this.userService.signUserJwtToken(user);
      res.setHeader(RESPONSE_SET_TOKEN_KEY, jwtToken);
      return res.send(this.success('ok'));
    } catch (e) {
      return res.send(this.fail(e));
    }
  }
}
