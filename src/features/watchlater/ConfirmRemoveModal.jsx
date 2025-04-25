// src/features/watchlater/ConfirmRemoveModal.jsx

export default function ConfirmRemoveModal({ movie, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/70">
      <div className="bg-gray-800 p-6 rounded-lg space-y-4 text-center">
        <p className="text-white">
          Remove <strong>{movie.title}</strong> from your list?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-bordo-500 text-white rounded"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-600 text-white rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
