import { CommonRepository } from '../../common';
import { Todo } from '../entities';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class TodoRepo extends CommonRepository<Todo> {
  constructor(private dataSource: DataSource) {
    super(Todo, dataSource.createEntityManager());
  }
}
