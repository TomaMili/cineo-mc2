import { Icon } from "@iconify-icon/react";

export default function ErrorNotice({
  title = "Something went wrong",
  message = "Please try again later.",
  onRetry = null,
  className = "",
}) {
  return (
    <div
      className={`
        flex flex-col items-center justify-center gap-4 text-center
        bg-red-900/10 border border-red-500/40 rounded-lg p-8
        text-red-100 ${className}
      `}
    >
      <Icon
        icon="mingcute:alert-line"
        width="36"
        height="36"
        className="text-red-400"
      />
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {message && <p className="mt-1 text-sm">{message}</p>}
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 px-4 py-1.5 bg-red-600 hover:bg-red-500 rounded-md text-sm font-medium"
        >
          Retry
        </button>
      )}
    </div>
  );
}
