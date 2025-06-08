import { useMemo } from "react";

export default function BlobBackground({ blobNum }) {
  const blobs = useMemo(() => {
    const count = blobNum || 3;
    return Array.from({ length: count }).map(() => {
      const size = Math.floor(Math.random() * 800 + 500);
      return {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${size}px`,
        height: `${size}px`,
        background: `rgba(126, 20, 19, 0.15)`,
        blur: Math.floor(Math.random() * 40 + 60),
      };
    });
  }, [blobNum]);

  return (
    <div className="absolute overflow-visible pointer-events-none z-0">
      {blobs.map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: b.top,
            left: b.left,
            width: b.width,
            height: b.height,
            background: b.background,
            filter: `blur(${b.blur}px)`,
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  );
}
