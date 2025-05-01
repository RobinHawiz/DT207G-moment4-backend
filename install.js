import Database from "better-sqlite3";
import dotenv from "dotenv";
dotenv.config();

// Connect
const db = new Database(process.env.DATABASE);

// Create table users
db.exec("drop table if exists users");

db.exec(`CREATE TABLE users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        email TEXT NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        created TEXT DEFAULT CURRENT_TIMESTAMP
        )`);

console.log("Installation was successful...");
