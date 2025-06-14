import { useState } from "react";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { Icon } from "@iconify/react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useRemoveMovieFromWatchRoom } from "../../hooks/useWatchTogetherMovies";
import MovieCard from "../../ui/MovieCard";

export default function MemberRow({ member, movies, limit, isMe, roomId }) {
  const [open, setOpen] = useState(false);
  const removeMovie = useRemoveMovieFromWatchRoom(roomId);

  const backgroundClass = clsx(
    isMe
      ? member.is_ready
        ? "bg-bordo-500/85"
        : "bg-bordo-600/30"
      : member.is_ready
      ? "bg-bordo-500"
      : "bg-bordo-600/30"
  );

  return (
    <div className={clsx("rounded-lg transition-colors", backgroundClass)}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={clsx(
          "flex w-full justify-between px-6 py-3 cursor-pointer rounded-lg",
          backgroundClass
        )}
      >
        <div className="flex items-center gap-4 ">
          <Icon
            icon="ix:user-profile"
            width={50}
            height={50}
            className="text-siva-200"
          />
          <div className="text-left">
            <p className="text-lg font-semibold">
              {isMe ? "You" : member.username}
            </p>
            <p className="text-xs text-slate-400">
              {member.is_ready ? "Ready" : "Waiting…"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          Movies ({movies.length}/{limit})
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="flex"
          >
            <ChevronDown size={18} />
          </motion.span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            variants={{
              collapsed: { height: 0, opacity: 0 },
              open: { height: "auto", opacity: 1 },
            }}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="flex flex-nowrap gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory sm:grid sm:gap-4 sm:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] sm:overflow-x-visible sm:snap-none min-w-full p-4">
              {movies.length === 0 ? (
                <p className="col-span-full text-siva-300">No movies yet</p>
              ) : (
                movies.map((m) => (
                  <div
                    className="flex-none snap-start w-36 sm:flex-auto sm:w-auto"
                    key={m.dbId}
                  >
                    <MovieCard
                      key={m.dbId ?? m.id}
                      movie={m}
                      onRemove={
                        isMe ? () => removeMovie.mutate(m.dbId) : undefined
                      }
                    />
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
