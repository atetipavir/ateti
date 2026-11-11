// ATETI FUSION 4.0

const body = document.body;
const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const splash = document.getElementById("splash");
const progressBar = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");

// Açılış ekranı: yükleme tamamlanınca güvenli şekilde kapat.
function hideSplash() {
    if (splash) splash.classList.add("hide");
}
window.addEventListener("load", function () {
    window.setTimeout(hideSplash, 900);
});
window.setTimeout(hideSplash, 3500);

// Tema tercihini hatırla.
function applyTheme(theme) {
    const isLight = theme === "light";
    body.classList.toggle("light", isLight);
    if (themeBtn) {
        themeBtn.textContent = isLight ? "☾" : "☀";
        themeBtn.setAttribute("aria-label", isLight ? "Koyu temaya geç" : "Açık temaya geç");
        themeBtn.setAttribute("aria-pressed", String(isLight));
    }
}
let savedTheme = "dark";
try { savedTheme = localStorage.getItem("ateti-theme") || "dark"; } catch (error) {}
applyTheme(savedTheme);

if (themeBtn) {
    themeBtn.addEventListener("click", function () {
        const nextTheme = body.classList.contains("light") ? "dark" : "light";
        applyTheme(nextTheme);
        try { localStorage.setItem("ateti-theme", nextTheme); } catch (error) {}
    });
}

// Mobil menü ve erişilebilirlik durumu.
function closeMenu() {
    if (!nav || !menuBtn) return;
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
}
if (menuBtn && nav) {
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.addEventListener("click", function () {
        const isOpen = nav.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", String(isOpen));
        menuBtn.setAttribute("aria-label", isOpen ? "Menüyü kapat" : "Menüyü aç");
    });
    nav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") closeMenu();
    });
}

// Proje filtreleme.
const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-card");
filters.forEach(function (button) {
    button.addEventListener("click", function () {
        filters.forEach(function (item) {
            item.classList.remove("active");
            item.setAttribute("aria-pressed", "false");
        });
        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");
        const selected = button.dataset.filter;
        projects.forEach(function (project) {
            const visible = selected === "all" || project.dataset.category === selected;
            project.hidden = !visible;
            project.style.display = visible ? "" : "none";
        });
    });
});
filters.forEach(function (button) {
    button.setAttribute("aria-pressed", String(button.classList.contains("active")));
});

// Kaydırma animasyonları; desteklenmeyen tarayıcıda içerik gizli kalmasın.
if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (element) {
        observer.observe(element);
    });
} else {
    document.querySelectorAll(".reveal").forEach(function (element) {
        element.classList.add("show");
    });
}

// Aktif bölüm, sayfa ilerleme çubuğu ve yukarı çık düğmesi.
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("#nav a[href^='#']");
function updateScrollUI() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    if (progressBar) progressBar.style.width = progress + "%";
    if (backToTop) backToTop.classList.toggle("visible", window.scrollY > 500);

    let current = "home";
    sections.forEach(function (section) {
        if (window.scrollY >= section.offsetTop - 150) current = section.id;
    });
    navLinks.forEach(function (link) {
        const active = link.getAttribute("href") === "#" + current;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
    });
}
window.addEventListener("scroll", updateScrollUI, { passive: true });
window.addEventListener("resize", updateScrollUI);
updateScrollUI();

if (backToTop) {
    backToTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// Otomatik yıl.
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

console.log("ATETI Fusion 4.0 hazır!");
