import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import TagButton from "../../ui/TagButton";
import SearchPeopleInput from "./SearchPeopleInput";
import useSelectable from "../../hooks/useSelectable";
import useDebounce from "../../hooks/useDebounce";

const quick = {
  Directors: ["Christopher Nolan", "Denis Villeneuve", "Quentin Tarantino"],
  Actors: ["Scarlett Johansson", "Leonardo DiCaprio", "Tom Hanks"],
  Genres: ["Action", "Drama", "Sci-Fi", "Comedy"],
};

export default function SuperSuggestionPopup({ onClose }) {
  const nav = useNavigate();
  const [tab, setTab] = useState("Directors");

  const [dirs, toggleDir] = useSelectable();
  const [acts, toggleAct] = useSelectable();
  const [gens, toggleGen] = useSelectable();

  /* ---------- search input value + debounce -------------------- */
  const [q, setQ] = useState("");
  const [deb, setDeb] = useState("");
  useDebounce(() => setDeb(q.trim()), 300, [q]);
  const showSearch = tab !== "Genres";

  /* ---------- esc closes --------------------------------------- */
  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  /* ---------- helpers ------------------------------------------ */
  const sel = { Directors: dirs, Actors: acts, Genres: gens }[tab];
  const toggle = { Directors: toggleDir, Actors: toggleAct, Genres: toggleGen }[
    tab
  ];
  const canGenerate = dirs.length || acts.length || gens.length;

  function generate() {
    const p = new URLSearchParams();
    if (dirs.length) p.set("directors", dirs.join(","));
    if (acts.length) p.set("actors", acts.join(","));
    if (gens.length) p.set("genres", gens.join(","));
    nav(`/browse?${p.toString()}`);
    onClose();
  }

  /* ---------- UI ----------------------------------------------- */
  return (
    <AnimatePresence>
      {/* backdrop */}
      <motion.div
        key="bg"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
      />

      {/* panel */}
      <motion.div
        key="panel"
        initial={{ y: -25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -25, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
        className="fixed left-1/2 top-24 -translate-x-1/2
                   w-full max-w-[540px] bg-siva-800/95 rounded-2xl p-8
                   text-siva-100 z-50 shadow-2xl"
      >
        {/* nav pills */}
        <div className="flex mb-4 gap-2">
          {Object.keys(quick).map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                setQ("");
              }}
              className={`flex-1 py-2 rounded-full transition-colors text-sm
                          ${
                            t === tab
                              ? "bg-bordo-500 text-siva-100"
                              : "bg-siva-700 hover:bg-siva-600"
                          }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* search bar */}
        {showSearch && (
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`Search ${tab.toLowerCase()}…`}
            className="w-full mb-2 rounded-lg bg-siva-700/70
                       py-2.5 px-4 text-sm placeholder-siva-300
                       focus:outline-none focus:ring-2 focus:ring-bordo-400"
          />
        )}

        {/* suggestions dropdown – absolute below input */}
        {showSearch && deb.length >= 2 && (
          <div className="relative">
            <SearchPeopleInput visible onSelect={toggle} selected={sel} />
          </div>
        )}

        {/* selected chips */}
        <div className="my-4 flex flex-wrap gap-2 min-h-[48px]">
          {sel.map((v) => (
            <div
              key={v}
              className="flex items-center gap-2 bg-bordo-600/80
                         px-3 py-1.5 rounded-lg text-sm"
            >
              {v}
              <button onClick={() => toggle(v)} className="text-xs">
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* quick chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {quick[tab].map((v) => (
            <TagButton
              key={v}
              label={v}
              active={sel.includes(v)}
              onToggle={() => toggle(v)}
            />
          ))}
        </div>

        {/* footer */}
        <button
          disabled={!canGenerate}
          onClick={generate}
          className={`mt-6 w-full py-3 rounded-full font-semibold
                      transition-colors text-sm
                      ${
                        canGenerate
                          ? "bg-bordo-500 hover:bg-bordo-400"
                          : "bg-siva-700 cursor-not-allowed"
                      }`}
        >
          Generate
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
