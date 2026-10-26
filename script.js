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


const langBtn = document.getElementById("langBtn");
let language = "es";

const translations = {
  es: {
    meta: "Portfolio de Tobías Osaran — programación, edición de video y contenido digital.",
    nav: ["Inicio", "Sobre mí", "Proyectos", "Videos", "Skills", "Contacto"],
    eyebrow: ["PORTFOLIO · 2026", "SOBRE MÍ", "PROYECTOS ACTUALES", "EDICIÓN · INSTAGRAM", "HABILIDADES", "CONTACTO"],
    heroTitle: "Hola, soy<br><span>Tobías Osaran.</span>",
    heroText: "Estudiante de programación y creador de contenido. Construyo proyectos, edito videos y sigo aprendiendo algo nuevo en cada etapa.",
    explore: "Explorar portfolio",
    watch: "Ver mis videos",
    hint: "DESLIZÁ PARA EXPLORAR",
    aboutTitle: "Programar.<br><span>Crear.</span><br>Mejorar.",
    about: [
      "Mi nombre es Tobías Osaran. Soy estudiante de la Tecnicatura Universitaria en Programación (TUP) en la UTN.",
      "Me interesa el desarrollo de software, la lógica, el código limpio y resolver problemas de forma práctica.",
      "Fuera de la programación también trabajo con contenido digital, especialmente edición de videos cortos para redes sociales."
    ],
    stats: ["TUP · Programación", ".NET · POO", "Aplicaciones · Lógica", "Short-form · CapCut"],
    projectsTitle: "Lo que estoy<br><span>haciendo.</span>",
    projects: [
      ["Programación", "Proyectos académicos y personales mientras avanzo en la Tecnicatura Universitaria en Programación."],
      ["Edición de video", "Edición de Shorts para mi canal de YouTube y contenido para mi página de Instagram."],
      ["Próximamente", "Nuevos proyectos de desarrollo web, herramientas personales y automatización."]
    ],
    videoTitle: "Mis <span>videos.</span>",
    videoNote: "Una selección de Shorts producidos y editados con CapCut.",
    videoType: "Instagram Reel",
    videoAction: "Ver video ↗",
    skillsTitle: "Herramientas<br><span>que uso.</span>",
    skillLabels: ["Programación", "POO · Consola", "Web · GitHub Pages", "Edición · Shorts"],
    skillNote: "Aprender constantemente es parte del proceso.",
    contactTitle: "Hablemos de<br><span>lo próximo.</span>",
    contactText: "Si querés conocer más sobre mis proyectos o mi trabajo de edición, podés encontrarme en mis redes.",
    copyright: "© 2026 Tobías Osaran · Portfolio",
    videoEyebrow: "EDICIÓN · INSTAGRAM",
    skillsEyebrow: "HABILIDADES",
    contactEyebrow: "CONTACTO",
    videoTag: "SHORT-FORM VIDEO"
  },
  en: {
    meta: "Tobías Osaran's portfolio — programming, video editing, and digital content.",
    nav: ["Home", "About", "Projects", "Videos", "Skills", "Contact"],
    eyebrow: ["PORTFOLIO · 2026", "ABOUT ME", "CURRENT PROJECTS", "EDITING · INSTAGRAM", "SKILLS", "CONTACT"],
    heroTitle: "Hi, I'm<br><span>Tobías Osaran.</span>",
    heroText: "Programming student and content creator. I build projects, edit videos, and keep learning something new at every stage.",
    explore: "Explore portfolio",
    watch: "Watch my videos",
    hint: "SCROLL TO EXPLORE",
    aboutTitle: "Code.<br><span>Create.</span><br>Improve.",
    about: [
      "My name is Tobías Osaran. I'm a student of the University Technical Degree in Programming (TUP) at UTN.",
      "I'm interested in software development, logic, clean code, and solving problems in practical ways.",
      "Outside programming, I also work with digital content, especially editing short videos for social media."
    ],
    stats: ["TUP · Programming", ".NET · OOP", "Applications · Logic", "Short-form · CapCut"],
    projectsTitle: "What I'm<br><span>working on.</span>",
    projects: [
      ["Programming", "Academic and personal projects as I progress through my University Technical Degree in Programming."],
      ["Video editing", "Editing Shorts for my YouTube channel and creating content for my Instagram page."],
      ["Coming soon", "New web development projects, personal tools, and automation."]
    ],
    videoTitle: "My <span>videos.</span>",
    videoNote: "A selection of Shorts produced and edited with CapCut.",
    videoType: "Instagram Reel",
    videoAction: "Watch video ↗",
    skillsTitle: "Tools<br><span>I use.</span>",
    skillLabels: ["Programming", "OOP · Console", "Web · GitHub Pages", "Editing · Shorts"],
    skillNote: "Continuous learning is part of the process.",
    contactTitle: "Let's talk about<br><span>what's next.</span>",
    contactText: "To learn more about my projects or video editing work, you can find me on my social media.",
    copyright: "© 2026 Tobías Osaran · Portfolio",
    videoEyebrow: "EDITING · INSTAGRAM",
    skillsEyebrow: "SKILLS",
    contactEyebrow: "CONTACT",
    videoTag: "SHORT-FORM VIDEO"
  }
};

function setLanguage(nextLanguage) {
  language = nextLanguage;
  const t = translations[language];
  document.documentElement.lang = language;
  document.title = language === "es" ? "Tobías Osaran — Portfolio" : "Tobías Osaran — Portfolio";
  document.getElementById("metaDescription").content = t.meta;
  langBtn.textContent = language === "es" ? "ES / EN" : "EN / ES";

  navButtons.forEach((button, i) => button.textContent = t.nav[i]);
  document.querySelectorAll(".eyebrow").forEach((el, i) => {
    if (i < t.eyebrow.length) el.textContent = t.eyebrow[i];
  });

  document.querySelector(".hero-copy h1").innerHTML = t.heroTitle;
  document.querySelector(".hero-text").textContent = t.heroText;
  document.querySelector('[data-target="projects"].primary').innerHTML = `${t.explore} <span>→</span>`;
  document.querySelector('[data-target="videos"].ghost').textContent = t.watch;
  document.querySelector(".scroll-hint").innerHTML = `${t.hint} <span>→</span>`;

  document.querySelector(".about h2").innerHTML = t.aboutTitle;
  document.querySelectorAll(".about-copy p").forEach((p, i) => p.textContent = t.about[i]);
  document.querySelectorAll(".about-side .stat span").forEach((el, i) => el.textContent = t.stats[i]);

  document.querySelector(".projects h2").innerHTML = t.projectsTitle;
  document.querySelectorAll(".project-card h3").forEach((el, i) => el.textContent = t.projects[i][0]);
  document.querySelectorAll(".project-card p").forEach((el, i) => el.textContent = t.projects[i][1]);

  document.querySelector(".video-heading h2").innerHTML = t.videoTitle;
  document.querySelector(".video-note").textContent = t.videoNote;
  document.querySelector(".video-placeholder p").textContent = t.videoType;
  document.querySelector("#videoLink").textContent = t.videoAction;
  document.querySelector(".video-meta span").textContent = t.videoTag;

  document.querySelector(".skills h2").innerHTML = t.skillsTitle;
  document.querySelectorAll(".skill span").forEach((el, i) => el.textContent = t.skillLabels[i]);
  document.querySelector(".skill-note p").textContent = t.skillNote;

  document.querySelector(".contact h2").innerHTML = t.contactTitle;
  document.querySelector(".contact-inner > p:not(.eyebrow)").textContent = t.contactText;
  document.querySelector(".contact small").textContent = t.copyright;
}

langBtn.addEventListener("click", () => setLanguage(language === "es" ? "en" : "es"));

setLanguage("es");
goTo(0);
