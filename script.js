document.addEventListener("DOMContentLoaded", () => {
    const revealItems = document.querySelectorAll(".reveal");
    const navLinks = document.querySelectorAll(".nav-links a");
    const navToggle = document.querySelector(".nav-toggle");
    const topbar = document.querySelector(".topbar");
    const sections = Array.from(document.querySelectorAll("main section[id]"));

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.14
        });

        revealItems.forEach((item) => revealObserver.observe(item));

        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                const id = entry.target.getAttribute("id");
                navLinks.forEach((link) => {
                    link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
                });
            });
        }, {
            rootMargin: "-35% 0px -45% 0px",
            threshold: 0.01
        });

        sections.forEach((section) => navObserver.observe(section));
    } else {
        revealItems.forEach((item) => item.classList.add("is-visible"));
    }

    if (navToggle && topbar) {
        navToggle.addEventListener("click", () => {
            const isOpen = topbar.classList.toggle("is-open");
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                topbar.classList.remove("is-open");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });
    }
});
