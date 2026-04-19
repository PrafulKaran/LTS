# FastAPI Backend - College Social Platform

This folder contains the backend API for the College Social Platform built with **FastAPI**, **SQLAlchemy**, and **PostgreSQL**.

## 📋 Contents

```
backend/
├── routes/                    # API endpoint handlers
│   ├── auth.py               # Authentication (login, signup, forgot-password)
│   ├── users.py              # User CRUD operations
│   ├── posts.py              # Post management
│   ├── comments.py           # Comment management
│   ├── likes.py              # Like system
│   └── followers.py          # Follow/Unfollow system
│
├── models/                    # Data models
│   ├── models.py             # SQLAlchemy ORM models
│   └── schemas.py            # Pydantic request/response schemas
│
├── uploads/                   # Uploaded files
│   └── profile_pictures/      # User profile picture storage
│
├── app.py                     # Main FastAPI application
├── database.py                # Database configuration & connection
├── config.py                  # Environment variables
├── requirements.txt           # Python dependencies
├── .env                       # Environment variables (local)
└── README.md                  # This file
```

## 🚀 Quick Start

### 1. Setup Environment

```bash
# Navigate to backend folder
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment

Create `.env` file:
```env
# Database Configuration
DATABASE_URL=postgresql://postgres:1701@localhost:5432/college_db

# App Configuration
SECRET_KEY=your-secret-key-here-change-in-production
DEBUG=True
```

### 4. Start Backend

```bash
python app.py
```

Expected output:
```
✓ Auth module imported successfully
✓ Other routes imported successfully
✓ Auth router included
INFO:     Uvicorn running on http://127.0.0.1:8000
```

### 5. Access API Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 📦 Dependencies

### Core
- **fastapi** (0.104.1) - Web framework
- **uvicorn** (0.24) - ASGI server
- **pydantic** (2.0+) - Data validation

### Database
- **sqlalchemy** (2.0.23) - ORM
- **psycopg2-binary** (2.9.9) - PostgreSQL driver
- **python-dotenv** (1.0) - Environment variables

### Security
- **hashlib** - Password hashing (built-in)

See `requirements.txt` for complete list.

## 🔌 API Endpoints

### Authentication Routes (`/auth`)

#### POST /auth/login
Login with email and password
```json
{
  "email": "user@college.com",
  "password": "password123"
}
```
**Response (200 OK):**
```json
{
  "id": 1,
  "username": "john_doe",
  "email": "user@college.com",
  "first_name": "John",
  "last_name": "Doe",
  "profile_picture": "user_1_1704067200.png",
  "created_at": "2024-01-01T12:00:00",
  "message": "Login successful"
}
```

#### POST /auth/forgot-password
Request password reset
```json
{
  "email": "user@college.com"
}
```
**Response (200 OK):**
```json
{
  "reset_token": "abc123xyz",
  "message": "Reset token generated"
}
```

#### POST /auth/reset-password
Reset password
```json
{
  "email": "user@college.com",
  "new_password": "newpassword123"
}
```
**Response (200 OK):**
```json
{
  "message": "Password reset successful"
}
```

---

### User Routes (`/users`)

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
**Response (200 OK):**
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

#### GET /users/{user_id}
Get user profile
**Response (200 OK):**
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

#### GET /users/
Get all users (paginated)
**Query Parameters:**
- `skip` (default: 0) - Pagination offset
- `limit` (default: 10) - Number of users to return

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "username": "john_doe",
    "email": "user@college.com",
    ...
  },
  ...
]
```

#### DELETE /users/{user_id}
Delete user account
**Response (200 OK):**
```json
{
  "message": "User deleted successfully"
}
```

---

### Post Routes (`/posts`) - *In Development*

#### POST /posts/
Create new post
#### GET /posts/
Get all posts
#### GET /posts/{post_id}
Get specific post
#### PUT /posts/{post_id}
Update post
#### DELETE /posts/{post_id}
Delete post

---

### Comment Routes (`/comments`) - *In Development*

#### POST /comments/
Create comment
#### GET /comments/{post_id}
Get comments on post
#### DELETE /comments/{comment_id}
Delete comment

---

### Like Routes (`/likes`) - *In Development*

#### POST /likes/
Like a post
#### DELETE /likes/{like_id}
Unlike a post

---

### Follower Routes (`/followers`) - *In Development*

#### POST /followers/{user_id}
Follow user
#### DELETE /followers/{user_id}
Unfollow user
#### GET /followers/{user_id}
Get followers of user

---

## 🗂️ Project Structure Details

### app.py - Main Application

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files for uploads
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Include routers
app.include_router(auth.router)
app.include_router(users.router)
# ... more routers
```

### database.py - Database Configuration

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from config import DATABASE_URL

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

### config.py - Environment Variables

```python
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY = os.getenv("SECRET_KEY", "default-secret-key")
DEBUG = os.getenv("DEBUG", "False") == "True"
```

### models/models.py - SQLAlchemy Models

```python
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, index=True)
    email = Column(String(100), unique=True, index=True)
    password = Column(String(255))
    first_name = Column(String(50))
    last_name = Column(String(50))
    profile_picture = Column(Text, nullable=True)
    # ... more fields
```

### models/schemas.py - Pydantic Schemas

```python
from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    profile_picture: Optional[str] = None

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    # ... more fields
    
    class Config:
        from_attributes = True
```

### routes/auth.py - Authentication Routes

```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.models import User
from models.schemas import LoginRequest

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    # ... password verification
    return user
```

### routes/users.py - User Routes

```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.models import User

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    # ... validation and user creation
    return new_user

@router.get("/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
```

## 🖼️ File Upload Handling

### Profile Picture Upload

1. **Frontend**: Converts image to base64 data URI
2. **Backend**: Receives base64 string in JSON
3. **Processing**:
   ```python
   def save_base64_image(base64_str: str, user_id: int) -> str:
       # Decode base64
       image_data = base64.b64decode(base64_data)
       
       # Save to disk
       filename = f"user_{user_id}_{timestamp}.png"
       filepath = os.path.join(UPLOAD_DIR, filename)
       
       with open(filepath, 'wb') as f:
           f.write(image_data)
       
       return filename
   ```
4. **Storage**: Files saved to `uploads/profile_pictures/`
5. **Access**: `http://localhost:8000/uploads/profile_pictures/{filename}`

## 🔐 Security Features

### Password Hashing
```python
import hashlib

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()
```

**Note**: For production, use `bcrypt` or `argon2`:
```bash
pip install python-multipart
pip install passlib[bcrypt]
```

### CORS Configuration
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ⚠️ Change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Environment Variables
- Never commit `.env` file to git
- Keep `SECRET_KEY` secret
- Use strong database passwords

## 🧪 Testing

### Using Swagger UI (Built-in)

1. Start backend: `python app.py`
2. Open http://localhost:8000/docs
3. Click on endpoint to expand
4. Click "Try it out"
5. Fill in parameters/body
6. Click "Execute"

### Using cURL

```bash
# Login
curl -X POST "http://localhost:8000/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@college.com","password":"password123"}'

# Get user
curl -X GET "http://localhost:8000/users/1"

# Update user
curl -X PUT "http://localhost:8000/users/1" \
  -H "Content-Type: application/json" \
  -d '{"first_name":"Jonathan"}'
```

### Using Postman

1. Create new request
2. Select method (GET, POST, PUT, DELETE)
3. Enter URL: `http://localhost:8000/endpoint`
4. Add headers: `Content-Type: application/json`
5. Add request body (for POST/PUT)
6. Send

## 🐛 Debugging

### Enable Logging

```python
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

@router.post("/login")
def login(request: LoginRequest):
    logger.debug(f"Login attempt: {request.email}")
    # ...
```

### View Database Queries

```python
from sqlalchemy.pool import StaticPool

engine = create_engine(
    DATABASE_URL,
    echo=True,  # Print all SQL queries
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
```

### Check Network Requests

Use browser DevTools:
1. F12 → Network tab
2. Make request from frontend
3. See request headers, body, response

## 📈 Performance Tips

### Database Optimization
```python
# Use indexes for frequently queried columns
class User(Base):
    __tablename__ = "users"
    email = Column(String(100), unique=True, index=True)

# Use relationships efficiently
from sqlalchemy.orm import joinedload

users = db.query(User).options(joinedload(User.posts)).all()
```

### Pagination
```python
@router.get("/users/")
def get_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    users = db.query(User).offset(skip).limit(limit).all()
    return users
```

### Caching
```python
from functools import lru_cache

@lru_cache(maxsize=128)
def get_user_by_id(user_id: int):
    # Cached result
    pass
```

## 🚨 Common Errors & Solutions

### "database does not exist"
```python
# Ensure PostgreSQL database is created
# See database/README.md for setup
```

### "relation does not exist"
```python
# Run database migrations
# Tables not created, run schema.sql
```

### "could not connect to server"
```python
# Verify PostgreSQL is running
# Check DATABASE_URL in .env
```

### "no module named fastapi"
```bash
# Install dependencies
pip install -r requirements.txt
```

### Import errors on startup
```bash
# Clear Python cache
rm -rf __pycache__
rm -rf routes/__pycache__
python app.py
```

## 📝 Development Workflow

### Adding New Route

1. Create route file: `routes/new_feature.py`
```python
from fastapi import APIRouter

router = APIRouter(prefix="/new-feature", tags=["new-feature"])

@router.get("/")
def get_items():
    return {"message": "New feature"}
```

2. Include in `app.py`:
```python
from routes import new_feature
app.include_router(new_feature.router)
```

3. Test in Swagger: http://localhost:8000/docs

### Adding New Model

1. Add to `models/models.py`:
```python
class NewModel(Base):
    __tablename__ = "new_models"
    # ... columns
```

2. Add schema to `models/schemas.py`:
```python
class NewModelResponse(BaseModel):
    # ... fields
```

3. Create routes in new file

## 🔄 Database Migrations

Future migrations should be placed in `/database/migrations/`:

```bash
psql -U postgres -d college_db -f database/migrations/001_initial_schema.sql
```

## 📚 Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [Pydantic Documentation](https://docs.pydantic.dev/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test with Swagger UI
4. Commit and push
5. Create Pull Request

## ⚠️ Important Notes

1. **Development Only**: Current setup is for development. Don't use in production without:
   - Proper authentication (JWT, OAuth)
   - HTTPS/SSL
   - Rate limiting
   - Input validation
   - Error logging
   - Monitoring

2. **Password Security**: Use `bcrypt` instead of SHA-256 in production

3. **CORS**: Change `allow_origins=["*"]` in production to specific domains

4. **Environment Variables**: Never commit `.env` file

---

**Last Updated**: April 19, 2026
**FastAPI Version**: 0.104.1
**Status**: Active Development
