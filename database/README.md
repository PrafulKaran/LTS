# Database Setup

## Structure

### Tables
- **users**: User accounts and profiles
- **posts**: User posts/content
- **comments**: Comments on posts
- **followers**: Follow relationships between users
- **likes**: Post likes

## How to Set Up

1. Open pgAdmin
2. Connect to `college_db`
3. Open SQL Editor
4. Copy and paste the contents of `schema.sql`
5. Execute the SQL

Or use command line:
```bash
psql -U postgres -d college_db -f schema.sql
```

## Migrations
Place SQL migration files here for future database updates.

## Seed Data
Place sample data files here for testing.
