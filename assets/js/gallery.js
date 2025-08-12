
// Gallery slider with buttons, swipe and robust image resolver
(function(){
  const gallery = document.querySelector('[data-gallery]');
  if(!gallery) return;

  const deck = gallery.querySelector('.deck');
  if(!deck) return;

  const slides = Array.from(deck.querySelectorAll('.slide'));
  if(!slides.length) return;

  // Robust resolver: supports raw and URL-encoded names + many extensions
  const exts = ['jpg','JPG','jpeg','JPEG','png','PNG','webp','WEBP','heic','HEIC'];
  function encodeName(n){ try{ return encodeURIComponent(n).replace(/%2F/g,'/'); } catch(e){ return n; } }
  slides.forEach(slide => {
    const img = slide.querySelector('img[data-src-base]') || slide.querySelector('img[data-src-enc]') || slide.querySelector('img');
    if(!img) return;
    const base = img.getAttribute('data-src-base') || img.getAttribute('src') || '';
    const enc  = img.getAttribute('data-src-enc') || (base ? base.replace(/assets\/images\//,'assets/images/' + encodeName(base.split('/').pop())) : '');
    const candidates = [];
    if(base){ exts.forEach(ext => { candidates.push(`${base}.${ext}`); }); }
    if(enc){  exts.forEach(ext => { candidates.push(`${enc}.${ext}`);  }); }

    let i=0;
    const tryNext = () => {
      if(i>=candidates.length){ return; }
      const url = candidates[i++];
      const probe = new Image();
      probe.onload = () => { img.src = url; };
      probe.onerror = tryNext;
      probe.src = url;
    };
    // If no src, start resolver; otherwise let browser load current.
    if(!img.getAttribute('src')) tryNext();
  });

  let current = 0;
  function update(){
    slides.forEach((s, idx) => {
      const offset = idx - current;
      s.style.transform = `translateX(calc(-50% + ${offset * 100}%))`;
      s.style.opacity = (idx === current) ? '1' : '0.35';
      s.style.zIndex = String(100 - Math.abs(offset));
      s.classList.toggle('is-active', idx === current);
    });
  }

  function next(){ if(current < slides.length - 1){ current++; update(); } }
  function prev(){ if(current > 0){ current--; update(); } }

  // Buttons
  const btnPrev = gallery.querySelector('[data-prev]');
  const btnNext = gallery.querySelector('[data-next]');
  if(btnPrev) btnPrev.addEventListener('click', prev);
  if(btnNext) btnNext.addEventListener('click', next);

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowRight') next();
    if(e.key === 'ArrowLeft') prev();
  });

  // Swipe
  let startX = null, tracking = false;
  deck.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; tracking = true; }, {passive:true});
  deck.addEventListener('touchmove', (e) => {}, {passive:true});
  deck.addEventListener('touchend', (e) => {
    if(!tracking) return;
    const endX = (e.changedTouches && e.changedTouches[0].clientX) || startX;
    const dx = endX - startX;
    if(Math.abs(dx) > 40){ if(dx < 0) next(); else prev(); }
    tracking = false;
  });

  // Init positions
  slides.forEach(s => { s.style.willChange = 'transform, opacity'; });
  update();
})();
