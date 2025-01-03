import { ApolloError, ApolloServer, gql } from 'apollo-server-express';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import "reflect-metadata";
import TypeORMDB from './data-source';
import schema from './Resolvers/Recipes-resolver';
import { buildSchema, GraphQLISODateTime } from 'type-graphql';
import RecipeResolver from './Resolvers/Recipes-resolver';
import UserResolver from './Resolvers/User-resolver';
import { UserContext } from './Contexts/user-context';

const app : any = express();
app.use(cors());
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    req.user = {
        username: 'test'
    };
    next();
});

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

export interface Context {
    authScope? : string
}

const apolloServer = async () => {
    return new ApolloServer({
        schema: await buildSchema({
            resolvers: [RecipeResolver, UserResolver]
        }),
        resolvers: {
            DateTime: GraphQLISODateTime
        },
        context: ({req, res}) : UserContext => {
            const user = req.user || null;
            return { user }
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