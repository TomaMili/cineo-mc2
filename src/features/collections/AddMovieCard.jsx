// src/features/collections/AddMovieCard.jsx
import { Icon } from "@iconify-icon/react";

export default function AddMovieCard({ onClick }) {
  return (
    <div
      className="flex-none w-40 sm:w-44 lg:w-48 xl:w-52 flex flex-col items-center justify-center cursor-pointer rounded-lg border-2 border-gray-600 hover:border-bordo-500 transition-all aspect-[2/3] bg-gray-900/40"
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <Icon icon="mdi:plus" width="40" height="40" className="text-gray-400" />
      <span className="text-gray-400 text-sm mt-2">Add Movie</span>
    </div>
  );
}
