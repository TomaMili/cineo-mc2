function Spinner({
  size = 24,
  stroke = 3,
  className = "",
  color = "text-siva-100",
}) {
  return (
    <svg
      style={{ width: size, height: size }}
      className={`animate-spin ${color} ${className}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth={stroke}
      />
      <path
        d="M22 12a10 10 0 0 1-10 10"
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default Spinner;
