import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:1701@localhost:5432/college_db"
)

DEBUG = os.getenv("DEBUG", True)
