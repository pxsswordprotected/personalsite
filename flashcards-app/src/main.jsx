import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

const root = document.getElementById('flashcards-root');
if (root) {
  const manifestUrl = root.dataset.manifest || '/assets/flashcards/cards/index.json';
  createRoot(root).render(<App manifestUrl={manifestUrl} />);
}
