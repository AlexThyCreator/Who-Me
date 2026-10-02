// ── MOBILE NAV ─────────────────────────────────────────────────────────────

function toggleMobile() {
  const menu = document.getElementById('Burg-menu');
  const backdrop = document.getElementById('menu-backdrop');
  const burger = document.querySelector('.burger');
  const isOpen = menu.classList.toggle('open');

  backdrop.classList.toggle('open', isOpen);
  burger.setAttribute('aria-expanded', isOpen);
  if (isOpen) lockScroll(); else unlockScroll();
}

function closeMobile() {
  document.getElementById('Burg-menu').classList.remove('open');
  document.getElementById('menu-backdrop').classList.remove('open');
  document.querySelector('.burger').setAttribute('aria-expanded', 'false');
  unlockScroll();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMobile();
});


// ── MODALS ─────────────────────────────────────────────────────────────────

function lockScroll() {
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
}

function unlockScroll() {
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
}

// Open: any element with data-open-modal="modalId"
document.querySelectorAll('[data-open-modal]').forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = document.getElementById(btn.dataset.openModal);
    if (!modal) {
      console.warn('No modal found with id:', btn.dataset.openModal);
      return;
    }
    modal.showModal();
    lockScroll();
  });
});

// Close: any element with data-close-modal closes the dialog it's inside
document.querySelectorAll('[data-close-modal]').forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('dialog');
    if (modal) modal.close();
  });
});

document.querySelectorAll('dialog').forEach(dialog => {
  // Click on the dark backdrop closes it. Clicks on the dialog's own
  // padding or empty space are inside its box, so they are ignored.
  dialog.addEventListener('click', e => {
    if (e.target !== dialog) return;

    const box = dialog.getBoundingClientRect();
    const clickedOutside =
      e.clientX < box.left || e.clientX > box.right ||
      e.clientY < box.top  || e.clientY > box.bottom;

    if (clickedOutside) dialog.close();
  });

  // Unlock page scroll when the dialog closes (button, Escape, or backdrop)
  dialog.addEventListener('close', () => {
    if (!document.querySelector('dialog[open]')) {
      unlockScroll();
    }
  });
});


// ── REFRESH ────────────────────────────────────────────────────────────────

const refreshButton = document.getElementById('refreshButton');
if (refreshButton) {
  refreshButton.addEventListener('click', () => location.reload());
}


// ── DISABLE DRAGGING AND TEXT SELECTION ────────────────────────────────────

// 1. Mark every image and link as non-draggable
document.querySelectorAll('img, a').forEach(el => {
  el.setAttribute('draggable', 'false');
});

// 2. Block any drag from starting (images, links, selected text)
document.addEventListener('dragstart', e => e.preventDefault());

// 3. Block text selection from starting (except in inputs)
document.addEventListener('selectstart', e => {
  const t = e.target.nodeType === 1 ? e.target : e.target.parentElement;
  if (!t || !t.closest('input, textarea, [contenteditable]')) {
    e.preventDefault();
  }
});
