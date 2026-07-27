import React, { useEffect, useRef } from 'react';

const TOTAL_FRAMES = 240;

export const FrameScrollCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const images: HTMLImageElement[] = [];
    let targetFrameIndex = 0;
    let currentFrameIndex = 0;
    let animationFrameId: number;

    // Helper to get frame image path
    const getFrameSrc = (index: number) => {
      const frameNum = String(index + 1).padStart(3, '0');
      return `/frames/frame_${frameNum}.jpg`;
    };

    // Preload all frames
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      images.push(img);
    }

    // High DPI Canvas resize handler
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      const frameToDraw = getNearestLoadedFrameIndex(currentFrameIndex);
      if (images[frameToDraw]) {
        drawFrame(images[frameToDraw]);
      }
    };

    // Render single frame with object-fit: cover logic
    const drawFrame = (img: HTMLImageElement) => {
      if (!img || !img.complete || img.naturalWidth === 0) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
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

    // Calculate target frame index from scroll position
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

    // Get nearest loaded frame index fallback
    const getNearestLoadedFrameIndex = (desiredIndex: number) => {
      let idx = Math.round(desiredIndex);
      idx = Math.max(0, Math.min(TOTAL_FRAMES - 1, idx));

      if (images[idx] && images[idx].complete && images[idx].naturalWidth > 0) {
        return idx;
      }

      for (let i = idx - 1; i >= 0; i--) {
        if (images[i] && images[i].complete && images[i].naturalWidth > 0) {
          return i;
        }
      }

      for (let i = idx + 1; i < TOTAL_FRAMES; i++) {
        if (images[i] && images[i].complete && images[i].naturalWidth > 0) {
          return i;
        }
      }

      return 0;
    };

    // Animation Loop
    const animate = () => {
      updateScrollTarget();
      currentFrameIndex += (targetFrameIndex - currentFrameIndex) * 0.15;

      const frameIndexToDraw = getNearestLoadedFrameIndex(currentFrameIndex);
      if (images[frameIndexToDraw]) {
        drawFrame(images[frameIndexToDraw]);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', updateScrollTarget, { passive: true });
    window.addEventListener('touchmove', updateScrollTarget, { passive: true });

    resizeCanvas();
    updateScrollTarget();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', updateScrollTarget);
      window.removeEventListener('touchmove', updateScrollTarget);
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
