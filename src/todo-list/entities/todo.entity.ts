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
import { TodoChangeLog } from './todo-change-log.entity';
import { Comment } from './comment.entity';
import { Organization } from '../../user/entities/organization.entity';

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
   * 子任务列表,懒加载
   */
  @OneToMany(() => TodoChangeLog, (todoChangeLog) => todoChangeLog.todo)
  changeLogs: Promise<TodoChangeLog[]>;
  /**
   * 评论列表
   */
  @OneToMany(() => Comment, (comment) => comment.todo)
  comments: Promise<Comment[]>;
  /**
   * 负责人
   */
  @ManyToOne(() => User, (user) => user.ownedTodos, { eager: true })
  owner: User;
  /**
   * 所属组织
   */
  @ManyToOne(() => Organization, (organization) => organization.todos)
  organization: Organization;

  /**
   * todo的观察者
   */
  @ManyToMany(() => User, (user) => user.watchedTodos)
  @JoinTable()
  watchers: Promise<User[]>;
}

export enum TodoOrder {
  CREATE_AT_ASC = 'CREATE_AT_ASC',
  CREATE_AT_DESC = 'CREATE_AT_DESC',
  DEADLINE_ASC = 'DEADLINE_ASC',
  DEADLINE_DESC = 'DEADLINE_DESC',
  OWNER_ASC = 'OWNER_ASC',
  OWNER_DESC = 'OWNER_DESC',
  ID_ASC = 'ID_ASC',
  ID_DESC = 'ID_DESC',
}
