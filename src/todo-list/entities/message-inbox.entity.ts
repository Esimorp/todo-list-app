import { CommonEntity } from '../../common';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../../user/entities';

@Entity()
export class MessageInbox extends CommonEntity {
  /**
   * 作者
   */
  @ManyToOne(() => User)
  author: User;
  /**
   * 目标用户
   */
  @ManyToOne(() => User)
  targetUser: User;

  /**
   * 消息类型
   */
  @Column()
  type: number;
  /**
   * 消息载荷
   */
  @Column()
  payload: string;
}
