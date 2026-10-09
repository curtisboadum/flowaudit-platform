// Film grain + vignette overlay — apply ONCE at Master level (map-scenes.md §5).
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {system} from './sceneSystem';

export const Grain: React.FC<{opacity?: number; vignette?: number}> = ({
  opacity = system.grain.opacity,
  vignette = system.grain.vignette,
}) => {
  const frame = useCurrentFrame();
  const seed = Math.floor(frame / system.grain.stepFrames); // step every 2 frames — filmic, not video-noisy
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <svg width="100%" height="100%">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency={system.grain.baseFrequency} numOctaves={system.grain.octaves} seed={seed} />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)"
          opacity={opacity} style={{mixBlendMode: 'overlay'}} />
      </svg>
      <AbsoluteFill style={{
        background: `radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,${vignette}) 100%)`,
      }} />
    </AbsoluteFill>
  );
};
