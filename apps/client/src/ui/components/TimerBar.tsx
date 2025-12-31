import React from 'react';

interface Props {
  remaining: number;
  total: number;
}

export const TimerBar: React.FC<Props> = ({ remaining, total }) => {
  const width = Math.max(0, Math.min(remaining / total, 1)) * 100;
  return (
    <div style={{ border: '1px solid #999', width: '100%', height: 12 }}>
      <div style={{ background: '#00ff99', width: `${width}%`, height: '100%' }} />
    </div>
  );
};
