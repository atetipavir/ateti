
// ATETI FUSION 3.0

// Açılış animasyonu
window.addEventListener("load", function () {
    setTimeout(function () {
        document.getElementById("splash").classList.add("hide");
    }, 1200);
});

// Tema sistemi
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        themeBtn.textContent = "☾";
    } else {
        themeBtn.textContent = "☀";
    }
});

// Mobil menü
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", function () {
    nav.classList.toggle("open");
});

nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        nav.classList.remove("open");
    });
});

// Proje filtreleme
const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-card");

filters.forEach(function (button) {
    button.addEventListener("click", function () {

        filters.forEach(function (item) {
            item.classList.remove("active");
        });

        button.classList.add("active");

        const selected = button.dataset.filter;

        projects.forEach(function (project) {
            if (
                selected === "all" ||
                project.dataset.category === selected
            ) {
                project.style.display = "block";
            } else {
                project.style.display = "none";
            }
        });

    });
});

// Kaydırma animasyonları
const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

document.querySelectorAll(".reveal").forEach(function (element) {
    observer.observe(element);
});

// Otomatik yıl
document.getElementById("year").textContent =
    new Date().getFullYear();

console.log("ATETI Fusion 3.0 hazır!");
