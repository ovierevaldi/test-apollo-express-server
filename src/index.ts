import { ApolloError, ApolloServer, gql } from 'apollo-server-express';
import express, { Request, Response } from 'express';
import cors from 'cors';
import "reflect-metadata";
import TypeORMDB from './data-source';
import schema from './Resolvers/Recipes-resolver';
import { buildSchema, GraphQLISODateTime } from 'type-graphql';
import RecipeResolver from './Resolvers/Recipes-resolver';
import UserResolver from './Resolvers/User-resolver';

const app : any = express();
app.use(cors());
app.use(express.json());


const typeDefs = gql`
    type Query {
        hello: String!
    }
`

const resolvers = {
    Query: {
        hello: () => 'Hello, World!'
    }
}

const apolloServer = async () => {
    return new ApolloServer({
        schema: await buildSchema({
            resolvers: [RecipeResolver, UserResolver]
        }),
        resolvers: {
            DateTime: GraphQLISODateTime
        },
        formatError: (error) => {
            return {
                message: error.message,
                code: error.extensions.statusCode || 'INTERNAL_SERVER_ERROR'
            }
        }
    });
};

export const dbInstance = await TypeORMDB().connect();

const apolloServerRef = await apolloServer();
await apolloServerRef.start();
apolloServerRef.applyMiddleware({ app });

app.get('/', (req: Request, res: Response) => {
    res.send('Test')
});

app.listen(3000, () => {
    console.log('Server runs on port 3000')
})