document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".toggle");

  toggles.forEach(toggle => {
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const card = e.target.closest(".card");
      card.classList.toggle("active");
    });
  });
});v