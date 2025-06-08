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
        animate={{ opacity: 0.6 }}
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
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[calc(100vh-8rem)]   overscroll-contain bg-siva-800/60 backdrop-blur-2xl rounded-2xl p-8 z-50 shadow-2xl"
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex mb-6 ">
              {["Directors", "Actors", "Genres"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 text-center py-2 font-medium transition cursor-pointer ${
                    t === tab
                      ? "border-b-4  border-bordo-500 text-siva-100"
                      : "text-siva-200 hover:text-siva-100 border-b border-siva-300"
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
          </div>
          <p className="w-full font-medium text-siva-100 mt-2">
            Picked {tab.toLowerCase()}:
          </p>
          <div className="h-full overflow-auto">
            <div className="flex flex-col gap-2 mt-3 mb-4 h-full">
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
          </div>

          <hr className="w-full h-px border-siva-300 bg-siva-300" />
          <button
            disabled={!canGenerate}
            onClick={generate}
            className={`block w-1/2 py-3 rounded-full font-semibold transition mt-5  mx-auto  ${
              canGenerate
                ? "bg-bordo-500 hover:bg-bordo-400 text-white cursor-pointer"
                : "bg-siva-300 text-siva-100 cursor-not-allowed"
            }`}
          >
            Generate
          </button>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
