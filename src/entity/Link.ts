import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

@Entity()
@ObjectType({ description: "The link model" })
export class Link extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  url: string;
}
