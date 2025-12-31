import React from 'react';
import type { Avatar } from '../../domain/avatar';

interface Props {
  name: string;
  avatar?: Avatar;
}

export const PlayerCard: React.FC<Props> = ({ name, avatar }) => (
  <article>
    <h3>{name}</h3>
    <p>{avatar ? `Avatar layers: ${avatar.layers.length}` : 'No avatar'}</p>
  </article>
);
