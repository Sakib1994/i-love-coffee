import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "pass123",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
    subscribers: [],
})

