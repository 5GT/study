import React from 'react';
import type { Placement } from '../../domain/room';

interface Props {
  objects: Placement[];
  onSelect: (placement: Placement) => void;
}

export const ObjectPalette: React.FC<Props> = ({ objects, onSelect }) => (
  <section>
    <h3>Objects</h3>
    <ul>
      {objects.map((object) => (
        <li key={object.id}>
          <button onClick={() => onSelect(object)}>{object.type}</button>
        </li>
      ))}
    </ul>
  </section>
);
