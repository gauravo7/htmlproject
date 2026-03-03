# Placement Training Letter Portal (PHP + MySQL)

## Features
- Admin login panel.
- Admin uploads student data via CSV/XLSX (`name, fathername, rollno, branch`).
- Student login with roll number as username and password.
- Student can view generated training letter and download PDF.
- Security hardening: PDO prepared statements, password hashing, CSRF tokens, session fixation prevention, output escaping.

## Setup
1. Create database/tables:
   ```bash
   mysql -u root -p < sql/schema.sql
   ```
2. Update DB credentials in `config/db.php`.
3. Run PHP server:
   ```bash
   php -S 0.0.0.0:8000
   ```
4. Open `http://localhost:8000`.

## Default Admin
- Username: `admin`
- Password: `Admin@123`

## Upload format
Header row should be:
```
name,fathername,rollno,branch
```
(Mapping is by column order A-D)
