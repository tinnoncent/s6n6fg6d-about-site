(() => {
  "use strict";
  const SHOP_URL = "https://s6n6fg6d.com/collections/all";
  const body = document.body;
  const video = document.querySelector(".world-video");
  const button = document.getElementById("dropButton");

  button.href = SHOP_URL;

  const reveal = () => window.setTimeout(() => body.classList.add("is-ready"), 450);
  if (video.readyState >= 2) reveal();
  else {
    video.addEventListener("canplay", reveal, { once: true });
    window.setTimeout(reveal, 2000);
  }

  try {
    const sendHeight = () => window.parent.postMessage(
      { type: "s6n-frame-height", page: "about", height: document.documentElement.scrollHeight },
      "https://s6n6fg6d.com"
    );
    new ResizeObserver(sendHeight).observe(document.documentElement);
    sendHeight();
  } catch (_) {}
})();
