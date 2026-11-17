
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Menú de navegación para móviles
menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Cerrar el menú al seleccionar una sección
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});

// Actualizar automáticamente el año
document.getElementById("year").textContent =
    new Date().getFullYear();
