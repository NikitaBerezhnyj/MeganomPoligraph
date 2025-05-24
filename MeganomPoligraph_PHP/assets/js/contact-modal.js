function showContactModal() {
  const modal = document.getElementById("contact-modal");
  if (modal) {
    modal.style.display = "block";
  }
}

function closeContactModal() {
  const modal = document.getElementById("contact-modal");
  if (modal) {
    modal.style.display = "none";
  }
}

function scrollToContact() {
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.scrollIntoView({ behavior: "smooth" });
  }
}

window.onclick = function (event) {
  const formModal = document.querySelector(".contact-modal");
  if (formModal && event.target === formModal) {
    closeContactModal();
  }
};
