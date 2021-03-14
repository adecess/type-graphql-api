import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./User";

@Entity()
@ObjectType({ description: "The link model" })
export class Link extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  url: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.links, { eager: true })
  user: User;
}
