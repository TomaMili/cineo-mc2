export default function ActorPlaceholder({ name = "?" }) {
  return (
    <div className="flex items-center justify-center h-40 sm:h-44 lg:h-48 bg-siva-800 rounded-lg">
      <svg
        viewBox="0 0 24 24"
        className="w-12 h-12 text-siva-300"
        fill="currentColor"
        aria-label={`No photo for ${name}`}
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-3.2 2.7-6 8-6s8 2.8 8 6v1H4z" />
      </svg>
    </div>
  );
}
