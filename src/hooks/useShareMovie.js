import { useCallback } from "react";
import toast from "react-hot-toast";

export function useShareMovie() {
  return useCallback(async (movie, rating = null) => {
    try {
      // 1️⃣ Determine poster URL
      let posterSrc = movie.posterUrl;
      if (!posterSrc && movie.poster_path) {
        posterSrc = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
      }
      if (!posterSrc) {
        toast.error("No poster image available to share.");
        return;
      }

      // 2️⃣ Preload images
      const loadImage = (src) =>
        new Promise((res, rej) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => res(img);
          img.onerror = () => rej(new Error(`Failed to load ${src}`));
          img.src = src;
        });

      const [posterImg, logoImg] = await Promise.all([
        loadImage(posterSrc),
        loadImage("/logo-cineo.svg"),
      ]);

      // 3️⃣ Dimensions
      const baseWidth = 600;
      const posterHeight = Math.round(
        (posterImg.height / posterImg.width) * baseWidth
      );
      const headerHeight = 180; // updated header height
      const footerHeight = 70; // fixed footer height
      const gradientHeight = 50;
      const totalHeight = headerHeight + posterHeight + footerHeight;

      // 4️⃣ Canvas setup for high DPI
      const scale = window.devicePixelRatio || 1;
      const canvas = document.createElement("canvas");
      canvas.width = baseWidth * scale;
      canvas.height = totalHeight * scale;
      canvas.style.width = `${baseWidth}px`;
      canvas.style.height = `${totalHeight}px`;
      const ctx = canvas.getContext("2d");
      ctx.scale(scale, scale);
      ctx.imageSmoothingQuality = "high";

      // Brand color
      const brandColor = "#671817";
      const brandRgba = (a) => `rgba(103,24,23,${a})`;
      const footerColor = "#24130e";
      const footerRgba = (a) => `rgba(36,19,14,${a})`;

      // 5️⃣ Draw header background
      ctx.fillStyle = brandColor;
      ctx.fillRect(0, 0, baseWidth, headerHeight);

      // Draw logo centered in header
      const logoMaxW = baseWidth * 0.6;
      const aspect = logoImg.width / logoImg.height;
      const logoW = logoMaxW;
      const logoH = logoMaxW / aspect;
      const logoX = (baseWidth - logoW) / 2;
      const logoY = (headerHeight - logoH) / 2;
      ctx.drawImage(logoImg, logoX, logoY, logoW, logoH);

      // 6️⃣ Draw poster image
      const posterY = headerHeight;
      ctx.drawImage(posterImg, 0, posterY, baseWidth, posterHeight);

      // 7️⃣ Overlay header-to-poster gradient (moved down to start at poster top)
      const topGrad = ctx.createLinearGradient(
        0,
        posterY,
        0,
        posterY + gradientHeight
      );
      topGrad.addColorStop(0, brandRgba(1));
      topGrad.addColorStop(1, brandRgba(0));
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, posterY, baseWidth, gradientHeight);

      // 8️⃣ Overlay poster-to-footer gradient
      const footerTop = headerHeight + posterHeight;
      const bottomGrad = ctx.createLinearGradient(
        0,
        footerTop - gradientHeight,
        0,
        footerTop
      );
      bottomGrad.addColorStop(0, footerRgba(0));
      bottomGrad.addColorStop(1, footerRgba(1));
      ctx.fillStyle = bottomGrad;
      ctx.fillRect(0, footerTop - gradientHeight, baseWidth, gradientHeight);

      // 9️⃣ Draw footer background
      ctx.fillStyle = footerColor;
      ctx.fillRect(0, footerTop, baseWidth, footerHeight);

      // 🔟 Draw title in footer
      ctx.fillStyle = "#fff";
      ctx.font = "bold 18px League Spartan, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText(movie.title, baseWidth / 2, footerTop + 8, baseWidth - 20);

      // 11️⃣ Draw stars below title
      const stars = "★".repeat(rating) + "☆".repeat(5 - rating);
      ctx.fillStyle = "#ffd700";
      ctx.font = "28px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText(stars, baseWidth / 2, footerTop + footerHeight - 8);

      // 12️⃣ Export & share
      const blob = await new Promise((res) =>
        canvas.toBlob(res, "image/png", 1)
      );
      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        toast.success("Image copied to clipboard!");
      } else {
        const dataUrl = canvas.toDataURL("image/png", 1);
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = `${movie.title
          .replace(/\s+/g, "_")
          .toLowerCase()}_share.png`;
        a.click();
        toast.success("Image downloaded!");
      }
    } catch (err) {
      console.error("Share image error:", err);
      toast.error("Failed to generate share image.");
    }
  }, []);
}
