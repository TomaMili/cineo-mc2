import { useEffect, useState } from "react";
import { Icon } from "@iconify-icon/react";

function IconWithSkeleton({
  icon,
  width = 28,
  height = 28,
  className = "",
  ...props
}) {
  const [loaded, setLoaded] = useState(false);

  // Fallback loader: skeleton nestaje nakon 180ms
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 180);
    return () => clearTimeout(t);
  }, []);

  return (
    <span
      className={`inline-flex items-center justify-center min-w-[${width}px] min-h-[${height}px] relative ${className}`}
    >
      {!loaded && (
        <span className="absolute left-0 top-0 w-full h-full flex items-center justify-center z-10">
          <span
            className={`block w-[${width - 6}px] h-[${
              height - 6
            }px] rounded-full bg-gray-700 animate-pulse`}
          />
        </span>
      )}
      <Icon
        icon={icon}
        width={width}
        height={height}
        {...props}
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.2s",
          zIndex: 20,
        }}
      />
    </span>
  );
}

export default IconWithSkeleton;
