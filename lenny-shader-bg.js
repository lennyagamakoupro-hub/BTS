/* ============================================================
   LENNY — Fond animé WebGL2 (shader « nuages cosmiques »)
   Port vanilla du composant React (shader original de
   Matthias Hurrle @atzedent). Aucune dépendance.
   Usage :
     var bg = LennyShaderBG.mount(container);  // canvas plein conteneur
     bg.destroy();                              // stoppe + retire
   Repli : si pas de WebGL2, on pose un fond dégradé sombre.
   ============================================================ */
(function () {
  "use strict";

  var VERT =
    "#version 300 es\nprecision highp float;\nin vec4 position;\nvoid main(){gl_Position=position;}";

  var FRAG =
    "#version 300 es\n" +
    "precision highp float;\n" +
    "out vec4 O;\n" +
    "uniform vec2 resolution;\n" +
    "uniform float time;\n" +
    "#define FC gl_FragCoord.xy\n" +
    "#define T time\n" +
    "#define R resolution\n" +
    "#define MN min(R.x,R.y)\n" +
    "float rnd(vec2 p){p=fract(p*vec2(12.9898,78.233));p+=dot(p,p+34.56);return fract(p.x*p.y);}\n" +
    "float noise(in vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);" +
    "float a=rnd(i),b=rnd(i+vec2(1,0)),c=rnd(i+vec2(0,1)),d=rnd(i+1.);" +
    "return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);}\n" +
    "float fbm(vec2 p){float t=.0,a=1.;mat2 m=mat2(1.,-.5,.2,1.2);" +
    "for(int i=0;i<5;i++){t+=a*noise(p);p*=2.*m;a*=.5;}return t;}\n" +
    "float clouds(vec2 p){float d=1.,t=.0;" +
    "for(float i=.0;i<3.;i++){float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);" +
    "t=mix(t,d,a);d=a;p*=2./(i+1.);}return t;}\n" +
    "void main(void){vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);vec3 col=vec3(0);" +
    "float bg=clouds(vec2(st.x+T*.5,-st.y));" +
    "uv*=1.-.3*(sin(T*.2)*.5+.5);" +
    "for(float i=1.;i<12.;i++){" +
    "uv+=.1*cos(i*vec2(.1+.01*i,.8)+i*i+T*.5+.1*uv.x);" +
    "vec2 p=uv;float d=length(p);" +
    "col+=.00125/d*(cos(sin(i)*vec3(1,2,3))+1.);" +
    "float b=noise(i+p+bg*1.731);" +
    "col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));" +
    "col=mix(col,vec3(bg*.25,bg*.137,bg*.05),d);}" +
    "O=vec4(col,1);}";

  function compile(gl, type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.warn("LennyShaderBG:", gl.getShaderInfoLog(s));
      gl.deleteShader(s);
      return null;
    }
    return s;
  }

  function mount(container) {
    var canvas = document.createElement("canvas");
    canvas.className = "lsb-canvas";
    canvas.setAttribute("aria-hidden", "true");
    container.appendChild(canvas);

    var gl = null;
    try { gl = canvas.getContext("webgl2", { antialias: false, alpha: false }); } catch (e) {}
    if (!gl) {
      container.classList.add("lsb-nogl");
      return { destroy: function () { if (canvas.parentNode) canvas.parentNode.removeChild(canvas); } };
    }

    var vs = compile(gl, gl.VERTEX_SHADER, VERT);
    var fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    var prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn("LennyShaderBG link:", gl.getProgramInfoLog(prog));
      container.classList.add("lsb-nogl");
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      return { destroy: function () {} };
    }
    gl.useProgram(prog);

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    var uRes = gl.getUniformLocation(prog, "resolution");
    var uTime = gl.getUniformLocation(prog, "time");

    var raf = null, start = performance.now(), alive = true;

    function resize() {
      var dpr = Math.max(1, 0.5 * (window.devicePixelRatio || 1));
      var w = Math.floor((container.clientWidth || window.innerWidth) * dpr);
      var h = Math.floor((container.clientHeight || window.innerHeight) * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    }

    function frame(now) {
      if (!alive) return;
      resize();
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (now - start) * 1e-3);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(frame);

    return {
      canvas: canvas,
      destroy: function () {
        alive = false;
        if (raf) cancelAnimationFrame(raf);
        window.removeEventListener("resize", resize);
        try { gl.deleteProgram(prog); gl.deleteShader(vs); gl.deleteShader(fs); gl.deleteBuffer(buf); } catch (e) {}
        var ext = gl.getExtension("WEBGL_lose_context"); if (ext) try { ext.loseContext(); } catch (e) {}
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      }
    };
  }

  window.LennyShaderBG = { mount: mount };
})();
