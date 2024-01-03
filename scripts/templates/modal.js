// Control the functionalities of a specified modal
function manageModal(modal, element, closeButton) {
  const body = document.body;

  // Show functionality
  element.addEventListener("click", () => {
    body.style.overflow = "hidden"; // Prevent scrolling

    modal.showModal();
  });

  // Close functionality
  function closeModal() {
    body.style.overflow = "auto"; // Allow scrolling

    modal.close();
  }

  closeButton.addEventListener("click", function () {
    closeModal();
  });
  closeButton.addEventListener("keydown", function (e) {
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
