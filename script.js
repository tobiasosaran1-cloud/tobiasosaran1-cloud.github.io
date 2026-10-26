const track = document.getElementById("track");
const panels = [...document.querySelectorAll(".panel")];
const progressBar = document.getElementById("progressBar");
const navButtons = [...document.querySelectorAll("[data-target]")];
const cursor = document.getElementById("cursor");

let current = 0;
let locked = false;

const videos = [
  {title:"Reel #01", url:"https://www.instagram.com/reel/De4Z67Gz8Wm/"},
  {title:"Reel #02", url:"https://www.instagram.com/reel/DezllnUO6XF/"},
  {title:"Reel #03", url:"https://www.instagram.com/reel/DepmWmlhP3t/"},
  {title:"Reel #04", url:"https://www.instagram.com/reel/Demzx4PTgTX/"},
  {title:"Reel #05", url:"https://www.instagram.com/reel/DeiMHLuxFBU/"}
];
let videoIndex = 0;

function goTo(index){
  current = Math.max(0, Math.min(panels.length - 1, index));
  track.style.transform = `translate3d(${-current * 100}vw,0,0)`;
  progressBar.style.width = `${((current + 1) / panels.length) * 100}%`;
  navButtons.forEach(btn => btn.classList.toggle("active", btn.dataset.target === panels[current].id));
}

navButtons.forEach(btn => btn.addEventListener("click", () => {
  const index = panels.findIndex(p => p.id === btn.dataset.target);
  if(index >= 0) goTo(index);
}));

document.addEventListener("keydown", e => {
  if(e.key === "ArrowRight" || e.key === "PageDown") goTo(current + 1);
  if(e.key === "ArrowLeft" || e.key === "PageUp") goTo(current - 1);
  if(e.key === "Home") goTo(0);
  if(e.key === "End") goTo(panels.length - 1);
});

window.addEventListener("wheel", e => {
  if(Math.abs(e.deltaX) < Math.abs(e.deltaY) && Math.abs(e.deltaY) < 25) return;
  if(locked) return;
  locked = true;
  if(e.deltaY > 0 || e.deltaX > 0) goTo(current + 1);
  else goTo(current - 1);
  setTimeout(() => locked = false, 750);
}, {passive:true});

let touchStartX = 0;
window.addEventListener("touchstart", e => touchStartX = e.changedTouches[0].clientX, {passive:true});
window.addEventListener("touchend", e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if(Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
}, {passive:true});

const videoTitle = document.getElementById("videoTitle");
const videoLink = document.getElementById("videoLink");
const videoDots = document.getElementById("videoDots");
const videoNumber = document.querySelector(".video-number");

function renderVideo(){
  const v = videos[videoIndex];
  videoTitle.textContent = v.title;
  videoLink.href = v.url;
  videoNumber.textContent = `${String(videoIndex+1).padStart(2,"0")} / ${String(videos.length).padStart(2,"0")}`;
  videoDots.textContent = videos.map((_,i)=>i===videoIndex?"●":"·").join("  ");
}
document.querySelector(".next").addEventListener("click", () => { videoIndex=(videoIndex+1)%videos.length; renderVideo(); });
document.querySelector(".prev").addEventListener("click", () => { videoIndex=(videoIndex-1+videos.length)%videos.length; renderVideo(); });
renderVideo();

document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

document.querySelectorAll("a,button").forEach(el => {
  el.addEventListener("mouseenter", () => { cursor.style.width="28px"; cursor.style.height="28px"; });
  el.addEventListener("mouseleave", () => { cursor.style.width="12px"; cursor.style.height="12px"; });
});

goTo(0);
