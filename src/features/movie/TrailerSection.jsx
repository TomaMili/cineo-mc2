function TrailerSection({ youtubeKey }) {
  if (!youtubeKey) return null;

  return (
    <section className="flex flex-col items-center my-40 gap-6">
      <h2 className="text-3xl font-medium">OFFICIAL TRAILER</h2>
      <div className="w-2/3 aspect-video rounded-xl overflow-hidden mx-auto">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeKey}?rel=0`}
          title="Movie trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full border-0 "
          loading="lazy"
        />
      </div>
    </section>
  );
}

export default TrailerSection;
