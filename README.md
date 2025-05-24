# MeganomPolygraph

The repository is available in [Ukrainian](#меганом-поліграф-ukraine) and [English](#meganom-poligraph-uk)

## Меганом Поліграф :ukraine:

Цей проєкт є монорепозиторієм, який містить дві версії сайту для поліграфічної компанії Меганом Поліграф:

- **MERN версія** (React, Express, Node.js, MongoDB)
- **PHP версія** (PHP, JavaScript, CSS, JSON)
- **NET версії** (Angular + C# + ASP.NET)

Ви можете знайти інструкції та документацію для кожної версії в окремих каталогах.

### Структура проєкту

Проєкт складається з трьох основних директорій:

#### MeganomPoligraph_MERN

Ця версія сайту використовує стек MERN (MongoDB, Express, React, Node.js). Вона включає як серверну частину, так і клієнтську, з підтримкою статичних файлів та MongoDB для зберігання даних.

- **client**: Клієнтська частина на React
- **server**: Серверна частина на Node.js та Express

Для налаштування та запуску цієї версії перейдіть до [README файлу в каталозі MeganomPoligraph_MERN](./MeganomPoligraph_MERN/README.md).

#### MeganomPoligraph_PHP

Ця версія сайту побудована на PHP і використовує статичні файли зображень, JavaScript, CSS та JSON для обробки тексту та локалізації.

Для налаштування та запуску цієї версії перейдіть до [README файлу в каталозі MeganomPoligraph_PHP](./MeganomPoligraph_PHP/README.md).

#### MeganomPoligraph_NET

Ця версія сайту реалізована з використанням Angular для клієнтської частини та ASP.NET + C# для серверної логіки. Архітектура проєкту передбачає чіткий розподіл між frontend та backend частинами.

- **client**: Клієнтська частина на Angular
- **server**: Серверна частина на ASP.NET Core

Для налаштування та запуску цієї версії перейдіть до [README файлу в каталозі MeganomPoligraph_NET](./MeganomPoligraph_NET/README.md).

### Відмінності між PHP та MERN версіями

Усі версії сайту виконують однакову функцію – надають інформацію про товари та послуги поліграфічної компанії **Меганом Поліграф**, однак вони реалізовані з використанням різних технологічних стеків, що впливає на архітектуру, спосіб керування контентом та зручність адміністрування.

Коротко про ключові відмінності:

| Характеристика         | PHP версія               | MERN версія             | .NET версія               |
| ---------------------- | ------------------------ | ----------------------- | ------------------------- |
| Архітектура            | Багатосторінковий сайт   | Односторінковий додаток | Багатосторінковий додаток |
| Серверний стек         | PHP + JSON               | Node.js + Express       | ASP.NET Core + C#         |
| Клієнтський стек       | HTML + JS + CSS          | React (SPA)             | Angular Universal (SSR)   |
| База даних             | JSON-файли               | MongoDB                 | PostgreSQL                |
| Оновлення контенту     | Ручне редагування файлів | Через адмін-панель      | Через адмін-панель        |
| Панель адміністрування | Відсутня                 | Присутня (прихована)    | Присутня (прихована)      |

Усі версії підтримують локалізацію, працюють з тими ж даними та зображеннями, але підхід до управління контентом і динамічності сайту кардинально різний.

---

## Meganom Poligraph :uk:

This project is a monorepository that contains three versions of a website for the printing company **Meganom Poligraph**:

- **MERN version** (React, Express, Node.js, MongoDB)
- **PHP version** (PHP, JavaScript, CSS, JSON)
- **.NET version** (Angular + C# + ASP.NET)

You can find instructions and documentation for each version in separate directories.

### Project Structure

The project consists of three main directories:

#### MeganomPoligraph_MERN

This version of the site uses the MERN stack (MongoDB, Express, React, Node.js). It includes both the frontend and the backend, supporting static files and MongoDB for data storage.

- **client**: Frontend part in React
- **server**: Backend part in Node.js and Express

To set up and run this version, go to the [README file in the MeganomPoligraph_MERN directory](./MeganomPoligraph_MERN/README.md).

#### MeganomPoligraph_PHP

This version of the site is built using PHP and utilizes static image files, JavaScript, CSS, and JSON for text processing and localization.

To set up and run this version, go to the [README file in the MeganomPoligraph_PHP directory](./MeganomPoligraph_PHP/README.md).

#### MeganomPoligraph_NET

This version of the site is implemented using Angular for the frontend and ASP.NET + C# for the backend logic. The project architecture ensures a clear separation between the frontend and backend parts.

- **client**: Frontend part in Angular
- **server**: Backend part in ASP.NET Core

To set up and run this version, go to the [README file in the MeganomPoligraph_NET directory](./MeganomPoligraph_NET/README.md).

### Differences Between the PHP, MERN, and .NET Versions

All versions of the site serve the same purpose – providing information about the products and services of the printing company **Meganom Poligraph**. However, they are implemented using different technology stacks, which affects the architecture, content management method, and administrative convenience.

Key differences:

| Characteristic  | PHP Version         | MERN Version            | .NET Version            |
| --------------- | ------------------- | ----------------------- | ----------------------- |
| Architecture    | Multi-page website  | Single-page application | Multi-page application  |
| Server stack    | PHP + JSON          | Node.js + Express       | ASP.NET Core + C#       |
| Frontend stack  | HTML + JS + CSS     | React (SPA)             | Angular Universal (SSR) |
| Database        | JSON files          | MongoDB                 | PostgreSQL              |
| Content updates | Manual file editing | Via admin panel         | Via admin panel         |
| Admin panel     | Absent              | Present (hidden)        | Present (hidden)        |

All versions support localization, work with the same data and images, but the approach to content management and site dynamics is significantly different.
