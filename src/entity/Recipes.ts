import { Field, GraphQLISODateTime, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export default class Recipe {
    @Field(type => ID)
    id: string;
    
    @Field(type => String)
    title: string;

    @Field(type => String, {nullable: true})
    description?: string;
    
    @Field(type => GraphQLISODateTime)
    creationDate: Date;
    
    @Field(type => [String])
    ingredients: string[];
}