
/* ====== Galeria Coverflow (patch 2 – âncora central) ====== */
(function () {
  const $gallery = document.querySelector("[data-gallery]");
  if (!$gallery) return;

  const deck = $gallery.querySelector(".deck");
  const slides = [...deck.querySelectorAll(".slide")];
  const btnPrev = $gallery.querySelector("[data-prev]");
  const btnNext = $gallery.querySelector("[data-next]");

  let active = 0;

  function cssVar(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }

  function positionSlides() {
    const gap = parseFloat(cssVar('--gap'));
    const tilt = parseFloat(cssVar('--tilt'));
    const scaleStep = parseFloat(cssVar('--scale-step'));
    const behind = parseFloat(cssVar('--behind'));

    slides.forEach((el, i) => {
      const delta = i - active;          // 0 = destaque
      el.dataset.pos = String(delta);

      // deslocamento horizontal: a partir do centro da deck
      const translateX = delta * gap;
      const rotateY = delta === 0 ? 0 : (delta > 0 ? -1 : 1) * tilt;
      const scale = 1 - Math.min(Math.abs(delta) * scaleStep, .6);
      const translateZ = delta === 0 ? 0 : behind * Math.min(Math.abs(delta), 2);

      el.style.transform = `translateX(-50%) translateX(${translateX}px) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`;
      el.style.zIndex = String(100 - Math.abs(delta));
      el.style.opacity = Math.abs(delta) > 3 ? 0 : 1;
    });

    btnPrev.disabled = (active <= 0);
    btnNext.disabled = (active >= slides.length - 1);
  }

  function go(n) {
    active = Math.max(0, Math.min(slides.length - 1, n));
    positionSlides();
  }

  btnPrev.addEventListener("click", () => go(active - 1));
  btnNext.addEventListener("click", () => go(active + 1));

  // Arraste / swipe
  let startX = 0, dragging = false;
  const onDown = (x) => { dragging = true; startX = x; };
  const onMove = (x) => {
    if (!dragging) return;
    const dx = x - startX;
    if (Math.abs(dx) > 50) {
      dragging = false;
      dx < 0 ? go(active + 1) : go(active - 1);
    }
  };
  const onUp = () => dragging = false;

  deck.addEventListener("mousedown", e => onDown(e.clientX));
  deck.addEventListener("mousemove", e => onMove(e.clientX));
  window.addEventListener("mouseup", onUp);

  deck.addEventListener("touchstart", e => onDown(e.touches[0].clientX), {passive:true});
  deck.addEventListener("touchmove", e => onMove(e.touches[0].clientX), {passive:true});
  deck.addEventListener("touchend", onUp);

  positionSlides();
})();
