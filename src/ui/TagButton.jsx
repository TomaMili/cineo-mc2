function TagButton({ label, active, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`px-4 py-1.5 rounded-full text-sm border transition
                    truncate
                    ${
                      active
                        ? "bg-bordo-500/90 border-bordo-400 text-white"
                        : "bg-siva-700/40 border-siva-400 hover:bg-siva-600/50"
                    }`}
    >
      {label}
    </button>
  );
}

export default TagButton;
