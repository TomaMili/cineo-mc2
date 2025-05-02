import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SearchPeopleInput from "./SearchPeopleInput";
import TagButton from "../../ui/TagButton";

export default function SuperSuggestionPopup({ onClose }) {
  const nav = useNavigate();
  const [tab, setTab] = useState("Directors");

  const [dirs, setDirs] = useState([]);
  const [acts, setActs] = useState([]);
  const [gens, setGens] = useState([]);

  const current =
    tab === "Directors"
      ? [dirs, setDirs]
      : tab === "Actors"
      ? [acts, setActs]
      : [gens, setGens];

  const [selected, setSelected] = current;

  const toggle = (value) =>
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );

  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const canGenerate = selected.length > 0;
  const generate = () => {
    const p = new URLSearchParams();
    if (dirs.length) p.set("directors", dirs.join(","));
    if (acts.length) p.set("actors", acts.join(","));
    if (gens.length) p.set("genres", gens.join(","));
    nav(`/browse?${p.toString()}`);
    onClose();
  };

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="bg"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-40"
      />

      <motion.div
        key="panel"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="fixed left-1/2 top-56 -translate-x-1/2 w-full max-w-3xl bg-siva-800 rounded-2xl p-8 z-50 shadow-2xl"
      >
        <div className="flex mb-6 border-b border-siva-600">
          {["Directors", "Actors", "Genres"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 text-center py-2 font-medium transition cursor-pointer ${
                t === tab
                  ? "border-b-4 border-bordo-500 text-white"
                  : "text-siva-400 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <SearchPeopleInput
          key={tab}
          type={tab}
          selected={selected}
          onSelect={toggle}
        />

        <div className="grid grid-cols-3 gap-2 mt-6 mb-4">
          {selected.map((v) => (
            <TagButton
              key={v}
              label={v}
              active
              onToggle={() => toggle(v)}
              className="py-2 px-3"
            />
          ))}
        </div>

        <button
          disabled={!canGenerate}
          onClick={generate}
          className={`w-full py-3 rounded-full font-semibold transition  ${
            canGenerate
              ? "bg-bordo-500 hover:bg-bordo-400 text-white cursor-pointer"
              : "bg-siva-700 text-siva-500 cursor-not-allowed"
          }`}
        >
          Generate
        </button>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
