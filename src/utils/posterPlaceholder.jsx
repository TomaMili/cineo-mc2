import { Icon } from "@iconify-icon/react";

function PosterPlaceholder({ title = "No poster", onClick, className }) {
  const base = `relative w-full aspect-[2/3]       
        bg-siva-800/60 rounded-lg
        flex items-center justify-center `;
  return (
    <div className={base + className} aria-label={title} onClick={onClick}>
      <Icon
        icon="mdi:film-open-off-outline"
        width="48"
        height="48"
        className="text-siva-400"
      />
    </div>
  );
}

export default PosterPlaceholder;
