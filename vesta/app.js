/* ============================================================
   VESTA — interactions
   ============================================================ */
(function(){
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- LOADER ---------- */
  function dismissLoader(){ document.getElementById('loader')?.classList.add('done'); }
  setTimeout(dismissLoader, reduce?200:2000);   // fallback indépendant de l'event load
  window.addEventListener('load', ()=> setTimeout(dismissLoader, reduce?100:1700));

  /* ---------- CURSEUR MAISON ---------- */
  const cur = document.getElementById('cursor');
  const dot = document.getElementById('cursor-dot');
  if(cur && !matchMedia('(pointer:coarse)').matches){
    let cx=innerWidth/2, cy=innerHeight/2, dx=cx, dy=cy;
    addEventListener('mousemove',e=>{ cx=e.clientX; cy=e.clientY; dot.style.transform=`translate(${cx}px,${cy}px) translate(-50%,-50%)`; });
    (function follow(){ dx+=(cx-dx)*0.18; dy+=(cy-dy)*0.18; cur.style.transform=`translate(${dx}px,${dy}px) translate(-50%,-50%)`; requestAnimationFrame(follow); })();
    document.querySelectorAll('a,button,input,.svc-card,.adv').forEach(el=>{
      el.addEventListener('mouseenter',()=>document.body.classList.add('cursor-active'));
      el.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-active'));
    });
  }

  /* ---------- ÉLÉMENTS FLOTTANTS ---------- */
  const fl = document.getElementById('floaties');
  if(fl && !reduce){
    const glyphs=['⌂','€','✦','▲','◇'];
    for(let i=0;i<14;i++){
      const s=document.createElement('span');
      s.className='floaty'; s.textContent=glyphs[i%glyphs.length];
      s.style.left=Math.random()*100+'%';
      s.style.fontSize=(14+Math.random()*26)+'px';
      s.style.animationDuration=(16+Math.random()*22)+'s';
      s.style.animationDelay=(-Math.random()*30)+'s';
      fl.appendChild(s);
    }
  }

  /* ---------- NAV AU SCROLL ---------- */
  const nav=document.getElementById('nav');
  addEventListener('scroll',()=>{ nav.classList.toggle('scrolled', scrollY>40); }, {passive:true});

  /* ---------- TYPEWRITER ---------- */
  const phrases=['Votre projet immobilier\u00A0commence ici.','Financez votre rêve.','Des taux imbattables.'];
  const tw=document.getElementById('typewriter');
  if(tw){
    let pi=0, ci=0, del=false;
    (function type(){
      const p=phrases[pi];
      tw.textContent = p.slice(0,ci);
      if(!del){
        if(ci<p.length){ ci++; setTimeout(type, 55+Math.random()*40); }
        else { del=true; setTimeout(type, 1600); }
      } else {
        if(ci>0){ ci--; setTimeout(type, 28); }
        else { del=false; pi=(pi+1)%phrases.length; setTimeout(type, 320); }
      }
    })();
  }

  /* ---------- ODOMETER ---------- */
  function buildOdometer(el, value){
    const str=String(value);
    el.innerHTML='';
    [...str].forEach((ch,idx)=>{
      if(ch===' '){ const sp=document.createElement('span'); sp.className='odo-sep'; el.appendChild(sp); return; }
      const dig=document.createElement('span'); dig.className='odo-digit';
      const reel=document.createElement('div'); reel.className='odo-reel';
      const target=+ch;
      // une rotation complète (0..9) puis arrêt sur le chiffre cible -> 10+target positions
      for(let n=0;n<=10+target;n++){ const s=document.createElement('span'); s.textContent=(n%10); reel.appendChild(s); }
      dig.appendChild(reel); el.appendChild(dig);
      reel.style.transform='translateY(0)';
      reel.style.transitionDelay=(idx*0.12)+'s';
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        reel.style.transform=`translateY(calc(-1.08em * ${10+target}))`;
      }));
    });
  }
  const odo=document.getElementById('odometer');
  if(odo){
    // valeur affichée : 2 847 (espace = séparateur milliers FR)
    buildOdometer(odo,'2 847');
  }

  /* ---------- COMPTEURS (count-up) ---------- */
  function countUp(el){
    const to=parseFloat(el.dataset.to), dec=+(el.dataset.dec||0), suf=el.dataset.suffix||'';
    const dur=1600, t0=performance.now();
    function step(now){
      const p=Math.min(1,(now-t0)/dur), e=1-Math.pow(1-p,3), v=to*e;
      let txt = dec? v.toFixed(dec).replace('.',',') : Math.round(v).toLocaleString('fr-FR');
      el.textContent = txt+suf;
      if(p<1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------- INTERSECTION OBSERVER ---------- */
  // valeur initiale "0" pour que les compteurs aient une boîte non nulle
  document.querySelectorAll('.count').forEach(el=>{ el.textContent='0'; });
  function reveal(el){
    el.classList.add('in-view');
    if(el.classList.contains('count')) countUp(el);
    if(el.classList.contains('bounce')){ el.classList.remove('bounce'); void el.offsetWidth; el.classList.add('bounce'); }
    if(el.classList.contains('timeline')) el.classList.add('drawn');
  }
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(!en.isIntersecting) return;
      reveal(en.target); io.unobserve(en.target);
    });
  },{threshold:0});   // 0 : fonctionne même pour les spans de taille nulle
  document.querySelectorAll('.fly-left,.fly-right,.fly-up,.count,.bounce,.timeline').forEach(el=>io.observe(el));

  /* ---------- TILT 3D ---------- */
  document.querySelectorAll('.tilt').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect();
      const px=(e.clientX-r.left)/r.width, py=(e.clientY-r.top)/r.height;
      card.style.transform=`perspective(800px) rotateY(${(px-.5)*12}deg) rotateX(${(.5-py)*12}deg) translateY(-4px)`;
      card.style.setProperty('--mx',px*100+'%');
      card.style.setProperty('--my',py*100+'%');
    });
    card.addEventListener('mouseleave',()=>{ card.style.transform=''; });
  });

  /* ---------- PARALLAX ---------- */
  if(!reduce){
    addEventListener('scroll',()=>{
      const y=scrollY;
      document.querySelectorAll('.floaty').forEach((f,i)=>{ /* already animated */ });
      const bg=document.getElementById('bg-gradient');
      if(bg) bg.style.transform=`translateY(${y*0.04}px)`;
    },{passive:true});
  }

  /* ---------- CTA : ripple + confetti doré ---------- */
  const cta=document.getElementById('cta');
  if(cta){
    cta.addEventListener('click',e=>{
      const r=cta.getBoundingClientRect();
      const rip=document.createElement('span'); rip.className='ripple';
      const sz=Math.max(r.width,r.height);
      rip.style.width=rip.style.height=sz+'px';
      rip.style.left=(e.clientX-r.left-sz/2)+'px';
      rip.style.top=(e.clientY-r.top-sz/2)+'px';
      cta.appendChild(rip); setTimeout(()=>rip.remove(),700);
      confetti(e.clientX,e.clientY);
      setTimeout(()=>document.getElementById('simulation')?.scrollIntoView({behavior:'smooth'}),360);
    });
  }
  function confetti(x,y){
    const N=46, cont=document.createElement('div');
    cont.style.cssText='position:fixed;inset:0;z-index:9500;pointer-events:none';
    document.body.appendChild(cont);
    const colors=['#C9A84C','#e0c878','#F8F9FA','#8a6f2a'];
    for(let i=0;i<N;i++){
      const c=document.createElement('i');
      const ang=Math.random()*Math.PI*2, sp=4+Math.random()*9;
      let vx=Math.cos(ang)*sp, vy=Math.sin(ang)*sp-6;
      let cxp=x, cyp=y, rot=Math.random()*360, life=0;
      c.style.cssText=`position:absolute;left:${x}px;top:${y}px;width:${5+Math.random()*6}px;height:${8+Math.random()*7}px;background:${colors[i%4]};border-radius:1px;will-change:transform`;
      cont.appendChild(c);
      (function f(){
        life++; vy+=0.35; vx*=0.99; cxp+=vx; cyp+=vy; rot+=10;
        c.style.transform=`translate(${cxp-x}px,${cyp-y}px) rotate(${rot}deg)`;
        c.style.opacity=Math.max(0,1-life/90);
        if(life<90) requestAnimationFrame(f); else c.remove();
      })();
    }
    setTimeout(()=>cont.remove(),1700);
  }

  /* ---------- SIMULATEUR ---------- */
  const amount=document.getElementById('amount'), years=document.getElementById('years');
  const amountOut=document.getElementById('amount-out'), yearsOut=document.getElementById('years-out');
  const rateOut=document.getElementById('rate-out'), costOut=document.getElementById('cost-out');
  const fill=document.getElementById('range-fill'), board=document.getElementById('board');
  const RATE=0.0314; // taux annuel

  // construit le tableau type "split-flap"
  let flaps=[];
  function buildBoard(){
    board.innerHTML='';
    flaps=[];
    for(let i=0;i<4;i++){
      const f=document.createElement('div'); f.className='flap';
      const face=document.createElement('div'); face.className='face'; face.textContent='0';
      f.appendChild(face); board.appendChild(f); flaps.push(face);
      if(i===0){ const sep=document.createElement('div'); sep.className='flap sep'; sep.textContent=' '; }
    }
    const sep=document.createElement('div'); sep.className='flap sep'; sep.textContent='';
    const unit=document.createElement('div'); unit.className='flap unit'; unit.textContent='€ / mois';
    board.appendChild(unit);
  }
  function setBoard(val){
    const str=String(Math.round(val)).padStart(flaps.length,'0').slice(-flaps.length);
    [...str].forEach((ch,i)=>{
      if(flaps[i].textContent!==ch){
        const card=flaps[i].parentElement;
        card.classList.remove('flipping'); void card.offsetWidth; card.classList.add('flipping');
        setTimeout(()=>{ flaps[i].textContent=ch; }, 200);
      }
    });
  }
  buildBoard();

  function frFormat(n){ return Math.round(n).toLocaleString('fr-FR'); }
  function recalc(){
    const P=+amount.value, Y=+years.value, n=Y*12, r=RATE/12;
    const m = P*r/(1-Math.pow(1+r,-n));
    amountOut.innerHTML = frFormat(P).replace(/\s/g,'\u00A0')+'\u00A0€';
    yearsOut.textContent = Y+' ans';
    rateOut.textContent = '3,14\u00A0%';
    // barre couleur selon montant
    const pct=(P-50000)/(1200000-50000);
    fill.style.width=Math.max(6,pct*100)+'%';
    let col = pct<0.4 ? '#46c46a' : pct<0.72 ? '#e0a23a' : '#e0533a';
    fill.style.background=col;
    setBoard(m);
    const total=m*n - P;
    costOut.textContent='Coût total du crédit : '+frFormat(total).replace(/\s/g,'\u00A0')+'\u00A0€';
  }
  if(amount && years){
    amount.addEventListener('input',recalc);
    years.addEventListener('input',recalc);
    recalc();
  }

  /* ---------- FOOTER : ville animée ---------- */
  const city=document.getElementById('city');
  if(city){
    const N = innerWidth<700?14:26;
    for(let i=0;i<N;i++){
      const b=document.createElement('div'); b.className='bldg';
      const w=22+Math.random()*30, h=50+Math.random()*120;
      b.style.width=w+'px'; b.style.height=h+'px';
      const cols=Math.max(1,Math.floor(w/10)), rows=Math.floor(h/14);
      for(let cI=0;cI<cols;cI++) for(let rI=0;rI<rows;rI++){
        const win=document.createElement('span'); win.className='win';
        win.style.left=(6+cI*10)+'px'; win.style.top=(8+rI*12)+'px';
        b.appendChild(win);
      }
      city.appendChild(b);
    }
    if(!reduce){
      const wins=[...city.querySelectorAll('.win')];
      setInterval(()=>{
        for(let k=0;k<3;k++){
          const w=wins[Math.floor(Math.random()*wins.length)];
          if(w) w.classList.toggle('on');
        }
      },420);
    }
  }
})();
