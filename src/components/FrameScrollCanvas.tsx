import React, { useEffect, useRef } from 'react';

const TOTAL_FRAMES = 240;

// Global persistent cache array to prevent garbage collection or network re-fetches
const GLOBAL_FRAME_CACHE: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);

export const FrameScrollCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

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

    // Load and decode single frame directly into GPU memory
    const loadAndDecodeFrame = async (index: number): Promise<HTMLImageElement | null> => {
      if (GLOBAL_FRAME_CACHE[index] && GLOBAL_FRAME_CACHE[index]?.complete) {
        return GLOBAL_FRAME_CACHE[index];
      }

      return new Promise((resolve) => {
        const img = new Image();
        img.src = getFrameSrc(index);

        const onDone = () => {
          GLOBAL_FRAME_CACHE[index] = img;
          resolve(img);
        };

        if (img.complete && img.naturalWidth > 0) {
          onDone();
        } else {
          img.onload = () => {
            if ('decode' in img) {
              img.decode().then(onDone).catch(onDone);
            } else {
              onDone();
            }
          };
          img.onerror = () => resolve(null);
        }
      });
    };

    // Concurrent Batch Preloading Pipeline
    const preloadAllBatches = async () => {
      const BATCH_SIZE = 24;

      // 1. High-Priority Batch 0 (First 24 frames for instant initial scroll playability)
      const priorityIndices = Array.from({ length: BATCH_SIZE }, (_, i) => i);
      await Promise.all(priorityIndices.map(i => loadAndDecodeFrame(i)));

      // Render initial frame zero immediately
      if (GLOBAL_FRAME_CACHE[0]) {
        drawFrame(GLOBAL_FRAME_CACHE[0]!);
      }

      // 2. Asynchronously preload remaining frames in parallel batches
      for (let start = BATCH_SIZE; start < TOTAL_FRAMES; start += BATCH_SIZE) {
        const batchIndices = Array.from(
          { length: Math.min(BATCH_SIZE, TOTAL_FRAMES - start) },
          (_, i) => start + i
        );
        await Promise.all(batchIndices.map(i => loadAndDecodeFrame(i)));
      }
    };

    // High DPI Canvas resize handler
    const resizeCanvas = () => {
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;

      // Ignore mobile URL bar height toggle shifts
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
      if (GLOBAL_FRAME_CACHE[frameToDraw]) {
        drawFrame(GLOBAL_FRAME_CACHE[frameToDraw]!);
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

    // Calculate target frame index based on scroll position
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

    // Nearest loaded frame index fallback to guarantee zero black screens
    const getNearestLoadedFrameIndex = (desiredIndex: number) => {
      let idx = Math.round(desiredIndex);
      idx = Math.max(0, Math.min(TOTAL_FRAMES - 1, idx));

      if (GLOBAL_FRAME_CACHE[idx] && GLOBAL_FRAME_CACHE[idx]?.complete && GLOBAL_FRAME_CACHE[idx]?.naturalWidth! > 0) {
        return idx;
      }

      for (let i = idx - 1; i >= 0; i--) {
        if (GLOBAL_FRAME_CACHE[i] && GLOBAL_FRAME_CACHE[i]?.complete && GLOBAL_FRAME_CACHE[i]?.naturalWidth! > 0) {
          return i;
        }
      }

      for (let i = idx + 1; i < TOTAL_FRAMES; i++) {
        if (GLOBAL_FRAME_CACHE[i] && GLOBAL_FRAME_CACHE[i]?.complete && GLOBAL_FRAME_CACHE[i]?.naturalWidth! > 0) {
          return i;
        }
      }

      return 0;
    };

    // Ultra-smooth 60fps Lerp Loop with GPU Frame Repaint
    const animate = () => {
      updateScrollTarget();
      currentFrameIndex += (targetFrameIndex - currentFrameIndex) * 0.18;

      const frameIndexToDraw = getNearestLoadedFrameIndex(currentFrameIndex);

      if (frameIndexToDraw !== lastDrawnFrameIndex) {
        const imgToDraw = GLOBAL_FRAME_CACHE[frameIndexToDraw];
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

    // Initial canvas dimensions setup
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    preloadAllBatches();
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
