import { Icon } from "@iconify-icon/react";

export default function AddMovieCard({ onClick }) {
  return (
    <div>
      <div
        onClick={onClick}
        className="group relative sm:w-full w-36 aspect-[2/3] lg:max-w-[200px] h-full flex flex-col items-center justify-center border-2 rounded-lg cursor-pointer hover:border-bordo-500  transition-all duration-300 ease-out hover:scale-105"
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
