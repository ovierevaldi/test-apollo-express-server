import { Arg, Authorized, buildSchema, Field, GraphQLISODateTime, InputType, Int, Mutation, Query, Resolver } from "type-graphql";
import Recipe from "../entity/Recipes";
import { ArrayMaxSize, Length, Max, MaxLength, Min } from "class-validator";

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

class recipeArgs {
    @Field(type => Int)
    @Min(0)
    skip: number = 0;

    @Field(type => Int)
    @Min(1)
    @Max(50)
    take: number = 25;
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
        const recipe = this.recipes.find( rec => rec.id === id);
        return recipe; 
    }

    @Query(() => [Recipe])
    async getAllRecipes(){
        return this.recipes;
    }

    @Mutation(() => String)
    async addRecipe(@Arg('data', type => newRecipeInput) data: newRecipeInput){
        const recipe = { id: `${this.recipes.length + 1}`, ...data };
        this.recipes.push(recipe);
        return 'Success Creating Recipe';
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