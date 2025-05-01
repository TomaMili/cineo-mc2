export function showToast(message, duration = 1500) {
  const t = document.createElement("div");
  t.innerText = message;
  t.className =
    "fixed bottom-15 right-15 bg-bordo-500 text-siva-100 px-4 py-2 rounded shadow-lg z-[9999] text-lg";
  document.body.appendChild(t);
  setTimeout(() => document.body.removeChild(t), duration);
}
