import { Arg, Authorized, buildSchema, Field, GraphQLISODateTime, InputType, Int, Mutation, Query, Resolver } from "type-graphql";
import Recipe from "../entity/Recipes";
import { ArrayMaxSize, Length, Max, MaxLength, Min } from "class-validator";
import { getRepository } from "typeorm";
import { ApolloError } from "apollo-server-express";

@InputType()
class newRecipeInput{
    @Field(type => String)
    @MaxLength(30)
    title: string

    @Field(type => String)
    @Length(5, 30)
    description? : string

    @Field(type => Date)
    creationDate: Date
    
    @Field(type => [String])
    @ArrayMaxSize(30)
    ingredients: string[]
}

@InputType()
class updateRecipeInput{
    @Field(type => String, {nullable: true})
    title?: string

    @Field(type => String, {nullable: true})
    description?: string

    @Field(type => GraphQLISODateTime, {nullable: true})
    creationDate?: Date

    @Field(type => String, {nullable: true})
    ingredients? : string[]
}

@InputType()
class recipeArgs {
    @Field(type => Int, {nullable: true})
    @Min(0)
    skip?: number = 0;

    @Field(type => Int, {nullable: true})
    @Min(1)
    @Max(50)
    take?: number = 25;
}


@Resolver(Recipe)
class RecipeResolver{
    constructor(){}

    private recipes: Recipe[] = [
        {
            id: "1",
            title: "Pasta",
            description: "Make a great pasta",
            ingredients: ["Pasta", "Sauce"],
            creationDate: new Date()
        }
    ];

    @Query(returns => Recipe)
    async getRecipes(@Arg("id", type => String) id: string){
        try {
            const recipe =  await getRepository(Recipe).findOne({
                where: {
                    id: id
                }
            })
            if(recipe)
        return recipe; 
            else{
                throw new ApolloError('Cannot Find The Recipes', 'RECIPE_NOT_FOUND', {
                    statusCode: 404,
                    customMessage: `No Recipe is found with the code ${id}`
                });
            }
        } catch (error) {
            return error;
        }
    }

    @Query(() => [Recipe])
    async getAllRecipes(@Arg("arg", type => recipeArgs, {nullable: true}) arg?: recipeArgs){
        const startIndex = arg?.skip;
        const endIndex = arg?.take;
        const recipes = await getRepository(Recipe).find();
        // return this.recipes.slice(startIndex, endIndex);
        return recipes;
    }

    @Mutation(() => String)
    async addRecipe(@Arg('data', type => newRecipeInput) data: newRecipeInput){
        const recipeData = {...data };
        try {
            await getRepository(Recipe).save(recipeData);
        return 'Success Creating Recipe';
        } catch (error) {
            console.log(error);
            return 'Cannot Create Recipe!'
        }
    }

    @Mutation(() => String)
    async removeRecipe(@Arg('id', type => String) id: String){
        const recipeIndex = this.recipes.findIndex(rec => rec.id === id);

        if(recipeIndex === -1)
            return 'Cannot Find the Recipe Index!'

        const updatedItem = [
            ...this.recipes.slice(0, recipeIndex),
            ...this.recipes.slice(recipeIndex + 1)
        ];
        this.recipes = updatedItem;
        
        return 'Success Remove Item';
    }

    @Mutation(() => String)
    async updateRecipe(@Arg('id', type => String) id: String, @Arg('data', type => updateRecipeInput) data: updateRecipeInput){

        const recipeIndex = this.recipes.findIndex(rec => rec.id === id);

        if(recipeIndex === -1)
            return 'Cannot Find the Recipe Index!';

        const updatedRecipe = {
            ...this.recipes[recipeIndex],
            ...data
        };

        this.recipes[recipeIndex] = updatedRecipe;

        return 'Success Update Recipe'
    }
};

const schema = await buildSchema({
    resolvers: [RecipeResolver]
});

export default schema;