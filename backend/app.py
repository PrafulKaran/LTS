from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import users, posts, likes, followers
from database import Base, engine

# Create tables
Base.metadata.create_all(bind=engine)

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

# Include routers
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
