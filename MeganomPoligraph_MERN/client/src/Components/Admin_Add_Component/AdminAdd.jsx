import React, { useState } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Standard-Component-style.css";
import "./AdminAdd.css";
import { addProduct } from "../../API/adminApi";
import { saveUploadFile } from "../../API/uploadApi";
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
    // borderColor: "var(--main-color)"
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

export default function AdminAddModal({ show, onClose, isSuccess }) {
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

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
    if (!image) {
      newErrors.image = "* Зображення обов'язкове";
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
    setSelectedCategories(
      selectedOptions ? selectedOptions.map(option => option.value) : []
    );
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
      try {
        const uploadResponse = await saveUploadFile(image);
        imagePath = uploadResponse.filePath;
      } catch (error) {
        setErrorMessage("Помилка завантаження зображення. Спробуйте пізніше.");
        return;
      }

      const data = {
        description: {
          ua: descriptionUa,
          ru: descriptionRu,
          en: descriptionEn
        },
        category: selectedCategories,
        imageUrl: imagePath
      };

      try {
        const res = await addProduct(data);
        console.log("Product uploaded successfully:", res.data);
      } catch (error) {
        setErrorMessage("Помилка оновлення продукту. Спробуйте пізніше.");
        return;
      }

      resetForm();
      isSuccess();
      onClose();
    } catch (error) {
      console.error("Unexpected error:", error);
      setErrorMessage(
        "Виникла непередбачувана помилка. Будь ласка, спробуйте ще раз."
      );
    }
  };

  const resetForm = () => {
    setDescription("");
    setSelectedCategories([]);
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
    <div className="admin-add-modal-overlay">
      <div className="admin-add-modal-content">
        <h1>Додати продукт</h1>
        <form onSubmit={handleSubmit}>
          <div className="admin-add-input">
            <div className="admin-add-header">
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
          <div className="admin-add-input">
            <div className="admin-add-header">
              <label>Категорії:</label>
              {errors.category && (
                <span style={{ color: "red" }}>{errors.category}</span>
              )}
            </div>
            <Select
              isMulti
              name="categories"
              options={categoryOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              value={selectedCategories.map(category => ({
                value: category,
                label: categoryLabels[category]
              }))}
              styles={customStyles}
              onChange={handleCategoryChange}
              placeholder="Виберіть категорії продукту"
            />
          </div>
          <div className="admin-add-input">
            <div className="admin-add-header">
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
            className={`admin-add-server-error-message ${errorMessage ? "admin-add-server-error-message-show" : ""}`}
          >
            {errorMessage && <CgDanger />} {errorMessage}
          </div>
          <div className="admin-add-modal-actions">
            <button type="button" onClick={handleClose}>
              Відхилити
            </button>
            <button type="submit">Додати</button>
          </div>
        </form>
      </div>
    </div>
  );
}
