# Notes Application

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for managing personal notes with authentication and real-time updates.

## Features

### User Management
- Secure user authentication using JWT
- User registration and login
- Profile management
- Password hashing with bcrypt

### Notes Management
- Create, read, update, and delete notes
- Real-time updates using WebSocket
- Categorize notes with tags
- Filter notes by category
- Search functionality
- Timestamps for creation and updates

### UI/UX
- Responsive design using Tailwind CSS
- Dark mode support
- Clean and intuitive interface
- Real-time updates
- Mobile-friendly layout

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **WebSocket** - Real-time updates

## Project Structure

```
notes-application/
backend/
  ├── config/
  │   └── db.js
  ├── controllers/
  │   ├── noteController.js
  │   └── userController.js
  ├── middleware/
  │   ├── authMiddleware.js
  │   ├── errorMiddleware.js
  │   └── validateMiddleware.js
  ├── models/
  │   ├── noteModel.js
  │   └── userModel.js
  ├── routes/
  │   ├── noteRoutes.js
  │   └── userRoutes.js
  ├── utils/
  │   └── validators.js
  ├── .env
  ├── .gitignore
  ├── package.json
  └── server.js

├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
│
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the application:
   ```bash
   npm start
   ```

## API Endpoints

### User Authentication & Operations
```
POST /api/users/register
- Register a new user
- Body: { "name": "string", "email": "string", "password": "string" }

POST /api/users/login
- Login user
- Body: { "email": "string", "password": "string" }
```

### Notes Management
```
GET /api/notes
- Get all notes for authenticated user
- Header: Authorization: Bearer {token}

POST /api/notes
- Create a new note
- Header: Authorization: Bearer {token}
- Body: { "title": "string", "content": "string", "category": "string" }

PUT /api/notes/:id
- Update an existing note
- Header: Authorization: Bearer {token}
- Body: { "title": "string", "content": "string", "category": "string" }

DELETE /api/notes/:id
- Delete a note
- Header: Authorization: Bearer {token}
```

### Admin Routes
```
POST /api/admin/users
- Add a new user (Admin only)
- Header: Authorization: Bearer {token}
- Body: { "name": "string", "email": "string", "password": "string", "isAdmin": boolean }

GET /api/admin/users
- Get all users (Admin only)
- Header: Authorization: Bearer {token}

PUT /api/admin/users/:id
- Update user details (Admin only)
- Header: Authorization: Bearer {token}
- Body: { "name": "string", "email": "string", "isAdmin": boolean }

DELETE /api/admin/users/:id
- Delete a user (Admin only)
- Header: Authorization: Bearer {token}
```

### Request Headers
For protected routes, include:
```
Authorization: Bearer {your_jwt_token}
Content-Type: application/json
```

## Security Measures

- JWT authentication
- Password hashing with bcrypt
- HTTP security headers with Helmet.js
- CORS configuration
- Input validation and sanitization
- Protected routes
- Error handling middleware

## Deployment
render.com
both front endand backend


## Live Demo
[Live Application Link](https://notes-app-2pse.onrender.com)

## Contributing
1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request


## Author
Darakhsha
- GitHub: [@darakhshad11](https://github.com/darakhshad11)
- LinkedIn: [Darakhsha Rayen ](https://www.linkedin.com/in/darakhsha-rayen-a81a33222/)

## Acknowledgments
- MongoDB Documentation
- React.js Documentation
- Express.js Documentation
- Tailwind CSS Documentation