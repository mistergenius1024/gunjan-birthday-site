const BIRTHDAY_MONTH_INDEX = 8, BIRTHDAY_DAY = 27, PREVIEW_MODE = true;

const photos = [
  {src:"pictures/gunjan3.jpg", title:"That Evening ❤️🌧️", tag:"Last Time We Met", desc:"The last time we met, we got this beautiful evening with the perfect rainy weather. One of those simple moments that just feels nice to remember. ❤️✨"},
  {src:"pictures/gunjan9.jpg", title:"That Zoo Day 🦁", tag:"Indore • Zoo Trip", desc:"A fun day out together at the zoo. Good memories, random photos, and everyone just enjoying the day❤️."},
  {src:"pictures/gunjan5.jpg", title:"Everyone Together ❤️", tag:"Home • Family Time", desc:"One of those days when everyone happened to be together at home. Random photos, cousins, and a lot of good memories. 😂❤️"},
  {src:"pictures/gunjan6.jpg", title:"Those School Tour Days ❤️", tag:"Old Days", desc:"Back when we used to study together and school tours felt like a whole adventure. A little throwback from those old days. 😂✨"},
  {src:"pictures/gunjan4.jpg", title:"The Dress-Up Days 😂❤️", tag:"Childhood Memories", desc:"I was so small that wearing your dress felt completely normal. 😂 Those childhood days were something else! ❤️✨"},
  {src:"pictures/gunjan8.jpg", title:"A Random Function Day ❤️", tag:"Good Times", desc:"One of those random days when we went to a function together and clicked a picture. Nothing special, just a nice little memory. 😂✨"},
  {src:"pictures/gunjan7.jpg", title:"How Was This Even Taken? 😂", tag:"Childhood Throwback", desc:"This photo is SO old that I don’t even remember when it was taken or who clicked it. 😂 But somehow, here we are — a random little piece of our childhood that survived all these years. ❤️"}
];

const heroLine = "Happy Birthday ❤️ Wishing you lots of happiness and success ahead! We may not meet that often, but whenever we do, the same old fun somehow comes back 😂✨";

document.addEventListener('click', (e) => {
  if(e.target.closest('button, input, textarea, a, .t-card, canvas, .flame, audio')) return;
  const ripple = document.createElement('div');
  ripple.className = 'ripple';
  ripple.style.left = e.clientX + 'px';
  ripple.style.top = e.clientY + 'px';
  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
  spawnBurst(e.clientX, e.clientY, ['💖','✨','🌟','🎉'][Math.floor(Math.random()*4)]);
});

function redeemVoucher(btn, voucherName) {
  if(btn.classList.contains('redeemed')) return;
  btn.innerText = "Redeeming... ⏳";
  fetch("https://formsubmit.co/ajax/amankumr5601@gmail.com", {
    method: "POST",
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ _subject: "🎟️ Gunjan Di Redeemed a Voucher!", Message: `Gunjan Di just redeemed the "${voucherName}" voucher! Be ready!` })
  }).then(() => {
    btn.classList.add('redeemed');
    btn.innerText = "Redeemed! 🎉";
    fireConfetti();
  }).catch(() => {
    btn.classList.add('redeemed');
    btn.innerText = "Redeemed! 🎉";
    fireConfetti();
  });
}

const themes = [
  { p:'#00FE8C', s:'#00c6ff', a:'#ff00e5' },
  { p:'#ff3366', s:'#ff9933', a:'#00f2fe' },
  { p:'#b100ff', s:'#ff007f', a:'#ffe600' },
  { p:'#ff0055', s:'#ffaa00', a:'#a600ff' }
];
let currentTheme = 0;
document.getElementById('magicWand').addEventListener('click', () => {
  currentTheme = (currentTheme + 1) % themes.length;
  const root = document.documentElement;
  root.style.setProperty('--primary', themes[currentTheme].p);
  root.style.setProperty('--secondary', themes[currentTheme].s);
  root.style.setProperty('--accent', themes[currentTheme].a);
  fireConfetti();
});

const sc = document.getElementById('scratchCanvas');
const sctx = sc.getContext('2d');
let isDrawing = false;

function initScratchCard() {
  sc.width = sc.parentElement.clientWidth;
  sc.height = sc.parentElement.clientHeight;
  const grad = sctx.createLinearGradient(0, 0, sc.width, sc.height);
  grad.addColorStop(0, '#e0e0e0');
  grad.addColorStop(0.5, '#f5f5f5');
  grad.addColorStop(1, '#cccccc');
  sctx.fillStyle = grad;
  sctx.fillRect(0, 0, sc.width, sc.height);
  sctx.font = "bold 24px Outfit";
  sctx.fillStyle = "#888";
  sctx.textAlign = "center";
  sctx.textBaseline = "middle";
  sctx.fillText("Scratch Here 🪙", sc.width/2, sc.height/2);
}
window.addEventListener('resize', initScratchCard);

function getMousePos(e) {
  const rect = sc.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  return { x:clientX-rect.left, y:clientY-rect.top };
}
function scratch(e) {
  if(!isDrawing) return;
  e.preventDefault();
  const pos = getMousePos(e);
  sctx.globalCompositeOperation = 'destination-out';
  sctx.beginPath();
  sctx.arc(pos.x,pos.y,35,0,Math.PI*2);
  sctx.fill();
}
sc.addEventListener('mousedown', () => isDrawing = true);
sc.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); }, {passive:false});
window.addEventListener('mouseup', () => isDrawing = false);
window.addEventListener('touchend', () => isDrawing = false);
sc.addEventListener('mousemove', scratch);
sc.addEventListener('touchmove', scratch, {passive:false});

const pc = document.getElementById('particles'), pctx = pc.getContext('2d');
function resizeP(){ pc.width=innerWidth; pc.height=innerHeight; }
resizeP();
window.addEventListener('resize', resizeP);
let particles = [];
for(let i=0;i<50;i++){
  particles.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*5+1,vy:Math.random()*0.5+0.2,vx:(Math.random()-0.5)*0.4,op:Math.random()*0.6+0.2});
}
function drawParticles(){
  pctx.clearRect(0,0,pc.width,pc.height);
  const pColor=getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
  const aColor=getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
  particles.forEach((p,index)=>{
    p.y-=p.vy;
    p.x+=p.vx+Math.sin(p.y*0.01)*0.3;
    if(p.y<-10){p.y=pc.height+10;p.x=Math.random()*pc.width;}
    pctx.globalAlpha=p.op+(Math.sin(Date.now()*0.003+p.x)*0.3);
    pctx.fillStyle=(index%2===0)?pColor:aColor;
    pctx.beginPath();
    pctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    pctx.fill();
    pctx.shadowBlur=15;
    pctx.shadowColor=pctx.fillStyle;
  });
  pctx.shadowBlur=0;
  pctx.globalAlpha=1;
  requestAnimationFrame(drawParticles);
}
drawParticles();

const cc=document.getElementById('confetti'), cctx=cc.getContext('2d');
function resizeC(){cc.width=innerWidth;cc.height=innerHeight;}
resizeC();
window.addEventListener('resize',resizeC);
function fireConfetti(){
  const pieces=[], pColors=['#00FE8C','#00c6ff','#ff00e5','#ff7eb3','#ffffff','#ffe600'];
  for(let i=0;i<120;i++){
    pieces.push({x:innerWidth/2,y:innerHeight/2+50,vx:(Math.random()-.5)*18,vy:(Math.random()-1.5)*18,g:0.3,size:Math.random()*8+4,rot:Math.random()*360,vr:(Math.random()-.5)*12,c:pColors[Math.floor(Math.random()*pColors.length)],life:150});
  }
  function step(){
    cctx.clearRect(0,0,cc.width,cc.height);
    let alive=false;
    pieces.forEach(p=>{
      if(p.life<=0)return;
      alive=true;
      p.vy+=p.g;p.x+=p.vx;p.y+=p.vy;p.rot+=p.vr;p.life--;
      cctx.save();
      cctx.translate(p.x,p.y);
      cctx.rotate(p.rot*Math.PI/180);
      cctx.globalAlpha=Math.max(p.life/150,0);
      cctx.fillStyle=p.c;
      cctx.fillRect(-p.size/2,-p.size/2,p.size,p.size*0.8);
      cctx.restore();
    });
    if(alive)requestAnimationFrame(step);
    else cctx.clearRect(0,0,cc.width,cc.height);
  }
  step();
}

function spawnBurst(x,y,icon='💖'){
  const b=document.createElement('div');
  b.className='burst-heart';
  b.textContent=icon;
  b.style.left=(x-15)+'px';
  b.style.top=(y-15)+'px';
  document.body.appendChild(b);
  setTimeout(()=>b.remove(),1000);
}

window.addEventListener('scroll',()=>{
  const max=document.documentElement.scrollHeight-document.documentElement.clientHeight;
  document.getElementById('progress').style.width=(max>0?document.documentElement.scrollTop/max*100:0)+'%';
});

const io=new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting){
      en.target.classList.add('in');
      io.unobserve(en.target);
    }
  });
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

const tl=document.getElementById('timelineGrid');
photos.forEach((p,i)=>{
  const item=document.createElement('div');
  item.className='t-item reveal';
  item.innerHTML=`<div class="t-dot"></div><div class="colorful-glass t-card"><div class="t-img"><img src="${p.src}" alt="${p.title}" loading="lazy"></div><div class="t-body"><span class="moment-title">${p.title}</span><span class="t-tag">${p.tag}</span><p>${p.desc}</p></div></div>`;
  const card=item.querySelector('.t-card');
  card.addEventListener('mousemove',(e)=>{
    if(window.innerWidth<768)return;
    const r=card.getBoundingClientRect();
    const rx=((e.clientY-r.top)/r.height-0.5)*-15;
    const ry=((e.clientX-r.left)/r.width-0.5)*15;
    card.style.transform=`rotateX(${rx}deg) rotateY(${ry}deg) translateY(-10px) scale(1.05)`;
  });
  card.addEventListener('mouseleave',()=>{card.style.transform='';});
  card.addEventListener('click',(e)=>{openLightbox(i);spawnBurst(e.clientX,e.clientY,'📸');});
  tl.appendChild(item);
  io.observe(item);
});

let currentLiked=false;
function openLightbox(i){
  const p=photos[i];
  document.getElementById('lbImg').src=p.src;
  document.getElementById('lbTitle').textContent=p.title;
  document.getElementById('lbTag').textContent=p.tag;
  document.getElementById('lbDesc').textContent=p.desc;
  document.getElementById('lightbox').classList.add('open');
  currentLiked=false;
  const likeBtn=document.getElementById('lbLike');
  likeBtn.classList.remove('liked');
  likeBtn.querySelector('.icon').textContent='🤍';
  document.getElementById('lbLikeTxt').textContent='Favorite this memory';
}
document.getElementById('lbClose').addEventListener('click',()=>document.getElementById('lightbox').classList.remove('open'));
document.getElementById('lightbox').addEventListener('click',(e)=>{
  if(e.target.id==='lightbox')e.currentTarget.classList.remove('open');
});
document.getElementById('lbLike').addEventListener('click',(e)=>{
  currentLiked=!currentLiked;
  const el=document.getElementById('lbLike');
  el.classList.toggle('liked',currentLiked);
  el.querySelector('.icon').textContent=currentLiked?'❤️':'🤍';
  document.getElementById('lbLikeTxt').textContent=currentLiked?'Favorited!':'Favorite this memory';
  if(currentLiked)spawnBurst(e.clientX,e.clientY);
});

/* ---------- AUDIO ---------- */
const bgMusic=document.getElementById('bgMusic');
const magicSound=document.getElementById('magicSound');
const fireworkSound=document.getElementById('fireworkSound');
const voiceAudio=document.getElementById('voiceAudio');

let audioCtx=null, musicOn=false, musicWasPlayingBeforeVoice=false, gainNode=null, analyser=null, dataArr=null, mediaSource=null;
const vizCanvas=document.getElementById('vizCanvas'), vctx=vizCanvas.getContext('2d');

function setupMusicAnalyser(){
  if(audioCtx) return;
  audioCtx=new (window.AudioContext||window.webkitAudioContext)();
  gainNode=audioCtx.createGain();
  gainNode.gain.value=0.8;
  analyser=audioCtx.createAnalyser();
  analyser.fftSize=32;
  dataArr=new Uint8Array(analyser.frequencyBinCount);
  mediaSource=audioCtx.createMediaElementSource(bgMusic);
  mediaSource.connect(gainNode);
  gainNode.connect(analyser);
  analyser.connect(audioCtx.destination);
}

function drawViz(){
  if(!analyser)return;
  vctx.clearRect(0,0,60,60);
  if(musicOn){
    analyser.getByteFrequencyData(dataArr);
    for(let i=0;i<8;i++){
      const v=dataArr[i]||0;
      const h=Math.max(3,(v/255)*24);
      vctx.fillStyle=i%2===0?'#fff':getComputedStyle(document.documentElement).getPropertyValue('--accent');
      vctx.fillRect(10+i*5,30-h/2,3,h);
    }
  }
  requestAnimationFrame(drawViz);
}

async function startMusic(){
  setupMusicAnalyser();
  if(audioCtx.state==='suspended') await audioCtx.resume();
  bgMusic.volume=0.45;
  try{
    await bgMusic.play();
    musicOn=true;
    document.getElementById('musicIcon').textContent='♫';
    drawViz();
  }catch(err){
    musicOn=false;
    document.getElementById('musicIcon').textContent='♪';
  }
}

function stopMusic(){
  bgMusic.pause();
  musicOn=false;
  document.getElementById('musicIcon').textContent='♪';
  vctx.clearRect(0,0,60,60);
}

async function resumeMusic(){
  setupMusicAnalyser();
  if(audioCtx.state==='suspended') await audioCtx.resume();
  bgMusic.volume=0.45;
  try{
    await bgMusic.play();
    musicOn=true;
    document.getElementById('musicIcon').textContent='♫';
    drawViz();
  }catch(err){}
}

document.getElementById('music-toggle').addEventListener('click',()=>{
  if(musicOn)stopMusic();
  else resumeMusic();
});

voiceAudio.addEventListener('play',()=>{
  musicWasPlayingBeforeVoice=musicOn;
  if(musicOn)stopMusic();
});

voiceAudio.addEventListener('pause',()=>{
  if(musicWasPlayingBeforeVoice)resumeMusic();
});

voiceAudio.addEventListener('ended',()=>{
  if(musicWasPlayingBeforeVoice)resumeMusic();
  musicWasPlayingBeforeVoice=false;
});

function playEffect(audio, volume=0.65){
  audio.currentTime=0;
  audio.volume=volume;
  audio.play().catch(()=>{});
}

/* ---------- 3 CANDLES LOGIC ---------- */
let blownCount=0;
function blowThisCandle(flameEl,e){
  if(flameEl.classList.contains('out'))return;
  if(e)spawnBurst(e.clientX,e.clientY,'💨');
  flameEl.classList.add('out');
  blownCount++;
  const hint=document.getElementById('blowHint');

  if(blownCount<3){
    hint.innerText=`Keep going! Tap the flames (${3-blownCount} left)`;
  }else{
    hint.style.opacity='0';
    playEffect(fireworkSound,0.75);
    setTimeout(()=>{
      hint.style.display='none';
      document.getElementById('wishMsg').classList.add('show');
      fireConfetti();
    },400);
  }
}

/* ---------- FEEDBACK API ---------- */
document.getElementById('feedbackForm').addEventListener('submit',function(e){
  e.preventDefault();
  const msg=document.getElementById('fbMsg').value;
  if(!msg.trim())return;
  const btn=document.getElementById('sendFb');
  btn.textContent="Sending... ⏳";
  btn.disabled=true;
  fetch("https://formsubmit.co/ajax/amankumr5601@gmail.com",{
    method:"POST",
    headers:{'Content-Type':'application/json','Accept':'application/json'},
    body:JSON.stringify({_subject:"✨ New Birthday Message from Gunjan Di!",Message:msg})
  }).then(response=>response.json()).then(()=>{
    document.getElementById('feedbackForm').style.display='none';
    document.getElementById('fbThanks').style.display='block';
    fireConfetti();
  }).catch(()=>{
    btn.textContent="Error! Try Again ❌";
    btn.disabled=false;
  });
});

function typeWrite(){
  const el=document.getElementById('twText');
  let i=0;
  (function step(){
    if(i<=heroLine.length){
      el.textContent=heroLine.slice(0,i);
      i++;
      setTimeout(step,40);
    }
  })();
}

function isBirthdayUnlocked(){
  if(PREVIEW_MODE)return true;
  const now=new Date();
  return(now.getMonth()>BIRTHDAY_MONTH_INDEX)||(now.getMonth()===BIRTHDAY_MONTH_INDEX&&now.getDate()>=BIRTHDAY_DAY);
}

function revealSite(e){
  const gs=document.getElementById('gift-screen');
  if(e){
    gs.style.setProperty('--ox',e.clientX+'px');
    gs.style.setProperty('--oy',e.clientY+'px');
  }
  gs.classList.add('hidden');
  document.getElementById('mainContent').classList.add('show');

  // User clicked the button, so audio playback is allowed by the browser.
  startMusic();
  playEffect(magicSound,0.45);

  fireConfetti();
  setTimeout(typeWrite,800);
  setTimeout(initScratchCard,100);
}

function initLock(){
  if(!isBirthdayUnlocked()){
    document.getElementById('countdownTxt').textContent='Unlocks on September 27';
    document.getElementById('openBtn').style.display='none';
    document.getElementById('openLocket').style.display='none';
    return;
  }
  document.getElementById('openBtn').addEventListener('click',revealSite);
  document.getElementById('openLocket').addEventListener('click',revealSite);
}
initLock();
