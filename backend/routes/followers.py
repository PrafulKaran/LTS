from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.models import Like, Post, User

router = APIRouter(prefix="/likes", tags=["likes"])

@router.post("/{post_id}")
def like_post(post_id: int, user_id: int, db: Session = Depends(get_db)):
    """Like a post"""
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Check if already liked
    existing_like = db.query(Like).filter(
        Like.post_id == post_id,
        Like.user_id == user_id
    ).first()
    
    if existing_like:
        raise HTTPException(status_code=400, detail="Post already liked by this user")
    
    new_like = Like(post_id=post_id, user_id=user_id)
    post.likes_count += 1
    
    db.add(new_like)
    db.commit()
    
    return {"message": "Post liked successfully", "likes_count": post.likes_count}

@router.delete("/{post_id}")
def unlike_post(post_id: int, user_id: int, db: Session = Depends(get_db)):
    """Unlike a post"""
    like = db.query(Like).filter(
        Like.post_id == post_id,
        Like.user_id == user_id
    ).first()
    
    if not like:
        raise HTTPException(status_code=404, detail="Like not found")
    
    post = db.query(Post).filter(Post.id == post_id).first()
    post.likes_count -= 1
    
    db.delete(like)
    db.commit()
    
    return {"message": "Post unliked successfully", "likes_count": post.likes_count}

@router.get("/{post_id}")
def get_post_likes(post_id: int, db: Session = Depends(get_db)):
    """Get all likes for a post"""
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    likes = db.query(Like).filter(Like.post_id == post_id).all()
    return {"post_id": post_id, "likes_count": len(likes), "likes": likes}
