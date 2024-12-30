import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
const app = express();
app.use(cors());
app.use(express.json());
const typeDefs = gql `
    type Query {
        hello: String!
    }
`;
const resolvers = {
    Query: {
        hello: () => 'Hello, World!'
    }
};
const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
});
await apolloServer.start();
apolloServer.applyMiddleware({ app });
app.get('/', (req, res) => {
    res.send('Test');
});
app.listen(3000, () => {
    console.log('Server runs on port 3000');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLE9BQThCLE1BQU0sU0FBUyxDQUFDO0FBQ3JELE9BQU8sSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUN4QixPQUFPLGtCQUFrQixDQUFBO0FBRXpCLE1BQU0sR0FBRyxHQUFTLE9BQU8sRUFBRSxDQUFDO0FBQzVCLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUNoQixHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBR3hCLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQTs7OztDQUluQixDQUFBO0FBRUQsTUFBTSxTQUFTLEdBQUc7SUFDZCxLQUFLLEVBQUU7UUFDSCxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsZUFBZTtLQUMvQjtDQUNKLENBQUE7QUFFRCxNQUFNLFlBQVksR0FBRyxJQUFJLFlBQVksQ0FBQztJQUNsQyxRQUFRLEVBQUUsUUFBUTtJQUNsQixTQUFTLEVBQUUsU0FBUztDQUN2QixDQUFDLENBQUM7QUFFSCxNQUFNLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUUzQixZQUFZLENBQUMsZUFBZSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQTtBQUVyQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTtJQUN6QyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ3BCLENBQUMsQ0FBQyxDQUFDO0FBRUgsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO0lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQTtBQUMzQyxDQUFDLENBQUMsQ0FBQSJ9