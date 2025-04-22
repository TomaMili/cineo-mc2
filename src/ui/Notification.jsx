import { useState } from "react";
import { Icon } from "@iconify-icon/react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const PRESET_NOTIFICATIONS = [
  {
    id: 1,
    title: "Watch room",
    message:
      "Room 1 is expiring soon, make sure to pick your movies and ready up.",
    timeLabel: "today",
  },
  {
    id: 2,
    title: "The Green Mile",
    message:
      "The Green Mile is now available on Netflix, make sure to check it out!",
    timeLabel: "2 days ago",
  },
];

function Notification({ className = "", onEmpty }) {
  const [items, setItems] = useState(PRESET_NOTIFICATIONS);

  // Remove a single notification - triggers panel exit if none remain.
  const dismiss = (id) => {
    setItems((prev) => {
      const next = prev.filter((item) => item.id !== id);
      if (next.length === 0 && typeof onEmpty === "function") onEmpty();
      return next;
    });
  };

  return (
    <AnimatePresence>
      {items.length > 0 && (
        <motion.div
          key="panel"
          initial={{ opacity: 0, y: -12, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.97 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className={`absolute top-24 left-6 z-50 w-100 rounded-lg shadow-2xl overflow-hidden bg-[#0e1512]/95 text-white backdrop-blur-sm ${className}`}
        >
          <AnimatePresence>
            {items.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6, height: 0, margin: 0, padding: 0 }}
                transition={{ duration: 0.15 }}
                className={`relative p-4 ${
                  idx !== 0 ? "border-t border-white/10" : ""
                }`}
              >
                <button
                  aria-label="Dismiss notification"
                  onClick={() => dismiss(item.id)}
                  className="absolute top-3 right-3 hover:opacity-80 cursor-pointer"
                >
                  <Icon icon="mdi:close" width="18" height="18" />
                </button>

                <h3 className="font-semibold leading-none mb-1">
                  {item.title}
                </h3>
                <p className="text-sm leading-snug text-white/90 mb-2">
                  {item.message}
                </p>
                <span className="text-xs uppercase tracking-wide text-white/50">
                  {item.timeLabel}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default Notification;
/* --------------------------------------------------------------------
   🛠️  HOW TO USE (quick refresher)
   --------------------------------------------------------------------
   import Notification from "./Notification";

   const [open, setOpen] = useState(false);

   <>
     <Icon onClick={() => setOpen((o) => !o)} icon="mdi:bell-outline" />
     {open && <Notification onEmpty={() => setOpen(false)} />}  // <— HERE
   </>
---------------------------------------------------------------------*/
