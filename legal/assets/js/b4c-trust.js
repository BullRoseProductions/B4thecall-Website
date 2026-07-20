/* ============================================================
   B4C Trust Center — shared behaviour
   Section navigator, scroll spy, reading progress, mobile rail.
   No dependencies.
   ============================================================ */
(function(){
  "use strict";

  var $ = function(s){ return document.querySelector(s); };

  /* ---------- Section navigator ---------- */

  var list   = $('#npList');
  var panel  = $('#navPanel');
  var scrim  = $('#scrim');
  var tabBtn = $('#tabBtn');
  var closeB = $('#npClose');
  var items  = [];
  var heads  = [];

  if(list && panel){
    heads = Array.prototype.slice.call(
      document.querySelectorAll('.doc section > h2[id], .doc > h2[id]')
    );

    heads.forEach(function(h){
      var num  = h.querySelector('.n');
      var text = h.textContent.replace(num ? num.textContent : '', '').trim();
      var a = document.createElement('a');
      a.className = 'np-item';
      a.href = '#' + h.id;
      a.dataset.target = h.id;
      a.innerHTML = '<span class="n"></span><span class="t"></span>';
      a.querySelector('.n').textContent = num ? num.textContent : '';
      a.querySelector('.t').textContent = text;
      list.appendChild(a);
    });

    items = Array.prototype.slice.call(list.querySelectorAll('.np-item'));

    var openPanel = function(){
      panel.classList.add('open');
      scrim.classList.add('on');
      panel.setAttribute('aria-hidden','false');
      tabBtn.setAttribute('aria-expanded','true');
      var cur = list.querySelector('.np-item.here') || items[0];
      if(cur){ cur.focus({preventScroll:true}); }
    };

    var closePanel = function(){
      panel.classList.remove('open');
      scrim.classList.remove('on');
      panel.setAttribute('aria-hidden','true');
      tabBtn.setAttribute('aria-expanded','false');
    };

    tabBtn.addEventListener('click', function(){
      panel.classList.contains('open') ? closePanel() : openPanel();
    });
    if(closeB){ closeB.addEventListener('click', closePanel); }
    if(scrim){ scrim.addEventListener('click', closePanel); }
    items.forEach(function(a){ a.addEventListener('click', closePanel); });

    /* Scroll spy */
    if('IntersectionObserver' in window && heads.length){
      var spy = new IntersectionObserver(function(entries){
        entries.forEach(function(en){
          if(!en.isIntersecting){ return; }
          items.forEach(function(a){
            a.classList.toggle('here', a.dataset.target === en.target.id);
          });
        });
      }, { rootMargin:'-88px 0px -68% 0px', threshold:0 });
      heads.forEach(function(h){ spy.observe(h); });
    }

    window.__b4cClosePanel = closePanel;
  }

  /* ---------- Reading progress ---------- */

  var bar = $('#bar');
  if(bar){
    var ticking = false;
    var draw = function(){
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
      ticking = false;
    };
    window.addEventListener('scroll', function(){
      if(!ticking){ window.requestAnimationFrame(draw); ticking = true; }
    }, {passive:true});
    window.addEventListener('resize', draw, {passive:true});
    draw();
  }

  /* ---------- Mobile rail ---------- */

  var rail    = $('#rail');
  var railBtn = $('#railBtn');
  var closeRail = function(){
    if(!rail){ return; }
    rail.classList.remove('open');
    if(railBtn){ railBtn.setAttribute('aria-expanded','false'); }
  };

  if(rail && railBtn){
    railBtn.addEventListener('click', function(){
      var open = rail.classList.toggle('open');
      railBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    rail.addEventListener('click', function(e){
      if(e.target.closest('a')){ closeRail(); }
    });
  }

  /* ---------- Escape closes everything ---------- */

  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      if(window.__b4cClosePanel){ window.__b4cClosePanel(); }
      closeRail();
    }
  });

  /* ---------- Keep the current rail item in view ---------- */

  var cur = document.querySelector('.doc-link[aria-current="page"]');
  if(cur && cur.scrollIntoView){
    try { cur.scrollIntoView({block:'center'}); } catch(err){ /* noop */ }
  }

})();
