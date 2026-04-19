from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.models import User
from pydantic import BaseModel
import hashlib
import secrets
from datetime import datetime

router = APIRouter(prefix="/auth", tags=["auth"])

class LoginRequest(BaseModel):
    email: str
    password: str

class ForgotPasswordRequest(BaseModel):
    email: str

class ResetPasswordRequest(BaseModel):
    email: str
    new_password: str

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    hashed_password = hash_password(request.password)
    if user.password != hashed_password:
        raise HTTPException(status_code=401, detail="Invalid password")
    
    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "profile_picture": user.profile_picture,
        "message": "Login successful"
    }

@router.post("/forgot-password")
def forgot_password(request: ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Email not found")
    
    reset_token = secrets.token_urlsafe(32)
    
    return {
        "message": "Password reset token sent to email",
        "reset_token": reset_token,
        "email": user.email
    }

@router.post("/reset-password")
def reset_password(request: ResetPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    hashed_password = hash_password(request.new_password)
    user.password = hashed_password
    user.updated_at = datetime.now()
    
    db.commit()
    db.refresh(user)
    
    return {"message": "Password reset successfully"}
