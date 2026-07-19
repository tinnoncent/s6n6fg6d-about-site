(() => {
  const root = document.documentElement;
  const body = document.body;

  function currentHeight() {
    return Math.max(
      body.scrollHeight,
      body.offsetHeight,
      root.clientHeight,
      root.scrollHeight,
      root.offsetHeight
    );
  }

  let lastHeight = 0;
  let resizeFrame = 0;

  function sendResize() {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => {
      const height = Math.ceil(currentHeight());
      if (height === lastHeight) return;
      lastHeight = height;
      window.parent.postMessage({ type: "resize", height }, "*");
    });
  }

  window.addEventListener("load", sendResize);
  window.addEventListener("resize", sendResize);
  document.fonts?.ready.then(sendResize);

  if ("ResizeObserver" in window) {
    const observer = new ResizeObserver(sendResize);
    observer.observe(body);
    observer.observe(root);
  } else {
    setInterval(sendResize, 1000);
  }

  const revealItems = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        sendResize();
      }
    });
  }, { threshold: 0.08 });

  revealItems.forEach((item) => revealObserver.observe(item));

  document.querySelectorAll("[data-placeholder-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (link.getAttribute("href") === "#") event.preventDefault();
    });
  });

  setTimeout(sendResize, 100);
  setTimeout(sendResize, 500);
  setTimeout(sendResize, 1500);
})();
