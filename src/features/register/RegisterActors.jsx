import { useEffect, useState } from "react";
import { useRegistrationContext } from "./RegistrationContext";

export default function RegisterActors() {
  const { data, update } = useRegistrationContext();
  const [input, setInput] = useState("");
  const { actors } = data;

  function add() {
    const name = input.trim();
    if (name && !actors.includes(name)) {
      update({ actors: [...actors, name] });
      setInput("");
    }
  }
  function remove(name) {
    update({ actors: actors.filter((a) => a !== name) });
  }

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("step-valid", { detail: actors.length > 0 })
    );
  }, [actors]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type actor name…"
          className="flex-1 rounded bg-gray-900 px-3 py-2"
        />
        <button
          onClick={add}
          disabled={!input.trim()}
          className="px-4 py-2 bg-bordo-500 rounded disabled:opacity-50"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {actors.map((a) => (
          <div
            key={a}
            className="flex items-center gap-2 px-3 py-1 bg-gray-700 rounded"
          >
            {a}
            <button onClick={() => remove(a)} className="text-red-400">
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
