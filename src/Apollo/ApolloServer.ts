import { ApolloServer } from "apollo-server-express";
import { buildSchema, GraphQLISODateTime } from "type-graphql";
import RecipeResolver from "../Resolvers/Recipes-resolver";
import UserResolver from "../Resolvers/User-resolver";
import { UserContext } from "../Contexts/user-context";

const ApolloGraphQLServer = {
    createServer : async () => {
        return new ApolloServer({
            // Create Schema from type-graphql
            schema: await buildSchema({
                resolvers: [RecipeResolver, UserResolver]
            }),
            resolvers: {
                DateTime: GraphQLISODateTime
            },
            context: ({req, res}) : UserContext => {
             
                return {  }
            },
            formatError: (error) => {
                return {
                    message: error.message,
                    code: error.extensions.statusCode || 'INTERNAL_SERVER_ERROR'
                }
            }
        });
    }
};

export default ApolloGraphQLServer;