import { CommonEntity } from '../../common';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Todo } from '../../todo-list/entities';
import { Organization } from './organization.entity';

@Entity()
export class User extends CommonEntity {
  @Column({ length: 12, unique: true })
  username: string;
  @Column({ length: 60 })
  password: string;
  /**
   * 用户负责的Todos
   */
  @OneToMany(() => Todo, (todo) => todo.owner)
  ownedTodos: Promise<Todo[]>;
  /**
   * 用户拥有的组织
   */
  @OneToMany(() => Organization, (organization) => organization.owner)
  ownedOrganizations: Organization[];

  /**
   * 用户关注的Todos
   */
  @ManyToMany(() => Todo, (todo) => todo.watchers)
  watchedTodos: Promise<Todo[]>;
  /**
   * 用户加入的组织
   */
  @ManyToMany(() => Organization, (organizations) => organizations.members)
  @JoinTable()
  organizations: Organization[];
}
