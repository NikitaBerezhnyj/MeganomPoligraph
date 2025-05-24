import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Standard-Component-style.css";
import "./AdminUpdate.css";
import Select from "react-select";
import { saveUploadFile } from "../../API/uploadApi";
import { updateProduct } from "../../API/adminApi";
import { translatingText } from "../../API/translateApi";
import { CgDanger } from "react-icons/cg";
import "../Colors.css";

const categories = [
  "folder",
  "present",
  "order-lam",
  "order-craft",
  "order-cardboard",
  "order-tys",
  "order-design",
  "order-uf"
];

const categoryLabels = {
  folder: "Теки",
  present: "Подарункові",
  "order-lam": "Пакети паперові ламіновані",
  "order-craft": "Крафт пакети",
  "order-cardboard": "Пакети картонні",
  "order-tys": "Пакети з тисненням і конгревом",
  "order-design": "Пакети з дизайнерського паперу",
  "order-uf": "Пакети з вибірковим УФ лаком"
};

const categoryOptions = categories.map(category => ({
  value: category,
  label: categoryLabels[category]
}));

const customStyles = {
  control: provided => ({
    ...provided,
    backgroundColor: "var(--main-color)",
    color: "var(--text-color)"
  }),
  singleValue: provided => ({
    ...provided,
    color: "var(--text-color)",
    backgroundColor: "var(--second-color)"
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "var(--second-color)"
      : "var(--main-color)",
    color: "var(--text-color)",
    border: "1px solid var(--second-color)",
    ":hover": {
      backgroundColor: "var(--main-color)"
    }
  })
};

export default function AdminUpdateModal({
  show,
  onClose,
  product,
  isSuccess
}) {
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (product) {
      setDescription(product.description.ua || "");
      setSelectedCategories(
        product.category
          ? product.category.map(cat => ({
              value: cat,
              label: categoryLabels[cat]
            }))
          : []
      );
      setImage(null);
    }
  }, [product]);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!description.trim()) {
      newErrors.description = "* Опис обов'язковий";
      isValid = false;
    }
    if (selectedCategories.length === 0) {
      newErrors.category = "* Категорії обов'язкові";
      isValid = false;
    }

    if (!image && !product.imageUrl) {
      newErrors.image = "* Зображення обов'язкове";
      isValid = false;
    }

    const data = {
      description: {
        ua: description,
        ru: "",
        en: ""
      },
      category: selectedCategories.map(cat => cat.value),
      imageUrl: image || product.imageUrl
    };

    if (
      data.description.ua === product.description.ua &&
      JSON.stringify(data.category) === JSON.stringify(product.category) &&
      !image
    ) {
      setErrorMessage("Ви нічого не змінили, тож оновлення не валідне");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = event => {
    const { name, value, type, files } = event.target;

    if (type === "file") {
      setImage(files[0]);
      setErrors(prevErrors => ({ ...prevErrors, image: "" }));
    } else if (name === "description") {
      setDescription(value);
      if (value.trim()) {
        setErrors(prevErrors => ({ ...prevErrors, description: "" }));
      }
    }
  };

  const handleCategoryChange = selectedOptions => {
    setSelectedCategories(selectedOptions || []);
    if (selectedOptions && selectedOptions.length > 0) {
      setErrors(prevErrors => ({ ...prevErrors, category: "" }));
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      let translatedDescriptions;
      try {
        translatedDescriptions = await translatingText(description);
      } catch (error) {
        setErrorMessage("Помилка перекладу тексту. Спробуйте пізніше.");
        return;
      }

      const descriptionUa = translatedDescriptions.data.uk;
      const descriptionRu = translatedDescriptions.data.ru;
      const descriptionEn = translatedDescriptions.data.en;

      let imagePath;
      if (image) {
        try {
          const uploadResponse = await saveUploadFile(image);
          imagePath = uploadResponse.filePath;
        } catch (error) {
          setErrorMessage(
            "Помилка завантаження зображення. Спробуйте пізніше."
          );
          return;
        }
      }

      const productId = product._id;
      const data = {
        description: {
          ua: descriptionUa,
          ru: descriptionRu,
          en: descriptionEn
        },
        category: selectedCategories.map(cat => cat.value),
        imageUrl: imagePath || product.imageUrl
      };

      try {
        const res = await updateProduct(productId, data);
        console.log("Product updated successfully:", res.data);
        isSuccess();
        onClose();
      } catch (error) {
        setErrorMessage("Помилка оновлення продукту. Спробуйте пізніше.");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setErrorMessage(
        "Виникла непередбачувана помилка. Будь ласка, спробуйте ще раз."
      );
    }
  };

  const resetForm = () => {
    setDescription(product.description.ua || "");
    setSelectedCategories(
      product.category
        ? product.category.map(cat => ({
            value: cat,
            label: categoryLabels[cat]
          }))
        : []
    );
    setImage(null);
    setErrors({});
    setErrorMessage("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!show) {
    return null;
  }

  return (
    <div className="admin-update-modal-overlay">
      <div className="admin-update-modal-content">
        <h1>Оновити продукт</h1>
        <form onSubmit={handleSubmit}>
          <div className="admin-update-input">
            <div className="admin-update-header">
              <label>Опис:</label>
              {errors.description && (
                <span style={{ color: "red" }}>{errors.description}</span>
              )}
            </div>
            <textarea
              rows={8}
              name="description"
              value={description}
              onChange={handleChange}
              placeholder="Опишіть продукт"
            />
          </div>
          <div className="admin-update-input">
            <div className="admin-update-header">
              <label>Категорії:</label>
              {errors.category && (
                <span style={{ color: "red" }}>{errors.category}</span>
              )}
            </div>
            <Select
              isMulti
              name="categories"
              options={categoryOptions}
              value={selectedCategories}
              onChange={handleCategoryChange}
              styles={customStyles}
              placeholder="Виберіть категорії продукту"
            />
          </div>
          <div className="admin-update-input">
            <div className="admin-update-header">
              <label>Зображення продукту:</label>
              {errors.image && (
                <span style={{ color: "red" }}>{errors.image}</span>
              )}
            </div>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
          <div
            className={`admin-update-server-error-message ${errorMessage ? "admin-update-server-error-message-show" : ""}`}
          >
            {errorMessage && <CgDanger />} {errorMessage}
          </div>

          <div className="admin-update-modal-actions">
            <button type="button" onClick={handleClose}>
              Відхилити
            </button>
            <button type="submit">Оновити</button>
          </div>
        </form>
      </div>
    </div>
  );
}
