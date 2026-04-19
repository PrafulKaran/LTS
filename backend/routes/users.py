from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.models import User
from models.schemas import UserCreate, UserResponse, UserUpdate
import hashlib
import base64
import os
from datetime import datetime

router = APIRouter(prefix="/users", tags=["users"])

# Create uploads directory
UPLOAD_DIR = "uploads/profile_pictures"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def hash_password(password: str) -> str:
    """Hash password using SHA-256"""
    return hashlib.sha256(password.encode()).hexdigest()

def save_base64_image(base64_str: str, user_id: int) -> str:
    """Save base64 image and return filename"""
    try:
        # Extract base64 data
        if ',' in base64_str:
            base64_data = base64_str.split(',')[1]
        else:
            base64_data = base64_str
        
        # Decode and save
        image_data = base64.b64decode(base64_data)
        filename = f"user_{user_id}_{int(datetime.now().timestamp())}.png"
        filepath = os.path.join(UPLOAD_DIR, filename)
        
        with open(filepath, 'wb') as f:
            f.write(image_data)
        
        return filename
    except Exception as e:
        print(f"Error saving image: {e}")
        raise

@router.post("/register", response_model=UserResponse)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    """Register a new user"""
    # Check if user already exists
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already taken")
    
    # Create new user
    hashed_password = hash_password(user.password)
    
    # Save profile picture if provided
    profile_picture_filename = None
    if user.profile_picture:
        try:
            # Temporarily create user to get ID for filename
            new_user = User(
                username=user.username,
                email=user.email,
                password=hashed_password,
                first_name=user.first_name,
                last_name=user.last_name,
                profile_picture=None
            )
            db.add(new_user)
            db.flush()  # Get ID without committing
            
            profile_picture_filename = save_base64_image(user.profile_picture, new_user.id)
            new_user.profile_picture = profile_picture_filename
        except Exception as e:
            print(f"Error saving profile picture: {e}")
            db.rollback()
            raise HTTPException(status_code=500, detail="Error uploading profile picture")
    else:
        new_user = User(
            username=user.username,
            email=user.email,
            password=hashed_password,
            first_name=user.first_name,
            last_name=user.last_name,
            profile_picture=None
        )
        db.add(new_user)
    
    db.commit()
    db.refresh(new_user)
    return new_user

@router.get("/", response_model=list[UserResponse])
def get_all_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """Get all users"""
    users = db.query(User).offset(skip).limit(limit).all()
    return users

@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    """Get a specific user by ID"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.put("/{user_id}", response_model=UserResponse)
def update_user(user_id: int, user_update: UserUpdate, db: Session = Depends(get_db)):
    """Update user profile"""
    try:
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        if user_update.first_name is not None:
            user.first_name = user_update.first_name
        if user_update.last_name is not None:
            user.last_name = user_update.last_name
        if user_update.bio is not None:
            user.bio = user_update.bio
        if user_update.profile_picture is not None:
            # Save image to disk
            filename = save_base64_image(user_update.profile_picture, user_id)
            user.profile_picture = filename
        
        db.commit()
        db.refresh(user)
        print(f"✓ User {user_id} updated successfully")
        return user
    except HTTPException:
        raise
    except Exception as e:
        print(f"✗ Error updating user {user_id}: {str(e)}")
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error updating user: {str(e)}")

@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    """Delete a user"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}
