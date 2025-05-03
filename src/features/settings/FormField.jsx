export default function FormField({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-siva-100">{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 block w-full rounded bg-gray-900 border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-bordo-400"
      />
    </label>
  );
}
