import React, { useEffect, useRef, useState } from "react";

// Helper function for combining classNames
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export const GlowingCard = ({
  children,
  className,
  glowColor = "#b91c1c", // bordo za Cineo
  hoverEffect = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative flex-1 min-w-[14rem] p-6 rounded-2xl",
        "bg-siva-900/80 border border-siva-700/50",
        "transition-all duration-400 ease-out overflow-hidden",
        hoverEffect && "hover:border-siva-300",
        className
      )}
      style={{
        "--glow-color": glowColor,
      }}
      {...props}
    >
      {/* Background subtle glow matching card color */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${glowColor}40, transparent 70%)`,
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export const GlowingCards = ({
  children,
  className,
  enableGlow = true,
  glowRadius = 25,
  glowOpacity = 0.8,
  animationDuration = 400,
  gap = "2rem",
  maxWidth = "75rem",
}) => {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;

    if (!container || !overlay || !enableGlow) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePosition({ x, y });
      setShowOverlay(true);

      overlay.style.setProperty("--x", x + "px");
      overlay.style.setProperty("--y", y + "px");
      overlay.style.setProperty("--opacity", glowOpacity.toString());
    };

    const handleMouseLeave = () => {
      setShowOverlay(false);
      overlay.style.setProperty("--opacity", "0");
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [enableGlow, glowOpacity]);

  const containerStyle = {
    "--gap": gap,
    "--max-width": maxWidth,
    "--animation-duration": animationDuration + "ms",
    "--glow-radius": glowRadius + "rem",
    "--glow-opacity": glowOpacity,
  };

  return (
    <div className={cn("relative w-full", className)} style={containerStyle}>
      <div
        ref={containerRef}
        className="relative max-w-[var(--max-width)] mx-auto"
      >
        <div className="flex items-start justify-center flex-wrap gap-[var(--gap)]">
          {children}
        </div>

        {enableGlow && (
          <div
            ref={overlayRef}
            className="absolute inset-0 pointer-events-none select-none opacity-0 transition-all duration-[var(--animation-duration)] ease-out"
            style={{
              WebkitMask:
                "radial-gradient(var(--glow-radius) var(--glow-radius) at var(--x, 0) var(--y, 0), #000 1%, transparent 50%)",
              mask: "radial-gradient(var(--glow-radius) var(--glow-radius) at var(--x, 0) var(--y, 0), #000 1%, transparent 50%)",
              opacity: showOverlay ? "var(--opacity)" : "0",
            }}
          >
            <div className="flex items-start justify-center flex-wrap gap-[var(--gap)] max-w-[var(--max-width)] mx-auto">
              {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                  // Check if child is motion.div wrapper
                  const isMotionWrapper = child.props?.variants !== undefined;

                  if (isMotionWrapper && child.props.children) {
                    // Extract GlowingCard from motion.div
                    const glowingCard = child.props.children;

                    if (
                      React.isValidElement(glowingCard) &&
                      glowingCard.type === GlowingCard
                    ) {
                      const cardGlowColor =
                        glowingCard.props.glowColor || "#b91c1c";

                      // Clone motion.div with updated GlowingCard
                      return React.cloneElement(child, {
                        children: React.cloneElement(glowingCard, {
                          className: cn(glowingCard.props.className),
                          style: {
                            ...glowingCard.props.style,
                            backgroundColor: cardGlowColor + "20",
                            borderColor: cardGlowColor,
                            boxShadow: `0 0 0 1px ${cardGlowColor}, 0 0 20px ${cardGlowColor}40`,
                          },
                        }),
                      });
                    }
                  } else if (child.type === GlowingCard) {
                    // Direct GlowingCard without wrapper
                    const cardGlowColor = child.props.glowColor || "#b91c1c";
                    return React.cloneElement(child, {
                      className: cn(child.props.className),
                      style: {
                        ...child.props.style,
                        backgroundColor: cardGlowColor + "20",
                        borderColor: cardGlowColor,
                        boxShadow: `0 0 0 1px ${cardGlowColor}, 0 0 20px ${cardGlowColor}40`,
                      },
                    });
                  }
                }
                return child;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlowingCards;
