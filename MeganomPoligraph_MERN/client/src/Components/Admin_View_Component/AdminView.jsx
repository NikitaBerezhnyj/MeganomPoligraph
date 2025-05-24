import React, { useEffect, useState } from "react";
import { getProduct } from "../../API/adminApi";
import { Container } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { ImExit } from "react-icons/im";
import AdminAdd from "../Admin_Add_Component/AdminAdd";
import AdminUpdate from "../Admin_Update_Component/AdminUpdate";
import { deleteProduct } from "../../API/adminApi";
import "../Standard-Component-style.css";
import "./AdminView.css";

const DeleteModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Ви впевнені?</h2>
        <p>
          Ви дійсно хочете видалити цей товар? Ця дія не може бути скасована.
        </p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Ні
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Так
          </button>
        </div>
      </div>
    </div>
  );
};

const ExitModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Ви впевнені?</h2>
        <p>Ви дійсно хочете вийти?</p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Ні
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Так
          </button>
        </div>
      </div>
    </div>
  );
};

const SuccessPopUp = ({ show, isAdd, onHide }) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onHide) onHide();
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [show, onHide]);

  return (
    <>
      <div className={`mail-success-container ${isVisible ? "" : "hide"}`}>
        {isVisible && (
          <>
            {isAdd ? <p>Додано новий продукт</p> : <p>Продукт оновлено</p>}
            <div className="progress-bar">
              <div className="progress" />
            </div>
          </>
        )}
      </div>
    </>
  );
};

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

const AdminView = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSuccessMassage, setShowSuccessMassage] = useState(false);
  const [isAddProduct, setIsAddProduct] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await getProduct();
        setProducts(data.reverse());
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = productId => {
    setSelectedProductId(productId);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    await deleteProduct(selectedProductId);
    setProducts(prevProducts =>
      prevProducts.filter(product => product._id !== selectedProductId)
    );
    setShowModal(false);
  };

  const handleOpenUpdate = product => {
    setSelectedProduct(product);
    setShowUpdate(true);
  };

  const handleCloseAdd = () => {
    setShowAdd(false);
  };

  const handleSuccessAdd = async () => {
    const { data } = await getProduct();
    setProducts(data.reverse());
    setIsAddProduct(true);
    setShowSuccessMassage(true);
  };

  const handleSuccessUpdate = async () => {
    const { data } = await getProduct();
    setProducts(data.reverse());
    setIsAddProduct(false);
    setShowSuccessMassage(true);
  };

  const handleCloseUpdate = () => {
    setShowUpdate(false);
  };

  const handleLogout = () => {
    setShowExitModal(true);
  };

  const confirmExit = () => {
    localStorage.removeItem("jwtToken");
    window.location.reload();
  };

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <Container className="admin-add-container">
      <h1>Адмін панель</h1>
      <hr />

      <div className="admin-view-button-container">
        <button
          className="admin-view-add-button"
          onClick={() => setShowAdd(!showAdd)}
        >
          Add <IoMdAdd />
        </button>
        <button className="admin-view-exit-button" onClick={handleLogout}>
          Exit <ImExit />
        </button>
      </div>
      <hr />
      {products.length > 0 ? (
        products.map(product => (
          <div key={product._id} className="product-container">
            <div className="product-image">
              <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className="product-text">
              <p>
                <b>Категорія:</b>{" "}
                {Array.isArray(product.category)
                  ? product.category
                      .map(cat => categoryLabels[cat] || cat)
                      .join(", ")
                  : categoryLabels[product.category] || product.category}
              </p>
              <p>
                <b>Опис:</b> {product.description.ua}
              </p>
              <p>
                <b>Описание:</b> {product.description.ru}
              </p>
              <p>
                <b>Description:</b> {product.description.en}
              </p>
            </div>
            <div>
              <button
                className="admin-view-edit-button"
                onClick={() => handleOpenUpdate(product)}
              >
                Update <FaEdit />
              </button>
              <button
                className="admin-view-delete-button"
                onClick={() => handleDeleteProduct(product._id)}
              >
                Delete <MdDelete />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No products available.</p>
      )}

      <hr />

      <AdminAdd
        show={showAdd}
        onClose={handleCloseAdd}
        isSuccess={handleSuccessAdd}
      />

      <AdminUpdate
        show={showUpdate}
        onClose={handleCloseUpdate}
        isSuccess={handleSuccessUpdate}
        product={selectedProduct}
      />

      <DeleteModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
      />

      <ExitModal
        show={showExitModal}
        onClose={() => setShowExitModal(false)}
        onConfirm={confirmExit}
      />

      <SuccessPopUp
        show={showSuccessMassage}
        isAdd={isAddProduct}
        onHide={() => setShowSuccessMassage(false)}
      />
    </Container>
  );
};

export default AdminView;
