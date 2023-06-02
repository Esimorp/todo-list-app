import { CommonEntity } from '../../common';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../../user/entities';
import { Todo } from './todo.entity';

@Entity()
export class Comment extends CommonEntity {
  /**
   * 作者
   */
  @ManyToOne(() => User)
  author: User;
  /**
   * 评论内容
   */
  @Column({ type: 'text', comment: '评论内容', nullable: true })
  content: string;
  /**
   * 所属Todo
   */
  @ManyToOne(() => Todo, (todo) => todo.comments)
  todo: Todo;
}
