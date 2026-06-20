document.addEventListener("DOMContentLoaded", () => {
    const revealItems = document.querySelectorAll(".reveal-on-scroll");

    revealItems.forEach((item, index) => {
        item.style.transition = "opacity 0.55s ease, transform 0.55s ease";
        item.style.transitionDelay = `${index * 80}ms`;
    });

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observerRef) => {
            entries.forEach(entry => {
                if (entry.isIntersecting || entry.intersectionRatio > 0) {
                    entry.target.classList.add("visible");
                    observerRef.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
        });

        revealItems.forEach(item => observer.observe(item));
    } else {
        revealItems.forEach(item => item.classList.add("visible"));
    }

    const revealFallback = () => {
        revealItems.forEach(item => {
            if (!item.classList.contains("visible")) {
                item.classList.add("visible");
            }
        });
    };

    setTimeout(revealFallback, 500);

    const button = document.getElementById("animateButton");
    if (button) {
        button.addEventListener("click", () => {
            revealItems.forEach((item, index) => {
                item.classList.remove("visible");
                item.style.transitionDelay = `${index * 60}ms`;
                requestAnimationFrame(() => item.classList.add("visible"));
            });
        });
    }

    const title = document.querySelector(".title");
    if (title) {
        title.addEventListener("mouseenter", () => title.classList.add("title-glow"));
        title.addEventListener("mouseleave", () => title.classList.remove("title-glow"));
    }
});
