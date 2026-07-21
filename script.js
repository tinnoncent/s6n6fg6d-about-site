(() => {
  "use strict";

  const video = document.getElementById("backgroundVideo");

  async function playVideo() {
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");

    try {
      await video.play();
    } catch (_) {
      // Poster remains visible if autoplay is blocked.
    }
  }

  if (video.readyState >= 2) {
    playVideo();
  } else {
    video.addEventListener("loadeddata", playVideo, { once:true });
    video.addEventListener("canplay", playVideo, { once:true });
    video.load();
  }

  document.addEventListener("pointerdown", playVideo, {
    once:true,
    passive:true
  });

  document.addEventListener("touchstart", playVideo, {
    once:true,
    passive:true
  });
})();
