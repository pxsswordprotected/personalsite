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
      <a href="/" className="fc-home">
        Home
      </a>
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
            width="10"
            height="10"
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
            <span className="fc-counter">
              {`[${String(idx + 1).padStart(2, "0")}/${String(visibleCards.length).padStart(2, "0")}]`}
            </span>
            <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M8 2v8m0 0l-3-3m3 3l3-3M2 13h12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
      <details className="fc-about">
        <summary>
          <span className="fc-about-toggle" aria-hidden="true" />
          <span className="fc-about-text">About</span>
        </summary>
        <div className="fc-about-body">
          <p>
            These are my personal decks of flashcards I use to memorize and
            retain concepts that are important to me. I use these flashcards in
            Anki with a spaced repetition algorithm that works best for my
            personal situation. Feel free to download any deck as the markdown
            file is normalized into a nice format so you can import it into any
            service you want.
          </p>
          <hr className="fc-about-divider" />
          <p className="fc-about-q">Q: Why even use flashcards?</p>
          <div className="fc-about-a">
            <p>
              A: To quote Justin Skycak from{" "}
              <em>Advice on Upskilling</em>:
            </p>
            <blockquote className="fc-about-quote">
              <p>
                At the end of the day, learning is memory. Understanding amounts
                to memory that is well-connected and deeply ingrained. The
                difference between "just memorizing" and "deeply understanding"
                isn't the substrate of the representation, it's the depth of the
                representation.
              </p>
              <p>
                Deep understanding consists of not only declarative facts, but
                also connections that link facts into related groups or "chunks"
                (think: concepts), connections that link smaller chunks into
                bigger chunks, and so on -- as well as procedures for operating
                on chunks (think: skills), connections that chunk sub-procedures
                into meta-procedures, and so on.
              </p>
              <p>
                This is all raw mechanical memory. It's just storage and
                retrieval of information. The point of building superior
                representation is to build superior recall abilities, including
                broadening and fine-tuning the range of stimuli that activate
                the information. If someone is "just memorizing" as opposed to
                "deeply understanding," it really means they haven't stored
                enough information in memory.
              </p>
              <p>
                "Learning is memory" might feel obvious, but many learners don't
                fully grasp the implications. If you don't realize that learning
                is memory, then you won't realize that the most effective way to
                learn is to use memory-supporting training techniques.
              </p>
              <p>
                It's easy to get confused, thinking: "Truly understanding
                something is different from just memorizing it, so learning
                doesn't require memory-focused techniques like retrieval
                practice, spaced review, and interleaving (mixed practice).
                Those are about memorization, not true understanding." And if
                that's what you think, then you'll likely shirk the hard work
                required to build memory, use fun/easy but ineffective training
                techniques instead, and end up not actually learning much.
              </p>
              <p>
                I used to think resistance to "learning is memory" was genuine
                confusion, but now I think it's mostly laziness. If you accept
                that learning is memory, then you have to accept that maximizing
                learning requires memory-supporting training techniques. But
                those techniques are highly effortful and measurable, which make
                them unattractive to low-accountability / low-effort folks. The
                only way to reject the premise is to latch onto the idea that
                "understanding" is some supernatural thing that can't arise from
                raw mechanical memory. Which is problematic because there's
                decades of research showing how expertise arises from having
                lots of domain-specific information encoded into memory that is
                well-connected and deeply ingrained.
              </p>
              <p>
                (A response to the most common genuine objection: Even learning
                to generate new ideas amounts to searching a space of
                possibilities, combining pieces of memory in ways that haven't
                been combined before. Now you might say "aha, the skill of
                searching/combining is something other than memory," but let me
                ask you: when a someone trains the skill of coming up with novel
                ideas, such as a grad student learning to come up with research
                ideas that contribute to the cutting edge of knowledge in the
                field, where is that skill stored for future use? In memory.)
              </p>
            </blockquote>
          </div>
        </div>
      </details>
    </div>
  );
}
