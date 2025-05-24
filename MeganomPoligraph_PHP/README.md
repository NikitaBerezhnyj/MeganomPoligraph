# MeganomPoligraph_PHP

The repository is available in [Ukrainian](#меганом-поліграф-php-версія-ukraine) and [English](#meganom-poligraph-php-version-uk)

## Меганом Поліграф (PHP версія) :ukraine:

<p align='center'>
    <img src="./assets/images/logo.png" alt="working screen" style="width:25%">
</p>

**Меганом Поліграф (PHP версія)** - це вебсайт для поліграфічної компанії, що надає інформацію про товари, послуги та контакти. Проєкт побудований на PHP, з використанням статичних файлів зображень, JavaScript, CSS та JSON.

### Встановлення та запуск

1. Клонування репозиторію

   ```bash
   git clone https://github.com/NikitaBerezhnyj/MeganomPoligraph.git
   cd MeganomPoligraph_PHP
   ```

2. Встановлення залежностей

   Проєкт використовує Composer для керування PHP-залежностями:

   ```bash
   composer install
   ```

3. Налаштування оточення

   Створіть файл `.env` у кореневій директорії та заповніть його наступними змінними:

   ```
   EMAIL_ADDRESS=your-email@example.com
   EMAIL_PASSWORD=your-email-password
   RECIPIENT_EMAIL=recipient@example.com
   SMTP_HOST=smtp.example.com
   SMTP_PORT=587
   ```

   Ці налаштування використовуються для відправлення електронних листів через контактну форму.

4. Запуск локального сервера (опційно)

   Якщо ви тестуєте проєкт локально, запустіть PHP-сервер командою:

   ```bash
   php -S localhost:8000
   ```

   Або скористайтеся Docker:

   ```bash
   docker compose up --build
   ```

   Після цього сайт буде доступний за адресою: `http://localhost:8000`

### Підготовка до деплою

Для того, щоб підготувати сайт до завантаження на сервер, потрібно побудувати теку, що містить усі важливі файли для коректної роботи та встановити залежності. Для цього виконайте команду:

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

Текстові дані зберігаються у JSON-файлах у директорії: `assets/json/languages/[код мови].json`, де [код мови] — це скорочене позначення мови (наприклад, uk для української, en для англійської).

**Як змінити текст?**

1. Відкрийте відповідний файл локалізації (наприклад, uk.json для української мови).
2. Знайдіть ключ текстового блоку, який потрібно змінити. Всі текстові блоки розподілені за сторінками (наприклад: інформація для головної сторінки знаходиться в блоці home, а тексти для сторінки контактів — у contact).
3. Оновіть значення тексту та збережіть файл.

**Приклад змін:**

Фрагмент початкового файлу uk.json:

```json
{
  "header": {
    "brand": "Меганом Поліграф",
    "home": "Головна",
    "example": "Приклади робіт",
    "contact": "Контакти",
    "about": "Про нас",
    "delivery": "Доставка"
  }
}
```

Якщо потрібно змінити заголовок "Про нас" на "Про компанію", оновіть відповідне значення:

```json
{
  "header": {
    "brand": "Меганом Поліграф",
    "home": "Головна",
    "example": "Приклади робіт",
    "contact": "Контакти",
    "about": "Про компанію",
    "delivery": "Доставка"
  }
}
```

**Що відбувається після внесення змін?**

Після збереження змін текст на сайті автоматично оновиться при наступному завантаженні сторінки. Це дозволяє редагувати вміст без зміни коду сайту, зберігаючи його структуру стабільною.

### Додавання нових продуктів

Щоб додати новий продукт, виконайте наступні кроки:

1. **Додайте зображення продукту** в теку `assets/images/bags`.
2. **Запишіть опис продукту** на всіх мовах у відповідних файлах в теці `assets/json/languages` в розділ example (рекомендована назва має бути example-bag-description-{номер товару}). Використовуйте html формат запису тексту, щоб мати більш гарний результат на сайті

   Приклад запису:

   ```json
   "example-bag-description-1": "<h5>Опис пакета на фото</h5><p><b>Розмір:</b> 24*36*9</p><p><b>Матеріал:</b> крафт бурий 170г.</p><p><b>Друк:</b> 1+0 (Pantone)</p><p><b>Ручки:</b> шнур</p><p>Дно та ручки зміцнені картоном.<br/>Пакет висічений.</p>",
   ```

3. **Редагуйте файл `assets/json/products/bags.json`**, де зберігаються всі описи продуктів.

#### Опис продукту потрібно записати в такому форматі:

```json
{
  "src": "посилання на картинку",
  "category": ["перелік категорій через кому"],
  "description": "посилання на опис"
}
```

Наприклад:

```json
{
  "src": "/assets/images/bags/9.jpg",
  "category": ["embossed-bags", "designer-paper-bags"],
  "description": "example.example-bag-description-9"
}
```

#### Категорії продуктів:

- **paper-bags-laminated** — Пакети паперові ламіновані
- **logo-bags** — Пакети з логотипом
- **cardboard-bags** — Пакети картонні
- **kraft-bags** — Крафт-пакети
- **gift-bags** — Пакети подарункові
- **branded-folders** — Фірмові теки для документів
- **designer-paper-bags** — Пакети з дизайнерського паперу
- **uv-lacquer-bags** — Пакети з вибірковим УФ лаком
- **embossed-bags** — Пакети з тисненням і конгревом

### Локалізація

Проєкт підтримує багатомовність, і файли перекладів зберігаються в теці `assets/json/languages/`, що дозволяє легко додавати нові мови при необхідності.

**Щоб додати нову мову потрібно:**

1. Створіть новий JSON-файл в теці `assets/json/languages`, наприклад `fr.json` для французької мови.

2. Додайте переклади у форматі json. Приклад:

   ```json
   {
     "header": {
       "home": "Accueil",
       "about": "À propos"
     }
   }
   ```

3. Додайте новий пункт вибору мови в тег select у php файлі `includes/header.php`. Наприклад так:
   ```html
   <option value="fr" <?= $lang === 'fr' ? 'selected' : '' ?>>Français</option>
   ```

---

## Meganom Poligraph (PHP version) :uk:

<p align='center'>
    <img src="./assets/images/logo.png" alt="working screen" style="width:25%">
</p>

**Meganom Poligraph (PHP version)** is a website for a printing company that provides information about products, services, and contact details. The project is built on PHP, using static image files, JavaScript, CSS, and JSON.

### Installation and Setup

1. Clone the repository

   ```bash
   git clone https://github.com/NikitaBerezhnyj/MeganomPoligraph.git
   cd MeganomPoligraph_PHP
   ```

2. Install dependencies

   The project uses Composer to manage PHP dependencies:

   ```bash
   composer install
   ```

3. Configure the environment

   Create a `.env` file in the root directory and fill it with the following variables:

   ```
   EMAIL_ADDRESS=your-email@example.com
   EMAIL_PASSWORD=your-email-password
   RECIPIENT_EMAIL=recipient@example.com
   SMTP_HOST=smtp.example.com
   SMTP_PORT=587
   ```

   These settings are used for sending emails through the contact form.

4. Running the Local Server (Optional)

   If you are testing the project locally, run the PHP server with the following command:

   ```bash
   php -S localhost:8000
   ```

   Or use Docker:

   ```bash
   docker compose up --build
   ```

   After that, the site will be available at: `http://localhost:8000`

### Preparing for Deployment

In order to prepare the site for uploading to the server, you need to build a folder containing all the important files for correct operation and set dependencies. To do this, run the command:

```bash
make
```

This will create the required file structure for deployment.

To test the site in the built deploy directory and ensure everything is working correctly, run the command:

```bash
make test_run
```

If you don't want to keep the deployment directory, you can remove it with the command:

```bash
make clean
```

### Editing Website Content

The website structure is fixed and cannot be changed without modifying the source code. However, you can update the website’s textual content by editing the corresponding localization files.

Text data is stored in JSON files in the directory:  
`assets/json/languages/[language_code].json`,  
where `[language_code]` is the short language identifier (e.g., `uk` for Ukrainian, `en` for English).

**How to change the text?**

1. Open the appropriate localization file (for example, `uk.json` for Ukrainian).
2. Find the key of the text block you want to modify. All text blocks are organized by pages (for example, content for the homepage is in the `home` section, while text for the contact page is in `contact`).
3. Update the text value and save the file.

**Example of changes:**

Initial `uk.json` file:

```json
{
  "header": {
    "brand": "Meganom Poligraph",
    "home": "Home",
    "example": "Examples of work",
    "contact": "Contact",
    "about": "About us",
    "delivery": "Delivery"
  }
}
```

If you want to change the title "About Us" to "About the Company", update the corresponding value:

```json
{
  "header": {
    "brand": "Meganom Poligraph",
    "home": "Home",
    "example": "Examples of work",
    "contact": "Contact",
    "about": "About the Company",
    "delivery": "Delivery"
  }
}
```

**What happens after making changes?**

After saving the changes, the text on the website will be automatically updated the next time the page is loaded. This approach allows you to edit content without modifying the website’s code while keeping its structure stable.

### Adding New Products

To add a new product, follow these steps:

1. **Add the product image** to the `assets/images/bags` folder.
2. **Write the product description** in all languages in the corresponding files in the `assets/json/languages` folder under the example section (recommended name should be example-bag-description-{product number}). Use HTML format for the text to get a better result on the website.

   Example entry:

   ```json
   "example-bag-description-1": "<h5>Description of the bag in the photo</h5><p><b>Size:</b> 24*36*9</p><p><b>Material:</b> brown kraft 170g.</p><p><b>Printing:</b> 1+0 (Pantone)</p><p><b>Handles:</b> cord</p><p>Bottom and handles reinforced with cardboard.<br/>The bag is die-cut.</p>",
   ```

3. **Edit the `assets/json/products/bags.json` file**, which contains all the product descriptions.

#### The product description should be written in this format:

```json
{
  "src": "image link",
  "category": ["list of categories separated by commas"],
  "description": "description link"
}
```

For example:

```json
{
  "src": "/assets/images/bags/9.jpg",
  "category": ["embossed-bags", "designer-paper-bags"],
  "description": "example.example-bag-description-9"
}
```

#### Product Categories:

- **paper-bags-laminated** — Laminated paper bags
- **logo-bags** — Bags with logo
- **cardboard-bags** — Cardboard bags
- **kraft-bags** — Kraft bags
- **gift-bags** — Gift bags
- **branded-folders** — Branded document folders
- **designer-paper-bags** — Designer paper bags
- **uv-lacquer-bags** — UV lacquer bags
- **embossed-bags** — Embossed and debossed bags

### Localization

The project supports multilingualism, and translation files are stored in the `assets/json/languages/` folder, which makes it easy to add new languages if necessary.

**To add a new language:**

1. Create a new JSON file in the `assets/json/languages` folder, for example, `fr.json` for French.

2. Add translations in JSON format. Example:

   ```json
   {
     "header": {
       "home": "Accueil",
       "about": "À propos"
     }
   }
   ```

3. Add a new language option in the `select` tag in the `includes/header.php` PHP file. For example:

   ```html
   <option value="fr" <?= $lang === 'fr' ? 'selected' : '' ?>>Français</option>
   ```
