import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

@Entity()
@ObjectType({ description: "The link model" })
export class Link extends BaseEntity {
  @PrimaryColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  url: string;
}
