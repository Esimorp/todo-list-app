import { CommonEntity } from '../../common';
import { Entity, ManyToMany, OneToMany } from 'typeorm';
import { Todo } from '../../todo-list/entities';
import { Organization } from './organization.entity';

@Entity()
export class User extends CommonEntity {
  /**
   * 用户负责的Todos
   */
  @OneToMany(() => Todo, (todo) => todo.owner)
  ownedTodos: Promise<Todo[]>;

  /**
   * 用户关注的Todos
   */
  @ManyToMany(() => Todo, (todo) => todo.watchers)
  watchedTodos: Promise<Todo[]>;
  /**
   * 用户加入的组织
   */
  @ManyToMany(() => Organization, (organizations) => organizations.members)
  organizations: Promise<Organization[]>;
}
