import React from "react";

const StarBorder = ({
  as: Component = "div",
  className = "",
  color = "rgba(185, 28, 28)",
  speed = "3s",
  thickness = 1,
  children,
  ...rest
}) => {
  return (
    <Component
      className={`relative  overflow-hidden rounded-[20px] ${className}`}
      style={{
        padding: `${thickness}px`,
        ...(rest.style || {}),
      }}
      {...rest}
    >
      <div
        className="absolute w-[300%] h-[50%] opacity-80 bottom-[-20px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="absolute w-[300%] h-[50%] opacity-80 top-[-20px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div className="relative z-[1] bg-gradient-to-b from-bordo-700/90 via-siva-800/95 to-bordo-700/90 border border-black text-siva-100 text-[16px] rounded-[20px]">
        {children}
      </div>
    </Component>
  );
};

export { StarBorder };
export default StarBorder;
