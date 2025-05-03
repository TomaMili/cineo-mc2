export default function SettingsCard({
  title,
  children,
  onSubmit,
  submitLabel,
  disabled = false,
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!disabled) onSubmit();
      }}
      className=" w-4/5 mx-auto lg:w-4/9 bg-black/90 rounded-lg p-6 text-white shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-center mb-6">{title}</h2>
      <div className="space-y-4">{children}</div>
      <button
        type="submit"
        disabled={disabled}
        className={`mt-6 w-full py-2 rounded ${
          disabled
            ? "bg-gray-700 cursor-not-allowed"
            : "bg-bordo-500 hover:bg-bordo-400 cursor-pointer"
        } font-medium transition`}
      >
        {submitLabel}
      </button>
    </form>
  );
}
