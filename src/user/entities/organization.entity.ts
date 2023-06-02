import { CommonEntity } from '../../common';
import { Entity, ManyToMany, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Todo } from '../../todo-list/entities';

@Entity()
export class Organization extends CommonEntity {
  /**
   * 组织成员
   */
  @ManyToMany(() => User, (user) => user.organizations)
  members: Promise<User[]>;

  /**
   * 组织所拥有的全部Todo
   */
  @OneToMany(() => Todo, (todo) => todo.organization)
  todos: Promise<Todo[]>;
}
