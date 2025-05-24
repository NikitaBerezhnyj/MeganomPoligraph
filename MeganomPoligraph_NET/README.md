# MeganomPoligraph_NET

The repository is available in [українською](#меганом-поліграф-net-версія-ukraine) and [англійською](#meganom-Poligraph-net-version-uk)

## Меганом Поліграф (.NET версія) :ukraine:

<p align='center'>
    <img src="./client/public/images/logo.png" alt="Меганом Поліграф" style="width:25%">
</p>

**Меганом Поліграф (.NET версія)** - це сучасний вебсайт для поліграфічної компанії, що надає інформацію про товари, послуги та контакти. Проєкт побудований на технологічному стеці: C# + ASP.NET Core + Angular + PostgreSQL + Docker.

### Основні можливості

- **Адміністративна панель** для управління продуктами портфоліо
- **Система управління адміністраторами** з рольовою моделлю доступу (Адміністратор/Суперадміністратор)
- **Кастомна система аналітики** з відстеженням відвідувачів та замовлень
- **Багатомовна підтримка** (українська, російська, англійська)
- **Адаптивний дизайн** для всіх пристроїв

### Встановлення та запуск

1. **Клонування репозиторію**

   ```bash
   git clone https://github.com/NikitaBerezhnyj/MeganomPoligraph.git

   cd MeganomPoligraph/MeganomPoligraph_NET
   ```

2. **Локальний запуск через Docker**

   ```bash
   docker compose up --build
   ```

3. **Локальні порти:**
   - **Client (Angular):** http://localhost:4200
   - **Server (ASP.NET Core):** http://localhost:5039
   - **Database (PostgreSQL):**
     - Зовнішній доступ: localhost:5434
     - Внутрішня мережа: localhost:5432

### Налаштування оточення

Створіть файл `.env` у кореневій директорії проєкту та заповнійте його необхідними змінними середовища для налаштування бази даних, JWT токенів, поштового сервера та інших параметрів. Нижче наведено приклад структури цього файлу:

```bash
# CLIENT
CLIENT_URL=http://localhost:4200

# SERVER
SERVER_URL=http://localhost:5039

# PostgreSQL
POSTGRES_HOST=meganom-poligraph-db
POSTGRES_PORT=5432
POSTGRES_DB=meganom-poligraph
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-database-password

# SMTP
SMTP_HOST=smtp.your-email-provider.com
SMTP_PORT=587
SENDER_MAIL=your-sender-email@example.com
SENDER_PASSWORD=your-smtp-app-password
RECIPIENT_MAIL=your-recipient-email@example.com

# JwtSettings
JWT_SECRET=your-secure-jwt-secret
```

Під час першої збірки Docker-образів, ці змінні середовища будуть автоматично інтегровані у відповідні конфігураційні файли (server/appsettings.json та client/src/environments/environment.ts).

### Використання адміністративної панелі

Адміністративна панель доступна за посиланням `/admin` після авторизації. Через неї можна:

- **Управляти продуктами:** додавати, редагувати та видаляти елементи портфоліо
- **Керувати адміністраторами:** створювати нові облікові записи адміністраторів, призначати ролі та права доступу
- **Переглядати статистику:**
  - Кількість відвідувачів (місяць/рік/весь час)
  - Кількість замовлень та їх статуси
  - Унікальні відвідування
- **Обробляти замовлення:** переглядати всі замовлення та змінювати їх статуси

### Внесення змін у вміст сайту

Структура сайту є фіксованою і не може бути змінена без редагування вихідного коду. Текстовий контент можна оновлювати через відповідні файли локалізації в Angular проєкті.

**Управління продуктами та контентом здійснюється виключно через адміністративну панель.**

### Локалізація

Проєкт підтримує три мови: українську, російську та англійську. Додавання нових мов потребує суттєвих змін у кодовій базі та створення перекладів для всіх продуктів у портфоліо. Це не рекомендується виконувати без глибокого розуміння архітектури проєкту.

### Підготовка до продакшену

Для деплою на продакшн сервер:

1. Оновіть конфігураційні файли для продакшн оточення
2. Налаштуйте SSL сертифікати
3. Сконфігуруйте зовнішню базу даних PostgreSQL
4. Виконайте білд продакшн версії:
   ```bash
   docker compose up --build
   ```

### Архітектура проєкту

- **Frontend:** Angular з TypeScript
- **Backend:** ASP.NET Core Web API
- **База даних:** PostgreSQL
- **Контейнеризація:** Docker та Docker Compose
- **Аутентифікація:** JWT токени
- **ORM:** Entity Framework Core

---

## Meganom Poligraph (.NET Version) :uk:

<p align='center'>
    <img src="./client/public/images/logo.png" alt="Meganom Polygraph" style="width:25%">
</p>

**Meganom Polygraph (.NET version)** is a modern website for a printing company, providing information about products, services, and contact details. The project is built using the following technology stack: C# + ASP.NET Core + Angular + PostgreSQL + Docker.

### Key Features

- **Admin panel** for managing portfolio products
- **Administrator management system** with role-based access control (Admin/Super Admin)
- **Custom analytics system** for tracking visitors and orders
- **Multilingual support** (Ukrainian, Russian, English)
- **Responsive design** for all devices

### Installation & Launch

1. **Clone the repository**

   ```bash
   git clone https://github.com/NikitaBerezhnyj/MeganomPoligraph.git

   cd MeganomPoligraph/MeganomPoligraph_NET
   ```

2. **Run locally with Docker**

   ```bash
   docker compose up --build
   ```

3. **Local ports:**

   - **Client (Angular):** [http://localhost:4200](http://localhost:4200)
   - **Server (ASP.NET Core):** [http://localhost:5039](http://localhost:5039)
   - **Database (PostgreSQL):**

     - External access: localhost:5434
     - Internal network: localhost:5432

### Environment Configuration

Create a `.env` file in the root directory of the project and fill it with the required environment variables for database configuration, JWT tokens, mail server, and other settings. Here's an example:

```bash
# CLIENT
CLIENT_URL=http://localhost:4200

# SERVER
SERVER_URL=http://localhost:5039

# PostgreSQL
POSTGRES_HOST=meganom-poligraph-db
POSTGRES_PORT=5432
POSTGRES_DB=meganom-poligraph
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-database-password

# SMTP
SMTP_HOST=smtp.your-email-provider.com
SMTP_PORT=587
SENDER_MAIL=your-sender-email@example.com
SENDER_PASSWORD=your-smtp-app-password
RECIPIENT_MAIL=your-recipient-email@example.com

# JwtSettings
JWT_SECRET=your-secure-jwt-secret
```

During the first Docker build, these environment variables will be automatically applied to the respective configuration files (`server/appsettings.json` and `client/src/environments/environment.ts`).

### Admin Panel Usage

The admin panel is available at the `/admin` route after authentication. Through it, you can:

- **Manage products:** add, edit, and delete portfolio items
- **Manage administrators:** create admin accounts, assign roles, and set permissions
- **View analytics:**

  - Number of visitors (monthly/yearly/all time)
  - Order count and statuses
  - Unique visits

- **Process orders:** view all orders and update their statuses

### Updating Website Content

The structure of the website is fixed and cannot be modified without editing the source code. Text content can be updated via the corresponding localization files in the Angular project.

**Product and content management is handled exclusively through the admin panel.**

### Localization

The project supports three languages: Ukrainian, Russian, and English. Adding new languages requires significant changes to the codebase and translation of all portfolio content. It is not recommended unless you have a deep understanding of the project’s architecture.

### Production Deployment

To deploy to a production server:

1. Update the configuration files for the production environment
2. Set up SSL certificates
3. Configure an external PostgreSQL database
4. Build the production version:

   ```bash
   docker compose up --build
   ```

### Project Architecture

- **Frontend:** Angular with TypeScript
- **Backend:** ASP.NET Core Web API
- **Database:** PostgreSQL
- **Containerization:** Docker and Docker Compose
- **Authentication:** JWT tokens
- **ORM:** Entity Framework Core
