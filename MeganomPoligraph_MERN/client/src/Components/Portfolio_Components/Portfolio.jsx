// // // // import React, { useState } from "react";
// // // // import { Dropdown, Container, Row, Col, Button } from "react-bootstrap";
// // // // import { useTranslation } from "react-i18next";
// // // // import useImages from "./images";
// // // // import "bootstrap/dist/css/bootstrap.min.css";
// // // // import "../Standard-Component-style.css";
// // // // import "./Portfolio.css";

// // // // export default function Portfolio() {
// // // //   const { t } = useTranslation("global");
// // // //   const images = useImages();
// // // //   const [filter, setFilter] = useState("all");
// // // //   const [showModal, setShowModal] = useState(false);
// // // //   const [modalImage, setModalImage] = useState(null);
// // // //   const [modalDescription, setModalDescription] = useState("");
// // // //   const [dropdownShow, setDropdownShow] = useState(false);

// // // //   const handleFilterChange = filterOption => {
// // // //     setFilter(filterOption);
// // // //   };

// // // //   const handleModalOpen = image => {
// // // //     setModalImage(image.src);
// // // //     setModalDescription(image.description);
// // // //     setShowModal(true);
// // // //   };

// // // //   const handleModalClose = event => {
// // // //     if (
// // // //       event.target.tagName !== "IMG" &&
// // // //       event.target.tagName !== "PRE" &&
// // // //       event.target.tagName !== "H3" &&
// // // //       event.target.tagName !== "P" &&
// // // //       event.target.tagName !== "A" &&
// // // //       event.target.tagName !== "B" &&
// // // //       !event.target.classList.contains("model-item")
// // // //     ) {
// // // //       setShowModal(false);
// // // //     }
// // // //   };

// // // //   // Обробник події показу/приховування dropdown-menu
// // // //   const handleDropdownShow = isOpen => {
// // // //     setDropdownShow(isOpen);
// // // //   };

// // // //   const filteredImages = filterImages(images, filter);

// // // //   return (
// // // //     <>
// // // //       {/* Modal */}
// // // //       <div
// // // //         className={`model ${showModal ? "open" : ""}`}
// // // //         onClick={handleModalClose}
// // // //       >
// // // //         <Row>
// // // //           <button
// // // //             className="modal-close-button"
// // // //             onClick={() => {
// // // //               setShowModal(false);
// // // //             }}
// // // //           >
// // // //             X
// // // //           </button>
// // // //         </Row>
// // // //         <Row className="model-wrap">
// // // //           <Col sm className="model-item">
// // // //             <img src={modalImage} alt="" />
// // // //           </Col>
// // // //           <Col sm className="model-item">
// // // //             <pre dangerouslySetInnerHTML={{ __html: modalDescription }} />
// // // //           </Col>
// // // //         </Row>
// // // //       </div>

// // // //       {/* Main Content */}
// // // //       <div className="container-wrap">
// // // //         <Container className="mar-48" id="portfolio">
// // // //           <h1>{t("portfolio.header")}</h1>
// // // //           <div
// // // //             className={`text-center mb-3 ${
// // // //               dropdownShow ? "show-dropdown" : ""
// // // //             }`}
// // // //           >
// // // //             {/* Filters */}
// // // //             <Button
// // // //               variant="outline-primary"
// // // //               className={`mx-2 select-button ${
// // // //                 filter === "all" ? "active" : ""
// // // //               }`}
// // // //               onClick={() => handleFilterChange("all")}
// // // //             >
// // // //               {t("portfolio.category-first")}
// // // //             </Button>
// // // //             <Button
// // // //               variant="outline-primary"
// // // //               className={`mx-2 select-button ${
// // // //                 filter === "folders" ? "active" : ""
// // // //               }`}
// // // //               onClick={() => handleFilterChange("folders")}
// // // //             >
// // // //               {t("portfolio.category-second")}
// // // //             </Button>
// // // //             <Button
// // // //               variant="outline-primary"
// // // //               className={`mx-2 select-button ${
// // // //                 filter === "present" ? "active" : ""
// // // //               }`}
// // // //               onClick={() => handleFilterChange("present")}
// // // //             >
// // // //               {t("portfolio.category-third")}
// // // //             </Button>
// // // //             <Dropdown
// // // //               onSelect={handleFilterChange}
// // // //               onToggle={handleDropdownShow}
// // // //             >
// // // //               <Dropdown.Toggle
// // // //                 variant="primary"
// // // //                 id="dropdown-basic"
// // // //                 className={filter.startsWith("order-") ? "active" : ""}
// // // //               >
// // // //                 {t("portfolio.category-fourth")}
// // // //               </Dropdown.Toggle>

// // // //               <Dropdown.Menu>
// // // //                 <Dropdown.Item eventKey="order-all">
// // // //                   {t("portfolio.fourth-all")}
// // // //                 </Dropdown.Item>
// // // //                 <Dropdown.Item eventKey="order-lam">
// // // //                   {t("portfolio.fourth-lam")}
// // // //                 </Dropdown.Item>
// // // //                 <Dropdown.Item eventKey="order-craft">
// // // //                   {t("portfolio.fourth-craft")}
// // // //                 </Dropdown.Item>
// // // //                 <Dropdown.Item eventKey="order-cardboard">
// // // //                   {t("portfolio.fourth-cardboard")}
// // // //                 </Dropdown.Item>
// // // //                 <Dropdown.Item eventKey="order-tys">
// // // //                   {t("portfolio.fourth-tys")}
// // // //                 </Dropdown.Item>
// // // //                 <Dropdown.Item eventKey="order-design">
// // // //                   {t("portfolio.fourth-design")}
// // // //                 </Dropdown.Item>
// // // //                 <Dropdown.Item eventKey="order-uf">
// // // //                   {t("portfolio.fourth-uf")}
// // // //                 </Dropdown.Item>
// // // //               </Dropdown.Menu>
// // // //             </Dropdown>
// // // //           </div>

// // // //           {/* Image Gallery */}
// // // //           <div className="portfolio">
// // // //             {filteredImages.map((image, index) => (
// // // //               <div className="pics" key={index}>
// // // //                 <img
// // // //                   src={image.src}
// // // //                   alt={`Example of the package ${index}`}
// // // //                   className="img-fluid"
// // // //                   onClick={() => handleModalOpen(image)}
// // // //                 />
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         </Container>
// // // //       </div>
// // // //     </>
// // // //   );
// // // // }

// // // // const filterImages = (images, filter) => {
// // // //   return images.filter(image => {
// // // //     switch (filter) {
// // // //       case "all":
// // // //         return true;
// // // //       case "order-all":
// // // //         return image.category.some(category => category.startsWith("order-"));
// // // //       default:
// // // //         return image.category.includes(filter);
// // // //     }
// // // //   });
// // // // };

// // // import React, { useEffect, useState } from "react";
// // // import { Dropdown, Container, Row, Col, Button } from "react-bootstrap";
// // // import { useTranslation } from "react-i18next";
// // // import { getProduct } from "../../API/adminApi";
// // // import "bootstrap/dist/css/bootstrap.min.css";
// // // import "../Standard-Component-style.css";
// // // import "./Portfolio.css";

// // // export default function Portfolio() {
// // //   const { t } = useTranslation("global");
// // //   const [filter, setFilter] = useState("all");
// // //   const [showModal, setShowModal] = useState(false);
// // //   const [modalImage, setModalImage] = useState(null);
// // //   const [modalDescription, setModalDescription] = useState("");
// // //   const [dropdownShow, setDropdownShow] = useState(false);
// // //   const [products, setProducts] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState("");

// // //   useEffect(() => {
// // //     const fetchProducts = async () => {
// // //       setLoading(true);
// // //       try {
// // //         const { data } = await getProduct();
// // //         setProducts(data.reverse());
// // //       } catch (err) {
// // //         setError("Failed to load products");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchProducts();
// // //   }, []);

// // //   const handleFilterChange = filterOption => {
// // //     setFilter(filterOption);
// // //   };

// // //   const handleModalOpen = image => {
// // //     setModalImage(image.imageUrl);
// // //     setModalDescription(image.description.ua);
// // //     setShowModal(true);
// // //   };

// // //   const handleModalClose = event => {
// // //     if (
// // //       event.target.tagName !== "IMG" &&
// // //       event.target.tagName !== "PRE" &&
// // //       event.target.tagName !== "H3" &&
// // //       event.target.tagName !== "P" &&
// // //       event.target.tagName !== "A" &&
// // //       event.target.tagName !== "B" &&
// // //       !event.target.classList.contains("model-item")
// // //     ) {
// // //       setShowModal(false);
// // //     }
// // //   };

// // //   const handleDropdownShow = isOpen => {
// // //     setDropdownShow(isOpen);
// // //   };

// // //   const filteredImages = filterProducts(products, filter);

// // //   if (loading) return <p>Loading...</p>;
// // //   if (error) return <p style={{ color: "red" }}>{error}</p>;

// // //   return (
// // //     <>
// // //       {/* Modal */}
// // //       <div
// // //         className={`model ${showModal ? "open" : ""}`}
// // //         onClick={handleModalClose}
// // //       >
// // //         <Row>
// // //           <button
// // //             className="modal-close-button"
// // //             onClick={() => {
// // //               setShowModal(false);
// // //             }}
// // //           >
// // //             X
// // //           </button>
// // //         </Row>
// // //         <Row className="model-wrap">
// // //           <Col sm className="model-item">
// // //             <img src={modalImage} alt="" />
// // //           </Col>
// // //           <Col sm className="model-item">
// // //             <pre dangerouslySetInnerHTML={{ __html: modalDescription }} />
// // //           </Col>
// // //         </Row>
// // //       </div>

// // //       {/* Main Content */}
// // //       <div className="container-wrap">
// // //         <Container className="mar-48" id="portfolio">
// // //           <h1>{t("portfolio.header")}</h1>
// // //           <div
// // //             className={`text-center mb-3 ${
// // //               dropdownShow ? "show-dropdown" : ""
// // //             }`}
// // //           >
// // //             {/* Filters */}
// // //             <Button
// // //               variant="outline-primary"
// // //               className={`mx-2 select-button ${
// // //                 filter === "all" ? "active" : ""
// // //               }`}
// // //               onClick={() => handleFilterChange("all")}
// // //             >
// // //               {t("portfolio.category-first")}
// // //             </Button>
// // //             <Button
// // //               variant="outline-primary"
// // //               className={`mx-2 select-button ${
// // //                 filter === "folders" ? "active" : ""
// // //               }`}
// // //               onClick={() => handleFilterChange("folders")}
// // //             >
// // //               {t("portfolio.category-second")}
// // //             </Button>
// // //             <Button
// // //               variant="outline-primary"
// // //               className={`mx-2 select-button ${
// // //                 filter === "present" ? "active" : ""
// // //               }`}
// // //               onClick={() => handleFilterChange("present")}
// // //             >
// // //               {t("portfolio.category-third")}
// // //             </Button>
// // //             <Dropdown
// // //               onSelect={handleFilterChange}
// // //               onToggle={handleDropdownShow}
// // //             >
// // //               <Dropdown.Toggle
// // //                 variant="primary"
// // //                 id="dropdown-basic"
// // //                 className={filter.startsWith("order-") ? "active" : ""}
// // //               >
// // //                 {t("portfolio.category-fourth")}
// // //               </Dropdown.Toggle>

// // //               <Dropdown.Menu>
// // //                 <Dropdown.Item eventKey="order-all">
// // //                   {t("portfolio.fourth-all")}
// // //                 </Dropdown.Item>
// // //                 <Dropdown.Item eventKey="order-lam">
// // //                   {t("portfolio.fourth-lam")}
// // //                 </Dropdown.Item>
// // //                 <Dropdown.Item eventKey="order-craft">
// // //                   {t("portfolio.fourth-craft")}
// // //                 </Dropdown.Item>
// // //                 <Dropdown.Item eventKey="order-cardboard">
// // //                   {t("portfolio.fourth-cardboard")}
// // //                 </Dropdown.Item>
// // //                 <Dropdown.Item eventKey="order-tys">
// // //                   {t("portfolio.fourth-tys")}
// // //                 </Dropdown.Item>
// // //                 <Dropdown.Item eventKey="order-design">
// // //                   {t("portfolio.fourth-design")}
// // //                 </Dropdown.Item>
// // //                 <Dropdown.Item eventKey="order-uf">
// // //                   {t("portfolio.fourth-uf")}
// // //                 </Dropdown.Item>
// // //               </Dropdown.Menu>
// // //             </Dropdown>
// // //           </div>

// // //           {/* Image Gallery */}
// // //           <div className="portfolio">
// // //             {filteredImages.map((product, index) => (
// // //               <div className="pics" key={product._id}>
// // //                 <img
// // //                   src={product.imageUrl}
// // //                   alt={`Example of the package ${index}`}
// // //                   className="img-fluid"
// // //                   onClick={() => handleModalOpen(product)}
// // //                 />
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </Container>
// // //       </div>
// // //     </>
// // //   );
// // // }

// // // const filterProducts = (products, filter) => {
// // //   return products.filter(product => {
// // //     switch (filter) {
// // //       case "all":
// // //         return true;
// // //       case "order-all":
// // //         return product.category.some(category => category.startsWith("order-"));
// // //       default:
// // //         return product.category.includes(filter);
// // //     }
// // //   });
// // // };

// // import React, { useEffect, useState } from "react";
// // import { Dropdown, Container, Row, Col, Button } from "react-bootstrap";
// // import { useTranslation } from "react-i18next";
// // import { getProduct } from "../../API/adminApi";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import "../Standard-Component-style.css";
// // import "./Portfolio.css";

// // export default function Portfolio() {
// //   const { t, i18n } = useTranslation("global"); // Include i18n
// //   const [filter, setFilter] = useState("all");
// //   const [showModal, setShowModal] = useState(false);
// //   const [modalImage, setModalImage] = useState(null);
// //   const [modalDescription, setModalDescription] = useState("");
// //   const [dropdownShow, setDropdownShow] = useState(false);
// //   const [products, setProducts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     const fetchProducts = async () => {
// //       setLoading(true);
// //       try {
// //         const { data } = await getProduct();
// //         setProducts(data.reverse());
// //       } catch (err) {
// //         setError("Failed to load products");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchProducts();
// //   }, []);

// //   const handleFilterChange = filterOption => {
// //     setFilter(filterOption);
// //   };

// //   const handleModalOpen = image => {
// //     setModalImage(image.imageUrl);

// //     // Get the current language
// //     const currentLang = i18n.language;

// //     // Set modal description based on the current language
// //     if (currentLang === "ua") {
// //       setModalDescription(image.description.ua);
// //     } else if (currentLang === "ru") {
// //       setModalDescription(image.description.ru);
// //     } else {
// //       setModalDescription(image.description.en);
// //     }

// //     setShowModal(true);
// //   };

// //   const handleModalClose = event => {
// //     if (
// //       event.target.tagName !== "IMG" &&
// //       event.target.tagName !== "PRE" &&
// //       event.target.tagName !== "H3" &&
// //       event.target.tagName !== "P" &&
// //       event.target.tagName !== "A" &&
// //       event.target.tagName !== "B" &&
// //       !event.target.classList.contains("model-item")
// //     ) {
// //       setShowModal(false);
// //     }
// //   };

// //   const handleDropdownShow = isOpen => {
// //     setDropdownShow(isOpen);
// //   };

// //   const filteredImages = filterProducts(products, filter);
// //   // console.log(products);

// //   if (loading) return <p>Loading...</p>;
// //   if (error) return <p style={{ color: "red" }}>{error}</p>;

// //   return (
// //     <>
// //       {/* Modal */}
// //       <div
// //         className={`model ${showModal ? "open" : ""}`}
// //         onClick={handleModalClose}
// //       >
// //         <Row>
// //           <button
// //             className="modal-close-button"
// //             onClick={() => {
// //               setShowModal(false);
// //             }}
// //           >
// //             X
// //           </button>
// //         </Row>
// //         <Row className="model-wrap">
// //           <Col sm className="model-item">
// //             <img src={modalImage} alt="" />
// //           </Col>
// //           <Col sm className="model-item">
// //             <pre dangerouslySetInnerHTML={{ __html: modalDescription }} />
// //           </Col>
// //         </Row>
// //       </div>

// //       {/* Main Content */}
// //       <div className="container-wrap">
// //         <Container className="mar-48" id="portfolio">
// //           <h1>{t("portfolio.header")}</h1>
// //           <div
// //             className={`text-center mb-3 ${
// //               dropdownShow ? "show-dropdown" : ""
// //             }`}
// //           >
// //             {/* Filters */}
// //             <Button
// //               variant="outline-primary"
// //               className={`mx-2 select-button ${
// //                 filter === "all" ? "active" : ""
// //               }`}
// //               onClick={() => handleFilterChange("all")}
// //             >
// //               {t("portfolio.category-first")}
// //             </Button>
// //             <Button
// //               variant="outline-primary"
// //               className={`mx-2 select-button ${
// //                 filter === "folders" ? "active" : ""
// //               }`}
// //               onClick={() => handleFilterChange("folders")}
// //             >
// //               {t("portfolio.category-second")}
// //             </Button>
// //             <Button
// //               variant="outline-primary"
// //               className={`mx-2 select-button ${
// //                 filter === "present" ? "active" : ""
// //               }`}
// //               onClick={() => handleFilterChange("present")}
// //             >
// //               {t("portfolio.category-third")}
// //             </Button>
// //             <Dropdown
// //               onSelect={handleFilterChange}
// //               onToggle={handleDropdownShow}
// //             >
// //               <Dropdown.Toggle
// //                 variant="primary"
// //                 id="dropdown-basic"
// //                 className={filter.startsWith("order-") ? "active" : ""}
// //               >
// //                 {t("portfolio.category-fourth")}
// //               </Dropdown.Toggle>

// //               <Dropdown.Menu>
// //                 <Dropdown.Item eventKey="order-all">
// //                   {t("portfolio.fourth-all")}
// //                 </Dropdown.Item>
// //                 <Dropdown.Item eventKey="order-lam">
// //                   {t("portfolio.fourth-lam")}
// //                 </Dropdown.Item>
// //                 <Dropdown.Item eventKey="order-craft">
// //                   {t("portfolio.fourth-craft")}
// //                 </Dropdown.Item>
// //                 <Dropdown.Item eventKey="order-cardboard">
// //                   {t("portfolio.fourth-cardboard")}
// //                 </Dropdown.Item>
// //                 <Dropdown.Item eventKey="order-tys">
// //                   {t("portfolio.fourth-tys")}
// //                 </Dropdown.Item>
// //                 <Dropdown.Item eventKey="order-design">
// //                   {t("portfolio.fourth-design")}
// //                 </Dropdown.Item>
// //                 <Dropdown.Item eventKey="order-uf">
// //                   {t("portfolio.fourth-uf")}
// //                 </Dropdown.Item>
// //               </Dropdown.Menu>
// //             </Dropdown>
// //           </div>

// //           {/* Image Gallery */}
// //           <div className="portfolio">
// //             {filteredImages.map((product, index) => (
// //               <div className="pics" key={product._id}>
// //                 <img
// //                   src={product.imageUrl}
// //                   alt={`Example of the package ${index}`}
// //                   className="img-fluid"
// //                   onClick={() => handleModalOpen(product)}
// //                 />
// //               </div>
// //             ))}
// //           </div>
// //         </Container>
// //       </div>
// //     </>
// //   );
// // }

// // const filterProducts = (products, filter) => {
// //   return products.filter(product => {
// //     switch (filter) {
// //       case "all":
// //         return true;
// //       case "order-all":
// //         return product.category.some(category => category.startsWith("order-"));
// //       default:
// //         return product.category.includes(filter);
// //     }
// //   });
// // };

// import React, { useEffect, useState } from "react";
// import { Dropdown, Container, Row, Col, Button } from "react-bootstrap";
// import { useTranslation } from "react-i18next";
// import { getProduct } from "../../API/adminApi";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../Standard-Component-style.css";
// import "./Portfolio.css";

// export default function Portfolio() {
//   const { t, i18n } = useTranslation("global");
//   const [filters, setFilters] = useState([]); // Масив для фільтрів
//   const [showModal, setShowModal] = useState(false);
//   const [modalImage, setModalImage] = useState(null);
//   const [modalDescription, setModalDescription] = useState("");
//   const [dropdownShow, setDropdownShow] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const { data } = await getProduct();
//         setProducts(data.reverse());
//       } catch (err) {
//         setError("Failed to load products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Оновлення фільтрів при виборі
//   const handleFilterChange = filterOption => {
//     if (filters.includes(filterOption)) {
//       // Якщо фільтр вже вибраний, видалити його
//       setFilters(filters.filter(f => f !== filterOption));
//     } else {
//       // Додати новий фільтр
//       setFilters([...filters, filterOption]);
//     }
//   };

//   const handleModalOpen = image => {
//     setModalImage(image.imageUrl);

//     const currentLang = i18n.language;

//     if (currentLang === "ua") {
//       setModalDescription(image.description.ua);
//     } else if (currentLang === "ru") {
//       setModalDescription(image.description.ru);
//     } else {
//       setModalDescription(image.description.en);
//     }

//     setShowModal(true);
//   };

//   const handleModalClose = event => {
//     if (
//       event.target.tagName !== "IMG" &&
//       event.target.tagName !== "PRE" &&
//       event.target.tagName !== "H3" &&
//       event.target.tagName !== "P" &&
//       event.target.tagName !== "A" &&
//       event.target.tagName !== "B" &&
//       !event.target.classList.contains("model-item")
//     ) {
//       setShowModal(false);
//     }
//   };

//   const handleDropdownShow = isOpen => {
//     setDropdownShow(isOpen);
//   };

//   // const filterProducts = (products, filter) => {
//   //   return products.filter(image => {
//   //     switch (filter) {
//   //       case "all":
//   //         return true;
//   //       case "order-all":
//   //         return image.category.some(category => category.startsWith("order-"));
//   //       default:
//   //         return image.category.includes(filter);
//   //     }
//   //   });
//   // };
//   const filterProducts = (products, filters) => {
//     if (filters.includes("all")) {
//       return products;
//     }

//     return products.filter(product => {
//       return filters.some(filter => {
//         if (filter.startsWith("order-")) {
//           return product.category.some(category => category.startsWith(filter));
//         }
//         return product.category.includes(filter);
//       });
//     });
//   };

//   const filteredImages = filterProducts(products, filters);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <>
//       {/* Modal */}
//       <div
//         className={`model ${showModal ? "open" : ""}`}
//         onClick={handleModalClose}
//       >
//         <Row>
//           <button
//             className="modal-close-button"
//             onClick={() => {
//               setShowModal(false);
//             }}
//           >
//             X
//           </button>
//         </Row>
//         <Row className="model-wrap">
//           <Col sm className="model-item">
//             <img src={modalImage} alt="" />
//           </Col>
//           <Col sm className="model-item">
//             <pre dangerouslySetInnerHTML={{ __html: modalDescription }} />
//           </Col>
//         </Row>
//       </div>

//       {/* Main Content */}
//       <div className="container-wrap">
//         <Container className="mar-48" id="portfolio">
//           <h1>{t("portfolio.header")}</h1>
//           <div
//             className={`text-center mb-3 ${
//               dropdownShow ? "show-dropdown" : ""
//             }`}
//           >
//             {/* Filters */}
//             <Button
//               variant="outline-primary"
//               className={`mx-2 select-button ${
//                 filters.includes("all") ? "active" : ""
//               }`}
//               onClick={() => handleFilterChange("all")}
//             >
//               {t("portfolio.category-first")}
//             </Button>
//             <Button
//               variant="outline-primary"
//               className={`mx-2 select-button ${
//                 filters.includes("folders") ? "active" : ""
//               }`}
//               onClick={() => handleFilterChange("folder")}
//             >
//               {t("portfolio.category-second")}
//             </Button>
//             <Button
//               variant="outline-primary"
//               className={`mx-2 select-button ${
//                 filters.includes("present") ? "active" : ""
//               }`}
//               onClick={() => handleFilterChange("present")}
//             >
//               {t("portfolio.category-third")}
//             </Button>
//             <Dropdown
//               onSelect={handleFilterChange}
//               onToggle={handleDropdownShow}
//             >
//               <Dropdown.Toggle
//                 variant="primary"
//                 id="dropdown-basic"
//                 className={
//                   filters.some(f => f.startsWith("order-")) ? "active" : ""
//                 }
//               >
//                 {t("portfolio.category-fourth")}
//               </Dropdown.Toggle>

//               <Dropdown.Menu>
//                 <Dropdown.Item eventKey="order-all">
//                   {t("portfolio.fourth-all")}
//                 </Dropdown.Item>
//                 <Dropdown.Item eventKey="order-lam">
//                   {t("portfolio.fourth-lam")}
//                 </Dropdown.Item>
//                 <Dropdown.Item eventKey="order-craft">
//                   {t("portfolio.fourth-craft")}
//                 </Dropdown.Item>
//                 <Dropdown.Item eventKey="order-cardboard">
//                   {t("portfolio.fourth-cardboard")}
//                 </Dropdown.Item>
//                 <Dropdown.Item eventKey="order-tys">
//                   {t("portfolio.fourth-tys")}
//                 </Dropdown.Item>
//                 <Dropdown.Item eventKey="order-design">
//                   {t("portfolio.fourth-design")}
//                 </Dropdown.Item>
//                 <Dropdown.Item eventKey="order-uf">
//                   {t("portfolio.fourth-uf")}
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           </div>

//           {/* Image Gallery */}
//           <div className="portfolio">
//             {filteredImages.map((product, index) => (
//               <div className="pics" key={product._id}>
//                 <img
//                   src={product.imageUrl}
//                   alt={`Example of the package ${index}`}
//                   className="img-fluid"
//                   onClick={() => handleModalOpen(product)}
//                 />
//               </div>
//             ))}
//           </div>
//         </Container>
//       </div>
//     </>
//   );
// }

// // Оновлена функція для фільтрації продуктів
// // const filterProducts = (products, filters) => {
// //   if (filters.includes("all")) {
// //     return products;
// //   }

// //   return products.filter(product => {
// //     return filters.some(filter => {
// //       if (filter.startsWith("order-")) {
// //         return product.category.some(category => category.startsWith(filter));
// //       }
// //       return product.category.includes(filter);
// //     });
// //   });
// // };

import React, { useEffect, useState } from "react";
import { Dropdown, Container, Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { getProduct } from "../../API/adminApi";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Standard-Component-style.css";
import "./Portfolio.css";

export default function Portfolio() {
  const { t, i18n } = useTranslation("global");
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [modalDescription, setModalDescription] = useState("");
  const [dropdownShow, setDropdownShow] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state for fetching products
  const [error, setError] = useState(""); // State for any potential errors

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await getProduct(); // Call the API to get products
        setProducts(data); // Set the fetched products to state
      } catch (err) {
        setError("Failed to load products"); // Handle errors
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProducts(); // Fetch products when the component mounts
  }, []);

  const handleFilterChange = filterOption => {
    setFilter(filterOption);
  };

  const handleModalOpen = product => {
    const currentLang = i18n.language;
    setModalImage(product.imageUrl); // Set the image URL
    // Set the modal description based on the current language
    // const { description } = product;
    if (currentLang === "ua") {
      setModalDescription(product.description.ua);
    } else if (currentLang === "ru") {
      setModalDescription(product.description.ru);
    } else {
      setModalDescription(product.description.en);
    }
    // setModalDescription(description[currentLang] || description.en); // Default to English if the language key is not found
    setShowModal(true);
  };

  const handleModalClose = event => {
    if (!event.target.classList.contains("model-item")) {
      setShowModal(false);
    }
  };

  const handleDropdownShow = isOpen => {
    setDropdownShow(isOpen);
  };

  // Filter products based on the selected filter
  const filteredProducts = filterImages(products, filter);
  console.log(products);

  if (loading) return <p>Loading...</p>; // Show loading message
  if (error) return <p style={{ color: "red" }}>{error}</p>; // Show error message

  return (
    <>
      {/* Modal */}
      <div
        className={`model ${showModal ? "open" : ""}`}
        onClick={handleModalClose}
      >
        <Row>
          <button
            className="modal-close-button"
            onClick={() => {
              setShowModal(false);
            }}
          >
            X
          </button>
        </Row>
        <Row className="model-wrap">
          <Col sm className="model-item">
            <img src={modalImage} alt="" />
          </Col>
          <Col sm className="model-item">
            <pre dangerouslySetInnerHTML={{ __html: modalDescription }} />
          </Col>
        </Row>
      </div>

      {/* Main Content */}
      <div className="container-wrap">
        <Container className="mar-48" id="portfolio">
          <h1>{t("portfolio.header")}</h1>
          <div
            className={`text-center mb-3 ${dropdownShow ? "show-dropdown" : ""}`}
          >
            {/* Filters */}
            <Button
              variant="outline-primary"
              className={`mx-2 select-button ${filter === "all" ? "active" : ""}`}
              onClick={() => handleFilterChange("all")}
            >
              {t("portfolio.category-first")}
            </Button>
            <Button
              variant="outline-primary"
              className={`mx-2 select-button ${filter === "folder" ? "active" : ""}`}
              onClick={() => handleFilterChange("folder")}
            >
              {t("portfolio.category-second")}
            </Button>
            <Button
              variant="outline-primary"
              className={`mx-2 select-button ${filter === "present" ? "active" : ""}`}
              onClick={() => handleFilterChange("present")}
            >
              {t("portfolio.category-third")}
            </Button>
            <Dropdown
              onSelect={handleFilterChange}
              onToggle={handleDropdownShow}
            >
              <Dropdown.Toggle
                variant="primary"
                id="dropdown-basic"
                className={filter.startsWith("order-") ? "active" : ""}
              >
                {t("portfolio.category-fourth")}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="order-all">
                  {t("portfolio.fourth-all")}
                </Dropdown.Item>
                <Dropdown.Item eventKey="order-lam">
                  {t("portfolio.fourth-lam")}
                </Dropdown.Item>
                <Dropdown.Item eventKey="order-craft">
                  {t("portfolio.fourth-craft")}
                </Dropdown.Item>
                <Dropdown.Item eventKey="order-cardboard">
                  {t("portfolio.fourth-cardboard")}
                </Dropdown.Item>
                <Dropdown.Item eventKey="order-tys">
                  {t("portfolio.fourth-tys")}
                </Dropdown.Item>
                <Dropdown.Item eventKey="order-design">
                  {t("portfolio.fourth-design")}
                </Dropdown.Item>
                <Dropdown.Item eventKey="order-uf">
                  {t("portfolio.fourth-uf")}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {/* Image Gallery */}
          <div className="portfolio">
            {filteredProducts.map((product, index) => (
              <div className="pics" key={index}>
                <img
                  src={product.imageUrl}
                  alt={`Example of the package ${index}`}
                  className="img-fluid"
                  onClick={() => handleModalOpen(product)}
                />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}

const filterImages = (products, filter) => {
  return products.filter(product => {
    switch (filter) {
      case "all":
        return true;
      case "order-all":
        return product.category.some(category => category.startsWith("order-"));
      default:
        return product.category.includes(filter);
    }
  });
};
