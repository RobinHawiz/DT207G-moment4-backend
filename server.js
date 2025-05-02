import express, { json } from "express";
import dotenv from "dotenv";
import Database from "better-sqlite3";
import jwt from "jsonwebtoken";
import { authRoutes } from "./routes/authRoutes.js";
import path from "path";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(json());

// Connect
const __dirname = import.meta.dirname;
const db = new Database(path.join(__dirname, "db", "app.db"));

// Routes
app.use("/health", (_req, res) => {
  res.status(200);
});
app.use("/api", authRoutes(db));

// Protected routes
app.get("/api/protected", authenticateToken, (req, res) => {
  try {
    const statement = db.prepare(
      `select id, username, email, first_name as firstName, last_name as lastName, created from users where id = @id`
    );
    const row = statement.get({ id: req.id });
    res.status(200).json(row);
  } catch (error) {
    res.status(500).json({ message: "Database lookup error:", error });
  }
});

// Validate token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authorized for this route - token missing!" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
    if (err) return res.status(403).json({ message: "Not correct JWT!" });
    req.id = payload.id;
    next();
  });
}

app.listen(port, () => {
  console.log("Server running at port: " + port);
});
