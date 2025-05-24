import { useTranslation } from "react-i18next";

const useImages = () => {
  const { t } = useTranslation("global");

  // Теки - folder
  // Подарункові - present
  // Пакети з логотипом:
  // Пакети паперові ламіновані - order-lam
  // Крафт пакети - order-craft
  // Пакети картонні - order-cardboard
  // Пакети з тисненням і конгревом - order-tys
  // Пакети з дизайнерського паперу - order-design
  // Пакети з вибірковим УФ лаком - order-uf
  const images = [
    {
      src: "/img/package/1.jpg",
      category: ["order-craft"],
      description: t("portfolio.description-1")
    },
    {
      src: "/img/package/2.jpg",
      category: ["order-uf", "order-lam"],
      description: t("portfolio.description-2")
    },
    {
      src: "/img/package/3.jpg",
      category: ["order-uf", "order-cardboard"],
      description: t("portfolio.description-3")
    },
    {
      src: "/img/package/4.jpg",
      category: ["order-lam"],
      description: t("portfolio.description-4")
    },
    {
      src: "/img/package/5.jpg",
      category: ["order-lam"],
      description: t("portfolio.description-5")
    },
    {
      src: "/img/package/6.jpg",
      category: ["order-lam"],
      description: t("portfolio.description-6")
    },
    {
      src: "/img/package/7.jpg",
      category: ["order-lam"],
      description: t("portfolio.description-7")
    },
    {
      src: "/img/package/8.jpg",
      category: ["order-cardboard"],
      description: t("portfolio.description-8")
    },
    {
      src: "/img/package/9.jpg",
      category: ["order-tys", "order-design"],
      description: t("portfolio.description-9")
    },
    {
      src: "/img/package/10.jpg",
      category: ["order-tys", "order-design"],
      description: t("portfolio.description-10")
    },
    {
      src: "/img/package/11.jpg",
      category: ["order-cardboard"],
      description: t("portfolio.description-11")
    },
    {
      src: "/img/package/12.jpg",
      category: ["order-lam"],
      description: t("portfolio.description-12")
    },
    {
      src: "/img/package/13.jpg",
      category: ["order-design"],
      description: t("portfolio.description-13")
    },
    {
      src: "/img/package/14.jpg",
      category: ["order-lam"],
      description: t("portfolio.description-14")
    },
    {
      src: "/img/package/15.jpg",
      category: ["order-lam"],
      description: t("portfolio.description-15")
    },
    {
      src: "/img/package/16.jpg",
      category: ["order-lam"],
      description: t("portfolio.description-16")
    },
    {
      src: "/img/package/17.jpg",
      category: ["order-lam"],
      description: t("portfolio.description-17")
    },
    {
      src: "/img/package/18.jpg",
      category: ["order-lam"],
      description: t("portfolio.description-18")
    },
    {
      src: "/img/package/19.jpg",
      category: ["order-cardboard"],
      description: t("portfolio.description-19")
    },
    {
      src: "/img/package/20.jpg",
      category: ["order-cardboard"],
      description: t("portfolio.description-20")
    },
    {
      src: "/img/package/21.jpg",
      category: ["order-lam"],
      description: t("portfolio.description-21")
    },
    {
      src: "/img/package/22.jpg",
      category: ["order-cardboard"],
      description: t("portfolio.description-22")
    },
    {
      src: "/img/package/23.jpg",
      category: ["order-lam"],
      description: t("portfolio.description-23")
    },
    {
      src: "/img/package/24.jpg",
      category: ["order-lam"],
      description: t("portfolio.description-24")
    },
    {
      src: "/img/package/25.jpg",
      category: ["order-lam"],
      description: t("portfolio.description-25")
    },
    {
      src: "/img/package/26.jpg",
      category: ["order-craft"],
      description: t("portfolio.description-26")
    },
    {
      src: "/img/package/27.jpg",
      category: ["order-tys", "order-cardboard"],
      description: t("portfolio.description-27")
    },
    {
      src: "/img/package/28.jpg",
      category: ["order-tys", "order-design"],
      description: t("portfolio.description-28")
    },
    {
      src: "/img/package/29.jpg",
      category: ["order-lam"],
      description: t("portfolio.description-29")
    },
    {
      src: "/img/package/30.jpg",
      category: ["order-lam"],
      description: t("portfolio.description-30")
    },
    {
      src: "/img/package/31.jpg",
      category: ["order-lam"],
      description: t("portfolio.description-31")
    },
    {
      src: "/img/package/32.jpg",
      category: ["order-craft"],
      description: t("portfolio.description-32")
    },
    {
      src: "/img/package/33.jpg",
      category: ["folders"],
      description: t("portfolio.description-33")
    },
    {
      src: "/img/package/34.jpg",
      category: ["order-craft"],
      description: t("portfolio.description-34")
    },
    {
      src: "/img/package/35.jpg",
      category: ["order-craft"],
      description: t("portfolio.description-35")
    },
    {
      src: "/img/package/36.jpg",
      category: ["order-craft"],
      description: t("portfolio.description-36")
    },
    {
      src: "/img/package/37.jpg",
      category: ["order-craft"],
      description: t("portfolio.description-37")
    },
    {
      src: "/img/package/38.jpg",
      category: ["present"],
      description: t("portfolio.description-38")
    },
    {
      src: "/img/package/39.jpg",
      category: ["present"],
      description: t("portfolio.description-39")
    },
    {
      src: "/img/package/40.jpg",
      category: ["order-cardboard"],
      description: t("portfolio.description-40")
    },
    {
      src: "/img/package/41.jpg",
      category: ["order-craft"],
      description: t("portfolio.description-41")
    },
    {
      src: "/img/package/42.jpg",
      category: ["order-design", "order-tys"],
      description: t("portfolio.description-42")
    },
    {
      src: "/img/package/43.jpg",
      category: ["folders"],
      description: t("portfolio.description-43")
    },
    {
      src: "/img/package/44.jpg",
      category: ["order-design"],
      description: t("portfolio.description-44")
    },
    {
      src: "/img/package/45.jpg",
      category: ["present"],
      description: t("portfolio.description-45")
    },
    {
      src: "/img/package/46.jpg",
      category: ["order-craft"],
      description: t("portfolio.description-46")
    },
    {
      src: "/img/package/47.jpg",
      category: ["present"],
      description: t("portfolio.description-47")
    },
    {
      src: "/img/package/48.jpg",
      category: ["order-cardboard"],
      description: t("portfolio.description-48")
    },
    {
      src: "/img/package/49.jpg",
      category: ["present"],
      description: t("portfolio.description-49")
    },
    {
      src: "/img/package/50.jpg",
      category: ["order-craft"],
      description: t("portfolio.description-50")
    },
    {
      src: "/img/package/51.jpg",
      category: ["folders"],
      description: t("portfolio.description-51")
    },
    {
      src: "/img/package/52.jpg",
      category: ["order-design"],
      description: t("portfolio.description-52")
    },
    {
      src: "/img/package/53.jpg",
      category: ["order-craft"],
      description: t("portfolio.description-53")
    },
    {
      src: "/img/package/54.jpg",
      category: ["order-lam"],
      description: t("portfolio.description-54")
    },
    {
      src: "/img/package/55.jpg",
      category: ["order-craft"],
      description: t("portfolio.description-55")
    },
    {
      src: "/img/package/56.jpg",
      category: ["order-craft"],
      description: t("portfolio.description-56")
    },
    {
      src: "/img/package/57.jpg",
      category: ["order-craft"],
      description: t("portfolio.description-57")
    },
    {
      src: "/img/package/58.jpg",
      category: ["folders"],
      description: t("portfolio.description-58")
    },
    {
      src: "/img/package/59.jpg",
      category: ["folders"],
      description: t("portfolio.description-59")
    },
    {
      src: "/img/package/60.jpg",
      category: ["present"],
      description: t("portfolio.description-60")
    },
    {
      src: "/img/package/61.jpg",
      category: ["folders", "order-cardboard"],
      description: t("portfolio.description-61")
    },
    {
      src: "/img/package/62.jpg",
      category: ["order-craft"],
      description: t("portfolio.description-62")
    },
    {
      src: "/img/package/63.jpg",
      category: ["order-design", "order-tys"],
      description: t("portfolio.description-63")
    },
    {
      src: "/img/package/64.jpg",
      category: ["folders"],
      description: t("portfolio.description-64")
    },
    {
      src: "/img/package/65.jpg",
      category: ["order-lam"],
      description: t("portfolio.description-65")
    },
    {
      category: ["order-craft"],
      description: {
        ua: "Опис українською",
        ru: "Описание на русском",
        en: "Description in English"
      },
      imageUrl: "http://localhost:3001/uploads/56_2024-10-13_17-00-00.jpg"
    },
    {
      category: ["order-craft"],
      description: {
        ua: "Опис українською",
        ru: "Описание на русском",
        en: "Description in English"
      },
      imageUrl: "http://localhost:3001/uploads/57_2024-10-13_17-00-00.jpg"
    },
    {
      category: ["folders"],
      description: {
        ua: "Опис українською",
        ru: "Описание на русском",
        en: "Description in English"
      },
      imageUrl: "http://localhost:3001/uploads/58_2024-10-13_17-00-00.jpg"
    },
    {
      category: ["folders"],
      description: {
        ua: "Опис українською",
        ru: "Описание на русском",
        en: "Description in English"
      },
      imageUrl: "http://localhost:3001/uploads/59_2024-10-13_17-00-00.jpg"
    },
    {
      category: ["present"],
      description: {
        ua: "Опис українською",
        ru: "Описание на русском",
        en: "Description in English"
      },
      imageUrl: "http://localhost:3001/uploads/60_2024-10-13_17-00-00.jpg"
    },
    {
      category: ["folders", "order-cardboard"],
      description: {
        ua: "Опис українською",
        ru: "Описание на русском",
        en: "Description in English"
      },
      imageUrl: "http://localhost:3001/uploads/61_2024-10-13_17-00-00.jpg"
    },
    {
      category: ["order-craft"],
      description: {
        ua: "Опис українською",
        ru: "Описание на русском",
        en: "Description in English"
      },
      imageUrl: "http://localhost:3001/uploads/62_2024-10-13_17-00-00.jpg"
    },
    {
      category: ["order-design", "order-tys"],
      description: {
        ua: "Опис українською",
        ru: "Описание на русском",
        en: "Description in English"
      },
      imageUrl: "http://localhost:3001/uploads/63_2024-10-13_17-00-00.jpg"
    },
    {
      category: ["folders"],
      description: {
        ua: "Опис українською",
        ru: "Описание на русском",
        en: "Description in English"
      },
      imageUrl: "http://localhost:3001/uploads/64_2024-10-13_17-00-00.jpg"
    },
    {
      category: ["order-lam"],
      description: {
        ua: "Опис українською",
        ru: "Описание на русском",
        en: "Description in English"
      },
      imageUrl: "http://localhost:3001/uploads/65_2024-10-13_17-00-00.jpg"
    }
  ];

  return images;
};

export default useImages;
