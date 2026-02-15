// Simpele navigatie & helpers

document.addEventListener('DOMContentLoaded', () => {
  // Countdown voorbeeld
  const countdownEl = document.querySelector('.countdown');
  if (countdownEl) {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 3); // Nog 3 dagen
    const updateCountdown = () => {
      const now = new Date();
      const diff = endDate - now;
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
      countdownEl.textContent = `Nog ${days} dagen`;
    };
    updateCountdown();
    setInterval(updateCountdown, 1000 * 60 * 60); // update elk uur
  }

  // Startknop redirect
  const startBtn = document.querySelector('.start-button');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }

  // Back button functionaliteit (optioneel fallback)
  const backBtn = document.querySelector('.back-button');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      window.history.back();
    });
  }
});
