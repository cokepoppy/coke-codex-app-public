const slides = [
  {
    src: "../assets/sandbox/dingtalk-fin-expert.png",
    alt: "钉钉群聊中的金融专家 Agent 任务卡片",
    title: "钉钉金融专家任务卡片",
    caption: "钉钉金融专家完成卡片，交付物入口优先展示。"
  },
  {
    src: "../assets/sandbox/dingtalk-fin-expert2.png",
    alt: "钉钉卡片中的 HTML 报告和沙箱路径",
    title: "钉钉交付物入口",
    caption: "钉钉卡片中的 HTML 报告与 sandbox 路径，用户先看到结果和打开方式。"
  },
  {
    src: "../assets/sandbox/dingtalk-fin-expert3.png",
    alt: "Coke Codex Web 打开云端沙箱项目",
    title: "Web 沙箱项目",
    caption: "从群聊跳转到 Coke Codex Web，打开同一个云端沙箱项目。"
  },
  {
    src: "../assets/sandbox/dingtalk-fin-expert4.png",
    alt: "Coke Codex Web 右侧文件树和 HTML 报告预览",
    title: "文件树与报告预览",
    caption: "右侧文件树和 HTML 预览承接桌面端交互，团队可以继续检查产物。"
  },
  {
    src: "../assets/sandbox/dingtalk-fin-expert5.png",
    alt: "MSFT 股票研究报告在云端沙箱渲染",
    title: "金融报告渲染",
    caption: "MSFT 股票研究报告在云端沙箱里渲染，最终产物不挤占群聊。"
  },
  {
    src: "../assets/sandbox/feishu.png",
    alt: "飞书群聊中 @ Coke Codex Agent",
    title: "飞书群聊入口",
    caption: "飞书群聊 @ Agent，群消息成为任务入口。"
  },
  {
    src: "../assets/sandbox/feishu2.png",
    alt: "飞书交付物卡片和浏览器链接",
    title: "飞书交付物卡片",
    caption: "飞书返回简洁任务卡片，产物和浏览器链接清晰露出。"
  },
  {
    src: "../assets/sandbox/feishu3.png",
    alt: "飞书任务回到 Coke Codex Web 沙箱",
    title: "飞书到 Web 沙箱",
    caption: "飞书任务可以回到 Coke Codex Web 沙箱继续查看、修改和复用。"
  }
];

const carouselImage = document.querySelector("[data-carousel-image]");
const heroImage = document.querySelector("[data-hero-image]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const title = document.querySelector("[data-slide-title]");
const caption = document.querySelector("[data-slide-caption]");
const heroCaption = document.querySelector("[data-hero-caption]");
const count = document.querySelector("[data-slide-count]");
const lightboxTitle = document.querySelector("[data-lightbox-title]");
const lightboxCount = document.querySelector("[data-lightbox-count]");
const dots = document.querySelector("[data-dots]");
const lightbox = document.querySelector("[data-lightbox]");

let active = 0;

function setImage(image, slide) {
  image.src = slide.src;
  image.alt = slide.alt;
}

function render(nextIndex) {
  active = (nextIndex + slides.length) % slides.length;
  const slide = slides[active];

  setImage(carouselImage, slide);
  setImage(heroImage, slide);
  setImage(lightboxImage, slide);
  title.textContent = slide.title;
  caption.textContent = slide.caption;
  heroCaption.textContent = slide.caption;
  count.textContent = `${active + 1} / ${slides.length}`;
  lightboxTitle.textContent = slide.title;
  lightboxCount.textContent = `${active + 1} / ${slides.length}`;

  Array.from(dots.children).forEach((dot, index) => {
    dot.classList.toggle("is-active", index === active);
    dot.setAttribute("aria-current", index === active ? "true" : "false");
  });
}

function next() {
  render(active + 1);
}

function previous() {
  render(active - 1);
}

function openLightbox() {
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

slides.forEach((slide, index) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", `查看截图：${slide.title}`);
  dot.addEventListener("click", () => render(index));
  dots.appendChild(dot);
});

document.querySelectorAll("[data-next], [data-next-image], [data-hero-next]").forEach((button) => {
  button.addEventListener("click", next);
});

document.querySelectorAll("[data-prev]").forEach((button) => {
  button.addEventListener("click", previous);
});

document.querySelectorAll("[data-open-current]").forEach((button) => {
  button.addEventListener("click", openLightbox);
});

document.querySelector("[data-close-lightbox]").addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") next();
  if (event.key === "ArrowLeft") previous();
  if (event.key === "Escape") closeLightbox();
});

render(0);
