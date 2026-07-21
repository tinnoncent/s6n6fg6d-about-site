(() => {
  "use strict";

  const SHOP_URL = "https://s6n6fg6d.com/collections/all";
  const body = document.body;
  const video = document.querySelector(".world-video");
  const button = document.getElementById("dropButton");
  button.href = SHOP_URL;

  let revealed = false;
  const reveal = () => {
    if (revealed) return;
    revealed = true;
    window.setTimeout(() => body.classList.add("is-ready"), 250);
  };

  const forcePlayback = async () => {
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    try {
      await video.play();
      body.classList.remove("playback-blocked");
    } catch (_) {
      body.classList.add("playback-blocked");
    }
    reveal();
  };

  video.addEventListener("loadeddata", forcePlayback, { once: true });
  video.addEventListener("canplay", forcePlayback, { once: true });
  video.addEventListener("playing", reveal);
  video.addEventListener("error", () => {
    body.classList.add("video-error");
    reveal();
  });

  if (video.readyState >= 2) forcePlayback();
  else {
    video.load();
    window.setTimeout(forcePlayback, 900);
    window.setTimeout(reveal, 2200);
  }

  document.addEventListener("pointerdown", forcePlayback, { once: true, passive: true });
  document.addEventListener("touchstart", forcePlayback, { once: true, passive: true });

  try {
    const sendHeight = () => window.parent.postMessage(
      { type: "s6n-frame-height", page: "about", height: document.documentElement.scrollHeight },
      "https://s6n6fg6d.com"
    );
    new ResizeObserver(sendHeight).observe(document.documentElement);
    sendHeight();
  } catch (_) {}
})();