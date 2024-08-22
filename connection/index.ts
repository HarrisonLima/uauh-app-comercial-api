import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

const connection = new Client({
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  host: process.env.DB_HOST as string,
  port: parseInt(process.env.DB_PORT as string),
  database: process.env.DB_NAME as string,
});

connection.connect();
export default connection;