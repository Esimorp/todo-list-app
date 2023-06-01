import { IsDate, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @MaxLength(200)
  @MinLength(1)
  title: string;
  @IsDate()
  deadline: Date;
  @MinLength(1)
  @MaxLength(2000)
  description: string;
}
