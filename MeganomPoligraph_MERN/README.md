# MeganomPoligraph_MERN

The repository is available in [Ukrainian](#меганом-поліграф-mern-версія-ukraine) and [English](#meganom-Poligraph-mern-version-uk)

## Меганом Поліграф (MERN версія) :ukraine:

<p align='center'>
    <img src="./client/public/logo512.png" alt="working screen" style="width:25%">
</p>

**Меганом Поліграф (MERN версія)** - це вебсайт для поліграфічної компанії, що надає інформацію про товари, послуги та контакти. Проєкт побудований на MERN стеці, з використанням статичних файлів зображень, Mongodb, Express, React та NodeJS.

### Встановлення та запуск

1. Клонування репозиторію

   ```bash
   git clone https://github.com/NikitaBerezhnyj/MeganomPoligraph.git

   cd MeganomPoligraph/MeganomPoligraph_MERN
   ```

2. Встановлення залежностей

   В теці з клієнтською частиною:

   ```bash
   cd client
   npm install
   ```

   В теці з серверною частиною:

   ```bash
   cd server
   npm install
   ```

3. Налаштування оточення

   Створіть файл `.env` у директорії з кодом серверу `server` та заповніть його наступними змінними:

   ```
   PORT = 3001
   HOSTNAME = "localhost"
   ORIGIN_WEBSITE = "http://localhost:5173"
   DB = "mongodb://localhost:27017/your-database-name"
   SALT = 10
   JWT_PRIVATE_TOKEN = "your-secure-jwt-secret-key"
   ADMIN_LOGIN = "admin"
   ADMIN_PASSWORD = "your-secure-password"
   EMAIL = 'your-email@example.com'
   PASSWORD = 'your-secure-password'
   ```

4. Запуск локального сервера (опційно)

   **Якщо ви тестуєте проєкт локально, запустіть сервер командою:**

   - В теці з клієнтською частиною:

     ```bash
     cd client
     npm run dev
     ```

   - В теці з серверною частиною:

     ```bash
     cd server
     npm run dev
     ```

   **Або скористайтеся Docker:**

   ```bash
   docker compose up --build
   ```

   Після цього сайт буде доступний за адресою: `http://localhost:5173`

### Підготовка до деплою

Для того, щоб підготувати сайт до завантаження на сервер, потрібно побудувати теку, що містить усі важливі файли для коректної роботи. Виконайте команду:

```bash
make
```

Це створить необхідну структуру файлів для деплою.

Щоб протестувати сайт у побудованій теці **deploy** та переконатися, що все працює правильно, виконайте команду:

```bash
make test_run
```

Якщо ви не хочете зберігати теку для деплою, можна її видалити командою:

```bash
make clean
```

### Внесення змін у вміст сайту

Структура сайту є фіксованою і не може бути змінена без редагування вихідного коду. Однак ви можете оновлювати текстовий вміст сайту, змінюючи відповідні файли локалізації.

Текстові дані зберігаються у JSON-файлах у директорії: `client/src/Translations/[код мови]/global.json`, де [код мови] — це скорочене позначення мови (наприклад, ua для української, en для англійської).

**Як змінити текст?**

1. Відкрийте відповідний файл локалізації (наприклад, ua/global.json для української мови).
2. Знайдіть ключ текстового блоку, який потрібно змінити. Всі текстові блоки розподілені за сторінками (наприклад: інформація для головної сторінки знаходиться в блоці home, а тексти для сторінки контактів — у contact).
3. Оновіть значення тексту та збережіть файл.

**Приклад змін:**

Фрагмент початкового файлу uk.json:

```json
{
  "header": {
    "brand": "Меганом Поліграф",
    "hero": "Головна",
    "services": "Наші послуги",
    "portfolio": "Портфоліо",
    "management": "Менеджмент",
    "about": "Про нас",
    "delivery": "Доставка",
    "requests": "Замовити"
  }
}
```

Якщо потрібно змінити заголовок "Про нас" на "Про компанію", оновіть відповідне значення:

```json
{
  "header": {
    "brand": "Меганом Поліграф",
    "hero": "Головна",
    "services": "Наші послуги",
    "portfolio": "Портфоліо",
    "management": "Менеджмент",
    "about": "Про компанію",
    "delivery": "Доставка",
    "requests": "Замовити"
  }
}
```

**Що відбувається після внесення змін?**

Після збереження змін необхідно знову зібрати клієнтську частину проєкту та виконати повторний деплой. Це можна зробити двома способами:

- Повністю перебудувати весь проєкт за допомогою команди make, як вже було описано вище в розділі [Підготовка до деплою](#підготовка-до-деплою)
- Перебудувати лише клієнтську частину, виконавши `npm run build` у теці `client`, а потім замінити вміст теки dist на хостингу на оновлені файли.

### Додавання нових продуктів

Щоб додати новий продукт, скористайтеся адмін-панеллю, доступною за посиланням `/admin` на сайті після входу в систему. У ній можна додавати нові продукти, редагувати та видаляти існуючі без необхідності змінювати код чи працювати безпосередньо з базою даних.

Також можна скористатися командою `npm run database` у директорії `server`. Використовуючи цей CLI-скрипт, ви зможете:

- Заповнити базу даних попередньо підготовленими записами (їх можна змінити у файлі `server/src/database/dataSeeder.js`).
- Видалити всі записи з бази даних.
- Додати нове поле до всіх записів.

### Локалізація

Проєкт підтримує багатомовність, а файли перекладів зберігаються в теці `client/src/Translations/`, що дозволяє легко додавати нові мови за потреби.

**Щоб додати нову мову, потрібно:**

1. **Створити JSON-файл** у теці `client/src/Translations/` для нової мови. Наприклад, якщо додається французька мова, створіть файл `fr/global.json`.

2. **Додати переклади** у файл у такому форматі:

   ```json
   {
     "header": {
       "brand": "Marque",
       "hero": "Accueil",
       "services": "Services",
       "portfolio": "Portefeuille",
       "management": "Gestion",
       "about": "À propos",
       "delivery": "Livraison",
       "requests": "Demandes"
     }
   }
   ```

3. **Оновити конфігурацію i18next** у файлі `main.jsx`, додавши нову мову до об'єкта `resources`:

   ```jsx
   import global_fr from "./Translations/fr/global.json";

   i18next.init({
     interpolation: { escapeValue: false },
     lng: "ua",
     resources: {
       ua: { global: global_ua },
       ru: { global: global_ru },
       en: { global: global_en },
       fr: { global: global_fr },
     },
   });
   ```

4. **Додати новий пункт вибору мови** в `Header.jsx` у випадаючий список `<select>`:
   ```jsx
   <option value="fr">Français</option>
   ```

---

## Meganom Poligraph (MERN version) :uk:

<p align='center'>
    <img src="./client/public/logo512.png" alt="working screen" style="width:25%">
</p>

### Project description.

This repository contains the code for the website of Meganom Poligraph, a printing company that specializes in the production of packages. The site is developed using the MERN stack (MongoDB, Express.js, React.js, Node.js) and includes both frontend and backend parts.

### Features

- Fully functional website for a printing company
- Product catalog with the ability to filter and search
- Order form for customers
- Information pages about the company and services
- Custom admin panel for content and order management

### Technologies.

- **_Frontend:_** React.js
- **_Backend:_** Node.js with Express.js
- **_Database:_** MongoDB
- **_Additional libraries:_**
  - react-router-dom
  - react-bootstrap
  - bootstrap
  - i18next
  - react-i18next
  - axios
  - react-icons
  - react-select
  - express
  - cors
  - helmet
  - joi
  - jsonwebtoken
  - bcrypt
  - nodemailer
  - multer
  - mongoose
  - validate-image-type
  - @vitalets/google-translate-api

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/NikitaBerezhnyj/Meganom_Poligraph.git
   ```

2. Install dependencies for the backend:

   ```bash
   cd server
   npm install
   ```

3. Install the dependencies for the frontend:

   ```bash
   cd client
   npm install
   ```

4. Configure environment variables:

   Create an `.env' file in the `server' folder and fill in the required environments specified in example.env

### Starting the project.

1. Start the backend server:

   ```bash
   cd server
   npm run dev
   ```

2. In another terminal, run the frontend:

   ```bash
   cd client
   npm run dev
   ```

3. Open a browser and go to `http://localhost:5173`

### Building the deployment directory project

1. Run the make command in the root folder:

   ```bash
   make
   ```

Get the deploy folder, which can be uploaded to the hosting

### Admin panel

To access the admin panel, use the following steps:

1. Go to `http://localhost:5173/admin`
2. Enter your administrator credentials
