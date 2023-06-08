import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UserRegisterLoginDto {
  /**
   * 用户名
   * @example username1
   */
  @IsNotEmpty()
  @MaxLength(12)
  @MinLength(6)
  username: string;

  /**
   * 密码
   * @example qwe123!!!
   */
  @IsNotEmpty()
  @MaxLength(12)
  @MinLength(6)
  password: string;
}
