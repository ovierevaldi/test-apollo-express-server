import { ApolloError, ApolloServer, gql } from 'apollo-server-express';
import express, { Request, Response } from 'express';
import cors from 'cors';
import "reflect-metadata";
import TypeORMDB from './data-source';
import { buildSchema } from 'graphql';
import schema from './Resolvers/Recipes-resolver';
import { GraphQLISODateTime } from 'type-graphql';

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

const apolloServer = new ApolloServer({
    schema,
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

export const dbInstance = await TypeORMDB().connect();

await apolloServer.start();

apolloServer.applyMiddleware({ app });

app.get('/', (req: Request, res: Response) => {
    res.send('Test')
});

app.listen(3000, () => {
    console.log('Server runs on port 3000')
})