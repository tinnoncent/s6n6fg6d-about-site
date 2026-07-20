(() => {
  const root = document.documentElement;
  window.addEventListener("pointermove", (e) => {
    root.style.setProperty("--mx", `${e.clientX}px`);
    root.style.setProperty("--my", `${e.clientY}px`);
  }, { passive: true });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".portal, footer").forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });

  const sendHeight = () => {
    const height = Math.ceil(document.documentElement.scrollHeight);
    window.parent?.postMessage({ type: "resize", height }, "*");
  };

  new ResizeObserver(sendHeight).observe(document.documentElement);
  window.addEventListener("load", sendHeight);
  document.fonts?.ready.then(sendHeight);
  [100, 400, 1000, 2200].forEach((delay) => setTimeout(sendHeight, delay));
})();
