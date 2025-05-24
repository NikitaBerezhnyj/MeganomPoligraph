"use strict";

function validateForm(form) {
  const name = form.querySelector("#name");
  const mail = form.querySelector("#mail");
  const phone = form.querySelector("#phone");
  const message = form.querySelector("#message");
  let isValid = true;

  form.classList.remove("was-validated");

  if (!name.value.trim()) {
    name.classList.add("is-invalid");
    isValid = false;
  } else {
    name.classList.remove("is-invalid");
    name.classList.add("is-valid");
  }

  if (!message.value.trim()) {
    message.classList.add("is-invalid");
    isValid = false;
  } else {
    message.classList.remove("is-invalid");
    message.classList.add("is-valid");
  }

  if (!phone.value.trim() && !mail.value.trim()) {
    phone.classList.add("is-invalid");
    mail.classList.add("is-invalid");
    isValid = false;
  } else {
    phone.classList.remove("is-invalid");
    mail.classList.remove("is-invalid");
  }

  if (phone.value.trim() && !/^\+?3?8?(0\d{9})$/.test(phone.value)) {
    phone.classList.add("is-invalid");
    isValid = false;
  } else if (phone.value.trim()) {
    phone.classList.remove("is-invalid");
    phone.classList.add("is-valid");
  }

  if (mail.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.value)) {
    mail.classList.add("is-invalid");
    isValid = false;
  } else if (mail.value.trim()) {
    mail.classList.remove("is-invalid");
    mail.classList.add("is-valid");
  }

  if (!isValid) {
    form.classList.add("was-validated");
  }

  return isValid;
}

async function submitForm(form) {
  const resultMessage = form.querySelector(".submit-result");
  const submitButton = form.querySelector("#submit-button");
  submitButton.disabled = true;

  const formData = {
    name: form.querySelector("#name").value,
    mail: form.querySelector("#mail").value,
    phone: form.querySelector("#phone").value,
    message: form.querySelector("#message").value,
  };

  try {
    const response = await fetch("/actions/form.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    resultMessage.textContent = "";
    resultMessage.classList.remove("contact-success", "contact-error");

    if (data.status === "success") {
      resultMessage.textContent = translations.contactSuccess;
      resultMessage.classList.add("contact-success");
    } else {
      resultMessage.textContent = translations.contactError;
      resultMessage.classList.add("contact-error");
    }
    clearForm(form);
    submitButton.disabled = false;

    setTimeout(() => {
      resultMessage.textContent = "";
      resultMessage.classList.remove("contact-success", "contact-error");
    }, 5000);
  } catch (error) {
    console.error("Error:", error);
    resultMessage.textContent = translations.sendingError;
    resultMessage.classList.add("contact-error");

    submitButton.disabled = false;

    setTimeout(() => {
      resultMessage.textContent = "";
      resultMessage.classList.remove("contact-success", "contact-error");
    }, 5000);
  }
}

function clearForm(form) {
  form.reset();
  form.classList.remove("was-validated");
  form.classList.remove("need-validated");

  form.querySelectorAll(".is-invalid, .is-valid").forEach((el) => {
    el.classList.remove("is-invalid", "is-valid");
  });
}

window.addEventListener("load", function () {
  const form = document.querySelector("#contactForm.needs-validation");

  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateForm(form)) {
      submitForm(form);
    }
  });

  form.querySelectorAll("input, textarea").forEach((input) => {
    input.addEventListener("input", function () {
      if (input.value.trim()) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
      } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
      }
    });
  });
});
