import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";
import { Makanan } from "../../Entity/Makanan/Makanan";
import { getRepository } from "typeorm";
import { IsNumber, IsString, Max, MaxLength, Min } from "class-validator";
import { ApolloError } from "apollo-server-express";

@InputType()
class MakananInput{
    @Field(type => String)
    @IsString()
    @MaxLength(25)
    code: string

    @Field(type => String)
    @IsString()
    @MaxLength(50)
    nama: string
    
    @Field(type => Number)
    @IsNumber()
    harga: number
}

@InputType()
class getMakananArgs {
    @Min(1)
    @Field(type => Int, {nullable: true})
    skip_page?: number;

    @Min(1)
    @Max(50)
    @Field(type => Int, {nullable: true})
    amount?: number;
}


@Resolver(Makanan)
export default class MakananResolver{
    constructor(){}

    @Query(() => [Makanan])
    async getAllMakanan(@Arg('args', type => getMakananArgs) makananArgs: getMakananArgs){
        const amount = makananArgs.amount || 1;
        const skip_page = (makananArgs.skip_page || 0) * amount;

        return await getRepository(Makanan).find({
            take: amount,
            skip: skip_page
        });
    };

    @Query(() => Makanan)
    async getMakanan(@Arg('code', type => String) code: string){
        return await getRepository(Makanan).findOneBy({
            code: code
        })
    }

    @Mutation(() => Makanan)
    async createMakanan(@Arg('data', type => MakananInput) data: MakananInput){
        try {
            // Check is the makanan already exsist
            const dataMakanan = await this.getMakanan(data.code);
            if(dataMakanan){
                throw new ApolloError('Makanan Already Exsist!', 'DUPLICATE_FIELD', {
                    statusCode: 402,
                    message:"Makanan With That Name Already Exsist!"    
                });
            }

            return await getRepository(Makanan).save({...data});
        } catch (error) {
            throw error       
        }
    }
}