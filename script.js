
/* =====================================================
   LEISI VALENCIO - CYBERSECURITY PORTFOLIO
   Interactive JavaScript
   Version 2.0
===================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    // ================================================
    // 01. ELEMENTOS PRINCIPALES
    // ================================================

    const header = document.getElementById("header");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll(".nav-link");

    const typingText = document.getElementById("typingText");
    const currentYear = document.getElementById("currentYear");

    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    const revealElements = document.querySelectorAll(".reveal");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    // ================================================
    // 02. AÑO AUTOMÁTICO
    // ================================================

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // ================================================
    // 03. MENÚ RESPONSIVE
    // ================================================

    function closeMenu() {

        if (!menuToggle || !navLinks) {
            return;
        }

        navLinks.classList.remove("open");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
    }


    function openMenu() {

        if (!menuToggle || !navLinks) {
            return;
        }

        navLinks.classList.add("open");
        menuToggle.classList.add("active");

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Cerrar menú");
    }


    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }

        });


        // Cerrar menú al seleccionar una sección.

        navItems.forEach(link => {

            link.addEventListener("click", closeMenu);

        });


        // Cerrar menú con Escape.

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        });


        // Cerrar menú al cambiar a pantalla grande.

        window.addEventListener("resize", () => {

            if (window.innerWidth > 800) {
                closeMenu();
            }

        });

    }


    // ================================================
    // 04. EFECTO DEL HEADER AL DESPLAZARSE
    // ================================================

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();


    // ================================================
    // 05. EFECTO DE ESCRITURA
    // ================================================

    if (typingText) {

        const roles = [
            "Estudiante de Ciberseguridad",
            "Software Developer",
            "Ethical Hacking Enthusiast",
            "Technology Learner"
        ];

        if (prefersReducedMotion) {

            typingText.textContent = roles[0];

        } else {

            let roleIndex = 0;
            let characterIndex = 0;
            let deleting = false;

            function typeEffect() {

                const currentRole = roles[roleIndex];

                if (!deleting) {

                    characterIndex++;

                    typingText.textContent =
                        currentRole.substring(0, characterIndex);

                    if (characterIndex === currentRole.length) {

                        deleting = true;

                        setTimeout(typeEffect, 1700);
                        return;

                    }

                    setTimeout(typeEffect, 65);

                } else {

                    characterIndex--;

                    typingText.textContent =
                        currentRole.substring(0, characterIndex);

                    if (characterIndex === 0) {

                        deleting = false;

                        roleIndex =
                            (roleIndex + 1) % roles.length;

                        setTimeout(typeEffect, 350);
                        return;

                    }

                    setTimeout(typeEffect, 32);

                }

            }

            typeEffect();

        }

    }


    // ================================================
    // 06. FILTROS DE PROYECTOS
    // ================================================

    function filterProjects(selectedCategory) {

        projectCards.forEach(card => {

            const category = card.dataset.category;

            const shouldShow =
                selectedCategory === "all" ||
                category === selectedCategory;

            if (shouldShow) {

                card.classList.remove("is-filtered-out");

            } else {

                card.classList.add("is-filtered-out");

            }

        });

    }


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const selectedCategory = button.dataset.filter;

            // Actualizar estado visual y accesible.

            filterButtons.forEach(filterButton => {

                const isActive = filterButton === button;

                filterButton.classList.toggle("active", isActive);

                filterButton.setAttribute(
                    "aria-pressed",
                    String(isActive)
                );

            });

            // Aplicar filtro.

            filterProjects(selectedCategory);

        });

    });


    // ================================================
    // 07. ANIMACIONES AL DESPLAZARSE
    // ================================================

    if (prefersReducedMotion) {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    } else if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }

        );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        // Compatibilidad con navegadores antiguos.

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    // ================================================
    // 08. IDENTIFICAR LA SECCIÓN ACTIVA
    // ================================================

    const pageSections = document.querySelectorAll(
        "main section[id]"
    );


    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        const sectionId = entry.target.id;

                        navItems.forEach(link => {

                            const isCurrent =
                                link.getAttribute("href") ===
                                `#${sectionId}`;

                            link.classList.toggle(
                                "active",
                                isCurrent
                            );

                        });

                    }

                });

            },

            {
                rootMargin: "-30% 0px -60% 0px"
            }

        );


        pageSections.forEach(section => {

            sectionObserver.observe(section);

        });

    }


    // ================================================
    // 09. SEGURIDAD Y COMPORTAMIENTO DE ENLACES
    // ================================================

    document.querySelectorAll(
        'a[target="_blank"]'
    ).forEach(link => {

        link.setAttribute("rel", "noopener noreferrer");

    });


    // ================================================
    // 10. MENSAJE DE INICIALIZACIÓN
    // ================================================

    console.info(
        "%c LEISI VALENCIO | CYBER PORTFOLIO ",
        "background:#22c55e;color:#08120b;padding:8px;font-weight:bold;"
    );

    console.info(
        "Portafolio inicializado correctamente."
    );

});
