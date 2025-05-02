import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function authRoutes(db) {
  const router = Router();

  router.post("/register", async (req, res) => {
    try {
      const payload = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      };

      // Validate input
      for (const key in payload) {
        if (!payload[key]) {
          return res.status(400).json({
            error:
              "Invalid input, send username, password, email, firstName and lastName",
          });
        }
      }

      // Check if user exist
      const statement = db.prepare(
        `select * from users where username = @username`
      );
      const row = statement.get({ username: payload.username });
      if (!!row) {
        return res.status(401).json({ message: "User already exists!" });
      }

      // Hash password
      payload.password = await bcrypt.hash(payload.password, 10);

      // Correct - save user
      statement =
        db.prepare(`insert into users (username, password, email, first_name, last_name)
                  values(@username, @password, @email, @firstName, @lastName)`);
      statement.run(payload);

      res.status(201).json({ message: "User created" });
    } catch (error) {
      res.status(500).json({ error: "Database user insertion error" });
    }
  });

  router.post("/login", async (req, res) => {
    try {
      const payload = {
        username: req.body.username,
        password: req.body.password,
      };

      // Validate input
      if (!payload.username || !payload.password) {
        return res
          .status(400)
          .json({ error: "Invalid input, send username and password" });
      }
      // Check if user exist
      const statement = db.prepare(
        `select * from users where username = @username`
      );
      const row = statement.get({ username: payload.username });
      if (!row) {
        return res
          .status(401)
          .json({ message: "Incorrect username or password!" });
      } else {
        // User exists - check username/password
        const passwordMatch = await bcrypt.compare(
          payload.password,
          row.password
        );

        if (!passwordMatch) {
          res.status(401).json({ message: "Incorrect username or password!" });
        } else {
          // Create JWT
          const token = jwt.sign({ id: row.id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1h",
          });
          res.status(201).json({ message: "Correct login!", token });
        }
      }
    } catch (error) {
      res.status(500).json({ error: "Database user login error" });
    }
  });

  return router;
}
