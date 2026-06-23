// Particules : dispersion aléatoire -> silhouette d'une maison/immeuble
(function(){
  const canvas = document.getElementById('particles');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, DPR, particles = [], targets = [], mouse = {x:-999,y:-999};

  function resize(){
    DPR = Math.min(window.devicePixelRatio||1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W*DPR; canvas.height = H*DPR;
    ctx.setTransform(DPR,0,0,DPR,0,0);
    buildTargets();
  }

  // Construit la liste des points-cibles formant la maison
  function buildTargets(){
    targets = [];
    const cx = W/2, cy = H*0.52;
    const s = Math.min(W,H)*0.32; // échelle
    const segs = [];
    // corps (carré)
    const bx = cx - s*0.45, by = cy - s*0.1, bw = s*0.9, bh = s*0.7;
    segs.push([bx,by, bx+bw,by]);            // toit du corps
    segs.push([bx,by, bx,by+bh]);            // gauche
    segs.push([bx+bw,by, bx+bw,by+bh]);      // droite
    segs.push([bx,by+bh, bx+bw,by+bh]);      // base
    // toit (triangle)
    segs.push([bx-s*0.12,by, cx,by-s*0.5]);
    segs.push([bx+bw+s*0.12,by, cx,by-s*0.5]);
    // cheminée
    segs.push([cx+s*0.2,by-s*0.28, cx+s*0.2,by-s*0.46]);
    segs.push([cx+s*0.34,by-s*0.34, cx+s*0.34,by-s*0.46]);
    segs.push([cx+s*0.2,by-s*0.46, cx+s*0.34,by-s*0.46]);
    // porte
    const dw=s*0.22, dh=s*0.4, dx=cx-dw/2, dy=by+bh-dh;
    segs.push([dx,dy, dx,dy+dh]);
    segs.push([dx+dw,dy, dx+dw,dy+dh]);
    segs.push([dx,dy, dx+dw,dy]);
    // fenêtre
    const fw=s*0.2, fx=cx-s*0.32, fy=by+s*0.12;
    segs.push([fx,fy, fx+fw,fy]); segs.push([fx,fy+fw, fx+fw,fy+fw]);
    segs.push([fx,fy, fx,fy+fw]); segs.push([fx+fw,fy, fx+fw,fy+fw]);

    segs.forEach(([x1,y1,x2,y2])=>{
      const len = Math.hypot(x2-x1,y2-y1);
      const n = Math.max(3, Math.round(len/9));
      for(let i=0;i<=n;i++){
        const t=i/n;
        targets.push({x:x1+(x2-x1)*t, y:y1+(y2-y1)*t});
      }
    });

    // ajuste le nombre de particules au nombre de cibles
    while(particles.length < targets.length){
      particles.push({x:Math.random()*W,y:Math.random()*H,vx:0,vy:0,r:Math.random()*1.4+0.8});
    }
    particles.length = targets.length;
    particles.forEach(p=>{ p.tIdx = particles.indexOf(p); });
  }

  let formed = 0; // 0..1 progression de formation
  function tick(){
    ctx.clearRect(0,0,W,H);
    formed = Math.min(1, formed + 0.004);
    for(let i=0;i<particles.length;i++){
      const p = particles[i], t = targets[i];
      if(!t) continue;
      const ease = 0.04 + formed*0.06;
      // attraction vers la cible
      p.vx += (t.x - p.x)*ease;
      p.vy += (t.y - p.y)*ease;
      // répulsion souris
      const dx = p.x-mouse.x, dy = p.y-mouse.y, d2 = dx*dx+dy*dy;
      if(d2 < 9000){ const f = (9000-d2)/9000*2.2; const d=Math.sqrt(d2)||1; p.vx += dx/d*f; p.vy += dy/d*f; }
      p.vx *= 0.82; p.vy *= 0.82;
      p.x += p.vx; p.y += p.vy;
      const lit = formed>0.7 ? Math.hypot(p.x-t.x,p.y-t.y) < 6 : false;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,7);
      ctx.fillStyle = lit ? 'rgba(201,168,76,'+(0.5+formed*0.5)+')' : 'rgba(120,150,190,'+(0.25+formed*0.4)+')';
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }

  const hero = document.getElementById('hero');
  window.addEventListener('mousemove',e=>{
    if(!hero) return;
    const r = hero.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
  });
  window.addEventListener('mouseleave',()=>{mouse.x=-999;mouse.y=-999;});
  window.addEventListener('resize',resize);
  resize(); tick();
})();
