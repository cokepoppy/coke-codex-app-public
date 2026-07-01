const slides = Array.from(document.querySelectorAll(".slide"));
const dotsRoot = document.querySelector("[data-dots]");
let active = 0;

function render(index) {
  active = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === active);
  });
  Array.from(dotsRoot.children).forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === active);
    dot.setAttribute("aria-current", dotIndex === active ? "true" : "false");
  });
}

slides.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", `查看截图 ${index + 1}`);
  dot.addEventListener("click", () => render(index));
  dotsRoot.appendChild(dot);
});

slides.forEach((slide) => {
  slide.querySelector("img").addEventListener("click", () => render(active + 1));
});

document.querySelector("[data-prev]").addEventListener("click", () => render(active - 1));
document.querySelector("[data-next]").addEventListener("click", () => render(active + 1));

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") render(active - 1);
  if (event.key === "ArrowRight") render(active + 1);
});

render(0);
