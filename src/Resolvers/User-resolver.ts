import { Arg, Field, InputType, Mutation, Query } from "type-graphql";
import User from "../entity/User";
import { IsNotEmpty, IsString, MaxLength, MinLength, validate } from "class-validator";
import { getRepository, QueryFailedError } from "typeorm";
import { IsNoWhitespace } from "../Utils/custom-decorators";
import { ApolloError } from "apollo-server-express";
import { ErrorType } from "../Types/error-type";

@InputType()
class UserInput {
    @Field(type => String)
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    @MinLength(4)
    @IsNoWhitespace()
    @IsNotEmpty()
    username: string;

    @Field(type => String)
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    @MinLength(4)
    @IsNoWhitespace()
    @IsNotEmpty()
    password: string;
}

export default class UserResolver{
    constructor(){}

    @Mutation(() => User)
    async createUser(@Arg('data', () => UserInput) data: UserInput){
        const errors = await validate(data);
            if (errors.length > 0) {
                const reason = errors.map(value => {
                    if(value.constraints)
                        return Object.values(value.constraints).join(',')
                });

                throw new ApolloError('Cannot Create user', 'VALIDATION_ERROR',{
                    statusCode: 401,
                    reason: reason
                });
        }
        try {
            const user =  await getRepository(User).save({...data });
            return user;
        } catch (error) {
            const err = error as ErrorType
            if (err.code === '23505') {
                throw new ApolloError(`Username ${data.username} already exsist.`, 'DUPLICATE_FIELD', {
                    statusCode: 402,
                    reason: ['Username Already Exsist']
                });
            }
        }
    }
}