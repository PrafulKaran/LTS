# Database Setup Guide

## Overview

This folder contains all database-related files for the College Social Platform. The database uses **PostgreSQL 18** to store all user, post, comment, follow, and like data.

## Prerequisites

- PostgreSQL 12 or higher installed
- pgAdmin (optional, for GUI management)
- Command-line access to `psql`

## 🔧 Initial Setup

### Method 1: Using Command Line (Recommended)

#### Step 1: Open PostgreSQL Terminal
```bash
# Windows
psql -U postgres

# Mac/Linux
sudo -u postgres psql
```

#### Step 2: Create Database
```sql
CREATE DATABASE college_db;
```

#### Step 3: Connect to New Database
```sql
\c college_db
```

#### Step 4: Run Schema
```sql
-- Copy and paste contents of schema.sql here
-- Or use:
\i 'path/to/database/schema.sql'
```

#### Step 5: Verify Tables
```sql
\dt  -- Lists all tables
```

### Method 2: Using pgAdmin (GUI)

1. Open **pgAdmin**
2. Right-click on **Databases** → **Create** → **Database**
3. Enter name: `college_db`
4. Click **Create**
5. Right-click on `college_db` → **Query Tool**
6. Open `schema.sql` file and execute

### Method 3: One-Line Command

```bash
psql -U postgres -c "CREATE DATABASE college_db;"
psql -U postgres -d college_db -f schema.sql
```

## 📊 Database Schema

### Tables Overview

#### 1. **users** - User Accounts
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
**Fields:**
- `id`: Unique user identifier
- `username`: Unique username for login
- `email`: Unique email address
- `password`: Hashed password (SHA-256)
- `first_name`, `last_name`: User's name
- `bio`: Short biography
- `profile_picture`: Filename of profile picture (stored in `uploads/`)
- `created_at`, `updated_at`: Timestamps

**Indexes:**
- Primary key on `id`
- Unique on `username`
- Unique on `email`

---

#### 2. **posts** - User Posts/Content
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
**Fields:**
- `id`: Unique post identifier
- `user_id`: ID of user who created post
- `content`: Post text content
- `likes_count`: Number of likes (denormalized for performance)
- `created_at`, `updated_at`: Timestamps

**Relationships:**
- Foreign key to `users(id)` with cascade delete

**Indexes:**
- Primary key on `id`
- Index on `user_id` for fast lookups

---

#### 3. **comments** - Post Comments
```sql
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL REFERENCES posts(id),
    user_id INTEGER NOT NULL REFERENCES users(id),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
**Fields:**
- `id`: Unique comment identifier
- `post_id`: ID of post being commented on
- `user_id`: ID of user making comment
- `content`: Comment text
- `created_at`: Creation timestamp

**Relationships:**
- Foreign key to `posts(id)` with cascade delete
- Foreign key to `users(id)` with cascade delete

---

#### 4. **followers** - User Follow Relationships
```sql
CREATE TABLE followers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    follower_id INTEGER NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
**Fields:**
- `id`: Unique relationship identifier
- `user_id`: ID of user being followed
- `follower_id`: ID of user doing the following
- `created_at`: Timestamp of follow action

**Relationships:**
- Foreign key to `users(id)` on both columns with cascade delete

**Note:** User cannot follow themselves (enforced at application level)

---

#### 5. **likes** - Post Likes
```sql
CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL REFERENCES posts(id),
    user_id INTEGER NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
**Fields:**
- `id`: Unique like identifier
- `post_id`: ID of post being liked
- `user_id`: ID of user giving like
- `created_at`: Timestamp of like action

**Relationships:**
- Foreign key to `posts(id)` with cascade delete
- Foreign key to `users(id)` with cascade delete

**Constraint:** Unique pair of (post_id, user_id) to prevent duplicate likes

---

## 🔄 Database Relationships

### Entity Relationship Diagram
```
users (1) ----< (Many) posts
  |
  ├----< comments
  ├----< likes
  ├----< followers (as user_id)
  └----< followers (as follower_id)

posts (1) ----< (Many) comments
  |
  └----< likes

comments (1) ----< (Many) users
```

## 📈 Common Queries

### User Management
```sql
-- Get all users
SELECT id, username, email, created_at FROM users;

-- Get user by email
SELECT * FROM users WHERE email = 'user@college.com';

-- Get user with post count
SELECT u.id, u.username, COUNT(p.id) as post_count
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
GROUP BY u.id;

-- Delete user (cascades to posts, comments, likes, followers)
DELETE FROM users WHERE id = 1;
```

### Posts Management
```sql
-- Get all posts by user
SELECT * FROM posts WHERE user_id = 1 ORDER BY created_at DESC;

-- Get posts with author info
SELECT p.id, p.content, u.username, u.profile_picture, p.likes_count
FROM posts p
JOIN users u ON p.user_id = u.id
ORDER BY p.created_at DESC;

-- Get trending posts
SELECT p.id, p.content, u.username, p.likes_count
FROM posts p
JOIN users u ON p.user_id = u.id
WHERE p.created_at > NOW() - INTERVAL '7 days'
ORDER BY p.likes_count DESC
LIMIT 10;
```

### Followers Management
```sql
-- Get followers of user
SELECT u.id, u.username, u.profile_picture
FROM users u
JOIN followers f ON u.id = f.follower_id
WHERE f.user_id = 1;

-- Get users being followed
SELECT u.id, u.username
FROM users u
JOIN followers f ON u.id = f.user_id
WHERE f.follower_id = 1;

-- Get follower count
SELECT COUNT(*) FROM followers WHERE user_id = 1;
```

### Likes Management
```sql
-- Get likes on post
SELECT u.id, u.username
FROM users u
JOIN likes l ON u.id = l.user_id
WHERE l.post_id = 1;

-- Check if user liked post
SELECT * FROM likes WHERE post_id = 1 AND user_id = 2;

-- Get like count
SELECT COUNT(*) FROM likes WHERE post_id = 1;
```

## 🔐 Data Integrity & Constraints

### Foreign Key Constraints
All tables maintain referential integrity:
- Deleting a user deletes all their posts, comments, likes, and follow relationships
- Deleting a post deletes all its comments and likes
- Orphaned records are prevented

### Unique Constraints
- Users cannot have duplicate usernames
- Users cannot have duplicate emails
- Users cannot like the same post twice

### Not Null Constraints
- Critical fields are protected against NULL values
- `users.username`, `users.email`, `users.password`
- `posts.user_id`, `posts.content`
- `comments.post_id`, `comments.user_id`, `comments.content`

## 🔧 Migrations

Place future database schema changes here:

```
migrations/
├── 001_initial_schema.sql
├── 002_add_user_bio.sql
├── 003_add_notifications_table.sql
└── ...
```

To apply migration:
```bash
psql -U postgres -d college_db -f migrations/002_add_user_bio.sql
```

## 📥 Seed Data

Sample test data can be placed in `seed_data/` folder:

```
seed_data/
├── users.sql
├── posts.sql
├── comments.sql
└── followers.sql
```

To load seed data:
```bash
psql -U postgres -d college_db -f seed_data/users.sql
psql -U postgres -d college_db -f seed_data/posts.sql
```

Example seed data:
```sql
INSERT INTO users (username, email, password, first_name, last_name) VALUES
('john_doe', 'john@college.com', 'hashed_password_1', 'John', 'Doe'),
('jane_smith', 'jane@college.com', 'hashed_password_2', 'Jane', 'Smith'),
('bob_wilson', 'bob@college.com', 'hashed_password_3', 'Bob', 'Wilson');

INSERT INTO posts (user_id, content) VALUES
(1, 'Just finished my first project!'),
(2, 'College life is amazing!'),
(1, 'Looking for study partners');

INSERT INTO followers (user_id, follower_id) VALUES
(1, 2),
(2, 1),
(3, 1);
```

## 🔍 Database Maintenance

### Backup Database
```bash
# Full backup
pg_dump -U postgres college_db > backup_$(date +%Y%m%d).sql

# Compressed backup
pg_dump -U postgres college_db | gzip > backup_$(date +%Y%m%d).sql.gz
```

### Restore Database
```bash
# From backup
psql -U postgres -d college_db < backup_20240101.sql

# From compressed backup
gunzip -c backup_20240101.sql.gz | psql -U postgres -d college_db
```

### Check Database Size
```sql
SELECT pg_size_pretty(pg_database_size('college_db'));
```

### View Table Sizes
```sql
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname != 'pg_catalog'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

## ⚠️ Important Notes

1. **Password Storage**: All passwords are hashed using SHA-256. Never store plain text passwords!
2. **Connection String Format**: 
   ```
   postgresql://username:password@host:port/database_name
   postgresql://postgres:1701@localhost:5432/college_db
   ```
3. **Cascade Deletes**: Deleting a user will delete all related data. Be careful in production!
4. **Profile Pictures**: Filenames are stored in database, actual files in `/uploads/profile_pictures/`
5. **Timestamps**: All `created_at` and `updated_at` timestamps use server timezone (UTC)

## 🆘 Troubleshooting

### "database does not exist"
```bash
# Create database first
createdb -U postgres college_db
```

### "permission denied"
```bash
# Check PostgreSQL user privileges
psql -U postgres -c "\du"

# Grant privileges
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE college_db TO postgres;"
```

### "relation does not exist"
```bash
# Tables not created, run schema.sql
psql -U postgres -d college_db -f schema.sql
```

### Connection timeout
```bash
# Verify PostgreSQL is running
# Windows: Check Services or run: pg_isready
# Mac/Linux: sudo service postgresql status
```

## 📞 Support

For database issues, check:
1. PostgreSQL logs: `/var/lib/postgresql/data/log/`
2. pgAdmin Query Tool for error messages
3. Command line output for connection errors

---

**Last Updated**: April 19, 2026
**Database Version**: 1.0
**PostgreSQL Version**: 12+
