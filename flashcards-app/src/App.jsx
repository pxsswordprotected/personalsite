import React, { useEffect, useState, useCallback, useMemo } from "react";
import Flashcard from "./Flashcard.jsx";
import { parseCards } from "./parseCards.js";

const ALL_DECKS = "__all__";

function normalizeDeckEntry(entry) {
  if (typeof entry === "string")
    return { name: entry.replace(/\.md$/i, ""), file: entry };
  return { name: entry.name || entry.file, file: entry.file };
}

export default function App({ manifestUrl }) {
  const [decks, setDecks] = useState([]);
  const [status, setStatus] = useState("loading");
  const [selectedDeck, setSelectedDeck] = useState(ALL_DECKS);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const manifestRes = await fetch(manifestUrl);
        if (!manifestRes.ok) throw new Error(`manifest ${manifestRes.status}`);
        const manifest = await manifestRes.json();
        const entries = (manifest.decks || []).map(normalizeDeckEntry);
        const base = manifestUrl.replace(/[^/]+$/, "");
        const loaded = [];
        for (const { name, file } of entries) {
          const r = await fetch(base + file);
          if (!r.ok) continue;
          const text = await r.text();
          loaded.push({ name, file, cards: parseCards(text, file) });
        }
        if (!cancelled) {
          setDecks(loaded);
          const total = loaded.reduce((n, d) => n + d.cards.length, 0);
          setStatus(total ? "ready" : "empty");
          if (loaded.length === 1) {
            setSelectedDeck(loaded[0].name);
          }
        }
      } catch (e) {
        if (!cancelled) setStatus("error");
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [manifestUrl]);

  const currentDeck = useMemo(() => {
    if (selectedDeck === ALL_DECKS) return null;
    return decks.find((d) => d.name === selectedDeck) || null;
  }, [decks, selectedDeck]);

  const visibleCards = useMemo(() => {
    if (selectedDeck === ALL_DECKS) return decks.flatMap((d) => d.cards);
    return currentDeck ? currentDeck.cards : [];
  }, [decks, currentDeck, selectedDeck]);

  const handleDownload = useCallback(() => {
    if (!currentDeck) return;
    const content =
      currentDeck.cards.map((c) => `Q: ${c.q}\nA: ${c.a}`).join("\n\n") + "\n";
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = currentDeck.file.replace(/\.[^.]+$/, "") + ".md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [currentDeck]);

  const next = useCallback(() => {
    setFlipped(false);
    setIdx((i) => (visibleCards.length ? (i + 1) % visibleCards.length : 0));
  }, [visibleCards.length]);

  const prev = useCallback(() => {
    setFlipped(false);
    setIdx((i) =>
      visibleCards.length
        ? (i - 1 + visibleCards.length) % visibleCards.length
        : 0,
    );
  }, [visibleCards.length]);

  const flip = useCallback(() => setFlipped((f) => !f), []);

  const onDeckChange = useCallback((e) => {
    setSelectedDeck(e.target.value);
    setIdx(0);
    setFlipped(false);
  }, []);

  useEffect(() => {
    function onKey(e) {
      const tag = (e.target && e.target.tagName) || "";
      if (tag === "SELECT" || tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === " ") {
        e.preventDefault();
        flip();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, flip]);

  if (status === "loading")
    return <div className="fc-message">Loading cards…</div>;
  if (status === "error")
    return <div className="fc-message">Could not load cards.</div>;
  if (status === "empty")
    return <div className="fc-message">No cards yet.</div>;

  const card = visibleCards[idx];

  return (
    <div className="fc-app">
      <div className="fc-toolbar">
        <div className="fc-deck">
          <select
            className="fc-select"
            value={selectedDeck}
            onChange={onDeckChange}
            aria-label="Choose deck"
          >
            {decks.length > 1 && <option value={ALL_DECKS}>All</option>}
            {decks.map((d) => (
              <option key={d.name} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
          <svg
            className="fc-chevron"
            width="8"
            height="5"
            viewBox="0 0 8 5"
            aria-hidden="true"
          >
            <path d="M1 1l3 3 3-3" fill="none" stroke="currentColor" />
          </svg>
        </div>
        {currentDeck && visibleCards.length > 0 ? (
          <button
            type="button"
            className="fc-counter-wrap"
            onClick={handleDownload}
            aria-label={`Download ${currentDeck.name} deck`}
            title={`Download ${currentDeck.file}`}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M8 2v8m0 0l-3-3m3 3l3-3M2 13h12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="fc-counter">
              {`[${String(idx + 1).padStart(2, "0")}/${String(visibleCards.length).padStart(2, "0")}]`}
            </span>
          </button>
        ) : (
          <div className="fc-counter-wrap">
            <span className="fc-counter">
              {visibleCards.length
                ? `[${String(idx + 1).padStart(2, "0")}/${String(visibleCards.length).padStart(2, "0")}]`
                : "[ no cards ]"}
            </span>
          </div>
        )}
      </div>
      {card && <Flashcard card={card} flipped={flipped} onFlip={flip} />}
      <div className="fc-controls">
        <button
          onClick={prev}
          aria-label="Previous card"
          disabled={!visibleCards.length}
        >
          ←
        </button>
        <button
          onClick={flip}
          aria-label="Flip card"
          disabled={!visibleCards.length}
        >
          FLIP
        </button>
        <button
          onClick={next}
          aria-label="Next card"
          disabled={!visibleCards.length}
        >
          →
        </button>
      </div>
    </div>
  );
}
