function manageModal(modalSelector, button) {
  const body = document.body;

  // Show functionality
  const modal = document.querySelector(modalSelector);
  button.addEventListener("click", () => {
    body.style.overflow = "hidden"; // Prevent scrolling

    modal.showModal();
  });

  // Close functionality
  function closeModal() {
    body.style.overflow = "auto"; // Allow scrolling

    modal.close();
  }

  const closeImg = document.querySelector(".close");
  closeImg.addEventListener("click", function () {
    closeModal();
  });
  closeImg.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      closeModal();
    }
  });

  modal.addEventListener("click", (e) => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      closeModal();
    }
  });
}

export default manageModal;
