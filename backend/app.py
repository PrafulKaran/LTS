from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from database import Base, engine
import os

# Import all route modules with error handling
try:
    from routes import auth
    print("✓ Auth module imported successfully")
except Exception as e:
    print(f"✗ Error importing auth: {e}")

try:
    from routes import users, posts, likes, followers
    print("✓ Other routes imported successfully")
except Exception as e:
    print(f"✗ Error importing other routes: {e}")

# Create tables
Base.metadata.create_all(bind=engine)

# Migrate profile_picture column to TEXT if needed
try:
    from sqlalchemy import text
    with engine.connect() as conn:
        # Check current column type
        result = conn.execute(text("""
            SELECT data_type FROM information_schema.columns 
            WHERE table_name='users' AND column_name='profile_picture'
        """))
        column_info = result.fetchone()
        
        if column_info and column_info[0] != 'text':
            print("Migrating profile_picture column to TEXT...")
            conn.execute(text("ALTER TABLE users ALTER COLUMN profile_picture TYPE TEXT"))
            conn.commit()
            print("✓ Column migrated successfully")
except Exception as e:
    print(f"Note: Could not auto-migrate column (may already be migrated): {e}")

app = FastAPI(
    title="College Social Platform API",
    description="Backend API for college social platform",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files for profile pictures
os.makedirs("uploads/profile_pictures", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Include routers - auth first!
try:
    app.include_router(auth.router)
    print("✓ Auth router included")
except Exception as e:
    print(f"✗ Error including auth router: {e}")

app.include_router(users.router)
app.include_router(posts.router)
app.include_router(likes.router)
app.include_router(followers.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to College Social Platform API", "version": "1.0.0"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
