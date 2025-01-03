import express, { Request, Response } from 'express';
import cors from 'cors';
import "reflect-metadata";
import TypeORMDB from './data-source';
import ApolloGraphQLServer from './Apollo/ApolloServer';
import dotenv from 'dotenv';
import authRoute from './Middleware/isAuth'

dotenv.config();

const app : any = express();

app.use(express.json());

app.use(cors());

// Check Auth API
app.use(authRoute);

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