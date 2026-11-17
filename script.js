
// ==========================================
// LENSITO CYBER PORTFOLIO
// FASE 4 - INTERACTIVIDAD
// ==========================================

// 1. MENÚ RESPONSIVE

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});


// 2. AÑO AUTOMÁTICO

document.getElementById("year").textContent =
    new Date().getFullYear();


// 3. FILTROS DINÁMICOS DE PROYECTOS

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedFilter = button.dataset.filter;

        filterButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        projectCards.forEach(card => {

            const category = card.dataset.category;

            const shouldShow =
                selectedFilter === "all" ||
                category === selectedFilter;

            card.classList.toggle("hidden", !shouldShow);

        });

    });

});


// 4. ANIMACIONES AL DESPLAZARSE

const elementsToReveal = document.querySelectorAll(
    ".section-heading, .about-card, .skill-card, " +
    ".project-card, .objective-card, .contact-card"
);

elementsToReveal.forEach(element => {
    element.classList.add("reveal");
});

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {

    const observer = new IntersectionObserver(
        (entries, observerInstance) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observerInstance.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    elementsToReveal.forEach(element => {
        observer.observe(element);
    });

} else {

    elementsToReveal.forEach(element => {
        element.classList.add("visible");
    });

}


// 5. MENSAJE DE INICIALIZACIÓN

console.info(
    "Leisi Cyber Portfolio: sistema visual inicializado correctamente."
);
