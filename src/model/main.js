window.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (event) => {
    const listDialog = document.querySelectorAll("[data-nano-component='model']");
    listDialog.forEach(dialog => {
      const btn = event.target.closest("[data-nano-trigger='model']");
      if (btn && dialog.id === btn.dataset.nanoTarget && btn.dataset.nanoAction === "open") {
        dialog.showModal();
      } else if (btn && dialog.id === btn.dataset.nanoTarget && btn.dataset.nanoAction === "close") {
        dialog.close();
      }
    });
  });
});