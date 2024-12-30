import { ApolloServer, gql } from 'apollo-server-express';
import express, { Request, Response } from 'express';
import cors from 'cors';
import 'reflect-metadata'

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
    typeDefs: typeDefs,
    resolvers: resolvers
});

await apolloServer.start();

apolloServer.applyMiddleware({ app })

app.get('/', (req: Request, res: Response) => {
    res.send('Test')
});

app.listen(3000, () => {
    console.log('Server runs on port 3000')
})