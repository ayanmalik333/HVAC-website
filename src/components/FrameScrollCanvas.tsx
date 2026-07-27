import React, { useEffect, useRef } from 'react';

const TOTAL_FRAMES = 240;

export const FrameScrollCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const images: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
    let targetFrameIndex = 0;
    let currentFrameIndex = 0;
    let lastDrawnFrameIndex = -1;
    let animationFrameId: number;
    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;

    // Helper to format frame source path
    const getFrameSrc = (index: number) => {
      const frameNum = String(index + 1).padStart(3, '0');
      return `/frames/frame_${frameNum}.jpg`;
    };

    // Preload image frame by index
    const loadFrame = (index: number) => {
      if (images[index]) return images[index]!;
      const img = new Image();
      img.src = getFrameSrc(index);
      images[index] = img;
      return img;
    };

    // Preload critical initial frames first, then load rest asynchronously
    const frameZero = loadFrame(0);
    frameZero.onload = () => {
      drawFrame(frameZero);
    };

    // Batch load remaining frames in background
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      loadFrame(i);
    }

    // High DPI Canvas resize handler (ignores small mobile address bar height shifts)
    const resizeCanvas = () => {
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;

      // Ignore mobile address bar height toggles if width hasn't changed
      if (currentWidth === lastWidth && Math.abs(currentHeight - lastHeight) < 80) {
        return;
      }

      lastWidth = currentWidth;
      lastHeight = currentHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = currentWidth * dpr;
      canvas.height = currentHeight * dpr;
      
      lastDrawnFrameIndex = -1; // Force repaint
      const frameToDraw = getNearestLoadedFrameIndex(currentFrameIndex);
      if (images[frameToDraw]) {
        drawFrame(images[frameToDraw]!);
      }
    };

    // Render single frame with high-performance object-fit: cover
    const drawFrame = (img: HTMLImageElement) => {
      if (!img || !img.complete || img.naturalWidth === 0) return;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;
      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = canvas.width / canvas.height;

      let drawWidth: number;
      let drawHeight: number;
      let offsetX: number;
      let offsetY: number;

      if (canvasRatio > imgRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgRatio;
        drawHeight = canvas.height;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Calculate target frame index based on page scroll position
    const updateScrollTarget = () => {
      const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        document.documentElement.offsetHeight,
        document.body.offsetHeight
      );
      const maxScroll = scrollHeight - window.innerHeight;

      if (maxScroll > 0) {
        const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScroll));
        targetFrameIndex = scrollFraction * (TOTAL_FRAMES - 1);
      }
    };

    // Fallback to nearest loaded frame if current frame is buffering
    const getNearestLoadedFrameIndex = (desiredIndex: number) => {
      let idx = Math.round(desiredIndex);
      idx = Math.max(0, Math.min(TOTAL_FRAMES - 1, idx));

      if (images[idx] && images[idx]?.complete && images[idx]?.naturalWidth! > 0) {
        return idx;
      }

      for (let i = idx - 1; i >= 0; i--) {
        if (images[i] && images[i]?.complete && images[i]?.naturalWidth! > 0) {
          return i;
        }
      }

      for (let i = idx + 1; i < TOTAL_FRAMES; i++) {
        if (images[i] && images[i]?.complete && images[i]?.naturalWidth! > 0) {
          return i;
        }
      }

      return 0;
    };

    // Smooth Lerp Animation Loop with Dirty Checking
    const animate = () => {
      updateScrollTarget();
      currentFrameIndex += (targetFrameIndex - currentFrameIndex) * 0.18;

      const frameIndexToDraw = getNearestLoadedFrameIndex(currentFrameIndex);

      if (frameIndexToDraw !== lastDrawnFrameIndex) {
        const imgToDraw = images[frameIndexToDraw];
        if (imgToDraw && imgToDraw.complete && imgToDraw.naturalWidth > 0) {
          drawFrame(imgToDraw);
          lastDrawnFrameIndex = frameIndexToDraw;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Event Listeners
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', updateScrollTarget, { passive: true });
    window.addEventListener('touchmove', updateScrollTarget, { passive: true });
    window.addEventListener('load', updateScrollTarget, { passive: true });

    // Initial setup
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    updateScrollTarget();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', updateScrollTarget);
      window.removeEventListener('touchmove', updateScrollTarget);
      window.removeEventListener('load', updateScrollTarget);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-0 block"
    />
  );
};
