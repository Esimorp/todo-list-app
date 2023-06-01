import { CommonEntity } from '../../common';
import { Entity, ManyToMany, OneToMany } from 'typeorm';
import { Todo } from '../../todo-list/entities';

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
}
