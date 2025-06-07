import { Icon } from "@iconify-icon/react";

export default function AddMovieCard({ onClick }) {
  return (
    <div>
      <div
        onClick={onClick}
        className="group relative w-32 sm:w-44 lg:w-48 xl:w-52 aspect-[2/3] flex flex-col items-center justify-center border-2 rounded-lg cursor-pointer hover:border-bordo-500  transition-all duration-300 ease-out hover:scale-105"
      >
        <Icon
          icon="mdi:plus"
          width={40}
          height={40}
          className="text-siva-100"
        />
        <span className="mt-2 text-siva-100">Add movie</span>
      </div>
    </div>
  );
}
