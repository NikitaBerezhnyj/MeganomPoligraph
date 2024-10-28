const { exec } = require("child_process");

async function questions() {
  const inquirer = await import("inquirer");

  const answers = await inquirer.default.prompt({
    name: "script",
    type: "list",
    message: "Виберіть скрипт для виконання:",
    choices: [
      "Заповнити базу даних",
      "Додати нове поле в усі записи",
      "Видалити всі записи"
    ]
  });
  handleUserChoice(answers.script);
}

function handleUserChoice(choice) {
  switch (choice) {
    case "Заповнити базу даних":
      exec("node ./src/database/dataSeeder.js", (error, stdout, stderr) => {
        if (error) {
          console.error(`Помилка: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`Помилка під час виконання:\n${stderr}`);
          return;
        }
        console.log(`Результат виконання:\n${stdout}`);
      });
      break;

    case "Додати нове поле в усі записи":
      exec("node ./src/database/dataUpdate.js", (error, stdout, stderr) => {
        if (error) {
          console.error(`Помилка: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`Помилка під час виконання:\n${stderr}`);
          return;
        }
        console.log(`Результат виконання:\n${stdout}`);
      });
      break;

    case "Видалити всі записи":
      exec("node ./src/database/dataDelete.js", (error, stdout, stderr) => {
        if (error) {
          console.error(`Помилка: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`Помилка під час виконання:\n${stderr}`);
          return;
        }
        console.log(`Результат виконання:\n${stdout}`);
      });
      break;

    default:
      console.log("Невідомий вибір.");
  }
}

questions();
