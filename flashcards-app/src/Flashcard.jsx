import React, { useRef } from 'react';
import { motion } from 'motion/react';

const DRAG_THRESHOLD_PX = 4;

function renderInlineCode(text) {
  if (!text) return null;
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((p, i) => {
    if (p.length >= 2 && p.startsWith('`') && p.endsWith('`')) {
      return <code key={i} className="card-code">{p.slice(1, -1)}</code>;
    }
    return p;
  });
}

export default function Flashcard({ card, flipped, onFlip }) {
  const startPosRef = useRef(null);

  const handlePointerDown = (e) => {
    startPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleClick = (e) => {
    const start = startPosRef.current;
    startPosRef.current = null;
    if (!start) {
      onFlip();
      return;
    }
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.hypot(dx, dy) > DRAG_THRESHOLD_PX) return;
    onFlip();
  };

  return (
    <div
      className="card-stage"
      onPointerDown={handlePointerDown}
      onClick={handleClick}
    >
      <motion.div
        className="card-inner"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="card-face card-front">
          <div className="card-label">Q</div>
          <div className="card-text">{renderInlineCode(card.q)}</div>
        </div>
        <div className="card-face card-back">
          <div className="card-label">A</div>
          <div className="card-text">{renderInlineCode(card.a)}</div>
        </div>
      </motion.div>
    </div>
  );
}
