import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateTodoDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @MaxLength(200)
  @MinLength(1)
  title: string;
  @IsDate()
  deadline: Date;
  @MinLength(1)
  @MaxLength(2000)
  description: string;
  @IsBoolean()
  finished: boolean;
}
