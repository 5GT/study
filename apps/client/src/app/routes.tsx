import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { config } from './config';
import { BootScene } from '../game/scenes/BootScene';
import { PreloadScene } from '../game/scenes/PreloadScene';
import { RoomScene } from '../game/scenes/RoomScene';
import { StoreProvider } from './store';
import { LiarGamePhase } from 'shared';

export const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game>();

  useEffect(() => {
    if (containerRef.current && !gameRef.current) {
      gameRef.current = new Phaser.Game({
        type: Phaser.AUTO,
        parent: containerRef.current,
        width: 320,
        height: 240,
        pixelArt: true,
        scene: [BootScene, PreloadScene, RoomScene]
      });
    }

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = undefined;
    };
  }, []);

  return (
    <StoreProvider initialPhase={LiarGamePhase.LOBBY}>
      <main>
        <h1>{config.title}</h1>
        <div ref={containerRef} />
      </main>
    </StoreProvider>
  );
};
