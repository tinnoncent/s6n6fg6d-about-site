
(() => {
  const wordmark = document.querySelector(".wordmark");

  const glitch = () => {
    if (!wordmark) return;
    wordmark.classList.add("is-glitching");
    window.setTimeout(() => wordmark.classList.remove("is-glitching"), 520);
  };

  glitch();
  window.setInterval(glitch, 6200);

  const sendHeight = () => {
    const height = Math.ceil(document.documentElement.scrollHeight);
    window.parent?.postMessage({ type: "resize", height }, "*");
  };

  window.addEventListener("load", sendHeight, { once: true });
  window.addEventListener("resize", sendHeight);
  document.fonts?.ready.then(sendHeight);

  if ("ResizeObserver" in window) {
    new ResizeObserver(sendHeight).observe(document.documentElement);
  }

  [120, 500, 1200].forEach((delay) => window.setTimeout(sendHeight, delay));
})();
