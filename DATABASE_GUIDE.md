# 🐘 PostgreSQL دليل قاعدة البيانات (Database Guide)

## الإعدادات الأساسية

### 1. تثبيت PostgreSQL

#### macOS
```bash
brew install postgresql@16
brew services start postgresql@16
```

#### Ubuntu/Debian
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### Windows
قم بتحميل [PostgreSQL Windows Installer](https://www.postgresql.org/download/windows/)

### 2. إنشاء المستخدم والقاعدة

```sql
-- الاتصال بـ PostgreSQL
sudo -u postgres psql

-- إنشاء المستخدم
CREATE USER mr7user WITH PASSWORD 'secure_password_here';

-- إنشاء قاعدة البيانات
CREATE DATABASE mr7ai OWNER mr7user;

-- منح الامتيازات
GRANT ALL PRIVILEGES ON DATABASE mr7ai TO mr7user;
ALTER USER mr7user CREATEDB;

-- إظهار قائمة قواعد البيانات
\l

-- الخروج
\q
```

### 3. اختبار الاتصال

```bash
psql -U mr7user -d mr7ai -h localhost
```

## إدارة قاعدة البيانات

### Drizzle ORM Commands

```bash
cd lib/db

# دفع التغييرات إلى قاعدة البيانات
pnpm run push

# دفع مجبر (احذر!)
pnpm run push-force

# عرض حالة قاعدة البيانات
pnpm run studio
```

### SQL Queries

```sql
-- عرض جميع الجداول
\dt

-- عرض تفاصيل جدول
\d users

-- حذف قاعدة البيانات
DROP DATABASE mr7ai;

-- إعادة تعيين البيانات
TRUNCATE TABLE users CASCADE;
```

## النسخ الاحتياطية والاستعادة

### النسخ الاحتياطية
```bash
# نسخة احتياطية كاملة
pg_dump -U mr7user -d mr7ai > backup_$(date +%Y%m%d).sql

# نسخة احتياطية مضغوطة
pg_dump -U mr7user -d mr7ai | gzip > backup_$(date +%Y%m%d).sql.gz
```

### الاستعادة
```bash
# استعادة من ملف
psql -U mr7user -d mr7ai < backup_20250505.sql

# استعادة من ملف مضغوط
gunzip < backup_20250505.sql.gz | psql -U mr7user -d mr7ai
```

## المراقبة والصيانة

### حجم قاعدة البيانات
```sql
SELECT 
  datname, 
  pg_size_pretty(pg_database_size(datname)) AS size
FROM pg_database
WHERE datname = 'mr7ai';
```

### الجداول الكبيرة
```sql
SELECT 
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname != 'pg_catalog'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### تنظيف المساحة
```sql
-- تحسين الأداء
VACUUM ANALYZE;

-- تنظيف شامل
VACUUM FULL;
```

## المنوعات

### إعادة تعيين التسلسل (Reset Sequences)
```sql
SELECT setval(pg_get_serial_sequence('users', 'id'), (SELECT MAX(id) FROM users));
```

### عرض الأنشطة الحالية
```sql
SELECT pid, usename, application_name, state FROM pg_stat_activity;
```

### قتل اتصال
```sql
SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE pid <> pg_backend_pid() AND datname = 'mr7ai';
```
