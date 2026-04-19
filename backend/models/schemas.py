from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# User Schemas
class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    profile_picture: Optional[str] = None

class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    bio: Optional[str] = None
    profile_picture: Optional[str] = None

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    first_name: Optional[str]
    last_name: Optional[str]
    bio: Optional[str]
    profile_picture: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True

# Post Schemas
class PostCreate(BaseModel):
    content: str

class PostUpdate(BaseModel):
    content: str

class PostResponse(BaseModel):
    id: int
    user_id: int
    content: str
    likes_count: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Comment Schemas
class CommentCreate(BaseModel):
    content: str

class CommentResponse(BaseModel):
    id: int
    post_id: int
    user_id: int
    content: str
    created_at: datetime
    
    class Config:
        from_attributes = True

# Like Schema
class LikeResponse(BaseModel):
    id: int
    post_id: int
    user_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True
