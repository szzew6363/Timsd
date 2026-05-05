# 🎯 mr7.ai - دليل الإعداد الشامل (Complete Setup Guide)

## 📦 المتطلبات (Requirements)

```bash
- Node.js 20+
- pnpm 8+
- PostgreSQL 16+
- Redis 7+ (اختياري / Optional)
- Docker & Docker Compose (للنشر / For Deployment)
```

---

## 1️⃣ الإعداد الأولي (Initial Setup)

### خطوة 1: استنساخ المستودع
```bash
git clone https://github.com/szzew6363/Timsd.git
cd Timsd
```

### خطوة 2: تثبيت المتعلقات
```bash
pnpm install
```

### خطوة 3: إعداد متغيرات البيئة
```bash
cp .env.example .env.local
```

ثم قم بتحرير `.env.local` وأضف بيانات اتصالك:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/mr7ai
OPENAI_API_KEY=sk-...
JWT_SECRET=your-secret-key
```

---

## 2️⃣ إعداد قاعدة البيانات PostgreSQL

### الطريقة 1: استخدام Docker (الموصى به)
```bash
# ابدأ PostgreSQL في Docker
docker run -d \
  --name mr7-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=mr7ai \
  -p 5432:5432 \
  postgres:16-alpine
```

### الطريقة 2: التثبيت المحلي
```bash
# macOS
brew install postgresql
brew services start postgresql

# Linux (Ubuntu/Debian)
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start

# Windows
# قم بتحميل من: https://www.postgresql.org/download/windows/
```

### إنشاء قاعدة البيانات
```bash
sudo -u postgres psql

CREATE DATABASE mr7ai;
CREATE USER mr7user WITH PASSWORD 'secure_password';
ALTER ROLE mr7user SET client_encoding TO 'utf8';
ALTER ROLE mr7user SET default_transaction_isolation TO 'read committed';
ALTER ROLE mr7user SET default_transaction_deferrable TO on;
GRANT ALL PRIVILEGES ON DATABASE mr7ai TO mr7user;
\q
```

### تشغيل Migrations
```bash
cd lib/db
pnpm run push
```

---

## 3️⃣ تشغيل التطبيق (Running the App)

### في بيئة التطوير
```bash
# الواجهة الأمامية
cd artifacts/mr7-ai
pnpm run dev
# http://localhost:22938

# خادم API (في terminal منفصل)
cd artifacts/api-server
pnpm run dev
# http://localhost:8080
```

### باستخدام Docker Compose
```bash
docker-compose up -d
```

---

## 4️⃣ إعدادات المشروع المهمة

### vite.config.ts
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 22938,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
});
```

### tailwind.config.js
```javascript
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sidebar: '#1a1a2e',
        'sidebar-border': '#16213e',
      },
    },
  },
  plugins: [],
};
```

---

## 5️⃣ ملخص الفروع (Branches Summary)

| Branch | الوصف | الحالة |
|--------|-------|--------|
| `main` | الإصدار الرسمي | ✅ جاهز |
| `feat/performance-optimization` | تحسين الأداء | 🔧 في التطوير |
| `feat/dark-mode-theme` | Dark Mode | 🔧 في التطوير |
| `feat/database-setup` | PostgreSQL Setup | ✅ جاهز |
| `fix/ui-bugs` | إصلاح الأخطاء | 🔧 في التطوير |
| `deploy/production-setup` | إعدادات الإنتاج | ✅ جاهز |

---

## 6️⃣ الأوامر المهمة

```bash
# بناء التطبيق
pnpm run build

# فحص الأخطاء في الكود
pnpm run typecheck

# تشغيل الاختبارات
pnpm run test

# تنسيق الكود
pnpm run format

# عرض تحليل حجم الحزم
pnpm run analyze
```

---

## 7️⃣ نصائح مهمة 💡

1. **استخدم pnpm بدلاً من npm** - أسرع وأكثر كفاءة
2. **قم بتحديث المتعلقات بانتظام** - `pnpm update`
3. **استخدم git branches** - لكل ميزة جديدة
4. **اختبر قبل الدفع** - `pnpm run typecheck && pnpm run test`
5. **راقب الأداء** - استخدم أدوات القياس

---

## 8️⃣ استكشاف الأخطاء

### خطأ في الاتصال بـ PostgreSQL
```bash
# تحقق من أن PostgreSQL قيد التشغيل
sudo service postgresql status

# أو باستخدام Docker
docker ps | grep postgres
```

### مشاكل في التثبيت
```bash
# امسح المتعلقات وأعد التثبيت
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### خطأ في البناء
```bash
# امسح ملفات البناء
rm -rf dist .next
pnpm run build
```

---

## 9️⃣ الخطوات التالية

1. ✅ اقرأ [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)
2. ✅ اقرأ [BUGS_AND_FIXES.md](./BUGS_AND_FIXES.md)
3. ✅ تحقق من [الفروع المتاحة](https://github.com/szzew6363/Timsd/branches)
4. ✅ ابدأ بـ `feat/performance-optimization`

---

## 🆘 تحتاج للمساعدة؟

- 📖 اقرأ الـ [Documentation](./docs)
- 🐛 أبلغ عن الأخطاء على [Issues](https://github.com/szzew6363/Timsd/issues)
- 💬 أرسل سؤالك على [Discussions](https://github.com/szzew6363/Timsd/discussions)

---

**Happy Coding! 🚀**
