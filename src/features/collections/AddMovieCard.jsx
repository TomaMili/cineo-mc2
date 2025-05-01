import { Icon } from "@iconify-icon/react";

export default function AddMovieCard({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="w-40 h-60 flex flex-col items-center justify-center border-2 rounded-lg cursor-pointer hover:border-bordo-500"
    >
      <Icon icon="mdi:plus" width={40} height={40} className="text-gray-500" />
      <span className="mt-2 text-gray-500">Add movie</span>
    </div>
  );
}
