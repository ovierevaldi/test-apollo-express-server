import { Field, GraphQLISODateTime, GraphQLTimestamp, ID, InputType, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
@ObjectType()
export default class User {
    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id: string;
    
    @Column({type: 'varchar', length: '30'})
    @Index({unique: true})
    @Field(type => String)
    username: string;

    @Column({type: 'varchar', length: '30'})
    @Field(type => String)
    password?: string;
    
    @CreateDateColumn({type: 'timestamp'})
    @Field(type => GraphQLTimestamp)
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp'})
    @Field(type => GraphQLTimestamp)
    updatedAt: Date;
}