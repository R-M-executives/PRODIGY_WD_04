const menuIcon = document.getElementById("menu-icon");
const navbar = document.querySelector(".navbar");
const progressBar = document.querySelector(".progress-bar");
const scrollTop = document.getElementById("scrollTop");
const navLinks = document.querySelectorAll(".navbar a");
const header = document.getElementById("header");
const sections = document.querySelectorAll("section");

menuIcon.addEventListener("click", () => {
    navbar.classList.toggle("active");
    menuIcon.classList.toggle("fa-xmark");
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {

        navbar.classList.remove("active");
        menuIcon.classList.remove("fa-xmark");

        navLinks.forEach(item => item.classList.remove("active"));

        link.classList.add("active");
    });
});

window.addEventListener("scroll", () => {

    const scrollY = window.scrollY;

    const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    progressBar.style.width = (scrollY / height) * 100 + "%";

    if (scrollY > 100) {
        header.style.background = "rgba(7,11,23,.95)";
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.35)";
    } else {
        header.style.background = "rgba(7,11,23,.82)";
        header.style.boxShadow = "none";
    }

    if (scrollY > 500) {
        scrollTop.classList.add("show");
    } else {
        scrollTop.classList.remove("show");
    }

    let currentSection = "";

    sections.forEach(section => {

        const top = section.offsetTop - 120;
        const bottom = top + section.offsetHeight;

        if (scrollY >= top && scrollY < bottom) {
            currentSection = section.id;
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }

    });

});

scrollTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    },
    {
        threshold: 0.15
    }
);

document.querySelectorAll(".skill-card,.timeline-item,.education-card,.stat-card,.project-card,.achievement-card,.contact-box,.contact-form,.about-image,.about-content").forEach(el => {

    el.classList.add("fade-up");

    observer.observe(el);

});

const words = [
    "Software Developer",
    "Full Stack Developer",
    "AI/ML Enthusiast",
    "Cloud Computing Learner"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const typing = document.getElementById("typing-text");

function typeEffect() {

    const current = words[wordIndex];

    if (!deleting) {

        typing.textContent = current.substring(0, charIndex++);

        if (charIndex > current.length) {

            deleting = true;

            setTimeout(typeEffect, 1200);

            return;
        }

    } else {

        typing.textContent = current.substring(0, charIndex--);

        if (charIndex === 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {
                wordIndex = 0;
            }

        }

    }

    setTimeout(typeEffect, deleting ? 60 : 120);

}

typeEffect();

const contactForm = document.querySelector(".contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", e => {

        e.preventDefault();

        const button = e.target.querySelector("button");

        button.innerHTML = "Message Sent ✓";

        button.style.background =
            "linear-gradient(135deg,#16a34a,#22c55e)";

        setTimeout(() => {

            button.innerHTML = "Send Message";

            button.style.background =
                "linear-gradient(135deg,#2563eb,#38bdf8)";

            e.target.reset();

        }, 2500);

    });

}
