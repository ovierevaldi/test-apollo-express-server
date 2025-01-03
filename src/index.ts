import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import "reflect-metadata";
import TypeORMDB from './data-source';
import ApolloGraphQLServer from './Apollo/ApolloServer';

const app : any = express();

app.use(cors());

app.use(express.json());

// Handle Request and Response Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    next();
});

// Connect DB
await TypeORMDB().connect();

// Apollo GraphQL Server
const apolloServerRef = await ApolloGraphQLServer.createServer();
await apolloServerRef.start();
apolloServerRef.applyMiddleware({ app });

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
});

app.listen(3000, () => {
    console.log('Server runs on port 3000')
})