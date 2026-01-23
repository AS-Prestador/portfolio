
// ===== A.S Prestador – mobile-fixes.js (hamburger iPhone + fechar ao clicar) =====
(function(){
  const hamburger = document.querySelector('.hamburger');
  const navMenu   = document.querySelector('.nav-menu');
  if(!hamburger || !navMenu) return;

  const open = () => {
    hamburger.classList.add('active');
    navMenu.classList.add('active');
    document.body.classList.add('menu-open');
  };
  const close = () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
  };
  const toggle = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    if(navMenu.classList.contains('active')) close(); else open();
  };

  // Garante clique/touch no iPhone
  ['click','touchend'].forEach(evt => hamburger.addEventListener(evt, toggle, {passive:false}));

  // Fecha ao tocar fora do menu
  document.addEventListener('click', (e)=>{
    if(!navMenu.classList.contains('active')) return;
    const insideMenu = navMenu.contains(e.target) || hamburger.contains(e.target);
    if(!insideMenu) close();
  });

  // Fecha ao tocar num link do menu
  navMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', ()=> close());
  });
})();
