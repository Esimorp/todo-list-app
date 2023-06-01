import { CreateTodoDto } from './create-todo.dto';

export type AddSubTodoDto = CreateTodoDto & { parentId: number };
