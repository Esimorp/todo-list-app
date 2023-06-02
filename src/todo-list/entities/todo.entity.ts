import { CommonEntity } from '../../common';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/entities';

@Entity()
export class Todo extends CommonEntity {
  @Column({ comment: '标题' })
  title: string;
  @Column({ comment: '任截止日期', nullable: true })
  deadline: Date;
  @Column({ comment: '是否已经完成', default: false })
  finished: boolean;
  @Column({ type: 'text', comment: '任务描述', nullable: true })
  description: string;

  /**
   * 父级任务,为空时为顶级任务
   */
  @ManyToOne(() => Todo, (todo) => todo.subTodos)
  parentTodo: Todo;

  /**
   * 子任务列表,懒加载
   */
  @OneToMany(() => Todo, (todo) => todo.parentTodo)
  subTodos: Promise<Todo[]>;

  /**
   * 负责人
   */
  @ManyToOne(() => User, (user) => user.ownedTodos, { eager: true })
  owner: User;

  /**
   * todo的观察者
   */
  @ManyToMany(() => User, (user) => user.watchedTodos)
  @JoinTable()
  watchers: Promise<User[]>;
}
