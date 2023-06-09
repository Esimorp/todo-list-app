import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_TYPE,
  DATABASE_TYPES,
  DATABASE_USER,
} from './src/common';
import { DataSource } from 'typeorm';
import {
  Comment,
  Mention,
  MessageInbox,
  Todo,
  TodoChangeLog,
} from './src/todo-list/entities';
import { User } from './src/user/entities';
import { Organization } from './src/user/entities/organization.entity';
import { TodolistApp1686277990322 } from './migrations/1686277990322-todolist-app';

config({ path: `${__dirname}/working-dir/env/.env.local` });
config({ path: `${__dirname}/working-dir/env/.env` });

const configService = new ConfigService();
export default new DataSource({
  type: configService.get<DATABASE_TYPES>(DATABASE_TYPE),
  port: configService.get<number>(DATABASE_PORT),
  host: configService.get<string>(DATABASE_HOST),
  username: configService.get<string>(DATABASE_USER),
  password: configService.get<string>(DATABASE_PASSWORD),
  database: configService.get<string>(DATABASE_NAME),
  entities: [
    Comment,
    Mention,
    MessageInbox,
    Todo,
    TodoChangeLog,
    User,
    Organization,
  ],
  migrations: [TodolistApp1686277990322],
});
