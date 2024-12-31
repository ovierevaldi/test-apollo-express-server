import { Field, GraphQLISODateTime, ID, InputType, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export default class Recipe {
    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id: string;
    
    @Column({type: 'varchar', length: '50'})
    @Field(type => String)
    title: string;

    @Column({type: 'text'})
    @Field(type => String, {nullable: true})
    description?: string;
    
    @Column({type: 'date'})
    @Field(type => GraphQLISODateTime)
    creationDate: Date;
    
    @Column("simple-array")
    @Field(type => [String])
    ingredients: string[];
}