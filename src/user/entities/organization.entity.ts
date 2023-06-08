import { CommonEntity } from '../../common';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Todo } from '../../todo-list/entities';

@Entity()
export class Organization extends CommonEntity {
  @Column({ length: 36 })
  name: string;
  /**
   * 拥有者
   */
  @ManyToOne(() => User, (user) => user.ownedOrganizations)
  owner: User;
  /**
   * 组织成员
   */
  @ManyToMany(() => User, (user) => user.organizations)
  members: User[];

  /**
   * 组织所拥有的全部Todo
   */
  @OneToMany(() => Todo, (todo) => todo.organization)
  todos: Promise<Todo[]>;
}
