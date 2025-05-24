require("dotenv").config();
const mongoose = require("mongoose");
const connectionDB = require("../config/dbConfig");
const { Product, validateProduct } = require("../models/productModel");

const seedData = [
  {
    description: {
      ua: "<h3>Опис пакета на фото</h3><p><b>Розмір:</b> 24*36*9</p><p><b>Матеріал:</b> крафт бурий 170г.</p><p><b>Друк:</b> 1+0 (Pantone)</p><p><b>Ручки:</b> шнур</p><p>Дно та ручки зміцнені картоном.<br/>Пакет висічений.</p>",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-craft"],
    imageUrl: "http://localhost:3001/uploads/1_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "<h3>Опис пакета на фото</h3><p><b>Розмір:</b> 25*35*9, 40*33*20</p><p><b>Матеріал:</b> папір крейдований 200г.</p><p><b>Друк:</b> 4+0 (CMYK)</p><p><b>Ламінація:</b> матова</p><p><b>Ручки:</b> шнур</p><p>Вибірковий УФ лак<br/>Люверси<br/>Дно та ручки зміцнені картоном.</p>",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-uf", "order-lam"],
    imageUrl: "http://localhost:3001/uploads/2_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "<h3>Опис пакета на фото</h3><p><b>Розмір:</b> 48*32*15, 30*24*10</p><p><b>Матеріал:</b> картон целюлозний 210г.</p><p><b>Друк:</b> 5+0 (CMYK + Pantone)</p><p><b>Ламінація:</b> матова</p><p><b>Ручки:</b> стрічка репсова вклеєна</p><p>Вибірковий УФ лак<br/>Пакет висічений<br/>Дно та ручки зміцнені картоном.</p>",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-uf", "order-cardboard"],
    imageUrl: "http://localhost:3001/uploads/3_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "<h3>Опис пакета на фото</h3><p><b>Розмір:</b> 14*39*13</p><p><b>Матеріал:</b> папір крейдований 200г.</p><p><b>Друк:</b> 2+0 (Pantone)</p><p><b>Ламінація:</b> матова</p><p><b>Ручки:</b> шнур</p><p>Дно та ручки зміцнені картоном.</p>",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-lam"],
    imageUrl: "http://localhost:3001/uploads/4_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-lam"],
    imageUrl: "http://localhost:3001/uploads/5_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-lam"],
    imageUrl: "http://localhost:3001/uploads/6_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-lam"],
    imageUrl: "http://localhost:3001/uploads/7_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-cardboard"],
    imageUrl: "http://localhost:3001/uploads/8_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-tys", "order-design"],
    imageUrl: "http://localhost:3001/uploads/9_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-tys", "order-design"],
    imageUrl: "http://localhost:3001/uploads/10_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-cardboard"],
    imageUrl: "http://localhost:3001/uploads/11_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-lam"],
    imageUrl: "http://localhost:3001/uploads/12_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-design"],
    imageUrl: "http://localhost:3001/uploads/13_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-lam"],
    imageUrl: "http://localhost:3001/uploads/14_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-lam"],
    imageUrl: "http://localhost:3001/uploads/15_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-lam"],
    imageUrl: "http://localhost:3001/uploads/16_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-cardboard"],
    imageUrl: "http://localhost:3001/uploads/17_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-lam"],
    imageUrl: "http://localhost:3001/uploads/18_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-cardboard"],
    imageUrl: "http://localhost:3001/uploads/19_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-cardboard"],
    imageUrl: "http://localhost:3001/uploads/20_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-lam"],
    imageUrl: "http://localhost:3001/uploads/21_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-cardboard"],
    imageUrl: "http://localhost:3001/uploads/22_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-lam"],
    imageUrl: "http://localhost:3001/uploads/23_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-lam"],
    imageUrl: "http://localhost:3001/uploads/24_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-lam"],
    imageUrl: "http://localhost:3001/uploads/25_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-craft"],
    imageUrl: "http://localhost:3001/uploads/26_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-tys", "order-cardboard"],
    imageUrl: "http://localhost:3001/uploads/27_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-tys", "order-design"],
    imageUrl: "http://localhost:3001/uploads/28_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-lam"],
    imageUrl: "http://localhost:3001/uploads/29_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-lam"],
    imageUrl: "http://localhost:3001/uploads/30_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-lam"],
    imageUrl: "http://localhost:3001/uploads/31_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-craft"],
    imageUrl: "http://localhost:3001/uploads/32_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["folder"],
    imageUrl: "http://localhost:3001/uploads/33_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-craft"],
    imageUrl: "http://localhost:3001/uploads/34_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-craft"],
    imageUrl: "http://localhost:3001/uploads/35_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-craft"],
    imageUrl: "http://localhost:3001/uploads/36_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-craft"],
    imageUrl: "http://localhost:3001/uploads/37_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["present"],
    imageUrl: "http://localhost:3001/uploads/38_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["present"],
    imageUrl: "http://localhost:3001/uploads/39_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-cardboard"],
    imageUrl: "http://localhost:3001/uploads/40_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-craft"],
    imageUrl: "http://localhost:3001/uploads/41_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-design", "order-tys"],
    imageUrl: "http://localhost:3001/uploads/42_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["folder"],
    imageUrl: "http://localhost:3001/uploads/43_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-design"],
    imageUrl: "http://localhost:3001/uploads/44_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["present"],
    imageUrl: "http://localhost:3001/uploads/45_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-craft"],
    imageUrl: "http://localhost:3001/uploads/46_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["present"],
    imageUrl: "http://localhost:3001/uploads/47_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-cardboard"],
    imageUrl: "http://localhost:3001/uploads/48_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["present"],
    imageUrl: "http://localhost:3001/uploads/49_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-craft"],
    imageUrl: "http://localhost:3001/uploads/50_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["folder"],
    imageUrl: "http://localhost:3001/uploads/51_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-design"],
    imageUrl: "http://localhost:3001/uploads/52_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-craft"],
    imageUrl: "http://localhost:3001/uploads/53_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-lam"],
    imageUrl: "http://localhost:3001/uploads/54_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["present"],
    imageUrl: "http://localhost:3001/uploads/55_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-craft"],
    imageUrl: "http://localhost:3001/uploads/56_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-craft"],
    imageUrl: "http://localhost:3001/uploads/57_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["folder"],
    imageUrl: "http://localhost:3001/uploads/58_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["folder"],
    imageUrl: "http://localhost:3001/uploads/59_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["present"],
    imageUrl: "http://localhost:3001/uploads/60_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["folder", "order-cardboard"],
    imageUrl: "http://localhost:3001/uploads/61_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-craft"],
    imageUrl: "http://localhost:3001/uploads/62_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-design", "order-tys"],
    imageUrl: "http://localhost:3001/uploads/63_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["folder"],
    imageUrl: "http://localhost:3001/uploads/64_2024-10-13_17-00-00.jpg"
  },
  {
    description: {
      ua: "Опис українською",
      ru: "Описание на русском",
      en: "Description in English"
    },
    category: ["order-lam"],
    imageUrl: "http://localhost:3001/uploads/65_2024-10-13_17-00-00.jpg"
  }
];

const seedDatabase = async () => {
  try {
    await connectionDB();

    let successfulCount = 0;
    for (const data of seedData) {
      const { error } = validateProduct(data);
      if (error) {
        console.error(
          `Помилка валідації для продукту: ${error.details[0].message}`
        );
        continue;
      }

      const newProduct = new Product({
        description: {
          ua: data.description.ua,
          ru: data.description.ru,
          en: data.description.en
        },
        category: data.category,
        imageUrl:
          data.imageUrl || "http://localhost:3001/uploads/standard_product.jpg"
      });

      await newProduct.save();
      successfulCount++;
    }

    mongoose.connection.close();
    console.log(`${successfulCount} продукт(и) успішно додано.`);
  } catch (error) {
    console.error("Помилка заповнення бази даних:", error);
    process.exit(1);
  }
};

seedDatabase();
