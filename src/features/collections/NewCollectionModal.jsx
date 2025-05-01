import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify-icon/react";

export default function NewCollectionModal({
  initialName = "",
  onCreate,
  onCancel,
}) {
  const [name, setName] = useState(initialName);
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/70" onClick={onCancel} />
      <div className="bg-siva-800 rounded-lg p-6 relative text-white w-full max-w-md">
        <button onClick={onCancel} className="absolute top-3 right-3">
          <Icon icon="gridicons:cross-circle" width={28} />
        </button>
        <h2 className="text-2xl mb-4">New Collection</h2>
        <label className="block mb-4">
          <span className="text-gray-300">Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full px-3 py-2 bg-gray-700 rounded"
          />
        </label>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-600 rounded">
            Cancel
          </button>
          <button
            onClick={() => onCreate(name)}
            disabled={!name.trim()}
            className="px-4 py-2 bg-bordo-500 rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
