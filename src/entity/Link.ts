import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType({ description: "The link model" })
@Entity()
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

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.links, { eager: true })
  user: User;
}
