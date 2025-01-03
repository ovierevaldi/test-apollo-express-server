import "reflect-metadata"
import { createConnection, DataSource } from "typeorm"
import { Photo } from "./entity/Photo"
import Recipe from "./entity/Recipes";

const TypeORMDB = () => {
    const AppDataSource = new DataSource({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "admin",
        database: "test-server",
        synchronize: true,
        logging: false,
        entities: [Photo, Recipe],
        migrations: [],
        subscribers: [],
    });
    
    // const connect = async () => {
    //     try {
    //         AppDataSource.initialize();
    //         console.log('Connected to DB');
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const connect = async () => {
        const conn = await createConnection({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "admin",
            database: "test-server",
            synchronize: true,
            logging: false,
            entities: [Photo, Recipe],
            migrations: [],
            subscribers: [],
        });
        
        if(conn.options.database)
            console.log("Database connected :", conn.options.database);

        return conn;
    }
   
    return {
        connect
    }
};

export default TypeORMDB;


