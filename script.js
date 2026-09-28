// ── MOBILE NAV ─────────────────────────────────────────────────────────────

window.addEventListener('scroll', () => {
  document.getElementById('Uninav').classList.toggle('scrolled', window.scrollY > 20);
});

function toggleMobile() {
  document.getElementById('Burg-menu').classList.toggle('open');
}
function closeMobile() {
  document.getElementById('Burg-menu').classList.remove('open');
}