import { Icon } from "@iconify-icon/react";
import useTheme from "../hooks/useTheme";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-3 mb-4 hover:text-siva-100 h-10"
    >
      <Icon
        icon={theme === "dark" ? "ph:sun-bold" : "ph:moon-bold"}
        width={28}
        height={28}
      />
      <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
    </button>
  );
}
