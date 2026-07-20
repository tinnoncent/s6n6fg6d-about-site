
const canvas = document.getElementById("field");
const ctx = canvas.getContext("2d", {alpha:true});
let w=0,h=0,dpr=1,particles=[];

function resize(){
  dpr=Math.min(window.devicePixelRatio||1,2);
  w=innerWidth;h=innerHeight;
  canvas.width=Math.floor(w*dpr);canvas.height=Math.floor(h*dpr);
  canvas.style.width=w+"px";canvas.style.height=h+"px";
  ctx.setTransform(dpr,0,0,dpr,0,0);
  particles=Array.from({length:Math.min(80,Math.floor(w/11))},()=>({
    x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.25+.2,v:Math.random()*.12+.025,a:Math.random()*.22+.03
  }));
}
function render(){
  ctx.clearRect(0,0,w,h);
  const g=ctx.createRadialGradient(w/2,h*.3,0,w/2,h*.3,Math.max(w,h)*.68);
  g.addColorStop(0,"rgba(0,229,255,.055)");
  g.addColorStop(.3,"rgba(255,0,184,.035)");
  g.addColorStop(.55,"rgba(199,255,0,.022)");
  g.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
  for(const p of particles){
    p.y-=p.v;if(p.y<-4){p.y=h+4;p.x=Math.random()*w}
    ctx.beginPath();ctx.fillStyle=`rgba(230,214,176,${p.a})`;
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
  }
  requestAnimationFrame(render);
}
function pulseClass(name,duration){
  document.body.classList.add(name);
  setTimeout(()=>document.body.classList.remove(name),duration);
}
setTimeout(()=>pulseClass("glitch",460),2700);
setInterval(()=>pulseClass("glitch",460),11800);
setTimeout(()=>pulseClass("flicker",240),5200);
setInterval(()=>pulseClass("flicker",240),8700);
setTimeout(()=>pulseClass("surge",900),6800);
setInterval(()=>pulseClass("surge",900),17300);

function postHeight(){
  window.parent?.postMessage({type:"resize",height:Math.ceil(document.documentElement.scrollHeight)},"*");
}
addEventListener("resize",()=>{resize();postHeight()});
addEventListener("load",postHeight,{once:true});
if("ResizeObserver" in window)new ResizeObserver(postHeight).observe(document.documentElement);

resize();render();
