const pages = document.querySelectorAll(".page");
const backBtn = document.getElementById("backBtn");
const startBtn = document.getElementById("startBtn");
const videoBadge = document.getElementById("videoBadge");

let incentiveEnd = new Date("2026-06-01T23:59:59");

function showPage(id) {
    pages.forEach(p => p.classList.remove("active"));
    document.getElementById("page-" + id).classList.add("active");

    if (id !== "start") {
        document.getElementById("topbar").classList.remove("hidden");
    } else {
        document.getElementById("topbar").classList.add("hidden");
    }
}

document.querySelectorAll("[data-page]").forEach(btn => {
    btn.addEventListener("click", () => showPage(btn.dataset.page));
});

backBtn.addEventListener("click", () => showPage("home"));

startBtn.addEventListener("click", () => {
    showPage("home");
});

function updateCountdown() {
    let now = new Date();
    let diff = incentiveEnd - now;

    if (diff <= 0) {
        document.getElementById("countdown").innerText = "Incentive afgelopen";
        return;
    }

    let days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 1) {
        document.getElementById("countdown").innerText = `Nog ${days} dagen`;
    } else {
        let hours = Math.floor(diff / (1000 * 60 * 60));
        if (hours >= 1) {
            document.getElementById("countdown").innerText = `Nog ${hours} uur`;
        } else {
            let minutes = Math.floor(diff / (1000 * 60));
            document.getElementById("countdown").innerText = `Nog ${minutes} minuten`;
        }
    }
}

setInterval(updateCountdown, 60000);
updateCountdown();

function checkVideoBadge() {
    let unseen = localStorage.getItem("newVideos");
    if (unseen === "true") {
        videoBadge.innerText = "NIEUW";
    }
}

checkVideoBadge();
