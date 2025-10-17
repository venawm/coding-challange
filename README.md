# 🧑‍💻 User Management Dashboard

A **ReactJS + TypeScript** application that demonstrates full authentication, user listing, detailed views, pagination, and persistent preferences — all powered by the [DummyJSON API](https://dummyjson.com/docs/users).

> **Objective:** Build a production-ready ReactJS application that handles login, displays a list of users, manages favorites, and maintains state via React Context and local persistence.

---

## 🚀 Features

### 🔐 1. User Authentication

- Login using the [DummyJSON Auth API](https://dummyjson.com/docs/auth).
- Full token management with refresh token support.
- Persistent session (auto-restore on page reload).
- Clean and responsive login screen with custom styling.
- Automatic redirect to dashboard for authenticated users.

### 👥 2. User List Page

- Fetch and display users from [`https://dummyjson.com/users`](https://dummyjson.com/users)
- Pagination with configurable items per page.
- Search functionality to filter users by name, email, or username.
- Sort users by name, email, or status.
- Fully responsive design with mobile-first approach.
- Click on any user to view detailed information.

### 👤 3. User Detail Page

- Fetch user details from [`https://dummyjson.com/users/{id}`](https://dummyjson.com/users/{id}).
- Display comprehensive profile info: name, email, phone, address, company.
- Show user ratings, location data, and contact information.
- "Back to List" button for easy navigation.
- Mark/unmark users as favorites from detail view.

### 🌗 4. Theme & Preferences

- Light/Dark theme toggle with persistent storage.
- Customizable items per page setting.
- "Reset Preferences" button to restore defaults.
- Theme preference restored automatically on app reload.
- Smooth transitions between theme changes.

### ⭐ 5. Favorites Management

- Mark/unmark users as favorites with a single click.
- Persistent favorites across page reloads using localStorage.
- Dedicated `/dashboard/favourites` page for saved users.
- Visual indicator for favorited users throughout the app.
- Quick access to manage your favorite users.

---

## 🛠️ Tech Stack

| Category         | Technology              |
| ---------------- | ----------------------- |
| Frontend         | React 19+, TypeScript   |
| Routing          | React Router v7         |
| Styling          | TailwindCSS             |
| Icons            | Lucide React            |
| State Management | React Context API       |
| Data Fetching    | Axios                   |
| Build Tool       | Vite                    |
| HTTP Client      | Axios with interceptors |
| Package Manager  | npm / yarn              |
| Linting          | ESLint                  |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/coding-challenge.git
cd coding-challenge
```

### 2️⃣ Install dependencies

```bash
npm install
# or
yarn install
```

### 3️⃣ Create environment file

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=https://dummyjson.com
```

### 4️⃣ Start the development server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### 5️⃣ Build for production

```bash
npm run build
# or
yarn build
```

---

## 🔑 Demo Credentials

Use these credentials to test the application:

```
Username: emilys
Password: emilyspass
```

Or use any username/password from the [DummyJSON documentation](https://dummyjson.com/docs/auth).

---
