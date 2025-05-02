# DT207-moment4-backend

A minimal API for user registration, login, and authentication using JSON Web Tokens (JWT). Stores user data in a SQLite database.

---

## 🚀 Implemented Features

- User account creation
- Login with registered credentials
- JWT-based authentication
- Protected API routes requiring authentication
- Git-based version control

---

## 📦 Deployment

Deployed on **Azure App Service**
👉 [dt207g-moment4-backend.azurewebsites.net](dt207g-moment4-backend.azurewebsites.net)

---

## 📊 Entity Relationship Diagram

The database consists of a single `users` table, structured as follows:

| Column       | Type      | Description                     |
|--------------|-----------|---------------------------------|
| `id`         | `INTEGER` | Primary key (auto-incremented)  |
| `username`   | `TEXT`    | Unique username for login       |
| `password`   | `TEXT`    | Hashed password                 |
| `email`      | `TEXT`    | User's email address            |
| `first_name` | `TEXT`    | User's first name               |
| `last_name`  | `TEXT`    | User's last name                |
| `created`    | `TEXT`    | Timestamp of account creation   |

---

## 📡 Endpoints

### GET `/api/protected`
- Returns the authenticated user's information from the database (excluding `password` and `id`).
- Requires a valid JWT token in the `Authorization` header.

### POST `/api/login`
- Authenticates the user with provided credentials.
- On success: returns a JWT token to the client.
- On failure: responds with an appropriate status code and error message.

### POST `/api/register`
- Registers a new user in the database using the provided data.
- Validates required fields and checks for duplicate usernames.

---

## 🧪 Running Locally

### 🧰 Prerequisites

- [Node.js](https://nodejs.org/)
- Git

---

### 🔧 Step 1: Clone the project
```bash
git clone https://github.com/RobinHawiz/DT207G-moment4-backend.git
```
```bash
cd DT207G-moment4-backend
```

---

### 📦 Step 2: Install dependencies & initialize the database
```bash
npm install && npm run install
```

---

### 🧬 Step 3: Configure environment variables

Create a .env file in the project root with the following variables:
```env
PORT=4000
JWT_SECRET_KEY="your-secret-key"
```

---

### 🚀 Step 4: Run the backend server

```bash
npm start
```
Now your server will be live at http://localhost:4000
