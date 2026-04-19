# College Social Platform 🎓

A full-stack social networking application built for college students to connect, discover, and match with each other. The platform combines a modern React frontend with a robust FastAPI backend and PostgreSQL database.

## 🌟 Features

### Authentication
- ✅ User Registration with Profile Picture Upload
- ✅ Email/Password Login
- ✅ Forgot Password with 2-Step Reset Flow
- ✅ Session Management with LocalStorage

### User Profile
- ✅ Profile Picture Upload and Display
- ✅ Profile Editing (Name, Email, Bio)
- ✅ Avatar Display in Navbar
- ✅ Real-time Profile Picture Updates
- ✅ Initials Fallback Display

### Social Features (In Progress)
- 🔄 Post Creation and Viewing
- 🔄 Comments System
- 🔄 Like/Unlike Posts
- 🔄 Follow/Unfollow Users
- 🔄 Match Discovery
- 🔄 Chat System

## 🏗️ Project Structure

```
LTS/
├── front end/                 # React + Vite Frontend
│   ├── src/
│   │   ├── pages/            # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   ├── ForgotPasswordPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── DiscoveryPage.jsx
│   │   │   ├── MatchesPage.jsx
│   │   │   ├── ChatPage.jsx
│   │   │   ├── SettingsPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── components/        # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── ...
│   │   ├── context/          # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/            # Custom hooks
│   │   │   └── useAuth.js
│   │   ├── utils/            # Utility functions
│   │   │   └── helpers.js
│   │   ├── styles/           # Theme and styles
│   │   │   └── theme.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/                   # FastAPI Backend
│   ├── routes/               # API routes
│   │   ├── auth.py           # Authentication endpoints
│   │   ├── users.py          # User CRUD operations
│   │   ├── posts.py          # Posts endpoints
│   │   ├── comments.py       # Comments endpoints
│   │   ├── likes.py          # Likes endpoints
│   │   └── followers.py      # Followers endpoints
│   ├── models/               # Data models
│   │   ├── models.py         # SQLAlchemy ORM models
│   │   └── schemas.py        # Pydantic validation schemas
│   ├── uploads/              # Uploaded files
│   │   └── profile_pictures/ # User profile pictures
│   ├── app.py                # Main FastAPI app
│   ├── database.py           # Database configuration
│   ├── config.py             # Environment configuration
│   ├── requirements.txt      # Python dependencies
│   └── .env                  # Environment variables
│
├── database/                 # Database setup
│   ├── schema.sql           # Database schema
│   ├── migrations/          # Future migrations
│   └── seed_data/           # Sample data
│
└── README.md

```

## 💻 Tech Stack

### Frontend
- **React 18.2** - UI Library
- **Vite 5.0** - Build tool & dev server
- **Material-UI 5.14** - Component library
- **React Router 6.20** - Client-side routing
- **Framer Motion 10.16** - Animation library
- **Axios 1.6** - HTTP client
- **Sonner** - Toast notifications

### Backend
- **FastAPI 0.104** - Web framework
- **Uvicorn 0.24** - ASGI server
- **SQLAlchemy 2.0** - ORM
- **Pydantic** - Data validation
- **Psycopg2 2.9** - PostgreSQL driver
- **Python-dotenv 1.0** - Environment variables

### Database
- **PostgreSQL 18** - Relational database

## 📋 Prerequisites

- Node.js 16+ and npm
- Python 3.8+
- PostgreSQL 12+
- Git

## 🚀 Installation & Setup

### 1. Database Setup

#### Step 1: Create PostgreSQL Database
```bash
# Open PostgreSQL command line
psql -U postgres

# Create database
CREATE DATABASE college_db;

# Connect to database
\c college_db

# Run schema
\i 'path/to/database/schema.sql'
```

Or use pgAdmin GUI:
1. Right-click on Databases
2. Create → Database
3. Name: `college_db`
4. Open SQL Editor and run `database/schema.sql`

#### Step 2: Verify Tables
```sql
-- Check tables created
SELECT * FROM information_schema.tables WHERE table_schema = 'public';

-- List of tables:
-- - users
-- - posts
-- - comments
-- - followers
-- - likes
```

### 2. Backend Setup

#### Step 1: Navigate to Backend
```bash
cd e:\GIT\Fronend_College\LTS\backend
```

#### Step 2: Create Virtual Environment
```bash
# Create venv
python -m venv venv

# Activate venv
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate
```

#### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

#### Step 4: Configure Environment
Create `.env` file in `backend/` folder:
```env
DATABASE_URL=postgresql://postgres:1701@localhost:5432/college_db
SECRET_KEY=your-secret-key-here
DEBUG=True
```

**Note**: Update credentials if your PostgreSQL username/password is different.

#### Step 5: Run Backend
```bash
python app.py
```

**Expected Output:**
```
✓ Auth module imported successfully
✓ Other routes imported successfully
✓ Auth router included
INFO:     Uvicorn running on http://127.0.0.1:8000
```

**Test Backend:** Visit http://localhost:8000/docs (Swagger UI)

### 3. Frontend Setup

#### Step 1: Navigate to Frontend
```bash
cd "e:\GIT\Fronend_College\LTS\front end"
```

#### Step 2: Install Dependencies
```bash
npm install
```

#### Step 3: Configure API URL
Create `.env.local` file in `front end/` folder:
```env
VITE_API_URL=http://localhost:8000
```

#### Step 4: Run Development Server
```bash
npm run dev
```

**Expected Output:**
```
  VITE v5.0.0  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

**Access Application:** http://localhost:5173

## 🔌 API Documentation

### Base URL
```
http://localhost:8000
```

### Authentication Endpoints

#### POST /auth/login
Login with email and password
```json
{
  "email": "user@college.com",
  "password": "password123"
}
```
**Response (200):**
```json
{
  "id": 1,
  "username": "john_doe",
  "email": "user@college.com",
  "first_name": "John",
  "last_name": "Doe",
  "profile_picture": "user_1_1704067200.png",
  "created_at": "2024-01-01T12:00:00"
}
```

#### POST /auth/forgot-password
Request password reset
```json
{
  "email": "user@college.com"
}
```
**Response (200):**
```json
{
  "reset_token": "abc123xyz",
  "message": "Reset token generated"
}
```

#### POST /auth/reset-password
Reset password with token
```json
{
  "email": "user@college.com",
  "new_password": "newpassword123"
}
```

### User Endpoints

#### POST /users/register
Register new user
```json
{
  "username": "john_doe",
  "email": "user@college.com",
  "password": "password123",
  "first_name": "John",
  "last_name": "Doe",
  "profile_picture": "data:image/png;base64,iVBOR..."
}
```

#### GET /users/{user_id}
Get user profile
**Response (200):**
```json
{
  "id": 1,
  "username": "john_doe",
  "email": "user@college.com",
  "first_name": "John",
  "last_name": "Doe",
  "bio": null,
  "profile_picture": "user_1_1704067200.png",
  "created_at": "2024-01-01T12:00:00"
}
```

#### PUT /users/{user_id}
Update user profile
```json
{
  "first_name": "Jonathan",
  "bio": "College student passionate about tech",
  "profile_picture": "data:image/png;base64,iVBOR..."
}
```

#### GET /users/?skip=0&limit=10
Get all users (paginated)

#### DELETE /users/{user_id}
Delete user account

### Static Files
- Profile pictures are served from: `http://localhost:8000/uploads/profile_pictures/{filename}`

## 📁 Database Schema

### users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    bio TEXT,
    profile_picture TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### posts Table
```sql
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    content TEXT NOT NULL,
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### comments Table
```sql
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL REFERENCES posts(id),
    user_id INTEGER NOT NULL REFERENCES users(id),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### followers Table
```sql
CREATE TABLE followers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    follower_id INTEGER NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### likes Table
```sql
CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL REFERENCES posts(id),
    user_id INTEGER NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 📸 Image Handling

### Profile Picture Upload
1. User selects image in signup/profile page
2. Image converted to **base64** in frontend
3. Sent to backend as JSON
4. Backend decodes and saves to `/uploads/profile_pictures/`
5. Filename stored in database (e.g., `user_1_1704067200.png`)
6. Frontend displays image from `http://localhost:8000/uploads/profile_pictures/{filename}`

### Supported Formats
- JPEG, PNG, GIF, WebP
- Max size: 5MB
- Recommended: 400x400px

## 🔑 Key Features Implementation

### Authentication Flow
1. User fills signup form with profile picture
2. Backend creates user, saves picture to disk
3. User logs in with email/password
4. Login stores user data in localStorage
5. Protected routes check authentication
6. Navbar shows profile picture

### Profile Picture Update
1. User clicks camera icon on profile
2. Selects new image
3. Image shows preview immediately
4. Backend saves file
5. Profile auto-refreshes without page reload
6. Toast notification shows success/error

### Toast Notifications
- **Success**: Green toast with checkmark
- **Error**: Red toast with error message
- **Loading**: Gray toast with spinner
- **Auto-dismiss**: 5 seconds (customizable)
- **Stacked**: Multiple toasts stack vertically

## 🛠️ Development Tips

### Backend Development
```bash
# Restart backend after changes
Ctrl+C
python app.py

# Check backend logs at console
# View API docs at http://localhost:8000/docs
```

### Frontend Development
- Hot reload enabled automatically with Vite
- Changes save instantly
- Check console for errors: F12 → Console

### Database Debugging
```bash
# Connect to PostgreSQL
psql -U postgres -d college_db

# View tables
\dt

# View data
SELECT * FROM users;
SELECT * FROM posts;
```

### Common Issues

#### Backend won't start
```bash
# Check Python version
python --version

# Check virtual environment active
# (should see "venv" in terminal)

# Reinstall dependencies
pip install --upgrade -r requirements.txt
```

#### Frontend won't start
```bash
# Check Node version
node --version

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules
npm install
npm run dev
```

#### Database connection failed
```bash
# Check PostgreSQL running
# Windows: Check Services or start from pgAdmin

# Verify connection string in .env
# Format: postgresql://username:password@localhost:5432/college_db

# Test connection
psql -U postgres -d college_db
```

## 📝 Recent Updates

### Version 1.0 (Current)
- ✅ User authentication (signup, login, forgot password)
- ✅ Profile picture upload and display
- ✅ Auto-updating profile page
- ✅ Toast notifications (Sonner)
- ✅ Database auto-migration
- ✅ Protected routes
- ✅ Responsive UI with Material-UI

## 🔮 Upcoming Features

- [ ] Post creation and feed
- [ ] Comments system
- [ ] Like/Unlike functionality
- [ ] Follow/Unfollow users
- [ ] Real-time chat
- [ ] Match discovery algorithm
- [ ] User search
- [ ] Notifications
- [ ] User blocking
- [ ] Report functionality
- [ ] Email notifications
- [ ] OAuth integration (Google, Facebook)

## 📞 Troubleshooting

### Profile Picture Not Uploading
1. Check backend is running: `http://localhost:8000/docs`
2. Check `uploads/profile_pictures/` folder exists
3. Verify image size < 5MB
4. Check browser console for error messages (F12)

### Avatar Not Updating After Upload
1. Clear browser cache (Ctrl+Shift+Delete)
2. Check network tab (F12 → Network) for failed requests
3. Verify image file was saved: check `backend/uploads/profile_pictures/`
4. Try logging out and logging back in

### Toast Not Showing
1. Ensure Sonner is installed: `npm install sonner`
2. Check `App.jsx` has `<Toaster />` component
3. Verify imports: `import { toast } from 'sonner'`

### Backend 404 Errors
1. Ensure backend is running on correct port (8000)
2. Check API endpoint URL in frontend `.env.local`
3. Verify routes are correctly included in `app.py`
4. Check terminal for router inclusion messages

## 📚 Learning Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Material-UI Components](https://mui.com/)
- [Sonner Documentation](https://sonner.emilkowal.ski/)

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/feature-name`
2. Commit changes: `git commit -m 'Add feature'`
3. Push to branch: `git push origin feature/feature-name`
4. Create Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Praful**

## 📞 Support

For issues and questions, please create an issue in the repository or contact the development team.

---

**Last Updated**: April 19, 2026
**Project Status**: Active Development
**Version**: 1.0.0