import { CommonRepository } from '../../common';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TodoChangeLog } from '../entities';

@Injectable()
export class TodoChangeLogRepo extends CommonRepository<TodoChangeLog> {
  constructor(private dataSource: DataSource) {
    super(TodoChangeLog, dataSource.createEntityManager());
  }
}
